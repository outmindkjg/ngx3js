import { Component, ContentChildren, forwardRef, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { LightProbeGenerator } from 'three/examples/jsm/lights/LightProbeGenerator.js';
import { AbstractObject3dComponent } from '../object3d.abstract';
import { TextureComponent } from '../texture/texture.component';
import { TagAttributes, ThreeUtil } from './../interface';

@Component({
  selector: 'three-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.scss'],
  providers: [{ provide: AbstractObject3dComponent, useExisting: forwardRef(() => LightComponent) }],
})
export class LightComponent extends AbstractObject3dComponent implements OnInit {
  @Input() public type: string = 'spot';
  @Input() private color: string | number = null;
  @Input() private skyColor: string | number = null;
  @Input() private groundColor: string | number = null;
  @Input() private intensity: number = null;
  @Input() private distance: number = null;
  @Input() private angle: number = null;
  @Input() private penumbra: number = null;
  @Input() private decay: number = null;
  @Input() private width: number = null;
  @Input() private height: number = null;
  @Input() private shadowBias: number = null;
  @Input() private shadowRadius: number = null;
  @Input() private shadowFocus: number = null;
  @Input() private shadowCameraNear: number = null;
  @Input() private shadowMapSize: number = null;
  @Input() private shadowMapSizeWidth: number = null;
  @Input() private shadowMapSizeHeight: number = null;
  @Input() private shadowCameraFar: number = null;
  @Input() private shadowCameraFov: number = null;
  @Input() private shadowCameraLeft: number = null;
  @Input() private shadowCameraRight: number = null;
  @Input() private shadowCameraTop: number = null;
  @Input() private shadowCameraBottom: number = null;
  @Input() private shadowCameraZoom: number = null;
  @Input() private sh: string = null;
  @Input() private texture: TextureComponent = null;
  @Input() private target: any = null;
  @Input() private renderer: any = null;
  @Input() private renderTarget: any = null;

  private getIntensity(def?: number): number {
    return ThreeUtil.getTypeSafe(this.intensity, def);
  }

  private getDistance(def?: number): number {
    return ThreeUtil.getTypeSafe(this.distance, def);
  }

  private getAngle(def?: number): number {
    return ThreeUtil.getAngleSafe(this.angle, def);
  }

  private getPenumbra(def?: number): number {
    return ThreeUtil.getTypeSafe(this.penumbra, def);
  }

  private getDecay(def?: number): number {
    return ThreeUtil.getTypeSafe(this.decay, def);
  }

  private getWidth(def?: number): number {
    return ThreeUtil.getTypeSafe(this.width, def);
  }

  private getHeight(def?: number): number {
    return ThreeUtil.getTypeSafe(this.height, def);
  }

  private getColor(def?: string | number): THREE.Color {
    return ThreeUtil.getColorSafe(this.color, def);
  }

  private getSkyColor(def?: string | number): THREE.Color {
    return ThreeUtil.getColorSafe(this.skyColor, this.color, def);
  }

  private getGroundColor(def?: string | number): THREE.Color {
    return ThreeUtil.getColorSafe(this.groundColor, this.color, def);
  }

  private getShadowMapSizeWidth(def?: number): number {
    return ThreeUtil.getTypeSafe(this.shadowMapSizeWidth, this.shadowMapSize, def);
  }

  private getShadowMapSizeHeight(def?: number): number {
    return ThreeUtil.getTypeSafe(this.shadowMapSizeHeight, this.shadowMapSize, def);
  }

  private getShadowCameraNear(def?: number): number {
    return ThreeUtil.getTypeSafe(this.shadowCameraNear, def);
  }

  private getShadowCameraFar(def?: number): number {
    return ThreeUtil.getTypeSafe(this.shadowCameraFar, def);
  }

  private getShadowCameraFov(def?: number): number {
    return ThreeUtil.getTypeSafe(this.shadowCameraFov, def);
  }

  private getShadowCameraLeft(def?: number): number {
    if (ThreeUtil.isNotNull(this.shadowCameraLeft)) {
      return ThreeUtil.getTypeSafe(this.shadowCameraLeft, def);
    } else if (ThreeUtil.isNotNull(this.shadowCameraRight)) {
      return ThreeUtil.getTypeSafe(this.shadowCameraRight * -1, def);
    } else {
      return def;
    }
  }

  private getShadowCameraRight(def?: number): number {
    if (ThreeUtil.isNotNull(this.shadowCameraRight)) {
      return ThreeUtil.getTypeSafe(this.shadowCameraRight, def);
    } else if (ThreeUtil.isNotNull(this.shadowCameraLeft)) {
      return ThreeUtil.getTypeSafe(this.shadowCameraLeft * -1, def);
    } else {
      return def;
    }
  }

  private getShadowCameraTop(def?: number): number {
    if (ThreeUtil.isNotNull(this.shadowCameraTop)) {
      return ThreeUtil.getTypeSafe(this.shadowCameraTop, def);
    } else if (ThreeUtil.isNotNull(this.shadowCameraBottom)) {
      return ThreeUtil.getTypeSafe(this.shadowCameraBottom * -1, def);
    } else {
      return def;
    }
  }

  private getShadowCameraBottom(def?: number): number {
    if (ThreeUtil.isNotNull(this.shadowCameraBottom)) {
      return ThreeUtil.getTypeSafe(this.shadowCameraBottom, def);
    } else if (ThreeUtil.isNotNull(this.shadowCameraTop)) {
      return ThreeUtil.getTypeSafe(this.shadowCameraTop * -1, def);
    } else {
      return def;
    }
  }

