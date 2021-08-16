import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { TagAttributes, ThreeUtil } from '../interface';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { AbstractTweenComponent } from '../tween.abstract';

/**
 * PositionComponent
 */
@Component({
	selector: 'ngx3js-position',
	templateUrl: './position.component.html',
	styleUrls: ['./position.component.scss'],
})
export class PositionComponent extends AbstractTweenComponent implements OnInit {
	/**
	 * Input  of position component
	 */
	@Input() public type: string = 'position';

	/**
	 * refName  of position component
	 */
	@Input() private refName: string = null;

	/**
	 * Input  of position component
	 */
	@Input() private refer: any = null;

	/**
	 * The current value of the x component.
	 */
	@Input() private x: number = null;

	/**
	 * The current value of the y component.
	 */
	@Input() private y: number = null;

	/**
	 * The current value of the z component.
	 */
	@Input() private z: number = null;

	/**
	 * Multiplies this vector by scalar [page:Float s].
	 */
	@Input() private multiply: number = null;

	/**
	 * Converts this vector to a [link:https://en.wikipedia.org/wiki/Unit_vector unit vector] - that is, sets it equal to a vector with the same direction
	 * as this one, but [page:.length length] 1.
	 */
	@Input() private normalize: boolean = false;

	/**
	 * Input  of position component
	 */
	@Input() public camera: any = null;

	/**
	 * Input  of position component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() public setfrom: string = null;

	/**
	 * Input  of position component
	 */
	@Input() public radius: number = null;

	/**
	 * Input  of position component
	 */
	@Input() public phi: number = null;

	/**
	 * Input  of position component
	 */
	@Input() public theta: number = null;

	/**
	 * A callback method that is invoked immediately after the
	 * default change detector has checked the directive's
	 * data-bound properties for the first time,
	 * and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('position');
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
		if (changes && this.position) {
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
	 * Position  of position component
	 */
	private position: THREE.Vector3 = null;

	/**
	 * Object3d  of position component
	 */
	private _object3d: {
		[key: string]: THREE.Object3D;
	} = {};

	/**
	 * unSets object3d
	 * @param object3d
	 */
	public unsetObject3d(object3d: AbstractSubscribeComponent) {
		const key: string = object3d.getId();
		this.unSubscribeRefer('position_' + key);
		this.unSubscribeRefer('unposition_' + key);
		if (ThreeUtil.isNotNull(this._object3d[key])) {
			delete this._object3d[key];
		}
	}

	/**
	 * Sets object3d
	 * @param object3d
	 */
	public setObject3d(object3d: AbstractSubscribeComponent) {
		if (ThreeUtil.isNotNull(object3d)) {
			const key: string = object3d.getId();
			const object = ThreeUtil.getObject3d(object3d);
			if (ThreeUtil.isNotNull(this.refName) && ThreeUtil.isNotNull(object)) {
				this._object3d[key] = object.getObjectByName(this.refName);
			} else {
				this._object3d[key] = object;
			}
			this.subscribeRefer(
				'position_' + key,
				ThreeUtil.getSubscribe(
					object3d,
					() => {
						this.setObject3d(object3d);
					},
					'loaded'
				)
			);
			this.subscribeRefer(
				'unposition_' + key,
				ThreeUtil.getSubscribe(
					object3d,
					() => {
						this.unsetObject3d(object3d);
					},
					'destroy'
				)
			);
			this.getPosition();
			this.synkObject3d(this.position, key);
		}
	}

	/**
	 * Synks object3d
	 * @param [position]
	 */
	synkObject3d(position: THREE.Vector3 = null, key: string = null) {
		if (ThreeUtil.isNotNull(position) && this.enabled) {
			if (ThreeUtil.isNotNull(this._object3d)) {
				const object3dList: THREE.Object3D[] = [];
				if (ThreeUtil.isNotNull(key)) {
					if (ThreeUtil.isNotNull(this._object3d[key])) {
						object3dList.push(this._object3d[key]);
					}
				} else {
					Object.entries(this._object3d).forEach(([_, object3d]) => {
						if (ThreeUtil.isNotNull(object3d)) {
							object3dList.push(object3d);
						}
					});
				}
				object3dList.forEach((object3d) => {
					if (object3d instanceof THREE.Object3D) {
						switch (this.type.toLowerCase()) {
							case 'up':
								if (ThreeUtil.isNull(object3d.up)) {
									object3d.up = THREE.Object3D.DefaultUp.clone();
								}
								object3d.up.copy(position);
								break;
							case 'lookat':
								object3d.lookAt(position);
								break;
							default:
								if (ThreeUtil.isNotNull(this.x) && ThreeUtil.isNotNull(this.y) && ThreeUtil.isNotNull(this.z)) {
									object3d.position.copy(position);
								} else if (ThreeUtil.isNotNull(this.x) || ThreeUtil.isNotNull(this.y) || ThreeUtil.isNotNull(this.z)) {
									if (ThreeUtil.isNotNull(this.x)) {
										object3d.position.x = position.x;
									}
									if (ThreeUtil.isNotNull(this.y)) {
										object3d.position.y = position.y;
									}
									if (ThreeUtil.isNotNull(this.z)) {
										object3d.position.z = position.z;
									}
								} else {
									if (ThreeUtil.isNotNull(this.multiply)) {
										object3d.position.multiplyScalar(this.multiply);
									}
								}
								break;
						}
					}
				});
			} else if (this.position !== position) {
				this.position.copy(position);
			}
		}
	}

