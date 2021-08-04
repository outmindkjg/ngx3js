import { Component, forwardRef, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { LightProbeGenerator } from 'three/examples/jsm/lights/LightProbeGenerator';
import { AbstractObject3dComponent, Object3dOptions } from '../object3d.abstract';
import { AbstractTextureComponent } from '../texture.abstract';
import { TagAttributes, ThreeColor, ThreeUtil } from './../interface';

/**
 * Light options
 */
export interface LightOptions extends Object3dOptions{
	/**
	 * The type of light
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.PointLight - PointLight, Point
	 * @see THREE.RectAreaLight - RectAreaLight, RectArea
	 * @see THREE.SpotLight - SpotLight, Spot
	 * @see THREE.DirectionalLight - DirectionalLight, Directional
	 * @see THREE.HemisphereLight - HemisphereLight, Hemisphere
	 * @see THREE.LightProbe - LightProbe, Probe
	 * @see THREE.AmbientLight - AmbientLight, Ambient
	 */
	type?: string;

	/**
	 * Numeric value of the RGB component of the color. Default is 0xffffff.
	 */
	color?: ThreeColor;

	/**
	 * hexadecimal color of the sky. Default is 0xffffff.
	 */
	skyColor?: ThreeColor;

	/**
	 * hexadecimal color of the ground. Default is 0xffffff.
	 */
	groundColor?: ThreeColor;

	/**
	 * Numeric value of the light's strength/intensity. Default is 1.
	 */
	intensity?: number;

	/**
	 * Maximum range of the light. Default is 0 (no limit).
	 */
	distance?: number;

	/**
	 * Maximum angle of light dispersion from its direction whose upper bound is Math.PI/2(360).
	 */
	angle?: number;

	/**
	 * Percent of the spotlight cone that is attenuated due to penumbra. Takes values between zero and 1. Default is zero.
	 */
	penumbra?: number;

	/**
	 * The amount the light dims along the distance of the light. Default is 1.
	 */
	decay?: number;

	/**
	 * width of the light. Default is 10.
	 */
	width?: number;

	/**
	 * height of the light. Default is 10.
	 */
	height?: number;

	/**
	 * Shadow map bias, how much to add or subtract from the normalized depth when deciding whether a surface is in shadow.<br />
	 * The default is 0. Very tiny adjustments here (in the order of 0.0001) may help reduce artefacts in shadows
	 */
	shadowBias?: number;

	/**
	 * Setting this to values greater than 1 will blur the edges of the shadow.<br />
	 * High values will cause unwanted banding effects in the shadows - a greater [page:.mapSize mapSize]
	 * will allow for a higher value to be used here before these effects become visible.<br />
	 * If [page:WebGLRenderer.shadowMap.type] is set to [page:Renderer PCFSoftShadowMap], radius has
	 * no effect and it is recommended to increase softness by decreasing [page:.mapSize mapSize] instead.<br /><br />
	 * Note that this has no effect if the [page:WebGLRenderer.shadowMap.type] is set to [page:Renderer BasicShadowMap].
	 */
	shadowRadius?: number;

	/**
	 * Used to focus the shadow camera. The camera's field of view is set as a percentage of the spotlight's field-of-view. Range is [0, 1]. Default is 1.0.
	 */
	shadowFocus?: number;

	/**
	 * Input  of light component
	 */
	shadowCameraNear?: number;

	/**
	 * A [Page:Vector2] defining the width and height of the shadow map.
	 */
	shadowMapSize?: number;

	/**
	 * A [Page:Vector2] defining the width and height of the shadow map.
	 * vector2.width
	 */
	shadowMapSizeWidth?: number;

	/**
	 * A [Page:Vector2] defining the width and height of the shadow map.
	 * vector2.height
	 */
	shadowMapSizeHeight?: number;

	/**
	 * Camera frustum far plane. Default is *2000*.<br /><br />
	 * Must be greater than the current value of [page:.near near] plane.
	 */
	shadowCameraFar?: number;

	/**
	 * Camera frustum vertical field of view, from bottom to top of view, in degrees. Default is *50*.
	 */
	shadowCameraFov?: number;

	/**
	 * Camera frustum left plane.
	 */
	shadowCameraLeft?: number;

	/**
	 * Camera frustum right plane.
	 */
	shadowCameraRight?: number;

	/**
	 * Camera frustum top plane.
	 */
	shadowCameraTop?: number;

	/**
	 * Camera frustum bottom plane.
	 */
	shadowCameraBottom?: number;

	/**
	 * Gets or sets the zoom factor of the camera. Default is *1*.
	 */
	shadowCameraZoom?: number;

	/**
	 * An instance of [page:SphericalHarmonics3].
	 */
	sh?: string;

	/**
	 * Input  of light component
	 */
	texture?: AbstractTextureComponent;

	/**
	 * Input  of light component
	 */
	target?: any;

	/**
	 * Input  of light component
	 */
	targetX?: number;

	/**
	 * Input  of light component
	 */
	targetY?: number;

	/**
	 * Input  of light component
	 */
	targetZ?: number;

	/**
	 * Input  of light component
	 */
	renderer?: any;

	/**
	 * Input  of light component
	 */
	renderTarget?: any;
}

/**
 * LightComponent
 *
 * @see THREE.Light
 */
@Component({
	selector: 'ngx3js-light',
	templateUrl: './light.component.html',
	styleUrls: ['./light.component.scss'],
	providers: [{ provide: AbstractObject3dComponent, useExisting: forwardRef(() => LightComponent) }],
})
export class LightComponent extends AbstractObject3dComponent implements OnInit {
	/**
	 * The type of light
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.PointLight - PointLight, Point
	 * @see THREE.RectAreaLight - RectAreaLight, RectArea
	 * @see THREE.SpotLight - SpotLight, Spot
	 * @see THREE.DirectionalLight - DirectionalLight, Directional
	 * @see THREE.HemisphereLight - HemisphereLight, Hemisphere
	 * @see THREE.LightProbe - LightProbe, Probe
	 * @see THREE.AmbientLight - AmbientLight, Ambient
	 */
	@Input() public type: string = 'spot';

	/**
	 * Numeric value of the RGB component of the color. Default is 0xffffff.
	 */
	@Input() private color: ThreeColor = null;

	/**
	 * hexadecimal color of the sky. Default is 0xffffff.
	 */
	@Input() private skyColor: ThreeColor = null;

	/**
	 * hexadecimal color of the ground. Default is 0xffffff.
	 */
	@Input() private groundColor: ThreeColor = null;

	/**
	 * Numeric value of the light's strength/intensity. Default is 1.
	 */
	@Input() private intensity: number = null;

	/**
	 * Maximum range of the light. Default is 0 (no limit).
	 */
	@Input() private distance: number = null;

	/**
	 * Maximum angle of light dispersion from its direction whose upper bound is Math.PI/2(360).
	 */
	@Input() private angle: number = null;

	/**
	 * Percent of the spotlight cone that is attenuated due to penumbra. Takes values between zero and 1. Default is zero.
	 */
	@Input() private penumbra: number = null;

	/**
	 * The amount the light dims along the distance of the light. Default is 1.
	 */
	@Input() private decay: number = null;

	/**
	 * width of the light. Default is 10.
	 */
	@Input() private width: number = null;

	/**
	 * height of the light. Default is 10.
	 */
	@Input() private height: number = null;

	/**
	 * Shadow map bias, how much to add or subtract from the normalized depth when deciding whether a surface is in shadow.<br />
	 * The default is 0. Very tiny adjustments here (in the order of 0.0001) may help reduce artefacts in shadows
	 */
	@Input() private shadowBias: number = null;

	/**
	 * Setting this to values greater than 1 will blur the edges of the shadow.<br />
	 * High values will cause unwanted banding effects in the shadows - a greater [page:.mapSize mapSize]
	 * will allow for a higher value to be used here before these effects become visible.<br />
	 * If [page:WebGLRenderer.shadowMap.type] is set to [page:Renderer PCFSoftShadowMap], radius has
	 * no effect and it is recommended to increase softness by decreasing [page:.mapSize mapSize] instead.<br /><br />
	 * Note that this has no effect if the [page:WebGLRenderer.shadowMap.type] is set to [page:Renderer BasicShadowMap].
	 */
	@Input() private shadowRadius: number = null;

	/**
	 * Used to focus the shadow camera. The camera's field of view is set as a percentage of the spotlight's field-of-view. Range is [0, 1]. Default is 1.0.
	 */
	@Input() private shadowFocus: number = null;

	/**
	 * Input  of light component
	 */
	@Input() private shadowCameraNear: number = null;

	/**
	 * A [Page:Vector2] defining the width and height of the shadow map.
	 */
	@Input() private shadowMapSize: number = null;

	/**
	 * A [Page:Vector2] defining the width and height of the shadow map.
	 * vector2.width
	 */
	@Input() private shadowMapSizeWidth: number = null;

	/**
	 * A [Page:Vector2] defining the width and height of the shadow map.
	 * vector2.height
	 */
	@Input() private shadowMapSizeHeight: number = null;

	/**
	 * Camera frustum far plane. Default is *2000*.<br /><br />
	 * Must be greater than the current value of [page:.near near] plane.
	 */
	@Input() private shadowCameraFar: number = null;

	/**
	 * Camera frustum vertical field of view, from bottom to top of view, in degrees. Default is *50*.
	 */
	@Input() private shadowCameraFov: number = null;

	/**
	 * Camera frustum left plane.
	 */
	@Input() private shadowCameraLeft: number = null;

	/**
	 * Camera frustum right plane.
	 */
	@Input() private shadowCameraRight: number = null;

	/**
	 * Camera frustum top plane.
	 */
	@Input() private shadowCameraTop: number = null;

	/**
	 * Camera frustum bottom plane.
	 */
	@Input() private shadowCameraBottom: number = null;

	/**
	 * Gets or sets the zoom factor of the camera. Default is *1*.
	 */
	@Input() private shadowCameraZoom: number = null;

	/**
	 * An instance of [page:SphericalHarmonics3].
	 */
	@Input() private sh: string = null;

	/**
	 * Input  of light component
	 */
	@Input() private texture: AbstractTextureComponent = null;

	/**
	 * Input  of light component
	 */
	@Input() private target: any = null;

	/**
	 * Input  of light component
	 */
	@Input() private targetX: number = null;

	/**
	 * Input  of light component
	 */
	@Input() private targetY: number = null;

	/**
	 * Input  of light component
	 */
	@Input() private targetZ: number = null;

	/**
	 * Input  of light component
	 */
	@Input() private renderer: any = null;

	/**
	 * Input  of light component
	 */
	@Input() private renderTarget: any = null;

	/**
	 * Gets shadow map size width
	 * @param [def]
	 * @returns shadow map size width
	 */
	private getShadowMapSizeWidth(def?: number): number {
		return ThreeUtil.getTypeSafe(this.shadowMapSizeWidth, this.shadowMapSize, def);
	}

	/**
	 * Gets shadow map size height
	 * @param [def]
	 * @returns shadow map size height
	 */
	private getShadowMapSizeHeight(def?: number): number {
		return ThreeUtil.getTypeSafe(this.shadowMapSizeHeight, this.shadowMapSize, def);
	}

	/**
	 * Gets shadow camera left
	 * @param [def]
	 * @returns shadow camera left
	 */
	private getShadowCameraLeft(def?: number): number {
		if (ThreeUtil.isNotNull(this.shadowCameraLeft)) {
			return ThreeUtil.getTypeSafe(this.shadowCameraLeft, def);
		} else if (ThreeUtil.isNotNull(this.shadowCameraRight)) {
			return ThreeUtil.getTypeSafe(this.shadowCameraRight * -1, def);
		} else {
			return def;
		}
	}

	/**
	 * Gets shadow camera right
	 * @param [def]
	 * @returns shadow camera right
	 */
	private getShadowCameraRight(def?: number): number {
		if (ThreeUtil.isNotNull(this.shadowCameraRight)) {
			return ThreeUtil.getTypeSafe(this.shadowCameraRight, def);
		} else if (ThreeUtil.isNotNull(this.shadowCameraLeft)) {
			return ThreeUtil.getTypeSafe(this.shadowCameraLeft * -1, def);
		} else {
			return def;
		}
	}

	/**
	 * Gets shadow camera top
	 * @param [def]
	 * @returns shadow camera top
	 */
	private getShadowCameraTop(def?: number): number {
		if (ThreeUtil.isNotNull(this.shadowCameraTop)) {
			return ThreeUtil.getTypeSafe(this.shadowCameraTop, def);
		} else if (ThreeUtil.isNotNull(this.shadowCameraBottom)) {
			return ThreeUtil.getTypeSafe(this.shadowCameraBottom * -1, def);
		} else {
			return def;
		}
	}

	/**
	 * Gets shadow camera bottom
	 * @param [def]
	 * @returns shadow camera bottom
	 */
	private getShadowCameraBottom(def?: number): number {
		if (ThreeUtil.isNotNull(this.shadowCameraBottom)) {
			return ThreeUtil.getTypeSafe(this.shadowCameraBottom, def);
		} else if (ThreeUtil.isNotNull(this.shadowCameraTop)) {
			return ThreeUtil.getTypeSafe(this.shadowCameraTop * -1, def);
		} else {
			return def;
		}
	}

	/**
	 * Gets sh
	 * @param [def]
	 * @returns sh
	 */
	private getSh(def?: string): THREE.SphericalHarmonics3 {
		const sh = ThreeUtil.getTypeSafe(this.sh, def, '');
		if (ThreeUtil.isNotNull(sh) && sh != '') {
			switch (sh.toLowerCase()) {
				case 'harmonics3':
					return new THREE.SphericalHarmonics3();
			}
		}
		return undefined;
	}

	/**
	 * Gets target
	 * @returns target
	 */
	private getTarget(): THREE.Object3D {
		if (ThreeUtil.isNotNull(this.target)) {
			return ThreeUtil.getObject3d(this.target);
		}
		return undefined;
	}

	/**
	 * Gets three renderer
	 * @returns three renderer
	 */
	public getThreeRenderer(): THREE.Renderer {
		if (ThreeUtil.isNotNull(this.renderer) && ThreeUtil.isNotNull(this.renderer.getRenderer)) {
			return this.renderer.getRenderer();
		} else {
			return ThreeUtil.getRenderer();
		}
	}

	/**
	 * Creates an instance of light component.
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
		super.ngOnInit('light');
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
		if (changes && this.light) {
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
	 * Gets tag attribute
	 * @param [options]
	 * @returns
	 */
	public getTagAttribute(options: any = {}) {
		const tagAttributes: TagAttributes = {
			tag: 'ngx3js-light',
			attributes: [],
			options: options,
			children: [],
		};
		super.getTagAttributeObject3d(tagAttributes);
		const attributesKeys: string[] = [
			'type',
			'color',
			'skyColor',
			'groundColor',
			'intensity',
			'distance',
			'angle',
			'penumbra',
			'decay',
			'width',
			'height',
			'castShadow',
			'shadowBias',
			'shadowFocus',
			'shadowCameraNear',
			'shadowMapSizeWidth',
			'shadowMapSizeHeight',
			'shadowCameraFar',
			'shadowCameraFov',
			'shadowCameraLeft',
			'shadowCameraRight',
			'shadowCameraTop',
			'shadowCameraBottom',
			'shadowCameraZoom',
			'sh',
			'texture',
			'target',
			'renderer',
			'renderTarget',
		];
		const light = this.light;
		if (ThreeUtil.isNotNull(light)) {
			attributesKeys.forEach((key) => {
				if (ThreeUtil.isNotNull(this[key])) {
					switch (key) {
						case 'shadowBias':
						case 'shadowFocus':
							if (ThreeUtil.isNotNull(light['shadow'])) {
								switch (key) {
									case 'shadowBias':
										tagAttributes.attributes.push({
											name: key,
											value: light['shadow']['bias'],
										});
										break;
									case 'shadowFocus':
										tagAttributes.attributes.push({
											name: key,
											value: light['shadow']['focus'],
										});
										break;
								}
							}
							break;
						case 'shadowMapSizeWidth':
						case 'shadowMapSizeHeight':
							if (ThreeUtil.isNotNull(light['shadow']) && ThreeUtil.isNotNull(light['shadow']['mapSize'])) {
								switch (key) {
									case 'shadowMapSizeWidth':
										tagAttributes.attributes.push({
											name: key,
											value: light['shadow']['mapSize']['width'],
										});
										break;
									case 'shadowMapSizeHeight':
										tagAttributes.attributes.push({
											name: key,
											value: light['shadow']['mapSize']['height'],
										});
										break;
								}
							}
							break;
						case 'angle':
							if (ThreeUtil.isNotNull(light[key])) {
								tagAttributes.attributes.push({ name: key, value: ThreeUtil.getRadian2AngleSafe(light[key]) });
							}
							break;
						case 'shadowCameraNear':
						case 'shadowCameraFar':
						case 'shadowCameraFov':
						case 'shadowCameraLeft':
						case 'shadowCameraRight':
						case 'shadowCameraTop':
						case 'shadowCameraBottom':
						case 'shadowCameraZoom':
							if (ThreeUtil.isNotNull(light['shadow']) && ThreeUtil.isNotNull(light['shadow']['camera'])) {
								switch (key) {
									case 'shadowCameraNear':
										tagAttributes.attributes.push({
											name: key,
											value: light['shadow']['camera']['near'],
										});
										break;
									case 'shadowCameraFar':
										tagAttributes.attributes.push({
											name: key,
											value: light['shadow']['camera']['far'],
										});
										break;
									case 'shadowCameraFov':
										tagAttributes.attributes.push({
											name: key,
											value: light['shadow']['camera']['fov'],
										});
										break;
									case 'shadowCameraLeft':
										tagAttributes.attributes.push({
											name: key,
											value: light['shadow']['camera']['left'],
										});
										break;
									case 'shadowCameraRight':
										tagAttributes.attributes.push({
											name: key,
											value: light['shadow']['camera']['right'],
										});
										break;
									case 'shadowCameraTop':
										tagAttributes.attributes.push({
											name: key,
											value: light['shadow']['camera']['top'],
										});
										break;
									case 'shadowCameraBottom':
										tagAttributes.attributes.push({
											name: key,
											value: light['shadow']['camera']['bottom'],
										});
										break;
									case 'shadowCameraZoom':
										tagAttributes.attributes.push({
											name: key,
											value: light['shadow']['camera']['zoom'],
										});
										break;
								}
							}
							break;
						default:
							if (ThreeUtil.isNotNull(light[key])) {
								tagAttributes.attributes.push({ name: key, value: light[key] });
							}
							break;
					}
				}
			});
		}
		return tagAttributes;
	}

	/**
	 * Sets parent
	 * @param parent
	 * @returns true if parent
	 */
	public setParent(parent: THREE.Object3D): boolean {
		if (super.setParent(parent)) {
			this.getLight();
			return true;
		}
		return false;
	}

	/**
	 * Applys changes3d
	 * @param changes
	 */
	public applyChanges3d(changes: string[]) {
		if (this.light !== null) {
			if (ThreeUtil.isIndexOf(changes, 'init')) {
				changes = ThreeUtil.pushUniq(changes, ['helper']);
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
	 * Light  of light component
	 */
	private light: THREE.Light = null;

	/**
	 * Gets object3d
	 * @template T
	 * @returns object3d
	 */
	public getObject3d<T extends THREE.Object3D>(): T {
		return this.getLight() as any;
	}

	/**
	 * Gets light
	 * @template T
	 * @returns light
	 */
	public getLight<T extends THREE.Light>(): T {
		if (this.light === null || this._needUpdate) {
			this.needUpdate = false;
			this.light = null;
			let basemesh: THREE.Light = null;
			switch (this.type.toLowerCase()) {
				case 'directionallight':
				case 'directional':
					const directionalLight = new THREE.DirectionalLight(ThreeUtil.getColorSafe(this.color, 0xffffff), ThreeUtil.getTypeSafe(this.intensity, 1));
					basemesh = directionalLight;
					break;
				case 'hemispherelight':
				case 'hemisphere':
					const hemisphereLight = new THREE.HemisphereLight(ThreeUtil.getColorSafe(this.skyColor, this.color, 0xffffff), ThreeUtil.getColorSafe(this.groundColor, this.color, 0xffffff), ThreeUtil.getTypeSafe(this.intensity, 1));
					basemesh = hemisphereLight;
					break;
				case 'lightprobe':
				case 'probe':
					basemesh = new THREE.LightProbe(this.getSh(), ThreeUtil.getTypeSafe(this.intensity, 1));
					if (ThreeUtil.isNotNull(this.texture)) {
						this.unSubscribeRefer('texture');
						const texture = this.texture.getTexture();
						if (ThreeUtil.isTextureLoaded(texture) && texture instanceof THREE.CubeTexture) {
							basemesh.copy(LightProbeGenerator.fromCubeTexture(texture));
						}
						this.subscribeRefer(
							'texture',
							ThreeUtil.getSubscribe(
								this.texture,
								() => {
									if (ThreeUtil.isTextureLoaded(texture) && texture instanceof THREE.CubeTexture) {
										basemesh.copy(LightProbeGenerator.fromCubeTexture(texture));
									}
								},
								'loaded'
							)
						);
					} else if (ThreeUtil.isNotNull(this.renderTarget)) {
						const renderer = this.getThreeRenderer();
						let renderTarget = null;
						if (ThreeUtil.isNotNull(this.renderTarget.getTool)) {
							renderTarget = this.renderTarget.getTool();
						} else if (ThreeUtil.isNotNull(this.renderTarget.getCubeRenderTarget)) {
							renderTarget = this.renderTarget.getCubeRenderTarget();
						} else {
							renderTarget = this.renderTarget;
						}
						if (renderer instanceof THREE.WebGLRenderer && renderTarget instanceof THREE.WebGLCubeRenderTarget) {
							basemesh.copy(LightProbeGenerator.fromCubeRenderTarget(renderer, renderTarget));
						}
					}
					break;
				case 'pointlight':
				case 'point':
					const pointLight = new THREE.PointLight(ThreeUtil.getColorSafe(this.color, 0xffffff), ThreeUtil.getTypeSafe(this.intensity, 1), ThreeUtil.getTypeSafe(this.distance), ThreeUtil.getTypeSafe(this.decay));
					basemesh = pointLight;
					break;
				case 'arealight':
				case 'area':
				case 'rectarealight':
				case 'rectarea':
					basemesh = new THREE.RectAreaLight(ThreeUtil.getColorSafe(this.color, 0xffffff), ThreeUtil.getTypeSafe(this.intensity, 1), ThreeUtil.getTypeSafe(this.width, 10), ThreeUtil.getTypeSafe(this.height, 10));
					break;
				case 'spotlight':
				case 'spot':
					const spotLight = new THREE.SpotLight(ThreeUtil.getColorSafe(this.color, 0xffffff), ThreeUtil.getTypeSafe(this.intensity, 1), ThreeUtil.getTypeSafe(this.distance), ThreeUtil.getAngleSafe(this.angle), ThreeUtil.getTypeSafe(this.penumbra), ThreeUtil.getTypeSafe(this.decay));
					if (ThreeUtil.isNotNull(this.shadowFocus)) {
						spotLight.shadow.focus = ThreeUtil.getTypeSafe(this.shadowFocus, 1);
					}
					basemesh = spotLight;
					break;
				case 'ambientlight':
				case 'ambient':
				default:
					basemesh = new THREE.AmbientLight(ThreeUtil.getColorSafe(this.color, 0x0c0c0c), ThreeUtil.getTypeSafe(this.intensity, 1));
					break;
			}
			if (ThreeUtil.isNotNull(basemesh['target'])) {
				if (ThreeUtil.isNotNull(this.target)) {
					basemesh['target'] = this.getTarget();
				} else if (ThreeUtil.isNotNull(this.targetX) && ThreeUtil.isNotNull(this.targetY) && ThreeUtil.isNotNull(this.targetZ)) {
					basemesh['target'].position.copy(ThreeUtil.getVector3Safe(this.targetX, this.targetY, this.targetZ));
				}
			}
			this.light = basemesh;
			if (this.light instanceof THREE.SpotLight || this.light instanceof THREE.DirectionalLight) {
				const target = this.getTarget();
				if (ThreeUtil.isNotNull(target)) {
					this.light.target = target;
				}
				if (ThreeUtil.isNotNull(this.light.target)) {
					if (this.parent !== null && this.light.target.parent === null && this.parent !== this.light.target) {
						this.parent.add(this.light.target);
					}
				}
			}
			if (this.light.shadow) {
				if (ThreeUtil.isNotNull(this.shadowBias)) {
					this.light.shadow.bias = ThreeUtil.getTypeSafe(this.shadowBias, 0);
				}
				if (ThreeUtil.isNotNull(this.shadowRadius)) {
					this.light.shadow.radius = ThreeUtil.getTypeSafe(this.shadowRadius, 1);
				}
				if (ThreeUtil.isNotNull(this.shadowMapSizeWidth) || ThreeUtil.isNotNull(this.shadowMapSize)) {
					this.light.shadow.mapSize.width = this.getShadowMapSizeWidth(1024);
				}
				if (ThreeUtil.isNotNull(this.shadowMapSizeHeight) || ThreeUtil.isNotNull(this.shadowMapSize)) {
					this.light.shadow.mapSize.height = this.getShadowMapSizeHeight(1024);
				}
				if (this.light.shadow.camera) {
					if (this.light.shadow.camera instanceof THREE.PerspectiveCamera) {
						if (ThreeUtil.isNotNull(this.shadowCameraFov)) {
							this.light.shadow.camera.fov = ThreeUtil.getTypeSafe(this.shadowCameraFov, 50);
						}
						if (ThreeUtil.isNotNull(this.shadowCameraNear)) {
							this.light.shadow.camera.near = ThreeUtil.getTypeSafe(this.shadowCameraNear, 0.5);
						}
						if (ThreeUtil.isNotNull(this.shadowCameraFar)) {
							this.light.shadow.camera.far = ThreeUtil.getTypeSafe(this.shadowCameraFar, 500);
						}
						if (ThreeUtil.isNotNull(this.shadowCameraZoom)) {
							this.light.shadow.camera.zoom = ThreeUtil.getTypeSafe(this.shadowCameraZoom, 1);
						}
					} else if (this.light.shadow.camera instanceof THREE.OrthographicCamera) {
						if (ThreeUtil.isNotNull(this.shadowCameraLeft)) {
							this.light.shadow.camera.left = this.getShadowCameraLeft(-5);
						}
						if (ThreeUtil.isNotNull(this.shadowCameraRight)) {
							this.light.shadow.camera.right = this.getShadowCameraRight(5);
						}
						if (ThreeUtil.isNotNull(this.shadowCameraTop)) {
							this.light.shadow.camera.top = this.getShadowCameraTop(5);
						}
						if (ThreeUtil.isNotNull(this.shadowCameraBottom)) {
							this.light.shadow.camera.bottom = this.getShadowCameraBottom(-5);
						}
						if (ThreeUtil.isNotNull(this.shadowCameraNear)) {
							this.light.shadow.camera.near = ThreeUtil.getTypeSafe(this.shadowCameraNear, 0.5);
						}
						if (ThreeUtil.isNotNull(this.shadowCameraFar)) {
							this.light.shadow.camera.far = ThreeUtil.getTypeSafe(this.shadowCameraFar, 500);
						}
						if (ThreeUtil.isNotNull(this.shadowCameraZoom)) {
							this.light.shadow.camera.zoom = ThreeUtil.getTypeSafe(this.shadowCameraZoom, 1);
						}
					}
				}
				// this.light.shadow.updateMatrices(this.light);
			}
			this.setObject3d(this.light);
		}
		return this.light as T;
	}
}
