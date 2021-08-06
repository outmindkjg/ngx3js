import { Component, ContentChildren, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper';
import { MD2Character } from 'three/examples/jsm/misc/MD2Character';
import { MD2CharacterComplex } from 'three/examples/jsm/misc/MD2CharacterComplex';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { ClipComponent } from './../clip/clip.component';
import { RendererTimer, ThreeUtil } from './../interface';
import { PhysicsComponent } from './../physics/physics.component';

/**
 * Character Control
 */
export interface CharacterControl {
	crouch?: boolean;
	jump?: boolean;
	attack?: boolean;
	moveForward?: boolean;
	moveBackward?: boolean;
	moveLeft?: boolean;
	moveRight?: boolean;
}

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
	 * Sets the duration for a single loop of this action (by adjusting [page:.timeScale timeScale] 
	 * and stopping any scheduled warping). This method can be chained.
	 */
	@Input() private duration: number = 0.5;

	/**
	 * Scaling factor for the [page:.time time]. A value of 0 causes the animation to pause. Negative 
	 * values cause the animation to play backwards. Default is 1.<br /><br />
	 * Properties/methods concerning *timeScale* (respectively *time*)
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
	@Input() private skin: number | string = null;

	/**
	 * Input  of mixer component
	 */
	@Input() private weapon: number | string = null;

	/**
	 * Input  of mixer component
	 */
	@Input() private controls: CharacterControl = null;

	/**
	 * Input  of mixer component
	 */
	@Input() private wireframe: boolean = null;

	/**
	 * The rate of MD2Character
	 *
	 * @see {MD2Character#setPlaybackRate}
	 */
	@Input() private rate: number = null;

	/**
	 * The rate of MD2Character
	 *
	 * @see MD2Character
	 */
	@Input() private scale: number;

	/**
	 * The rate of MD2Character
	 *
	 * @see MD2Character
	 */
	@Input() private animationFPS: number;

	/**
	 * The rate of MD2Character
	 *
	 * @see MD2Character
	 */
	@Input() private transitionFrames: number;

	/**
	 * The rate of MD2Character
	 *
	 * @see MD2Character
	 */
	@Input() private maxSpeed: number;

	/**
	 * The rate of MD2Character
	 *
	 * @see MD2Character
	 */
	@Input() private maxReverseSpeed: number;

	/**
	 * The rate of MD2Character
	 *
	 * @see MD2Character
	 */
	@Input() private frontAcceleration: number;

	/**
	 * The rate of MD2Character
	 *
	 * @see MD2Character
	 */
	@Input() private backAcceleration: number;

	/**
	 * The rate of MD2Character
	 *
	 * @see MD2Character
	 */
	@Input() private frontDecceleration: number;

	/**
	 * The rate of MD2Character
	 *
	 * @see MD2Character
	 */
	@Input() private angularSpeed: number;

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
			if (this.mixer instanceof THREE.AnimationMixer) {
				this.mixer.stopAllAction();
			} else if (this.mixer instanceof MD2Character) {
				this.mixer.mixer.stopAllAction();
			}
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
		if (changes && this.mixer) {
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
	private mixer: THREE.AnimationMixer | MD2Character | MD2CharacterComplex | MMDAnimationHelper = null;

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
				this.setModel(model, clips);
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
		if (this.model !== model || this.clips !== clips) {
			this.model = model;
			this.clips = clips;
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
			this.lastAction = null;
			this.getMixer();
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
		if (this._physics !== null && this._physics !== undefined && this.mixer instanceof MMDAnimationHelper) {
			const _physics = this._physics.getPhysics();
			const helper = this.mixer;
			if (_physics !== null) {
				this._ammo = this._physics.getAmmo();
				this.synkAnimationHelper(helper);
			} else {
				this.unSubscribeRefer('physics');
				this.subscribeRefer(
					'physics',
					ThreeUtil.getSubscribe(
						this._physics,
						() => {
							this._ammo = this._physics.getAmmo();
							this.synkAnimationHelper(helper);
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
		if (this.mixer !== null && this.mixer instanceof THREE.AnimationMixer) {
			if (this.play(endAction, duration)) {
				const mixer = this.mixer;
				if (ThreeUtil.isNotNull(restoreAction)) {
					const listener = () => {
						mixer.removeEventListener('finished', listener);
						this.play(restoreAction, restoreDuration);
					};
					mixer.addEventListener('finished', listener);
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
		if (this.mixer instanceof MMDAnimationHelper) {
			return this.mixer;
		} else {
			return null;
		}
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
		if (this.mixer !== null) {
			if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getMixer();
				return;
			}
			if (ThreeUtil.isIndexOf(changes, 'init')) {
				changes = ThreeUtil.pushUniq(changes, ['timescale', 'fps', 'clip','action', 'weapon', 'skin', 'pos', 'wireframe', 'rate', 'scale', 'animationfps', 'transitionframes', 'maxspeed', 'maxreversespeed', 'frontacceleration', 'backacceleration', 'frontdecceleration', 'angularspeed']);
			}
			if (this.mixer instanceof THREE.AnimationMixer) {
				const mixer = this.mixer;
				changes.forEach((change) => {
					switch (change.toLowerCase()) {
						case 'action':
							if (this.delayTime > 0) {
								window.setTimeout(() => {
									this.play(this.action.toLowerCase());
								}, this.delayTime);
							} else {
								this.play(this.action.toLowerCase());
							}
							break;
						case 'timescale':
							mixer.timeScale = this.getTimeScale(1);
							break;
						case 'clip':
							this.clipList.forEach((clip) => {
								clip.setMixer(mixer, this.clips);
							});
							break;
					}
				});
			} else if (this.mixer instanceof MD2Character || this.mixer instanceof MD2CharacterComplex) {
				const character = this.mixer;
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
						case 'weapon':
							if (ThreeUtil.isNotNull(this.weapon) && ThreeUtil.isNotNull(character.weapons) && character.weapons.length > 0) {
								let weapon: number = -1;
								const weapons = character.weapons;
								if (typeof this.weapon === 'string') {
									const weaponName = this.weapon.toLowerCase();
									character.weapons.forEach((mesh, idx) => {
										if (mesh.name !== null && mesh.name.toLowerCase().startsWith(weaponName)) {
											weapon = idx;
										}
									});
								} else {
									weapon = this.weapon;
								}
								if (weapon > -1 && weapon < weapons.length) {
									character.setWeapon(weapon);
								}
							}
							break;
						case 'wireframe':
							if (ThreeUtil.isNotNull(this.wireframe)) {
								character.setWireframe(ThreeUtil.getTypeSafe(this.wireframe, false));
							}
							break;
						case 'rate':
							if (ThreeUtil.isNotNull(this.rate)) {
								character.setPlaybackRate(ThreeUtil.getTypeSafe(this.rate, 1));
							}
							break;
						case 'skin':
							if (ThreeUtil.isNotNull(this.skin) && character.skinsBody.length > 0) {
								let skin: number = -1;
								const skinsBody = character.skinsBody;
								if (typeof this.skin === 'string') {
									const skinName = this.skin.toLowerCase();
									skinsBody.forEach((texture, idx) => {
										if (texture.name !== null && texture.name.toLowerCase().startsWith(skinName)) {
											skin = idx;
										}
									});
								} else {
									skin = this.skin;
								}
								if (skin > -1 && skin < skinsBody.length) {
									character.setSkin(skin);
								}
							}
							break;
						case 'controls':
							if (character instanceof MD2CharacterComplex) {
								if (ThreeUtil.isNotNull(this.controls)) {
									(character as any).controls = this.controls;
								}
							}
							break;
						case 'scale':
							if (ThreeUtil.isNotNull(this.scale)) {
								character.scale = this.scale;
							}
							break;
						case 'animationfps':
							if (ThreeUtil.isNotNull(this.animationFPS)) {
								character.animationFPS = this.animationFPS;
							}
							break;
						case 'transitionframes':
							if (ThreeUtil.isNotNull(this.maxSpeed) && ThreeUtil.isNotNull(character['transitionFrames'])) {
								character['transitionFrames'] = this.transitionFrames;
							}
							break;
						case 'maxspeed':
							if (ThreeUtil.isNotNull(this.maxSpeed) && ThreeUtil.isNotNull(character['maxSpeed'])) {
								character['maxSpeed'] = this.maxSpeed;
							}
							break;
						case 'maxreversespeed':
							if (ThreeUtil.isNotNull(this.maxReverseSpeed) && ThreeUtil.isNotNull(character['maxReverseSpeed'])) {
								character['maxReverseSpeed'] = this.maxReverseSpeed;
							}
							break;
						case 'frontacceleration':
							if (ThreeUtil.isNotNull(this.frontAcceleration) && ThreeUtil.isNotNull(character['frontAcceleration'])) {
								character['frontAcceleration'] = this.frontAcceleration;
							}
							break;
						case 'backacceleration':
							if (ThreeUtil.isNotNull(this.backAcceleration) && ThreeUtil.isNotNull(character['backAcceleration'])) {
								character['backAcceleration'] = this.backAcceleration;
							}
							break;
						case 'frontdecceleration':
							if (ThreeUtil.isNotNull(this.frontDecceleration) && ThreeUtil.isNotNull(character['frontDecceleration'])) {
								character['frontDecceleration'] = this.frontDecceleration;
							}
							break;
						case 'angularspeed':
							if (ThreeUtil.isNotNull(this.angularSpeed) && ThreeUtil.isNotNull(character['angularSpeed'])) {
								character['angularSpeed'] = this.angularSpeed;
							}
							break;
					}
				});
			} else if (this.mixer instanceof MMDAnimationHelper) {
				const helper = this.mixer;
				changes.forEach((change) => {
					switch (change.toLowerCase()) {
						case 'pose':
							if (this.model instanceof THREE.SkinnedMesh) {
								helper.pose(this.model, null);
							}
							break;
					}
				});
			}
			super.applyChanges(changes);
		}
	}

	/**
	 * Resets mixer
	 */
	public getMixer(): THREE.AnimationMixer | MD2Character | MD2CharacterComplex | MMDAnimationHelper {
		if (this.mixer === null || this._needUpdate) {
			this.needUpdate = false;
			let mixer: THREE.AnimationMixer | MD2Character | MD2CharacterComplex | MMDAnimationHelper = null;
			this.lastPlayedClip = null;
			switch (this.type.toLowerCase()) {
				case 'mmd':
				case 'mmdanimation':
				case 'mmdanimationhelper':
					if (this.animationHelper === null) {
						const helper = new MMDAnimationHelper({
							sync: this.getSync(),
							afterglow: this.getAfterglow(),
							resetPhysicsOnLoop: this.getResetPhysicsOnLoop(),
						});
						if (ThreeUtil.isNotNull(this.clips)) {
							this.synkAnimationHelper(helper);
							this.setSubscribeNext('animation');
						} else {
							this.subscribeRefer(
								'mmdLoad',
								ThreeUtil.getSubscribe(
									this.model,
									() => {
										this.synkAnimationHelper(helper);
										this.setSubscribeNext('animation');
									},
									'loaded'
								)
							);
						}
						mixer = helper;
					} else {
						this.unSubscribeRefer('animation');
						this.subscribeRefer(
							'animation',
							ThreeUtil.getSubscribe(
								this.animationHelper,
								() => {
									this.synkAnimationHelper(this.animationHelper.getMmdAnimationHelper());
								},
								'animation'
							)
						);
						const helper = this.animationHelper.getMmdAnimationHelper();
						this.synkAnimationHelper(helper);
						mixer = helper;
					}
					break;
				case 'mixer':
					if (ThreeUtil.isNotNull(this.clips)) {
						const animationMixer = new THREE.AnimationMixer(this.model);
						animationMixer.timeScale = this.getTimeScale(1);
						mixer = animationMixer;
					}
					break;
				case 'virtulous':
				default:
					if (this.clips !== null) {
						if (this.clips instanceof MD2Character || this.clips instanceof MD2CharacterComplex) {
							mixer = this.clips;
							if (this.clips instanceof MD2CharacterComplex) {
								(mixer as any).controls = this.controls || {};
							}
						}
					}
					break;
			}
			this.mixer = mixer;
			this.setObject(mixer);
		}
		return this.mixer;
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
		if (this.mixer !== null && ThreeUtil.isNotNull(name) && name !== '' && this.mixer !== null) {
			if (this.mixer instanceof THREE.AnimationMixer) {
				if (ThreeUtil.isNotNull(this.clipList) && this.clipList.length > 0) {
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
						foundAction.play();
						// foundAction.fadeIn(duration);
					}
					if (foundAction !== null) {
						this.lastAction = name.toLowerCase();
						this.lastPlayedClip = foundAction;
					}
					return true;
				}
			} else if (this.mixer instanceof MD2Character || this.mixer instanceof MD2CharacterComplex) {
				this.mixer.setAnimation(name);
				return true;
			}
		}
		return false;
	}

	/**
	 * Updates mixer component
	 * @param timer
	 */
	public update(timer: RendererTimer) {
		if (ThreeUtil.isNotNull(this.mixer)) {
			if (this.mixer instanceof MMDAnimationHelper) {
				this.mixer.update(timer.delta);
			} else if (this.mixer instanceof THREE.AnimationMixer) {
				this.mixer.update(timer.delta);
			} else if (this.mixer instanceof MD2Character || this.mixer instanceof MD2CharacterComplex) {
				this.mixer.update(timer.delta);
			}
		} else if (ThreeUtil.isNotNull(this.clips)) {
			if (ThreeUtil.isNotNull(this.clips.setTime)) {
					this.clips.setTime(timer.elapsedTime * this.timeScale);
			} else if (ThreeUtil.isNotNull(this.clips.update)) {
				try {
					this.clips.update(timer.delta * this.timeScale);
				} catch (ex) {}
			}
		}
	}
}
