import { viewClassName } from '@angular/compiler';
import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import * as THREE from 'three';
import { ThreeUtil } from '../interface';

@Component({
  selector: 'three-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
})
export class AudioComponent implements OnInit {
  @Input() type: string = 'position';
  @Input() url: string = null;
  @Input() videoUrl: string = null;
  @Input() visible : boolean = true ;
  @Input() autoplay : boolean = true ;
  @Input() play : boolean = true ;
  @Input() volume: number = 1;
  @Input() refDistance: number = 1;
  @Input() rolloffFactor: number = 1;
  @Input() distanceModel: string = "";
  @Input() maxDistance: number = 1;
  @Input() coneInnerAngle: number = 1;
  @Input() coneOuterAngle: number = 1;
  @Input() coneOuterGain: number = 1;
  @Input() fftSize: number = 128;
  
  @Output() onLoad: EventEmitter<AudioComponent> = new EventEmitter<AudioComponent>();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.type) {
      this.audio = null;
    }
    if (this.audio !== null && this.audio.buffer !== null && changes.url) {
      this.audio.buffer = null;
    }
    this.resetAudio();
  }

  ngOnDestroy(): void {
    if (this.audio !== null) {
      if (this.audio.parent !== null) {
        this.audio.parent.remove(this.audio);
      }
      if (this.audio.source !== null) {
        this.audio.stop();
      }
      if (this.video !== null) {
        this.video.pause();
      }
    }
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
      ( request: ProgressEvent ) : void => {},
      ( event: ErrorEvent ) : void => {}
    );
  }

  setListener(listener : THREE.AudioListener) {
    if (this.listener !== listener) {
      this.listener = listener;
      this.resetAudio();
    }
  }

  private refObject3d: THREE.Object3D = null;

  setObject3D(refObject3d: THREE.Object3D) {
    if (this.refObject3d !== refObject3d) {
      this.refObject3d = refObject3d;
      this.resetAudio();
    }
  }

  private _textureSubject:Subject<HTMLVideoElement> = new Subject<HTMLVideoElement>();

  textureSubscribe() : Observable<HTMLVideoElement>{
    return this._textureSubject.asObservable();
  }

  private loadedVideoTexture : THREE.VideoTexture = null;

  getTexture():THREE.VideoTexture{
    if (this.loadedVideoTexture === null && this.video !== null) {
      this.loadedVideoTexture = new THREE.VideoTexture(this.video);
    }
    return this.loadedVideoTexture;
  }

  private loadedUrl : string = null;

  resetAudio() {
    if (this.audio === null) {
      this.audio = this.getAudio();
    }
    if (this.audio !== null) {
      if (this.audio.listener !== this.listener) {
        this.audio.listener = this.listener;
      }
      if (this.refObject3d !== null) {
        if (this.audio.parent !== this.refObject3d) {
          if (this.audio.parent !== null) {
            this.audio.parent.remove(this.audio);
          }
          this.refObject3d.add(this.audio);
        }
      }
      if (this.url !== null && this.loadedUrl !== this.url) {
        this.loadedUrl = this.url;
        this.loadedVideoTexture = null;
        this.video = null;
        if (ThreeUtil.isNotNull(this.videoUrl)) {
          const video = document.createElement('video');
          video.src = this.videoUrl;
          video.loop = true;
          video.play();
          this.audio.setMediaElementSource(video);
          this.video = video;
          this.resetAudio();
          this.onLoad.emit(this);
          this._textureSubject.next(this.video);
        } else {
          this.loadAudio(this.url, (buffer: AudioBuffer) => {
            this.audio.setBuffer(buffer);
            this.resetAudio();
            this.onLoad.emit(this);
        });
        }
      }
      if (!this.visible) {
        if (this.audio.parent !== null) {
          this.audio.parent.remove(this.audio);
        }
        this.audio.setVolume(0);
      } else if (this.visible) {
        if (this.audio.parent === null && this.audio.parent !== this.refObject3d) {
          if (this.audio.parent !== null && this.audio.parent !== undefined) {
            this.audio.parent.remove(this.audio);
          }
          this.refObject3d.add(this.audio);
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
        this.video.loop = true;
        if (this.video.currentSrc) {
          if (this.play && this.video.paused) {
            this.video.play();
          } else if (!this.play && !this.video.paused) {
            this.video.pause();
          }
        } 
      } else {
        if (this.audio.sourceType !== 'empty') {
          if (this.play && !this.audio.isPlaying) {
            this.audio.play();
          } else if (!this.play && this.audio.isPlaying) {
            this.audio.pause();
          }
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

  getAudio():THREE.Audio {
    if (this.audio === null && this.listener !== null) {
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
    }
    return this.audio;
  }
}