	/**
	 * Sets position
	 * @param [x]
	 * @param [y]
	 * @param [z]
	 */
	public setPosition(x?: number, y?: number, z?: number) {
		if (this.position !== null) {
			this.x = ThreeUtil.getTypeSafe(x, this.position.x);
			this.y = ThreeUtil.getTypeSafe(y, this.position.y);
			this.z = ThreeUtil.getTypeSafe(z, this.position.z);
		} else {
			this.x = ThreeUtil.getTypeSafe(x, 0);
			this.y = ThreeUtil.getTypeSafe(y, 0);
			this.z = ThreeUtil.getTypeSafe(z, 0);
		}
		this.needUpdate = true;
	}

	/**
	 * Gets tag attribute
	 * @param [options]
	 * @returns tag attribute
	 */
	public getTagAttribute(options?: any): TagAttributes {
		const tagAttributes: TagAttributes = {
			tag: 'ngx3js-position',
			attributes: [],
		};
		if (ThreeUtil.isNotNull(options.position)) {
			tagAttributes.attributes.push({ name: 'x', value: options.position.x });
			tagAttributes.attributes.push({ name: 'y', value: options.position.y });
			tagAttributes.attributes.push({ name: 'z', value: options.position.z });
		} else {
			tagAttributes.attributes.push({ name: 'x', value: this.x });
			tagAttributes.attributes.push({ name: 'y', value: this.y });
			tagAttributes.attributes.push({ name: 'z', value: this.z });
		}
		return tagAttributes;
	}

	/**
	 * Last ref camera of position component
	 */
	private _lastRefCamera: THREE.Camera = null;

	/**
	 * Last ref camera bind of position component
	 */
	private _lastRefCameraBind: any = null;

	/**
	 * Applys changes
	 * @param changes
	 * @returns
	 */
	protected applyChanges(changes: string[]) {
		if (this.position !== null) {
			if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getPosition();
				return;
			}
			if (!ThreeUtil.isOnlyIndexOf(changes, ['init', 'type', 'enabled'])) {
				this.needUpdate = true;
				return;
			}
			super.applyChanges(changes);
		}
	}

	/**
	 * Gets position
	 * @returns position
	 */
	private _getPosition(): THREE.Vector3 {
		let position: THREE.Vector3 = null;
		if (this.refer !== null && this.refer !== undefined) {
			position = ThreeUtil.getPosition(this.refer);
		}
		if (position === null) {
			position = ThreeUtil.getVector3Safe(this.x, this.y, this.z, new THREE.Vector3(0, 0, 0));
			if (ThreeUtil.isNotNull(this.setfrom)) {
				switch (this.setfrom.toLowerCase()) {
					case 'spherical':
					case 'sphericalcoords':
						position.setFromSphericalCoords(ThreeUtil.getTypeSafe(this.radius, 1), ThreeUtil.getAngleSafe(this.phi, 0), ThreeUtil.getAngleSafe(this.theta, 0));
						break;
					case 'cylindrical':
					case 'cylindricalcoords':
						position.setFromCylindricalCoords(ThreeUtil.getTypeSafe(this.radius, 1), ThreeUtil.getAngleSafe(this.phi, 0), ThreeUtil.getTypeSafe(this.y, 0));
						break;
				}
			}
			if (this.normalize) {
				position.normalize();
			}
			if (this.multiply !== null) {
				position.multiplyScalar(this.multiply);
			}
			if (this.camera !== null) {
				const camera: THREE.Camera = ThreeUtil.isNotNull(this.camera.getCamera) ? this.camera.getObject3d() : this.camera;
				if (camera !== null) {
					if (this._lastRefCamera !== camera) {
						if (this._lastRefCameraBind === null) {
							this._lastRefCameraBind = (e) => {
								this.needUpdate = true;
								this.position = null;
								window.setTimeout(() => {
									if (this.position === null) {
										this.getPosition();
									}
								}, 10);
							};
						}
						if (this._lastRefCamera !== null) {
							camera.removeEventListener('change', this._lastRefCameraBind);
						}
						camera.addEventListener('change', this._lastRefCameraBind);
						this._lastRefCamera = camera;
					}
					if (camera instanceof THREE.OrthographicCamera) {
						position.x = ((camera.right - camera.left) / 2) * position.x + (camera.right + camera.left) / 2;
						position.y = ((camera.top - camera.bottom) / 2) * position.y + (camera.top + camera.bottom) / 2;
						position.applyQuaternion(camera.quaternion);
					}
				}
			}
		}
		return position;
	}

	/**
	 * Gets position
	 * @returns position
	 */
	public getPosition(): THREE.Vector3 {
		if (this.position === null || this._needUpdate) {
			this.needUpdate = false;
			this.position = this._getPosition();
			this.setObject(this.position);
			this.synkObject3d(this.position);
		}
		return this.position;
	}
}
