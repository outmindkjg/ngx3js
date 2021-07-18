import { Component, forwardRef, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { ThreeUtil } from '../interface';
import { AbstractObject3dComponent } from '../object3d.abstract';

@Component({
  selector: 'ngx3js-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
  providers: [{provide: AbstractObject3dComponent, useExisting: forwardRef(() => AudioComponent) }]
})
export class AudioComponent extends AbstractObject3dComponent implements OnInit {
  @Input() public type:string = 'position';
  @Input() private url:any = null;
  @Input() private urlType:string = 'auto';
  @Input() private autoplay:boolean = true ;
  @Input() private play:boolean = true ;
  @Input() private loop:boolean = true ;
  @Input() private volume:number = null;
  @Input() private refDistance:number = null;
  @Input() private rolloffFactor:number = null;
  @Input() private distanceModel:string = null; // "exponential" | "inverse" | "linear"
  @Input() private maxDistance:number = null;
  @Input() private coneInnerAngle:number = null;
  @Input() private coneOuterAngle:number = null;
  @Input() private coneOuterGain:number = 1;
  @Input() private fftSize:number = 128;

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
      this.audioLoader = new THREE.AudioLoader(ThreeUtil.getLoadingManager());
    }
    this.audioLoader.load(
      url,
      ( audioBuffer: AudioBuffer ) : void => {
        onLoad(audioBuffer);
      }
    );
  }

  private _renderer : any = null;
  setListener(listener : THREE.AudioListener, renderer : any) {
    if (this.listener !== listener) {
      this.listener = listener;
      this._renderer = renderer;
      this.addChanges('listener');
    }
  }

  private getListener(): THREE.AudioListener {
    if (this.listener !== null) {
      return this.listener;
    } else {
      return new THREE.AudioListener();
    }
  }


  setParent(parent: THREE.Object3D): boolean {
    if (super.setParent(parent)) {
      this.getAudio();
      return true;
    }
    return false;
  }

  private loadedVideoTexture : THREE.VideoTexture = null;
  private loadedAudioTexture : THREE.DataTexture = null;

  getTexture():THREE.Texture{
    this.getAudio();
    if (this.video !== null) {
      if (this.loadedVideoTexture === null) {
        this.loadedVideoTexture = new THREE.VideoTexture(this.video);
      }
      return this.loadedVideoTexture;
    } else if (ThreeUtil.isNotNull(this.url)) {
      this.getAudio();
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
        changes = ThreeUtil.pushUniq(changes, ['volume','loop','url','positionalaudio','play','autoplay']);
      }
      changes.forEach((change) => {
        switch (change.toLowerCase()) {
          case 'loaded' :
            if (this._numberAnalyser !== null && this.analyser === null) {
              this.getAnalyser();
            }
            if (this.loadedAudioTexture !== null) {
              this.getTexture();
            }
            this.setSubscribeNext('loaded');
            break;
          case 'url' :
            if (this.loadedUrl !== this.url) {
              this.loadedUrl = this.url;
              let urlType : string = 'audio';
              let audioUrl : string = null;
              switch(this.urlType.toLowerCase()) {
                case 'audio' :
                case 'video' :
                  urlType = this.urlType.toLowerCase();
                  break;
                case 'auto' :
                default :
                  if (typeof this.url === 'string') {
                    const fileName = this.url.toLowerCase();
                    if(fileName.endsWith('.mp4') || 
                      fileName.endsWith('.m4v') || 
                      fileName.endsWith('.f4v') || 
                      fileName.endsWith('.mov') || 
                      fileName.endsWith('.mpg') || 
                      fileName.endsWith('.mpeg') || 
                      fileName.endsWith('.mpeg4') || 
                      fileName.endsWith('.wmv') || 
                      fileName.endsWith('.avi') || 
                      fileName.endsWith('.mkv') || 
                      fileName.endsWith('.ogv')) {
                      urlType = 'video';
                    } else {
                      urlType = 'audio';
                    }
                    audioUrl = this.url;
                  } else {
                    urlType = this.urlType;
                  }
                  break;
              }
              if (audioUrl !== null) {
                switch(urlType.toLowerCase()) {
                  case 'audio' :
                    this.loadAudio(ThreeUtil.getStoreUrl(audioUrl), (buffer: AudioBuffer) => {
                      this.audio.setBuffer(buffer);
                      this.addChanges('loaded');
                    });
                    break;
                  case 'video' :
                    if (this.video !== null) {
                      this.video = document.createElement('video');
                    }
                    this.audio.setMediaElementSource(this.video);
                    break;
                }
              } else {
                if (this.url instanceof AudioBuffer) {
                  this.audio.setBuffer(this.url);
                } else if (this.url instanceof MediaStream) {
                  this.audio.setMediaStreamSource(this.url);
                } else if (this.url instanceof AudioBufferSourceNode) {
                  this.audio.setNodeSource(this.url);
                } else if (this.url instanceof HTMLMediaElement) {
                  this.audio.setMediaElementSource(this.url);
                } else {
                  switch(urlType.toLowerCase()) {
                    case 'listener' : 
                      const oscillator = this.listener.context.createOscillator() as any;
                      oscillator.type = 'sine';
                      oscillator.frequency.setValueAtTime( 144, this.audio.context.currentTime ) ;
                      oscillator.start( 0 );
                      this.audio.setNodeSource( oscillator );
                      break;
                  }
                }
              }
            }
            break;
          case 'listener' :
            const listener = this.getListener();
            if (this.audio.listener !== listener) {
              this.audio.listener = listener;
            }
            break;
          case 'loop' :
            if (ThreeUtil.isNotNull(this.loop)) {
              this.audio.loop = this.loop;
            }
            break;
          case 'volume' :
            if (ThreeUtil.isNotNull(this.volume)) {
              this.audio.setVolume(this.volume);
            }
            break;
          case 'positionalaudio' :
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
            }
            break;
          case 'play' :
            if (ThreeUtil.isNotNull(this.play) && this.audio.buffer !== null) {
              if (this.play) {
                if (!this.audio.isPlaying) {
                  this.audio.play();  
                }
              } else {
                if (this.audio.isPlaying) {
                  this.audio.pause();  
                }
              }
            }
            break;
          case 'autoplay' :
            if (ThreeUtil.isNotNull(this.autoplay)) {
              this.audio.autoplay = this.autoplay;
            }
            break;
        }
      });
      super.applyChanges3d(changes);
    }
  }
  
  getObject3d<T extends THREE.Object3D>(): T {
    return this.getAudio() as any;
  }

  getAudio<T extends THREE.Audio>():T {
    if (this.audio === null || this._needUpdate) {
      this.needUpdate = false;
      this.loadedVideoTexture = null;
      this.video = null;
      switch (this.type.toLowerCase()) {
        case 'audio':
          this.audio = new THREE.Audio(this.getListener());
          break;
        case 'position':
        default:
          this.audio = new THREE.PositionalAudio(this.getListener());
          break;
      }
      this.setObject3d(this.audio);
    }
    return this.audio as T;
  }
}
