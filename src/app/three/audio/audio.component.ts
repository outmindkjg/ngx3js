import { Component, ContentChildren, forwardRef, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import * as THREE from 'three';
import { ThreeUtil } from '../interface';
import { AbstractObject3dComponent } from '../object3d.abstract';
import { MixerComponent } from './../mixer/mixer.component';

@Component({
  selector: 'three-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
  providers: [{provide: AbstractObject3dComponent, useExisting: forwardRef(() => AudioComponent) }]
})
export class AudioComponent extends AbstractObject3dComponent implements OnInit {
  @Input() public type:string = 'position';
  @Input() private url:any = null;
  @Input() private urlType:string = 'auto';
  @Input() private videoUrl:string = null;
  @Input() private autoplay:boolean = true ;
  @Input() private play:boolean = true ;
  @Input() private loop:boolean = true ;
  @Input() private volume:number = 1;
  @Input() private refDistance:number = null;
  @Input() private rolloffFactor:number = null;
  @Input() private distanceModel:string = null; // "exponential" | "inverse" | "linear"
  @Input() private maxDistance:number = null;
  @Input() private coneInnerAngle:number = null;
  @Input() private coneOuterAngle:number = null;
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
    this.subscribeListQueryChange(this.mixerList, 'mixerList', 'mixer');
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
  private loadedAudioTexture : THREE.DataTexture = null;

  getTexture():THREE.Texture{
    this.getAudio();
    if (this.loadedVideoTexture === null && ThreeUtil.isNotNull(this.videoUrl)) {
      this.loadedVideoTexture = new THREE.VideoTexture(this.video);
      return this.loadedVideoTexture;
    } else if (ThreeUtil.isNotNull(this.url)) {
      const analyser = this.getAnalyser();
      let data : Uint8Array = null;
      let fftSize = 128;
      if (analyser !== null) {
        data = analyser.getFrequencyData();
        fftSize = analyser.analyser.fftSize;
      } else {
        data = new Uint8Array();
        fftSize = this.fftSize;
      }
      if (this.loadedAudioTexture === null) {
        this.loadedAudioTexture = new THREE.DataTexture( data, fftSize / 2, 1, THREE.RedFormat );
      } else {
        (this.loadedAudioTexture.image as any ) = { data : data,  width : fftSize / 2, height : 1};
        this.loadedAudioTexture.needsUpdate = true;
        this.setSubscribeNext('needsUpdate');
      }
      return this.loadedAudioTexture;
    }
    return new THREE.DataTexture(null,1,1);
  }

  public update() {
    if (this.loadedAudioTexture !== null && this.analyser !== null) {
      this.analyser.getFrequencyData();
      this.loadedAudioTexture.needsUpdate = true;
      this.setSubscribeNext('needsUpdate');
    }
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
      this.applyChanges3d(['mixer'])
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
          video.src = ThreeUtil.getStoreUrl(this.videoUrl);
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
          switch(this.urlType.toLowerCase()) {
            case 'listener' : 
              const oscillator = this.listener.context.createOscillator() as any;
              oscillator.type = 'sine';
              oscillator.frequency.setValueAtTime( 144, this.audio.context.currentTime ) ;
              oscillator.start( 0 );
              this.audio.setNodeSource( oscillator );
              this.resetAudio();
              super.callOnLoad();
              this.addChanges('load');
              break;
            case 'auto' :
            case 'audio' :
            default :
              if (typeof this.url === 'string') {
                this.loadAudio(ThreeUtil.getStoreUrl(this.url), (buffer: AudioBuffer) => {
                  this.audio.setBuffer(buffer);
                  this.resetAudio();
                  super.callOnLoad();
                  this.addChanges('load');
                });
              } else {
                this.unSubscribeRefer('url');
                if (this.url instanceof AudioBuffer) {
                  this.audio.setBuffer(this.url);
                } else if (ThreeUtil.isNotNull(this.url.getAudio)){
                  const audio = this.url.getAudio();
                  if (audio instanceof AudioBuffer) {
                    this.audio.setBuffer(this.url.getAudio());
                  }
                  this.subscribeRefer(this.url, ThreeUtil.getSubscribe(this.url, () => {
                    const audio = this.url.getAudio();
                    if (audio instanceof AudioBuffer) {
                      this.audio.setBuffer(audio);
                      this.resetAudio();
                      super.callOnLoad();
                      this.addChanges('load');
                    }
                  },'audio'));
                }
                this.resetAudio();
                super.callOnLoad();
                this.addChanges('load');
              }
              break;
          }
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
          if (ThreeUtil.isNotNull(this.refDistance)) {
            this.audio.setRefDistance(this.refDistance);
          }
          if (ThreeUtil.isNotNull(this.rolloffFactor)) {
            this.audio.setRolloffFactor(this.rolloffFactor);
          }
          if (ThreeUtil.isNotNull(this.distanceModel)) {
            this.audio.setDistanceModel(this.distanceModel);
          }
          if (ThreeUtil.isNotNull(this.maxDistance)) {
            this.audio.setMaxDistance(this.maxDistance);
          }
          if (ThreeUtil.isNotNull(this.coneInnerAngle) && ThreeUtil.isNotNull(this.coneOuterAngle)) {
            this.audio.setDirectionalCone(
              ThreeUtil.getTypeSafe(this.coneInnerAngle,0),
              ThreeUtil.getTypeSafe(this.coneOuterAngle,360),
              ThreeUtil.getTypeSafe(this.coneOuterGain,1)
            );
          }
          // this.audio.play();
        }
      }
      this.audio.loop = this.loop;
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

  private _numberAnalyser : () => number = null;


  getNumber() : () => number {
    this._numberAnalyser = () => {
      if (this.analyser !== null) {
        return this.analyser.getAverageFrequency() / 256;
      }
      return 0;
    }
    return this._numberAnalyser;
  }
  
  
  applyChanges3d(changes: string[]) {
    if (this.audio !== null) {
      if (ThreeUtil.isIndexOf(changes, 'init')) {
        changes = ThreeUtil.pushUniq(changes, ['mixer']);
      }
      changes.forEach((change) => {
        switch (change) {
          case 'mixer' :
            this.unSubscribeReferList('mixerList');
            this.mixerList.forEach((mixer) => {
              mixer.setParent(this.audio);
            });
            this.subscribeListQuery(this.mixerList, 'mixerList','mixer');
            break;
          case 'load' :
            if (this._numberAnalyser !== null && this.analyser === null) {
              this.getAnalyser();
            }
            if (this.loadedAudioTexture !== null) {
              this.getTexture();
            }
            this.setSubscribeNext('load');
            break;
        }
      });
      super.applyChanges3d(changes);
    }
  }
  
  getObject3d(): THREE.Audio {
    return this.audio;
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
      this.applyChanges3d(['init']);
    }
    return this.audio;
  }
}
