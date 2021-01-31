import { Component, OnInit, Input } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'three-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
})
export class AudioComponent implements OnInit {
  @Input() type: string = 'position';
  @Input() url: string = null;
  @Input() refDistance: number = 1;
  @Input() rolloffFactor: number = 1;
  @Input() distanceModel: string = "";
  @Input() maxDistance: number = 1;
  @Input() coneInnerAngle: number = 1;
  @Input() coneOuterAngle: number = 1;
  @Input() coneOuterGain: number = 1;

  constructor() {}

  ngOnInit(): void {}

  private audio: THREE.Audio<any> = null;
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
      if (this.audio.buffer === null && this.url !== null) {
        this.loadAudio(this.url, (buffer: AudioBuffer) => {
            this.audio.setBuffer(buffer);
            if (this.audio instanceof THREE.PositionalAudio) {
              this.audio.setRefDistance(this.refDistance);
              this.audio.setRolloffFactor(this.rolloffFactor);
              this.audio.setDistanceModel(this.distanceModel);
              this.audio.setMaxDistance(this.maxDistance);
              this.audio.setDirectionalCone(
                this.coneInnerAngle,
                this.coneOuterAngle,
                this.coneOuterGain
              );
            }
            this.audio.play();
        });
      }
    }
  }

  getAnalyser() : THREE.AudioAnalyser {
    if (this.analyser == null && this.audio !== null) {
      this.analyser = new THREE.AudioAnalyser(this.audio);
    }
    return this.analyser;
  }

  getAudio():THREE.Audio {
    if (this.audio === null && this.listener !== null) {
      switch (this.type.toLowerCase()) {
        case 'audio':
          this.audio = new THREE.Audio(this.listener);
          break;
        case 'position':
        default:
          this.audio = new THREE.PositionalAudio(this.listener);
          break;
      }
    }
    return this.audio;
  }
}
