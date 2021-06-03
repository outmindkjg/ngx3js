import { Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import * as THREE from 'three';
import { ThreeUtil } from '../interface';
import { AbstractObject3dComponent } from '../object3d.abstract';
import { MixerComponent } from './../mixer/mixer.component';

@Component({
  selector: 'three-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
})
export class AudioComponent extends AbstractObject3dComponent implements OnInit {
  @Input() public type:string = 'position';
  @Input() private url:string = null;
  @Input() private videoUrl:string = null;
  @Input() private autoplay:boolean = true ;
  @Input() private play:boolean = true ;
  @Input() private loop:boolean = true ;
  @Input() private volume:number = 1;
  @Input() private refDistance:number = 1;
  @Input() private rolloffFactor:number = 1;
  @Input() private distanceModel:string = "";
  @Input() private maxDistance:number = 1;
  @Input() private coneInnerAngle:number = 1;
  @Input() private coneOuterAngle:number = 1;
  @Input() private coneOuterGain:number = 1;
  @Input() private fftSize:number = 128;

  @ContentChildren(MixerComponent, { descendants: false }) private mixerList: QueryList<MixerComponent>;

  ngOnInit(): void {
    super.ngOnInit('audio');
  }

  ngOnDestroy(): void {
    if (this.audio !== null) {
      if (this.audio.source !== null) {
        this.audio.stop();
      }
      if (this.video !== null) {
        this.video.pause();
      }
    }
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.audio) {
      this.addChanges(changes);
    }
  }

  ngAfterContentInit(): void {
    this.subscribeListQuery(this.mixerList, 'mixerList', 'mixer');
    super.ngAfterContentInit();
  }
  
  private audio: THREE.Audio<any> = null;
  private video : HTMLVideoElement = null;
  private listener: THREE.AudioListener = null;
  private analyser: THREE.AudioAnalyser = null;

  private static audioLoader : THREE.AudioLoader = null;

  private loadAudio(url : string, onLoad: ( audioBuffer: AudioBuffer ) => void) {
    AudioComponent.loadAudio(url, onLoad);
  }

  static loadAudio(url : string, onLoad: ( audioBuffer: AudioBuffer ) => void) {
    if (this.audioLoader === null) {
      this.audioLoader = new THREE.AudioLoader();
    }
    this.audioLoader.load(
      url,
      ( audioBuffer: AudioBuffer ) : void => {
        onLoad(audioBuffer);
      },
      ( request: ProgressEvent ) : void => {
      },
      ( event: ErrorEvent ) : void => {
      }
    );
  }

  private _renderer : any = null;
  setListener(listener : THREE.AudioListener, renderer : any) {
    if (this.listener !== listener) {
      this.listener = listener;
      this._renderer = renderer;
      this.resetAudio();
    }
  }

  setParent(parent: THREE.Object3D): boolean {
    if (super.setParent(parent)) {
      this.resetAudio();
      return true;
    }
    return false;
  }

  private loadedVideoTexture : THREE.VideoTexture = null;

  getTexture():THREE.VideoTexture{
    if (this.loadedVideoTexture === null && this.video !== null) {
      this.loadedVideoTexture = new THREE.VideoTexture(this.video);
    }
    return this.loadedVideoTexture;
  }

  private loadedUrl : string = null;

  private checkAudioPlay() {
    let hasError = false;
    if (this.video !== null && this.play) {
      if (this.video.played.length === 0) {
        hasError = true;
      }
    } else if (this.audio !== null && this.play) {
      if (this.audio.source.context.currentTime === 0) {
        hasError = true;
      }
    }
    if (hasError && this._renderer && this._renderer.userGestureSubscribe) {
      const userGestureSubscribe : Subscription = this._renderer.userGestureSubscribe().subscribe((result : boolean) => {
        if (result) {
          this.video = null;
          this.audio = null;
          this.loadedUrl = null;
          this.resetAudio();
        }
        userGestureSubscribe.unsubscribe();
      })
    } else {
      this.synkObject3d(['mixer'])
    }
  }

  resetAudio() {
    if (this.audio === null || this._needUpdate) {
      this.audio = this.getAudio();
    }
    if (this.audio !== null) {
      if (this.audio.listener !== this.listener) {
        this.audio.listener = this.listener;
      }
      if (this.url !== null && this.loadedUrl !== this.url) {
        this.loadedUrl = this.url;
        this.loadedVideoTexture = null;
        this.video = null;
        if (ThreeUtil.isNotNull(this.videoUrl)) {
          const video = document.createElement('video');
          video.src = this.videoUrl;
          video.loop = this.loop;
          video.autoplay = this.autoplay;
          this.audio.setMediaElementSource(video);
          this.video = video;
          if (this.autoplay || this.play) {
            this.video.play().then(() => {
              this.resetAudio();
              super.callOnLoad();
            }).catch(() => {
              setTimeout(( ) => {
                this.checkAudioPlay();
              }, 1000)
            })
          } else {
            this.resetAudio();
            super.callOnLoad();
          }
        } else {
          this.loadAudio(this.url, (buffer: AudioBuffer) => {
            this.audio.setBuffer(buffer);
            this.resetAudio();
            super.callOnLoad();
          });
        }
        if (this.video !== null) {
          this.setObject3d(this.audio);
        }
      }
      if (!this.visible) {
        this.setObject3d(null);
        this.audio.setVolume(0);
      } else if (this.visible) {
        if (this.audio.parent === null && this.audio.parent !== this.parent) {
          this.setObject3d(this.audio);
        }
        this.audio.setVolume(this.volume);
        if (this.audio instanceof THREE.PositionalAudio) {
          this.audio.setRefDistance(this.refDistance);
          this.audio.setRolloffFactor(this.rolloffFactor);
          // this.audio.setDistanceModel(this.distanceModel);
          this.audio.setMaxDistance(this.maxDistance);
          /*
          this.audio.setDirectionalCone(
            this.coneInnerAngle,
            this.coneOuterAngle,
            this.coneOuterGain
          );
          */
          // this.audio.play();
        }
      }
      this.audio.loop = true;
      if (this.video !== null) {
        this.video.loop = this.loop;
        if (this.video.currentSrc) {
          if (this.play && this.video.paused) {
            this.video.play();
          } else if (!this.play && !this.video.paused) {
            this.video.pause();
          }
          setTimeout(() => {
            this.checkAudioPlay();
          }, 1000);
        }
      } else {
        if (this.audio.sourceType !== 'empty') {
          if (this.play && !this.audio.isPlaying) {
            this.audio.play();
          } else if (!this.play && this.audio.isPlaying) {
            this.audio.pause();
          }
          setTimeout(() => {
            this.checkAudioPlay();
          }, 1000);
        }
      }
      this.audio.visible = this.visible;
    }
  }

  getAnalyser(fftSize? : number) : THREE.AudioAnalyser {
    if (this.analyser == null && this.audio !== null) {
      this.analyser = new THREE.AudioAnalyser(this.audio, fftSize || this.fftSize);
    }
    return this.analyser;
  }

  synkObject3d(synkTypes: string[]) {
    if (this.audio !== null) {
      if (ThreeUtil.isIndexOf(synkTypes, 'init')) {
        synkTypes = ThreeUtil.pushUniq(synkTypes, ['mixer']);
      }
      synkTypes.forEach((synkType) => {
        switch (synkType) {
          case 'mixer' :
            this.mixerList.forEach((mixer) => {
              mixer.setModel(this.audio, null);
            });
            break;
        }
      });
      super.synkObject3d(synkTypes);
    }
  }

  getAudio():THREE.Audio {
    if (this.listener !== null && (this.audio === null || this._needUpdate)) {
      this.needUpdate = false;
      this.loadedVideoTexture = null;
      this.video = null;
      switch (this.type.toLowerCase()) {
        case 'audio':
          this.audio = new THREE.Audio(this.listener);
          break;
        case 'position':
        default:
          this.audio = new THREE.PositionalAudio(this.listener);
          break;
      }
      this.audio.autoplay = this.autoplay;
      this.synkObject3d(['init']);
    }
    return this.audio;
  }
}
