import { Component, ContentChildren, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { KeyframeComponent } from '../keyframe/keyframe.component';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { ThreeUtil } from './../interface';

/**
 * ClipComponent
 *
 * An AnimationClip is a reusable set of keyframe tracks which represent an animation.<br /><br />
 *
 * For an overview of the different elements of the three.js animation system see the
 * "Animation System" article in the "Next Steps" section of the manual.
 */
@Component({
	selector: 'ngx3js-clip',
	templateUrl: './clip.component.html',
	styleUrls: ['./clip.component.scss'],
})
export class ClipComponent extends AbstractSubscribeComponent implements OnInit {
	/**
	 * A name for this clip. A certain clip can be searched via [page:.findByName findByName].
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
	 * @see THREE.AnimationBlendMode
	 * @see THREE.NormalAnimationBlendMode - NormalAnimationBlendMode, NormalAnimation, Normal
	 * @see THREE.AdditiveAnimationBlendMode - AdditiveAnimationBlendMode, AdditiveAnimation, Additive
	 *
	 */
	@Input() private blendMode: string = '';

	/**
	 * makeClipAdditive
   * 
   * @see THREE.AnimationUtils.makeClipAdditive
   * 
	 */
	@Input() private additive: boolean = false;

	/**
   * subclip
   * 
	 * @see THREE.AnimationUtils.subclip
	 */
	@Input() private subclip: boolean = false;

	/**
	 * Creates a new clip, containing only the segment of the original clip between the given frames.
	 */
	@Input() private startFrame: number = 2;

	/**
	 * Creates a new clip, containing only the segment of the original clip between the given frames.
	 */
	@Input() private endFrame: number = 3;

	/**
	 * Creates a new clip, containing only the segment of the original clip between the given frames.
	 */
	@Input() private fps: number = null;

	/**
	 * The degree of influence of this action (in the interval [0, 1]). Values between 0 (no impact)
	 * and 1 (full impact) can be used to blend between several actions. Default is 1. <br /><br />
	 * Properties/methods concerning  *weight* are:
	 */
	@Input() private weight: number = 1;

	/**
	 * Scaling factor for the [page:.time time]. A value of 0 causes the animation to pause. Negative
	 * values cause the animation to play backwards. Default is 1.
	 */
	@Input() private timeScale: number = 1;

	/**
	 * The duration of this clip (in seconds). This can be calculated from the [page:.tracks tracks]
	 * array via [page:.resetDuration resetDuration].
	 */
	@Input() private duration: number = 3;

	/**
	 * If *clampWhenFinished* is set to true the animation will automatically be [page:.paused paused]
	 * on its last frame.<br /><br />
	 *
	 * If *clampWhenFinished* is set to false, [page:.enabled enabled] will automatically be switched
	 * to false when the last loop of the action has finished, so that this action has no further
	 * impact.<br /><br />
	 *
	 * Default is false.<br /><br />
	 *
	 * Note: *clampWhenFinished* has no impact if the action is interrupted (it has only an effect if
	 * its last loop has really finished).
	 */
	@Input() private clampWhenFinished: boolean = false;

	/**
	 * The looping mode (can be changed with [page:.setLoop setLoop]). Default is
	 * [page:Animation THREE.LoopRepeat] (with an infinite number of [page:.repetitions repetitions])<br /><br />
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.AnimationActionLoopStyles
	 * @see THREE.LoopOnce - LoopOnce, Once
	 * @see THREE.LoopRepeat - LoopRepeat, Repeat
	 * @see THREE.LoopPingPong - LoopPingPong, PingPong
	 */
	@Input() private loop: string = null;

	/**
	 * The keyframe list of KeyframeComponent
	 */
	@ContentChildren(KeyframeComponent, { descendants: false }) private keyframeList: QueryList<KeyframeComponent>;

	/**
	 * Gets blend mode
   *
   * Notice - case insensitive.
   * 
	 * @see THREE.AnimationBlendMode
	 * @see THREE.NormalAnimationBlendMode - NormalAnimationBlendMode, NormalAnimation, Normal
	 * @see THREE.AdditiveAnimationBlendMode - AdditiveAnimationBlendMode, AdditiveAnimation, Additive
	 *
	 * @param [def]
	 * @returns blend mode
	 */
	private getBlendMode(def?: string): THREE.AnimationBlendMode {
		const blendMode = ThreeUtil.getTypeSafe(this.blendMode, def, '');
		switch (blendMode.toLowerCase()) {
			case 'normalanimationblendmode':
			case 'normalanimation':
			case 'normal':
				return THREE.NormalAnimationBlendMode;
			case 'additiveanimationblendmode':
			case 'additiveanimation':
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
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.AnimationActionLoopStyles
	 * @see THREE.LoopOnce - LoopOnce, Once
	 * @see THREE.LoopRepeat - LoopRepeat, Repeat
	 * @see THREE.LoopPingPong - LoopPingPong, PingPong
   * 
	 * @param [def]
	 * @returns loop
	 */
	private getLoop(def?: string): THREE.AnimationActionLoopStyles {
		const loop = ThreeUtil.getTypeSafe(this.loop, def, '');
		switch (loop.toLowerCase()) {
			case 'looponce':
			case 'once':
				return THREE.LoopOnce;
			case 'looppingpong':
			case 'pingpong':
				return THREE.LoopPingPong;
			case 'looprepeat':
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
	public setMixer(mixer: THREE.AnimationMixer, clips: THREE.AnimationClip[]) {
		if (this.mixer !== mixer) {
			this.mixer = mixer;
			this.clips = clips || null;
			this.clip = null;
			this.action = null;
			this.getClip();
		}
	}

	/**
	 * Sets fps
	 * @param fps
	 */
	public setFps(fps: number) {
		if (this.action !== null && this.clip !== null) {
			const clipFps = this.getFps(fps);
			if (ThreeUtil.isNotNull(clipFps)) {
				this.action.timeScale = (this.clip.tracks.length * clipFps ) / this.clip.duration;
			}
		}
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
	 * Gets object
	 * @returns object
	 */
	public getObject<T>(): T {
		return this.getClip() as any;
	}

	/**
	 * Gets clip
	 * @returns
	 */
	public getClip(): THREE.AnimationClip {
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
