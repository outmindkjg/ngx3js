import { Component, ContentChildren, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { KeyframeComponent } from '../keyframe/keyframe.component';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { ThreeUtil } from './../interface';

@Component({
  selector: 'ngx3js-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.scss'],
})
export class ClipComponent extends AbstractSubscribeComponent implements OnInit {

  /**
   * 
   */
  @Input() public name: string = '';

  /**
   * 
   */
  @Input() private index: number = -1;

  /**
   * 
   */
  @Input() private blendMode: string = '';

  /**
   * 
   */
  @Input() private additive: boolean = false;

  /**
   * 
   */
  @Input() private subclip: boolean = false;

  /**
   * 
   */
  @Input() private startFrame: number = 2;

  /**
   * 
   */
  @Input() private endFrame: number = 3;

  /**
   * 
   */
  @Input() private fps: number = null;

  /**
   * 
   */
  @Input() private weight: number = 1;

  /**
   * 
   */
  @Input() private timeScale: number = 1;

  /**
   * 
   */
  @Input() private duration: number = 3;

  /**
   * 
   */
  @Input() private clampWhenFinished: boolean = false;

  /**
   * 
   */
  @Input() private loop: string = null;

  /**
   * 
   */
  @ContentChildren(KeyframeComponent, { descendants: false }) private keyframeList: QueryList<KeyframeComponent>;

  private getBlendMode(def?: string): THREE.AnimationBlendMode {
    const blendMode = ThreeUtil.getTypeSafe(this.blendMode, def, '');
    switch (blendMode.toLowerCase()) {
      case 'normal':
        return THREE.NormalAnimationBlendMode;
      case 'additive':
        return THREE.AdditiveAnimationBlendMode;
    }
    return THREE.NormalAnimationBlendMode;
  }

  private getFps(def?: number): number {
    return ThreeUtil.getTypeSafe(this.fps, def);
  }

  private getClampWhenFinished(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.clampWhenFinished, def);
  }

  private getLoop(def?: string): THREE.AnimationActionLoopStyles {
    const loop = ThreeUtil.getTypeSafe(this.loop, def, '');
    switch (loop.toLowerCase()) {
      case 'once':
        return THREE.LoopOnce;
      case 'pingpong':
        return THREE.LoopPingPong;
      case 'repeat':
      default:
        return THREE.LoopRepeat;
    }
  }

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit('clip');
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.clip) {
      this.addChanges(changes);
    }
  }

  ngAfterContentInit(): void {
    this.subscribeListQueryChange(this.keyframeList, 'keyframeList', 'keyframe');
    super.ngAfterContentInit();
  }

  private mixer: THREE.AnimationMixer = null;
  private clips: THREE.AnimationClip[] = null;
  private clip: THREE.AnimationClip = null;
  public action: THREE.AnimationAction = null;

  setMixer(mixer: THREE.AnimationMixer, clips: THREE.AnimationClip[], fps?: number) {
    if (this.mixer !== mixer) {
      this.mixer = mixer;
      this.clips = clips || null;
      this.clip = null;
      this.action = null;
      this.getClip();
    }
    if (fps !== null && fps !== undefined) {
      this.setFps(fps);
    }
  }

  setFps(fps: number) {
    if (this.action !== null && this.clip !== null) {
      this.action.timeScale = (this.clip.tracks.length * this.getFps(fps)) / this.clip.duration;
    }
  }

  resetAnimation() {
    this.getClip();
  }

  play() {
    if (this.action !== null && !this.additive) {
      this.action.play();
    }
  }

  crossFadeTo(endAction?: ClipComponent, duration?: number) {
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

  fadeIn(duration?: number) {
    if (this.isPlayable()) {
      this.resetAction();
      this.action.fadeIn(duration).play();
    }
  }

  fadeOut(duration?: number) {
    if (this.isPlayable()) {
      this.action.fadeOut(duration).play();
    }
  }

  isPlayable() {
    return this.clip !== null && this.action !== null && !this.additive;
  }

  stop() {
    if (this.action !== null) {
      this.action.stop();
    }
  }

  applyChanges(changes: string[]) {
    if (this.clip !== null) {
      if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
        this.getClip();
        return;
      }
      if (!ThreeUtil.isOnlyIndexOf(changes, ['init'], this.OBJECT_ATTR)) {
        this.needUpdate = true;
        return;
      }
      if (ThreeUtil.isIndexOf(changes, 'init')) {
        changes = ThreeUtil.pushUniq(changes, []);
      }
      super.applyChanges(changes);
    }
  }

  getClip() {
    if (this.clip === null  || this._needUpdate) {
      this.needUpdate = false;
      let clip : THREE.AnimationClip = null;
      if (this.clips !== null) {
        clip = this.index > -1 ? this.clips[this.index] : THREE.AnimationClip.findByName(this.clips, this.name)
      } else {
        clip = new THREE.AnimationClip(ThreeUtil.getTypeSafe(this.name , 'default'), this.duration, [], this.getBlendMode());
      }
      if (clip !== null) {
        if (this.action !== null) {
          this.action.stop();
        }
        if (this.additive) {
          THREE.AnimationUtils.makeClipAdditive(clip);
          if (this.subclip) {
            const subClip = THREE.AnimationUtils.subclip(clip, clip.name, this.startFrame, this.endFrame, this.getFps());
            this.action = this.mixer.clipAction(subClip, null, this.getBlendMode());
            this.clip = subClip;
          } else {
            this.action = this.mixer.clipAction(clip, null, this.getBlendMode());
            this.clip = clip;
          }
          this.action.enabled = true;
          this.action.setEffectiveTimeScale(this.timeScale);
          this.action.setEffectiveWeight(this.weight);
          this.action.play();
        } else {
          this.clip = clip;
          if (ThreeUtil.isNotNull(this.keyframeList)) {
            this.keyframeList.forEach((keyframe) => {
              keyframe.setClip(this.clip);
            });
          }
          this.action = this.mixer.clipAction(clip, null, this.getBlendMode());
        }
        if (this.getClampWhenFinished(false)) {
          this.action.clampWhenFinished = true;
        }
        this.action.loop = this.getLoop('repeat');
      } else {
        this.action = null;
      }
      this.setObject(this.clip);
    }
    return this.clip;
  }
}
