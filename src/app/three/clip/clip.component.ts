import { ThreeUtil } from './../interface';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'three-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.scss']
})
export class ClipComponent implements OnInit {

  @Input() name : string = "";
  @Input() blendMode : string = "";
  @Input() additive : boolean = false;
  @Input() subclip : boolean = false;
  @Input() startFrame: number = 2;
  @Input() endFrame: number = 3;
  @Input() fps: number = null;
  @Input() weight: number = 1;
  @Input() timeScale: number = 1;

  private getFps(def?: number) : number {
    return ThreeUtil.getTypeSafe(this.fps, def);
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.resetAnimation();
    }
  }

  private getBlendMode(def? : string) : THREE.AnimationBlendMode {
    const blendMode = ThreeUtil.getTypeSafe(this.blendMode, def, '');
    switch(blendMode.toLowerCase()) {
      case 'normal' :
        return THREE.NormalAnimationBlendMode;
      case 'additive' :
        return THREE.AdditiveAnimationBlendMode;
    }
    return undefined;
  }

  private mixer : THREE.AnimationMixer = null;
  private clips : THREE.AnimationClip[] = null;
  private clip : THREE.AnimationClip = null;
  public action : THREE.AnimationAction = null;
  setMixer(mixer : THREE.AnimationMixer , clips : THREE.AnimationClip[], fps? : number) {
    if (this.mixer !== mixer) {
      this.mixer = mixer;
      this.clips = clips;
      this.resetAnimation();
    }
    if (fps !== null && fps !== undefined) {
      this.setFps(fps);
    }
  }

  setFps(fps : number) {
    if (this.action !== null && this.clip !== null) {
      this.action.timeScale = ( this.clip.tracks.length * this.getFps(fps) ) / this.clip.duration;
      console.log(this.action.timeScale);
    }
  }

  resetAnimation() {
    if (this.clips !== null) {
      const clip = THREE.AnimationClip.findByName( this.clips, this.name );
      if (clip !== null) {
        if (this.action !== null) {
          this.action.stop();
        }
        if (this.additive) {
          THREE.AnimationUtils.makeClipAdditive( clip );
          if (this.subclip) {
            const subClip = THREE.AnimationUtils.subclip(
              clip,
              clip.name,
              this.startFrame,
              this.endFrame,
              this.getFps()
            )
            this.action = this.mixer.clipAction(
              subClip,
              null,
              this.getBlendMode()
            );
            this.clip = subClip;
          } else {
            this.action = this.mixer.clipAction( clip, null, this.getBlendMode());
            this.clip = clip;
          }
          this.action.enabled = true;
          this.action.setEffectiveTimeScale( this.timeScale );
          this.action.setEffectiveWeight( this.weight );
          this.action.play();
        } else {
          this.clip = clip;
          this.action = this.mixer.clipAction( clip, null, this.getBlendMode());
        }
      } else {
        this.action = null;
      }
    }
  }


  play() {
    if (this.action !== null && !this.additive) {
      this.action.play();
    }
  }

  crossFadeTo(endAction? : ClipComponent, duration? : number) {
    if (this.isPlayable()) {
      if (endAction !== null && endAction !== undefined && endAction.action !== null) {
        endAction.resetAction();
        this.action.crossFadeTo(endAction.action, duration, false).play();
      } else {
        this.fadeIn(duration);
      }
    }
  }

  resetAction() {
    if (this.action !== null) {
      this.action.time = 0;
      this.action.enabled = true;
      // this.action.setEffectiveTimeScale( this.timeScale );
      // this.action.setEffectiveWeight( this.weight );
    }
  }

  fadeIn(duration? : number) {
    if (this.isPlayable()) {
      this.resetAction();
      this.action.fadeIn( duration ).play();
    }
  }

  fadeOut(duration? : number) {
    if (this.isPlayable()) {
      this.action.fadeOut( duration ).play();
    }
  }

  isPlayable() {
    return this.action !== null && !this.additive;
  }

  stop() {
    if (this.action !== null) {
      this.action.stop();
    }
  }


}
