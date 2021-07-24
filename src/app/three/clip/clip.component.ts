import { Component, ContentChildren, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { KeyframeComponent } from '../keyframe/keyframe.component';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { ThreeUtil } from './../interface';

/**
 * ClipComponent
 */
@Component({
  selector: 'ngx3js-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.scss'],
})
export class ClipComponent extends AbstractSubscribeComponent implements OnInit {
  /**
   * The name of the object (doesn't need to be unique). Default is an empty string.
   */
  @Input() public name: string = '';

  /**
   * Input  of clip component
   */
  @Input() private index: number = -1;

  /**
   * Input  of clip component
   *
   * Notice - case insensitive.
   * 
   */
  @Input() private blendMode: string = '';

  /**
   * Input  of clip component
   */
  @Input() private additive: boolean = false;

  /**
   * Input  of clip component
   */
  @Input() private subclip: boolean = false;

  /**
   * Input  of clip component
   */
  @Input() private startFrame: number = 2;

  /**
   * Input  of clip component
   */
  @Input() private endFrame: number = 3;

  /**
   * Input  of clip component
   */
  @Input() private fps: number = null;

  /**
   * Input  of clip component
   */
  @Input() private weight: number = 1;

  /**
   * Input  of clip component
   */
  @Input() private timeScale: number = 1;

  /**
   * Input  of clip component
   */
  @Input() private duration: number = 3;

  /**
   * Input  of clip component
   */
  @Input() private clampWhenFinished: boolean = false;

  /**
   * Input  of clip component
   *
   * Notice - case insensitive.
   * 
   */
  @Input() private loop: string = null;

  /**
   * Content children of clip component
   */
  @ContentChildren(KeyframeComponent, { descendants: false }) private keyframeList: QueryList<KeyframeComponent>;

  /**
   * Gets blend mode
   * @param [def]
   * @returns blend mode
   */
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

  /**
   * Gets fps
   * @param [def]
   * @returns fps
   */
  private getFps(def?: number): number {
    return ThreeUtil.getTypeSafe(this.fps, def);
  }

  /**
   * Gets clamp when finished
   * @param [def]
   * @returns true if clamp when finished
   */
  private getClampWhenFinished(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.clampWhenFinished, def);
  }

  /**
   * Gets loop
   * @param [def]
   * @returns loop
   */
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

  /**
   * Creates an instance of clip component.
   */
  constructor() {
    super();
  }

  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked the directive's
   * data-bound properties for the first time,
   * and before any of the view or content children have been checked.
   * It is invoked only once when the directive is instantiated.
   */
  ngOnInit(): void {
    super.ngOnInit('clip');
  }

  /**
   * A callback method that performs custom clean-up, invoked immediately
   * before a directive, pipe, or service instance is destroyed.
   */
  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked data-bound properties
   * if at least one has changed, and before the view and content
   * children are checked.
   *
   * @param changes The changed properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.clip) {
      this.addChanges(changes);
    }
  }

  /**
   * A callback method that is invoked immediately after
   * Angular has completed initialization of all of the directive's
   * content.
   * It is invoked only once when the directive is instantiated.
   */
  ngAfterContentInit(): void {
    this.subscribeListQueryChange(this.keyframeList, 'keyframeList', 'keyframe');
    super.ngAfterContentInit();
  }

  /**
   * Mixer  of clip component
   */
  private mixer: THREE.AnimationMixer = null;

  /**
   * Clips  of clip component
   */
  private clips: THREE.AnimationClip[] = null;

  /**
   * Clip  of clip component
   */
  private clip: THREE.AnimationClip = null;

  /**
   * Action  of clip component
   */
  public action: THREE.AnimationAction = null;

  /**
   * Sets mixer
   * @param mixer
   * @param clips
   * @param [fps]
   */
  public setMixer(mixer: THREE.AnimationMixer, clips: THREE.AnimationClip[], fps?: number) {
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

  /**
   * Sets fps
   * @param fps
   */
  public setFps(fps: number) {
    if (this.action !== null && this.clip !== null) {
      this.action.timeScale = (this.clip.tracks.length * this.getFps(fps)) / this.clip.duration;
    }
  }

  /**
   * Resets animation
   */
  public resetAnimation() {
    this.getClip();
  }

  /**
   * Plays clip component
   */
  public play() {
    if (this.action !== null && !this.additive) {
      this.action.play();
    }
  }

  /**
   * Cross fade to
   * @param [endAction]
   * @param [duration]
   */
  public crossFadeTo(endAction?: ClipComponent, duration?: number) {
    if (this.isPlayable()) {
      if (endAction !== null && endAction !== undefined && endAction.action !== null) {
        endAction.resetAction();
        this.action.crossFadeTo(endAction.action, duration, false).play();
      } else {
        this.fadeIn(duration);
      }
    }
  }

  /**
   * Resets action
   */
  public resetAction() {
    if (this.action !== null) {
      this.action.time = 0;
      this.action.enabled = true;
      // this.action.setEffectiveTimeScale( this.timeScale );
      // this.action.setEffectiveWeight( this.weight );
    }
  }

  /**
   * Fades in
   * @param [duration]
   */
  public fadeIn(duration?: number) {
    if (this.isPlayable()) {
      this.resetAction();
      this.action.fadeIn(duration).play();
    }
  }

  /**
   * Fades out
   * @param [duration]
   */
  public fadeOut(duration?: number) {
    if (this.isPlayable()) {
      this.action.fadeOut(duration).play();
    }
  }

  /**
   * Determines whether playable is
   * @returns
   */
  public isPlayable() {
    return this.clip !== null && this.action !== null && !this.additive;
  }

  /**
   * Stops clip component
   */
  public stop() {
    if (this.action !== null) {
      this.action.stop();
    }
  }

  /**
   * Applys changes
   * @param changes
   * @returns
   */
  public applyChanges(changes: string[]) {
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

  /**
   * Gets clip
   * @returns
   */
  public getClip() {
    if (this.clip === null || this._needUpdate) {
      this.needUpdate = false;
      let clip: THREE.AnimationClip = null;
      if (this.clips !== null) {
        clip = this.index > -1 ? this.clips[this.index] : THREE.AnimationClip.findByName(this.clips, this.name);
      } else {
        clip = new THREE.AnimationClip(ThreeUtil.getTypeSafe(this.name, 'default'), this.duration, [], this.getBlendMode());
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
