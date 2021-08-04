import { Component, ContentChildren, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { ClipComponent } from './../clip/clip.component';
import { RendererTimer, ThreeUtil } from './../interface';
import { PhysicsComponent } from './../physics/physics.component';

/**
 * MixerComponent
 */
@Component({
	selector: 'ngx3js-mixer',
	templateUrl: './mixer.component.html',
	styleUrls: ['./mixer.component.scss'],
})
export class MixerComponent extends AbstractSubscribeComponent implements OnInit {
	/**
	 * Input  of mixer component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public type: string = 'mixer';

	/**
	 * Input  of mixer component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() private action: string = '';

	/**
	 * Input  of mixer component
	 */
	@Input() private fps: number = null;

	/**
	 * Input  of mixer component
	 */
	@Input() private duration: number = 0.5;

	/**
	 * Input  of mixer component
	 */
	/**
	 * Input  of mixer component
	 */
	@Input() private timeScale: number = 1;

	/**
	 * Input  of mixer component
	 */
	@Input() private sync: boolean = null;

	/**
	 * Input  of mixer component
	 */
	@Input() private afterglow: number = null;

	/**
	 * Input  of mixer component
	 */
	@Input() private resetPhysicsOnLoop: boolean = null;

	/**
	 * Input  of mixer component
	 */
	@Input() private physics: boolean = null;

	/**
	 * Input  of mixer component
	 */
	@Input() private warmup: number = null;

	/**
	 * Input  of mixer component
	 */
	@Input() private unitStep: number = null;

	/**
	 * Input  of mixer component
	 */
	@Input() private maxStepNum: number = null;

	/**
	 * Input  of mixer component
	 */
	@Input() private gravity: number = null;

	/**
	 * Input  of mixer component
	 */
	@Input() private delayTime: number = null;

	/**
	 * Input  of mixer component
	 */
	@Input() private animationHelper: MixerComponent = null;

	/**
	 * Input  of mixer component
	 */
	@Input() private skin: number = null;

	/**
	 * Input  of mixer component
	 */
	@Input() private weapon: number = null;

	/**
	 * Input  of mixer component
	 */
	@Input() private controls: any = null;

	/**
	 * Input  of mixer component
	 */
	@Input() private mmdHelpers: string[] = null;

	/**
	 * Content children of mixer component
	 */
	@ContentChildren(ClipComponent, { descendants: false }) private clipList: QueryList<ClipComponent>;

	/**
	 * Gets fps
	 * @param [def]
	 * @returns fps
	 */
	private getFps(def?: number): number {
		return ThreeUtil.getTypeSafe(this.fps, def);
	}

	/**
	 * Gets time scale
	 * @param [def]
	 * @returns time scale
	 */
	private getTimeScale(def?: number): number {
		return ThreeUtil.getTypeSafe(this.timeScale, def);
	}

	/**
	 * Gets sync
	 * @param [def]
	 * @returns true if sync
	 */
	private getSync(def?: boolean): boolean {
		return ThreeUtil.getTypeSafe(this.sync, def);
	}

	/**
	 * Gets afterglow
	 * @param [def]
	 * @returns afterglow
	 */
	private getAfterglow(def?: number): number {
		return ThreeUtil.getTypeSafe(this.afterglow, def);
	}

	/**
	 * Gets reset physics on loop
	 * @param [def]
	 * @returns true if reset physics on loop
	 */
	private getResetPhysicsOnLoop(def?: boolean): boolean {
		return ThreeUtil.getTypeSafe(this.resetPhysicsOnLoop, def);
	}

	/**
	 * Gets physics
	 * @param [def]
	 * @returns true if physics
	 */
	private getPhysics(def?: boolean): boolean {
		return ThreeUtil.getTypeSafe(this.physics, def);
	}

	/**
	 * Gets warmup
	 * @param [def]
	 * @returns warmup
	 */
	private getWarmup(def?: number): number {
		return ThreeUtil.getTypeSafe(this.warmup, def);
	}

	/**
	 * Gets unit step
	 * @param [def]
	 * @returns unit step
	 */
	private getUnitStep(def?: number): number {
		return ThreeUtil.getTypeSafe(this.unitStep, def);
	}

	/**
	 * Gets max step num
	 * @param [def]
	 * @returns max step num
	 */
	private getMaxStepNum(def?: number): number {
		return ThreeUtil.getTypeSafe(this.maxStepNum, def);
	}

	/**
	 * Gets gravity
	 * @param [def]
	 * @returns gravity
	 */
	private getGravity(def?: number): number {
		return ThreeUtil.getTypeSafe(this.gravity, def);
	}

	/**
	 * Gets delay time
	 * @param [def]
	 * @returns delay time
	 */
	private getDelayTime(def?: number): number {
		return ThreeUtil.getTypeSafe(this.delayTime, def);
	}

	/**
	 * Creates an instance of mixer component.
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
		super.ngOnInit('mixer');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately
	 * before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		if (this.mixer !== null) {
			this.mixer.stopAllAction();
		}
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
		if (changes && this.clips !== null) {
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
		super.ngAfterContentInit();
	}

	/**
	 * Mixer  of mixer component
	 */
	private mixer: THREE.AnimationMixer = null;

	/**
	 * Helper  of mixer component
	 */
	private helper: MMDAnimationHelper = null;

	/**
	 * Model  of mixer component
	 */
	private model: THREE.Object3D | THREE.AnimationObjectGroup = null;

	/**
	 * Clips  of mixer component
	 */
	private clips: THREE.AnimationClip[] | any = null;

	/**
	 * Sets parent
	 * @param parent
	 * @returns true if parent
	 */
	public setParent(parent: THREE.Object3D | THREE.AnimationObjectGroup): boolean {
		if (super.setParent(parent)) {
			this.unSubscribeRefer('mixerReset');
			this.subscribeRefer(
				'mixerReset',
				ThreeUtil.getSubscribe(
					this.parent,
					() => {
						this.checkModel(parent);
					},
					'loaded'
				)
			);
			this.checkModel(parent);
			return true;
		}
		return false;
	}

	/**
	 * Gets target
	 * @param [target]
	 * @returns target
	 */
	private getTarget(target?: THREE.Object3D | THREE.AnimationObjectGroup): THREE.Object3D | THREE.AnimationObjectGroup {
		let targetMesh: THREE.Object3D | THREE.AnimationObjectGroup = null;
		if (ThreeUtil.isNotNull(target)) {
			if (target instanceof THREE.AnimationObjectGroup || target instanceof THREE.Object3D) {
				targetMesh = target;
			} else {
				targetMesh = ThreeUtil.getObject3d(target, false);
			}
		}
		if (ThreeUtil.isNotNull(targetMesh) && targetMesh instanceof THREE.Object3D && ThreeUtil.isNotNull(targetMesh.userData.refTarget)) {
			targetMesh = ThreeUtil.getObject3d(targetMesh.userData.refTarget, false) || targetMesh;
		}
		return targetMesh;
	}

	/**
	 * Checks model
	 * @param parent
	 */
	public checkModel(parent: THREE.Object3D | THREE.AnimationObjectGroup) {
		const model = this.getTarget(parent);
		if (ThreeUtil.isNotNull(model)) {
			if (model instanceof THREE.Object3D) {
				const clips = parent instanceof THREE.Object3D ? parent.userData.clips : null;
				if (ThreeUtil.isNotNull(clips)) {
					this.setModel(model, clips);
				} else {
					this.setModel(model, null);
				}
			} else {
				this.setModel(model, null);
			}
		}
	}

	/**
	 * Sets model
	 * @param model
	 * @param clips
	 */
	private setModel(model: THREE.Object3D | THREE.AnimationObjectGroup, clips: THREE.AnimationClip[] | any) {
		if (this.model !== model) {
			this.model = model;
			this.clips = clips;
			this.helper = null;
			this.mixer = null;
			if (this.debug && this.clips) {
				const clipsNames = [];
				if (this.clips.forEach) {
					this.clips.forEach((clip) => {
						clipsNames.push(clip.name);
					});
				} else if (this.clips.meshBody && this.clips.meshBody.geometry && this.clips.meshBody.geometry.animations) {
					this.clips.meshBody.geometry.animations.forEach((clip) => {
						clipsNames.push(clip.name);
					});
				}
				this.consoleLog('clips', clipsNames, 'info');
			}
      this.needUpdate = true;
		}
	}

	/**
	 * Last action of mixer component
	 */
	private lastAction: string = null;

	/**
	 * Physics  of mixer component
	 */
	private _physics: PhysicsComponent = null;

	/**
	 * Ammo  of mixer component
	 */
	private _ammo: any = null;

	/**
	 * Sets physics
	 * @param physics
	 */
	public setPhysics(physics: PhysicsComponent) {
		this._physics = physics;
		if (this._physics !== null && this._physics !== undefined) {
			const _physics = this._physics.getPhysics();
			if (_physics !== null) {
				this._ammo = this._physics.getAmmo();
				this.synkAnimationHelper(this.helper);
			} else {
				this.unSubscribeRefer('physics');
				this.subscribeRefer(
					'physics',
					ThreeUtil.getSubscribe(
						this._physics,
						() => {
							this._ammo = this._physics.getAmmo();
							this.synkAnimationHelper(this.helper);
						},
						'physics'
					)
				);
			}
		}
	}

	/**
	 * Fades to action
	 * @param endAction
	 * @param [duration]
	 * @param [restoreAction]
	 * @param [restoreDuration]
	 */
	public fadeToAction(endAction: string, duration?: number, restoreAction?: string, restoreDuration?: number) {
		if (this.mixer !== null) {
			if (this.play(endAction, duration)) {
				if (ThreeUtil.isNotNull(restoreAction)) {
					const listener = () => {
						this.mixer.removeEventListener('finished', listener);
						this.play(restoreAction, restoreDuration);
					};
					this.mixer.addEventListener('finished', listener);
				}
			}
		}
	}

	/**
	 * Determines whether added is
	 */
	private isAdded: boolean = false;

	/**
	 * Mmd animation helpers of mixer component
	 */
	private mmdAnimationHelpers: THREE.Object3D[] = [];

	/**
	 * Gets mmd animation helper
	 * @returns mmd animation helper
	 */
	public getMmdAnimationHelper(): MMDAnimationHelper {
		return this.helper;
	}

	/**
	 * Gets mmd animation helper object3 d
	 * @returns mmd animation helper object3 d
	 */
	public getMmdAnimationHelperObject3D(): THREE.Object3D[] {
		return this.mmdAnimationHelpers;
	}

	/**
	 * Synks animation helper
	 * @param helper
	 */
	public synkAnimationHelper(helper: MMDAnimationHelper) {
		if (helper !== null && !this.isAdded) {
			if (this.model instanceof THREE.SkinnedMesh || this.model instanceof THREE.Camera) {
				if (ThreeUtil.isNotNull(this.clips) && Array.isArray(this.clips) && (this._ammo || this.getPhysics(false) == false)) {
					const skinnedMesh = this.model;
					const oldParent = skinnedMesh.parent;
					if (ThreeUtil.isNotNull(oldParent)) {
						skinnedMesh.parent.remove(skinnedMesh);
						skinnedMesh.parent = null;
					}
					this.clips.forEach((clip) => {
						helper.add(skinnedMesh, {
							animation: clip,
							physics: this.getPhysics(),
							// warmup: this.getWarmup(),
							// unitStep: this.getUnitStep(),
							// maxStepNum: this.getMaxStepNum(),
							// gravity: this.getGravity(),
							// gravity: -1000,
							// gravity : new THREE.Vector3(0,0,-90),
							// delayTime: this.getDelayTime()
						});
					});
					if (ThreeUtil.isNotNull(oldParent)) {
						oldParent.add(skinnedMesh);
					}
					this.mmdAnimationHelpers.forEach((mmdHelper) => {
						if (mmdHelper.parent) {
							mmdHelper.parent.remove(mmdHelper);
						}
					});
					this.mmdAnimationHelpers = [];
					if (ThreeUtil.isNotNull(this.mmdHelpers)) {
						let rootObject3d: THREE.Object3D = skinnedMesh;
						while (rootObject3d.parent) {
							rootObject3d = rootObject3d.parent;
						}
						let objectsHelper: any = helper['objects'].get(skinnedMesh);
						this.mmdHelpers.forEach((mmdHelper) => {
							switch (mmdHelper.toLowerCase()) {
								case 'iksolver':
									if (objectsHelper.ikSolver) {
										this.mmdAnimationHelpers.push(objectsHelper.ikSolver.createHelper());
									}
									break;
								case 'physics':
									if (objectsHelper.physics) {
										this.mmdAnimationHelpers.push(objectsHelper.physics.createHelper());
									}
									break;
							}
						});
						this.mmdAnimationHelpers.forEach((mmdAnimationHelper) => {
							rootObject3d.add(mmdAnimationHelper);
						});
					}
					super.callOnLoad();
					this.isAdded = true;
				}
			} else if (this.model instanceof THREE.Audio) {
				const audioMode = this.model;
				if (audioMode.buffer !== null) {
					helper.add(audioMode, {
						delayTime: this.getDelayTime(),
					});
				} else {
					this.subscribeRefer(
						'audioLoad',
						ThreeUtil.getSubscribe(
							audioMode,
							() => {
								helper.add(audioMode, {
									delayTime: this.getDelayTime(),
								});
							},
							'loaded'
						)
					);
				}
			}
		}
	}

	/**
	 * Applys changes
	 * @param changes
	 */
	public applyChanges(changes: string[]) {
		if (this.clips !== null) {
			if (ThreeUtil.isIndexOf(changes, 'init')) {
				changes = ThreeUtil.pushUniq(changes, ['action', 'timescale', 'fps', 'controls', 'weapon', 'skin', 'pos']);
			}
      changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'action':
            if (this.lastAction !== this.action) {
              if (this.delayTime > 0) {
                window.setTimeout(() => {
                  this.play(this.action);
                }, this.delayTime);
              } else {
                this.play(this.action);
              }
            }
						break;
					case 'timescale':
						if (this.mixer !== null) {
							this.mixer.timeScale = this.getTimeScale(1);
						}
						break;
					case 'fps':
						if (this.mixer !== null) {
							const fps = this.getFps(20);
							this.clipList.forEach((clip) => {
								clip.setMixer(this.mixer, this.clips, fps);
							});
						}
						break;
					case 'weapon':
						if (this.clips !== null && this.clips.setWeapon) {
							this.clips.setWeapon(this.weapon);
						}
						break;
					case 'skin':
						if (this.clips.setSkin) {
							this.clips.setSkin(this.skin);
						}
						break;
					case 'controls':
						if (ThreeUtil.isNotNull(this.controls) && this.clips.controls !== undefined) {
							this.clips.controls = this.controls;
						}
						break;
					case 'pose':
						if (this.helper !== null && this.model instanceof THREE.SkinnedMesh) {
							this.helper.pose(this.model, null);
						}
						break;
				}
			});
			super.applyChanges(changes);
		}
	}

	/**
	 * Gets object3d
	 * @template T
	 * @returns object3d
	 */
  public getObject<T>(): T {
		return this.getMixer() as any;
	}

	/**
	 * Resets mixer
	 */
	public getMixer() : any {
		if (this._needUpdate) {
			this.needUpdate = false;
			this.lastAction = null;
			this.lastPlayedClip = null;
			switch (this.type.toLowerCase()) {
				case 'mmd':
				case 'mmdanimation':
				case 'mmdanimationhelper':
					if (this.helper === null) {
						if (this.animationHelper === null) {
							this.helper = new MMDAnimationHelper({
								sync: this.getSync(),
								afterglow: this.getAfterglow(),
								resetPhysicsOnLoop: this.getResetPhysicsOnLoop(),
							});
							if (ThreeUtil.isNotNull(this.clips)) {
								this.synkAnimationHelper(this.helper);
								this.setSubscribeNext('animation');
							} else {
								this.subscribeRefer(
									'mmdLoad',
									ThreeUtil.getSubscribe(
										this.model,
										() => {
											this.synkAnimationHelper(this.helper);
											this.setSubscribeNext('animation');
										},
										'loaded'
									)
								);
							}
						} else {
							this.unSubscribeRefer('animation');
							this.subscribeRefer(
								'animation',
								ThreeUtil.getSubscribe(
									this.animationHelper,
									() => {
										this.synkAnimationHelper(this.animationHelper.helper);
									},
									'animation'
								)
							);
							if (this.animationHelper.helper !== null) {
								this.synkAnimationHelper(this.animationHelper.helper);
							}
						}
            this.setObject(this.helper);
					}
					break;
				case 'mixer':
					if (this.mixer === null) {
						this.mixer = new THREE.AnimationMixer(this.model);
						this.mixer.timeScale = this.getTimeScale(1);
						const fps = this.getFps();
						this.clipList.forEach((clip) => {
							clip.setMixer(this.mixer, this.clips, fps);
						});
            this.setObject(this.mixer);
					}
					break;
				case 'virtulous':
				default:
          this.setObject({ clips : this.clips });
          this.applyChanges(['init']);
					break;
			}
		}
    return this.clips;
	}

	/**
	 * Last played clip of mixer component
	 */
	private lastPlayedClip: ClipComponent = null;

	/**
	 * Plays mixer component
	 * @param name
	 * @param [duration]
	 * @returns true if play
	 */
	public play(name: string, duration: number = this.duration): boolean {
		if (ThreeUtil.isNotNull(name) && name !== '' && this.mixer !== null && ThreeUtil.isNotNull(this.clipList) && this.clipList.length > 0) {
			duration = ThreeUtil.getTypeSafe(duration, this.duration);
			let foundAction: ClipComponent = null;
			this.clipList.forEach((clip) => {
				if (clip.isPlayable()) {
					clip.action.paused = false;
					if (clip.name.toLowerCase() === name.toLowerCase()) {
						foundAction = clip;
					}
				}
			});
			if (this.lastPlayedClip !== null) {
				if (foundAction !== null) {
					this.lastPlayedClip.crossFadeTo(foundAction, duration);
				} else {
					this.lastPlayedClip.fadeOut(duration);
				}
			} else if (foundAction !== null) {
				foundAction.fadeIn(duration);
			}
			if (foundAction !== null) {
				this.lastAction = name.toLowerCase();
				this.lastPlayedClip = foundAction;
			}
			return true;
		} else if (this.clips && this.clips.setAnimation) {
			this.clips.setAnimation(name);
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Updates mixer component
	 * @param timer
	 */
	public update(timer: RendererTimer) {
		if (this.helper !== null) {
			this.helper.update(timer.delta);
		} else if (this.mixer !== null) {
			this.mixer.update(timer.delta);
		} else if (this.clips !== null) {
			if (this.clips.setTime) {
				this.clips.setTime(timer.elapsedTime * this.timeScale);
			} else if (this.clips.update) {
				try {
					this.clips.update(timer.delta * this.timeScale);
				} catch (ex) {}
			}
		}
	}
}