  private getShadowCameraZoom(def?: number): number {
    return ThreeUtil.getTypeSafe(this.shadowCameraZoom, def);
  }

  private getShadowBias(def?: number): number {
    return ThreeUtil.getTypeSafe(this.shadowBias, def);
  }

  private getShadowRadius(def?: number): number {
    return ThreeUtil.getTypeSafe(this.shadowRadius, def);
  }

  private getShadowFocus(def?: number): number {
    return ThreeUtil.getTypeSafe(this.shadowFocus, def);
  }

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

  private getTarget(): THREE.Object3D {
    if (ThreeUtil.isNotNull(this.target)) {
      if (this.target.getObject3d) {
        return this.target.getObject3d();
      } else if (this.target instanceof THREE.Object3D) {
        return this.target;
      }
    }
    return undefined;
  }

  getThreeRenderer(): THREE.Renderer {
    if (ThreeUtil.isNotNull(this.renderer) && ThreeUtil.isNotNull(this.renderer.getRenderer)) {
      return this.renderer.getRenderer();
    } else {
      return ThreeUtil.getRenderer();
    }
  }

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit('light');
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.light) {
      this.addChanges(changes);
    }
  }

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }

  getTagAttribute(options: any = {}) {
    const tagAttributes: TagAttributes = {
      tag: 'three-light',
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

  setParent(parent: THREE.Object3D): boolean {
    if (super.setParent(parent)) {
      this.getLight();
      return true;
    }
    return false;
  }

  applyChanges3d(changes: string[]) {
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

  private light: THREE.Light = null;
  
  getObject3d<T extends THREE.Object3D>(): T {
    return this.getLight() as any;
  }
  
  getLight<T extends THREE.Light>(): T {
    if (this.light === null || this._needUpdate) {
      this.needUpdate = false;
      this.light = null;
      let basemesh: THREE.Light = null;
      switch (this.type.toLowerCase()) {
        case 'directionallight':
        case 'directional':
          basemesh = new THREE.DirectionalLight(this.getColor(0xffffff), this.getIntensity(1));
          break;
        case 'hemispherelight':
        case 'hemisphere':
          basemesh = new THREE.HemisphereLight(this.getSkyColor(0xffffff), this.getGroundColor(0xffffff), this.getIntensity(1));
          break;
        case 'lightprobe':
        case 'probe':
          basemesh = new THREE.LightProbe(this.getSh(), this.getIntensity(1));
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
          basemesh = new THREE.PointLight(this.getColor(0xffffff), this.getIntensity(1), this.getDistance(), this.getDecay());
          break;
        case 'arealight':
        case 'area':
        case 'rectarealight':
        case 'rectarea':
          basemesh = new THREE.RectAreaLight(this.getColor(0xffffff), this.getIntensity(1), this.getWidth(10), this.getHeight(10));
          break;
        case 'spotlight':
        case 'spot':
          const spotLight = new THREE.SpotLight(this.getColor(0xffffff), this.getIntensity(1), this.getDistance(), this.getAngle(), this.getPenumbra(), this.getDecay());
          if (ThreeUtil.isNotNull(this.shadowFocus)) {
            spotLight.shadow.focus = this.getShadowFocus(1);
          }
          basemesh = spotLight;
          break;
        case 'ambientlight':
        case 'ambient':
        default:
          basemesh = new THREE.AmbientLight(this.getColor(0x0c0c0c), this.getIntensity(1));
          break;
      }
      this.light = basemesh;
      if (this.light instanceof THREE.SpotLight || this.light instanceof THREE.DirectionalLight) {
        const target = this.getTarget();
        if (ThreeUtil.isNotNull(target)) {
          this.light.target = target;
        }
        if (ThreeUtil.isNotNull(this.light.target)) {
          if (this.parent !== null && this.light.target.parent == null && this.parent !== this.light.target) {
            this.parent.add(this.light.target);
          }
        }
      }
      if (this.light.shadow) {
        if (ThreeUtil.isNotNull(this.shadowBias)) {
          this.light.shadow.bias = this.getShadowBias(0);
        }
        if (ThreeUtil.isNotNull(this.shadowRadius)) {
          this.light.shadow.radius = this.getShadowRadius(1);
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
              this.light.shadow.camera.fov = this.getShadowCameraFov(50);
            }
            if (ThreeUtil.isNotNull(this.shadowCameraNear)) {
              this.light.shadow.camera.near = this.getShadowCameraNear(0.5);
            }
            if (ThreeUtil.isNotNull(this.shadowCameraFar)) {
              this.light.shadow.camera.far = this.getShadowCameraFar(500);
            }
            if (ThreeUtil.isNotNull(this.shadowCameraZoom)) {
              this.light.shadow.camera.zoom = this.getShadowCameraZoom(1);
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
              this.light.shadow.camera.near = this.getShadowCameraNear(0.5);
            }
            if (ThreeUtil.isNotNull(this.shadowCameraFar)) {
              this.light.shadow.camera.far = this.getShadowCameraFar(500);
            }
            if (ThreeUtil.isNotNull(this.shadowCameraZoom)) {
              this.light.shadow.camera.zoom = this.getShadowCameraZoom(1);
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
