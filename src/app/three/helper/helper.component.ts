import { Component, forwardRef, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { CSM } from 'three/examples/jsm/csm/CSM';
import { CSMHelper } from 'three/examples/jsm/csm/CSMHelper';
import { LightProbeHelper } from 'three/examples/jsm/helpers/LightProbeHelper';
import { PositionalAudioHelper } from 'three/examples/jsm/helpers/PositionalAudioHelper';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper';
import { VertexTangentsHelper } from 'three/examples/jsm/helpers/VertexTangentsHelper';
import { Gyroscope } from 'three/examples/jsm/misc/Gyroscope';
import { AbstractObject3dComponent } from '../object3d.abstract';
import { ThreeColor, ThreeUtil } from './../interface';

/**
 * Helper options
 */
export interface HelperOptions {
	/**
	 * the type of helper
	 *
	 * Notice - case insensitive.
	 *
	 * @see Gyroscope - Gyroscope
	 * @see CSM - CSM
	 * @see THREE.ArrowHelper - ArrowHelper, Arrow
	 * @see THREE.BoxHelper - BoxHelper, Box
	 * @see THREE.Box3Helper - Box3Helper, Box3
	 * @see THREE.GridHelper - GridHelper, Grid
	 * @see THREE.PolarGridHelper - PolarGridHelper, PolarGrid
	 * @see PositionalAudioHelper - PositionalAudioHelper, PositionalAudio
	 * @see THREE.CameraHelper - CameraHelper, Camera
	 * @see THREE.DirectionalLightHelper - DirectionalLightHelper, DirectionalLight, Directional, Light
	 * @see THREE.HemisphereLightHelper - HemisphereLightHelper, HemisphereLight, Hemisphere, Light
	 * @see THREE.PointLightHelper - PointLightHelper, PointLightHelper, PointLight, Light
	 * @see THREE.SpotLightHelper - SpotLightHelper, SpotLight, Light
	 * @see RectAreaLightHelper - RectAreaLightHelper, RectAreaLight, Light
	 * @see LightProbeHelper - LightProbeHelper, LightProbe, Light
	 * @see THREE.PlaneHelper - PlaneHelper, Plane
	 * @see VertexTangentsHelper - VertexTangentsHelper, VertexTangents
	 * @see VertexNormalsHelper - VertexNormalsHelper, VertexNormals
	 * @see THREE.SkeletonHelper - SkeletonHelper, Skeleton
	 * @see THREE.AxesHelper - AxesHelper, Axes
	 */
	type?: string;

	/**
	 * color -- The desired color.
	 */
	color?: string | number;

	/**
	 * The target object of helper
	 */
	target?: any;

	/**
	 * size of the lines representing the axes. Default is *1*.
	 */
	size?: number;

	/**
	 * The radius of the polar grid. This can be any positive number. Default is 10.
	 */
	radius?: number;

	/**
	 * The number of radial lines. This can be any positive integer. Default is 16.
	 */
	radials?: number;

	/**
	 * The number of circles. This can be any positive integer. Default is 8.
	 */
	circles?: number;

	/**
	 * The number of line segments used for each circle. This can be any positive integer that is 3 or greater. Default is 64.
	 */
	divisions?: number;

	/**
	 * The first color used for grid elements. This can be a [page:Color], a hexadecimal value and an CSS-Color name. Default is 0x444444
	 */
	color1?: ThreeColor;

	/**
	 * The second color used for grid elements. This can be a [page:Color], a hexadecimal value and an CSS-Color name. Default is 0x888888
	 */
	color2?: ThreeColor;

	/**
	 * Float in the range of *0.0* - *1.0* indicating how transparent the material is.
	 */
	opacity?: number;

	/**
	 * Whether rendering this material has any effect on the depth buffer. Default is *true*.
	 */
	depthWrite?: boolean;

	/**
	 * The color of material
	 */
	materialColor?: ThreeColor;

	/**
	 * Input  of helper component
	 *
	 * Notice - case insensitive.
	 *
	 * Which blending to use when displaying objects with this material. Default is {@link NormalBlending}.
	 *
	 * @default THREE.NormalBlending
	 *
	 * @see THREE.NoBlending - NoBlending, No
	 * @see THREE.NormalBlending - NormalBlending, Normal
	 * @see THREE.AdditiveBlending - AdditiveBlending, Additive
	 * @see THREE.SubtractiveBlending - SubtractiveBlending, Subtractive
	 * @see THREE.MultiplyBlending - MultiplyBlending, Multiply
	 * @see THREE.CustomBlending - CustomBlending, Custom
	 */
	materialBlending?: string;

	/**
	 * Defines whether this material is transparent. This has an effect on rendering as transparent objects need special treatment and are rendered after non-transparent objects.
	 * When set to true, the extent to which the material is transparent is controlled by setting it's .opacity property.
	 * Default is false.
	 * @default false
	 */
	materialTransparent?: boolean;

	/**
	 * X Direction from origin. Must be a unit vector.
	 *
	 */
	dirX?: number;

	/**
	 * Y Direction from origin. Must be a unit vector.
	 */
	dirY?: number;

	/**
	 * Z Direction from origin. Must be a unit vector.
	 */
	dirZ?: number;

	/**
	 * X Point at which the arrow starts.
	 */
	originX?: number;

	/**
	 * Y Point at which the arrow starts.
	 */
	originY?: number;

	/**
	 * Z Point at which the arrow starts.
	 */
	originZ?: number;

	/**
	 * Point at which the arrow starts.
	 */
	arrowFrom?: any;

	/**
	 * Point at which the arrow end.
	 */
	arrowTo?: any;

	/**
	 * length of the arrow. Default is *1*.
	 */
	length?: number;

	/**
	 * The length of the head of the arrow. Default is 0.2 * length.
	 */
	headLength?: number;

	/**
	 * The width of the head of the arrow. Default is 0.2 * headLength.
	 */
	headWidth?: number;

	/**
	 * Update matrix for this helper
	 */
	matrix?: THREE.Matrix4;

	/**
	 * this children of Gyroscope
	 */
	children?: any[];

	/**
	 * The cms control of CSMHelper
	 */
	control?: any;

	/**
	 * the range of PositionalAudioHelper
	 */
	range?: number;

	/**
	 * the divisionsInnerAngle of PositionalAudioHelper
	 */
	divisionsInnerAngle?: number;

	/**
	 * the divisionsOuterAngle of PositionalAudioHelper
	 */
	divisionsOuterAngle?: number;
}

/**
 * HelperComponent
 */
@Component({
	selector: 'ngx3js-helper',
	templateUrl: './helper.component.html',
	styleUrls: ['./helper.component.scss'],
	providers: [{ provide: AbstractObject3dComponent, useExisting: forwardRef(() => HelperComponent) }],
})
export class HelperComponent extends AbstractObject3dComponent implements OnInit {
	/**
	 * the type of helper
	 *
	 * Notice - case insensitive.
	 *
	 * @see Gyroscope - Gyroscope
	 * @see CSM - CSM
	 * @see THREE.ArrowHelper - ArrowHelper, Arrow
	 * @see THREE.BoxHelper - BoxHelper, Box
	 * @see THREE.Box3Helper - Box3Helper, Box3
	 * @see THREE.GridHelper - GridHelper, Grid
	 * @see THREE.PolarGridHelper - PolarGridHelper, PolarGrid
	 * @see PositionalAudioHelper - PositionalAudioHelper, PositionalAudio
	 * @see THREE.CameraHelper - CameraHelper, Camera
	 * @see THREE.DirectionalLightHelper - DirectionalLightHelper, DirectionalLight, Directional, Light
	 * @see THREE.HemisphereLightHelper - HemisphereLightHelper, HemisphereLight, Hemisphere, Light
	 * @see THREE.PointLightHelper - PointLightHelper, PointLightHelper, PointLight, Light
	 * @see THREE.SpotLightHelper - SpotLightHelper, SpotLight, Light
	 * @see RectAreaLightHelper - RectAreaLightHelper, RectAreaLight, Light
	 * @see LightProbeHelper - LightProbeHelper, LightProbe, Light
	 * @see THREE.PlaneHelper - PlaneHelper, Plane
	 * @see VertexTangentsHelper - VertexTangentsHelper, VertexTangents
	 * @see VertexNormalsHelper - VertexNormalsHelper, VertexNormals
	 * @see THREE.SkeletonHelper - SkeletonHelper, Skeleton
	 * @see THREE.AxesHelper - AxesHelper, Axes
	 */
	@Input() public type: string = 'axes';

	/**
	 * color -- The desired color.
	 */
	@Input() private color: string | number = null;

	/**
	 * The target object of helper
	 */
	@Input() private target: any = null;

	/**
	 * size of the lines representing the axes. Default is *1*.
	 */
	@Input() private size: number = null;

	/**
	 * The radius of the polar grid. This can be any positive number. Default is 10.
	 */
	@Input() private radius: number = null;

	/**
	 * The number of radial lines. This can be any positive integer. Default is 16.
	 */
	@Input() private radials: number = null;

	/**
	 * The number of circles. This can be any positive integer. Default is 8.
	 */
	@Input() private circles: number = null;

	/**
	 * The number of line segments used for each circle. This can be any positive integer that is 3 or greater. Default is 64.
	 */
	@Input() private divisions: number = null;

	/**
	 * The first color used for grid elements. This can be a [page:Color], a hexadecimal value and an CSS-Color name. Default is 0x444444
	 */
	@Input() private color1: ThreeColor = null;

	/**
	 * The second color used for grid elements. This can be a [page:Color], a hexadecimal value and an CSS-Color name. Default is 0x888888
	 */
	@Input() private color2: ThreeColor = null;

	/**
	 * Float in the range of *0.0* - *1.0* indicating how transparent the material is.
	 */
	@Input() private opacity: number = null;

	/**
	 * Whether rendering this material has any effect on the depth buffer. Default is *true*.
	 */
	@Input() private depthWrite: boolean = null;

	/**
	 * The color of material
	 */
	@Input() private materialColor: ThreeColor = null;

	/**
	 * Input  of helper component
	 *
	 * Notice - case insensitive.
	 *
	 * Which blending to use when displaying objects with this material. Default is {@link NormalBlending}.
	 *
	 * @default THREE.NormalBlending
	 *
	 * @see THREE.NoBlending - NoBlending, No
	 * @see THREE.NormalBlending - NormalBlending, Normal
	 * @see THREE.AdditiveBlending - AdditiveBlending, Additive
	 * @see THREE.SubtractiveBlending - SubtractiveBlending, Subtractive
	 * @see THREE.MultiplyBlending - MultiplyBlending, Multiply
	 * @see THREE.CustomBlending - CustomBlending, Custom
	 */
	@Input() private materialBlending: string = null;

	/**
	 * Defines whether this material is transparent. This has an effect on rendering as transparent objects need special treatment and are rendered after non-transparent objects.
	 * When set to true, the extent to which the material is transparent is controlled by setting it's .opacity property.
	 * Default is false.
	 * @default false
	 */
	@Input() private materialTransparent: boolean = null;

	/**
	 * X Direction from origin. Must be a unit vector.
	 *
	 */
	@Input() private dirX: number = null;

	/**
	 * Y Direction from origin. Must be a unit vector.
	 */
	@Input() private dirY: number = null;

	/**
	 * Z Direction from origin. Must be a unit vector.
	 */
	@Input() private dirZ: number = null;

	/**
	 * X Point at which the arrow starts.
	 */
	@Input() private originX: number = null;

	/**
	 * Y Point at which the arrow starts.
	 */
	@Input() private originY: number = null;

	/**
	 * Z Point at which the arrow starts.
	 */
	@Input() private originZ: number = null;

	/**
	 * Point at which the arrow starts.
	 */
	@Input() private arrowFrom: any = null;

	/**
	 * Point at which the arrow end.
	 */
	@Input() private arrowTo: any = null;

	/**
	 * length of the arrow. Default is *1*.
	 */
	@Input() private length: number = null;

	/**
	 * The length of the head of the arrow. Default is 0.2 * length.
	 */
	@Input() private headLength: number = null;

	/**
	 * The width of the head of the arrow. Default is 0.2 * headLength.
	 */
	@Input() private headWidth: number = null;

	/**
	 * Update matrix for this helper
	 */
	@Input() private matrix: THREE.Matrix4 = null;

	/**
	 * this children of Gyroscope
	 */
	@Input() private children: any[] = null;

	/**
	 * The cms control of CSMHelper
	 */
	@Input() private control: any = null;

	/**
	 * the range of PositionalAudioHelper
	 */
	@Input() private range: number = null;

	/**
	 * the divisionsInnerAngle of PositionalAudioHelper
	 */
	@Input() private divisionsInnerAngle: number = null;

	/**
	 * the divisionsOuterAngle of PositionalAudioHelper
	 */
	@Input() private divisionsOuterAngle: number = null;

	/**
	 * Gets target
	 *
	 * @param [target]
	 * @returns target
	 */
	private getTarget(target?: THREE.Object3D): THREE.Object3D {
		this.unSubscribeRefer('target');
		let targetMesh: THREE.Object3D = null;
		if (ThreeUtil.isNotNull(this.target)) {
			targetMesh = ThreeUtil.getObject3d(this.target, false);
			this.subscribeRefer(
				'target',
				ThreeUtil.getSubscribe(
					this.target,
					() => {
						this.needUpdate = true;
					},
					'loaded'
				)
			);
		}
		if (targetMesh === null && ThreeUtil.isNotNull(target)) {
			targetMesh = ThreeUtil.getObject3d(target, false);
		}
		if (ThreeUtil.isNotNull(targetMesh) && targetMesh instanceof THREE.Object3D && ThreeUtil.isNotNull(targetMesh.userData.refTarget)) {
			targetMesh = ThreeUtil.getObject3d(targetMesh.userData.refTarget, false) || targetMesh;
		}
		return targetMesh;
	}

	/**
	 * Gets size
	 *
	 * @param [def]
	 * @returns size
	 */
	private getSize(def?: number): number {
		return ThreeUtil.getTypeSafe(this.size, def);
	}

	/**
	 * Gets color
	 * @param [def]
	 * @returns color
	 */
	private getColor(def?: number | string): THREE.Color {
		return ThreeUtil.getColorSafe(this.color, def);
	}

	/**
	 * Gets color hex
	 * @param [def]
	 * @returns color hex
	 */
	private getColorHex(def?: number | string): number {
		const color = this.getColor(def);
		if (ThreeUtil.isNotNull(color)) {
			return color.getHex();
		} else {
			return undefined;
		}
	}

	/**
	 * Gets radius
	 * @param [def]
	 * @returns radius
	 */
	private getRadius(def?: number): number {
		return ThreeUtil.getTypeSafe(this.radius, def);
	}

	/**
	 * Gets radials
	 * @param [def]
	 * @returns radials
	 */
	private getRadials(def?: number): number {
		return ThreeUtil.getTypeSafe(this.radials, def);
	}

	/**
	 * Gets circles
	 * @param [def]
	 * @returns circles
	 */
	private getCircles(def?: number): number {
		return ThreeUtil.getTypeSafe(this.circles, def);
	}

	/**
	 * Gets divisions
	 * @param [def]
	 * @returns divisions
	 */
	private getDivisions(def?: number): number {
		return ThreeUtil.getTypeSafe(this.divisions, def);
	}

	/**
	 * Gets color1
	 * @param [def]
	 * @returns color1
	 */
	private getColor1(def?: ThreeColor): THREE.Color {
		return ThreeUtil.getColorSafe(this.color1, this.color, def);
	}

	/**
	 * Gets color2
	 * @param [def]
	 * @returns color2
	 */
	private getColor2(def?: ThreeColor): THREE.Color {
		return ThreeUtil.getColorSafe(this.color2, this.color1 || this.color, def);
	}

	/**
	 * Gets opacity
	 * @param [def]
	 * @returns opacity
	 */
	private getOpacity(def?: number): number {
		return ThreeUtil.getTypeSafe(this.opacity, def);
	}

	/**
	 * Gets depth write
	 * @param [def]
	 * @returns true if depth write
	 */
	private getDepthWrite(def?: boolean): boolean {
		return ThreeUtil.getTypeSafe(this.depthWrite, def);
	}

	/**
	 * Direction from origin. Must be a unit vector.
	 *
	 * @param [def]
	 * @returns dir
	 */
	private getDirection(def?: THREE.Vector3): THREE.Vector3 {
		if (ThreeUtil.isNotNull(this.arrowFrom) && ThreeUtil.isNotNull(this.arrowTo)) {
			const arrowFrom: THREE.Vector3 = this.getObjectPosition(this.arrowFrom);
			const arrowTo: THREE.Vector3 = this.getObjectPosition(this.arrowTo);
			const arrowDirection = new THREE.Vector3();
			arrowDirection.subVectors(arrowTo, arrowFrom).normalize();
			return arrowDirection;
		} else {
			return ThreeUtil.getTypeSafe(ThreeUtil.getVector3Safe(this.dirX, this.dirY, this.dirZ), def);
		}
	}

	/**
	 * Gets origin
	 * @param [def]
	 * @returns origin
	 */
	private getOrigin(def?: THREE.Vector3): THREE.Vector3 {
		let origin: THREE.Vector3 = def;
		if (ThreeUtil.isNotNull(this.arrowFrom)) {
			origin = this.getObjectPosition(this.arrowFrom);
		}
		if (ThreeUtil.isNotNull(this.originX) && ThreeUtil.isNotNull(this.originY) && ThreeUtil.isNotNull(this.originZ)) {
			origin = origin.clone();
			origin.add(ThreeUtil.getTypeSafe(ThreeUtil.getVector3Safe(this.originX, this.originY, this.originZ), def));
		}
		return origin;
	}

	/**
	 * Gets object position
	 *
	 * @param obj
	 * @returns object position
	 */
	private getObjectPosition(obj: any): THREE.Vector3 {
		if (ThreeUtil.isNotNull(obj)) {
			if (obj instanceof THREE.Vector3) {
				return obj;
			} else if (ThreeUtil.isNotNull(obj.getPosition)) {
				return obj.getPosition();
			} else if (ThreeUtil.isNotNull(obj.position)) {
				return obj.position;
			}
		}
		return new THREE.Vector3(0, 0, 0);
	}

	/**
	 * Gets length
	 * @param [def]
	 * @returns length
	 */
	private getLength(def?: number): number {
		return ThreeUtil.getTypeSafe(this.length, def);
	}

	/**
	 * Gets head length
	 * @param [def]
	 * @returns head length
	 */
	private getHeadLength(def?: number): number {
		return ThreeUtil.getTypeSafe(this.headLength, def);
	}

	/**
	 * Gets head width
	 * @param [def]
	 * @returns head width
	 */
	private getHeadWidth(def?: number): number {
		return ThreeUtil.getTypeSafe(this.headWidth, def);
	}

	/**
	 * Creates an instance of helper component.
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
		super.ngOnInit('helper');
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
		if (changes && this.helper) {
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
	 * Sets update
	 */
	public setUpdate() {
		const helper: any = this.helper;
		if (ThreeUtil.isNotNull(helper.update)) {
			window.setTimeout(() => {
				helper.update();
			}, 100);
		}
	}

	/**
	 * Helper  of helper component
	 */
	private helper: THREE.Object3D = null;

	/**
	 * Sets parent
	 * @param parent
	 * @returns true if parent
	 */
	public setParent(parent: THREE.Object3D): boolean {
		if (super.setParent(parent)) {
			this.getHelper();
			this.unSubscribeRefer('helperReset');
			this.subscribeRefer(
				'helperReset',
				ThreeUtil.getSubscribe(
					this.parentObject3d,
					() => {
						this.needUpdate = true;
					},
					'loaded'
				)
			);
			return true;
		}
		return false;
	}

	/**
	 * Applys changes3d
	 * @param changes
	 * @returns
	 */
	public applyChanges3d(changes: string[]) {
		if (this.helper !== null) {
			if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getObject3d();
				return;
			}
			if (!ThreeUtil.isOnlyIndexOf(changes, [], this.OBJECT3D_ATTR)) {
				this.needUpdate = true;
				return;
			}
			if (ThreeUtil.isIndexOf(changes, 'init')) {
				changes = ThreeUtil.pushUniq(changes, []);
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					default:
						break;
				}
			});
			super.applyChanges3d(changes);
		}
	}

	/**
	 * Gets object3d
	 * @template T
	 * @returns object3d
	 */
	public getObject3d<T extends THREE.Object3D>(): T {
		return this.getHelper();
	}

	/**
	 * Gets helper
	 * @template T
	 * @returns helper
	 */
	public getHelper<T extends THREE.Object3D>(): T {
		if (this.helper === null || this._needUpdate) {
			this.needUpdate = false;
			this.removeObject3d(this.helper);
			if (this.parentObject3d !== null) {
				this.parentObject3d.updateMatrixWorld(true);
			}
			this.helper = null;
			let parentAdd: boolean = true;
			let basemesh: THREE.Object3D = null;
			switch (this.type.toLowerCase()) {
				case 'gyroscopehelper':
				case 'gyroscope':
					const gyroscope = new Gyroscope();
					if (ThreeUtil.isNotNull(this.children)) {
						this.children.forEach((child) => {
							if (child.getMesh) {
								gyroscope.add(child.getObject3d());
							} else if (child.getLight) {
								gyroscope.add(child.getObject3d());
							} else if (child.getCamera) {
								gyroscope.add(child.getObject3d());
							}
						});
					}
					basemesh = gyroscope;
					break;
				case 'csmhelper':
				case 'csm':
					let csm = this.control || {};
					if (ThreeUtil.isNotNull(csm.getControl)) {
						csm = csm.getControl();
					}
					if (!(csm instanceof CSM)) {
						// csm = new CSM({ parent: new THREE.Scene() });
					}
					const csmHelper = new CSMHelper(csm);
					basemesh = csmHelper as any;
					break;
				case 'arrowhelper':
				case 'arrow':
					basemesh = new THREE.ArrowHelper(this.getDirection(new THREE.Vector3(0, 0, 1)), this.getOrigin(new THREE.Vector3(0, 0, 0)), this.getLength(1), this.getColor(0xffff00), this.getHeadLength(), this.getHeadWidth());
					break;
				case 'boxhelper':
				case 'box':
					const boxHelper = new THREE.BoxHelper(this.getTarget(this.parent), this.getColor(0xffff00));
					basemesh = boxHelper;
					break;
				case 'box3helper':
				case 'box3':
					basemesh = new THREE.Box3Helper(null);
					break;
				case 'gridhelper':
				case 'grid':
					basemesh = new THREE.GridHelper(this.getSize(10), this.getDivisions(10), this.getColor1(0x444444), this.getColor2(0x888888));
					parentAdd = false;
					break;
				case 'polargridhelper':
				case 'polargrid':
					basemesh = new THREE.PolarGridHelper(this.getRadius(10), this.getRadials(16), this.getCircles(8), this.getDivisions(64), this.getColor1(0x444444), this.getColor2(0x888888));
					basemesh.receiveShadow = true;
					break;
				case 'positionalaudio':
				case 'positionalaudiohelper':
					let audioTarget = this.getTarget(this.parent);
					if (audioTarget instanceof THREE.PositionalAudio) {
						const positionalAudioHelper = new PositionalAudioHelper(audioTarget, ThreeUtil.getTypeSafe(this.range, 1), ThreeUtil.getTypeSafe(this.divisionsInnerAngle, 16), ThreeUtil.getTypeSafe(this.divisionsOuterAngle, 2));
						parentAdd = false;
						if (positionalAudioHelper.audio.buffer === null) {
							this.subscribeRefer(
								'audioload',
								ThreeUtil.getSubscribe(
									audioTarget,
									() => {
										positionalAudioHelper.material[0].visible = true;
										this.setUpdate();
									},
									'loaded'
								)
							);
						} else {
							this.setUpdate();
						}
						basemesh = positionalAudioHelper;
					} else {
						basemesh = new THREE.AxesHelper(this.getSize(10));
					}
					break;
				case 'camerahelper':
				case 'camera':
					let cameraTarget = this.getTarget(this.parent);
					if (cameraTarget instanceof THREE.Light && cameraTarget.shadow.camera) {
						basemesh = new THREE.CameraHelper(cameraTarget.shadow.camera);
					} else if (cameraTarget instanceof THREE.Camera) {
						basemesh = new THREE.CameraHelper(cameraTarget);
					} else {
						basemesh = new THREE.AxesHelper(this.getSize(10));
					}
					break;
				case 'directionallighthelper':
				case 'hemispherelighthelper':
				case 'rectarealighthelper':
				case 'pointlighthelper':
				case 'spotlighthelper':
				case 'lightprobehelper':
				case 'lighthelper':
				case 'directionallight':
				case 'hemispherelight':
				case 'rectarealight':
				case 'pointlight':
				case 'spotlight':
				case 'lightprobe':
				case 'light':
					let lightTarget = this.getTarget(this.parent);
					if (lightTarget instanceof THREE.DirectionalLight) {
						basemesh = new THREE.DirectionalLightHelper(lightTarget, this.getSize(10), this.getColor());
					} else if (lightTarget instanceof THREE.HemisphereLight) {
						basemesh = new THREE.HemisphereLightHelper(lightTarget, this.getSize(10), this.getColor());
					} else if (lightTarget instanceof THREE.PointLight) {
						basemesh = new THREE.PointLightHelper(lightTarget, this.getSize(10), this.getColor());
					} else if (lightTarget instanceof THREE.SpotLight) {
						basemesh = new THREE.SpotLightHelper(lightTarget, this.getColor());
					} else if (lightTarget instanceof THREE.RectAreaLight) {
						basemesh = new RectAreaLightHelper(lightTarget, this.getColor());
					} else if (lightTarget instanceof THREE.LightProbe) {
						basemesh = new LightProbeHelper(lightTarget, this.getSize(10));
					}
					break;
				case 'planehelper':
				case 'plane':
					if (this.parent instanceof THREE.Mesh && this.parent.material instanceof THREE.Material) {
						basemesh = new THREE.Group();
						const clippingPlanes: THREE.Plane[] = this.parent.material.clippingPlanes;
						if (clippingPlanes !== null && clippingPlanes !== undefined) {
							clippingPlanes.forEach((clippingPlane) => {
								basemesh.add(new THREE.PlaneHelper(clippingPlane, this.getSize(10), this.getColorHex()));
							});
						}
					} else {
						basemesh = null;
					}
					break;
				case 'vertexnormalshelper':
				case 'vertextangentshelper':
				case 'vertexnormals':
				case 'vertextangents':
					const vertexMesh = this.getTarget(this.parent);
					if (vertexMesh instanceof THREE.Mesh && vertexMesh.geometry instanceof THREE.BufferGeometry && vertexMesh.geometry.attributes.normal) {
						vertexMesh.geometry.computeTangents();
						// this.parent.updateMatrixWorld( true );
						if (ThreeUtil.isNotNull(vertexMesh.parent)) {
							vertexMesh.parent.updateMatrixWorld(true);
						}
						switch (this.type.toLowerCase()) {
							case 'vertextangentshelper':
							case 'vertextangents':
								basemesh = new VertexTangentsHelper(vertexMesh, this.getSize(), this.getColorHex());
								break;
							case 'vertexnormalshelper':
							case 'vertexnormals':
							default:
								basemesh = new VertexNormalsHelper(vertexMesh, this.getSize(), this.getColorHex());
								break;
						}
					} else {
						basemesh = new THREE.AxesHelper(this.getSize(10));
					}
					break;
				case 'skeletonhelper':
				case 'skeleton':
					basemesh = new THREE.SkeletonHelper(this.getTarget(this.parent));
					break;
				case 'axeshelper':
				case 'axes':
				default:
					basemesh = new THREE.AxesHelper(this.getSize(10));
					break;
			}
			if (basemesh !== null) {
				if (basemesh instanceof THREE.Line && ThreeUtil.isNotNull(basemesh.material) && basemesh.material instanceof THREE.Material) {
					const opacity = this.getOpacity(1);
					if (opacity >= 0 && opacity < 1) {
						basemesh.material.opacity = opacity;
						basemesh.material.transparent = true;
					} else if (ThreeUtil.isNotNull(this.materialTransparent)) {
						basemesh.material.transparent = this.materialTransparent;
					}
					if (ThreeUtil.isNotNull(this.materialColor) && basemesh.material['color'] !== undefined) {
						basemesh.material['color'] = ThreeUtil.getColorSafe(this.materialColor);
					}
					if (ThreeUtil.isNotNull(this.materialBlending)) {
						basemesh.material.blending = ThreeUtil.getBlendingSafe(this.materialBlending, 'NormalBlending');
					}
					if (ThreeUtil.isNotNull(this.depthWrite)) {
						basemesh.material.depthWrite = this.getDepthWrite(false);
					}
				}
				if (ThreeUtil.isNotNull(this.matrix)) {
					basemesh.applyMatrix4(this.matrix);
				}
			} else {
				basemesh = new THREE.Group();
				parentAdd = false;
			}
			this.helper = basemesh;
			if (!parentAdd) {
				this.setObject3d(this.helper);
			} else {
				this.setParentObject3d(this.helper);
			}
		}
		return this.helper as T;
	}
}
