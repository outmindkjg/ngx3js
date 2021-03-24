import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import * as THREE from 'three';
import { LightProbeGenerator } from 'three/examples/jsm/lights/LightProbeGenerator.js';
import { HelperComponent } from '../helper/helper.component';
import { AbstractObject3dComponent } from '../object3d.abstract';
import { TextureComponent } from '../texture/texture.component';
import { ThreeUtil } from './../interface';
import { MixerComponent } from './../mixer/mixer.component';

@Component({
  selector: 'three-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.scss'],
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
  @Input() private castShadow: boolean = true;
  @Input() private shadowBias: number = null;
  @Input() private shadowCameraNear: number = null;
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
  
  @Output() private onLoad: EventEmitter<LightComponent> = new EventEmitter<LightComponent>();
  @ContentChildren(MixerComponent, { descendants: false }) mixer: QueryList<MixerComponent>;
  @ContentChildren(HelperComponent, { descendants: false }) private helpers: QueryList<HelperComponent>;

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
    return ThreeUtil.getColorSafe(this.skyColor, def);
  }

  private getGroundColor(def?: string | number): THREE.Color {
    return ThreeUtil.getColorSafe(this.groundColor, def);
  }

  private getShadowMapSizeWidth(def?: number): number {
    return ThreeUtil.getTypeSafe(this.shadowMapSizeWidth, def);
  }

  private getShadowMapSizeHeight(def?: number): number {
    return ThreeUtil.getTypeSafe(this.shadowMapSizeHeight, def);
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
    return ThreeUtil.getTypeSafe(this.shadowCameraLeft, def);
  }

  private getShadowCameraRight(def?: number): number {
    return ThreeUtil.getTypeSafe(this.shadowCameraRight, def);
  }

  private getShadowCameraTop(def?: number): number {
    return ThreeUtil.getTypeSafe(this.shadowCameraTop, def);
  }

  private getShadowCameraBottom(def?: number): number {
    return ThreeUtil.getTypeSafe(this.shadowCameraBottom, def);
  }

  private getShadowCameraZoom(def?: number): number {
    return ThreeUtil.getTypeSafe(this.shadowCameraZoom, def);
  }
  
  private getShadowBias(def?: number): number {
    return ThreeUtil.getTypeSafe(this.shadowBias, def);
  }

  private getSh(def?: string): THREE.SphericalHarmonics3 {
    const sh = ThreeUtil.getTypeSafe(this.sh, def, '');
    if (ThreeUtil.isNotNull(sh) && sh != '') {
      switch(sh.toLowerCase()) {
        case 'harmonics3' : 
          return new THREE.SphericalHarmonics3();
      }
    }
    return undefined;
  }
  

  private getTarget(def?: number): THREE.Object3D {
    const target = ThreeUtil.getTypeSafe(this.target, def);
    if (target !== null && target !== undefined) {
      if (target.getObject3D) {
        return target.getObject3D();
      }
    }
    return null;
  }

  getThreeRenderer(): THREE.Renderer {
    if (ThreeUtil.isNotNull(this.renderer) && ThreeUtil.isNotNull(this.renderer.getRenderer)) {
      return this.renderer.getRenderer();
    } else {
      return ThreeUtil.getRenderer()
    }
  }

  constructor() {
    super();
  }

  ngOnInit(): void {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes) {
			if (this.light !== null) {
        this.needsUpdate = true;
			}
      this.resetLight();
		}
		super.ngOnChanges(changes);
	}


  setLightParams(params : { [key : string] : any } ) {
    Object.entries(params).forEach(([key, value]) => {
      if (this[key] !== undefined) {
        this[key] = value;
      }
    });
  }

  setParent(parent: THREE.Object3D, isRestore: boolean = false) : boolean {
    if (super.setParent(parent)) {
      this.resetLight(true);
      return true;
    }
    return false;
  }

  ngAfterContentInit(): void {
    this.helpers.changes.subscribe((e) => {
      this.synkObject3D(['helpers']);
    });
    super.ngAfterContentInit();
  }

  synkObject3D(synkTypes: string[]) {
    if (this.light !== null) {
      synkTypes.forEach((synkType) => {
        switch (synkType) {
          case 'helpers':
            if (this.helpers !== null && this.helpers !== undefined) {
              this.helpers.forEach((helper) => {
                helper.setParent(this.light);
              });
            }
            break;
        }
      });
      super.synkObject3D(synkTypes);
    }
  }

  resetLight(clearLight: boolean = false) {
    if (this.parent !== null) {
      if (clearLight && this.light !== null && this.light.parent) {
        this.light.parent.remove(this.light);
        this.light = null;
      }
      this.parent.add(this.getLight());
    } else if (this.light !== null && this.needsUpdate) {
      this.getLight();
    }
  }

  private light: THREE.Light = null;
  private needsUpdate : boolean = true;

  getLight(): THREE.Light {
    if (this.light === null || this.needsUpdate) {
      if (this.light !== null && this.light.parent !== null) {
        this.light.parent.remove(this.light);
      }
      this.light = null;
      this.needsUpdate = false;
      let basemesh: THREE.Light = null;
      switch (this.type.toLowerCase()) {
        case 'directional':
          basemesh = new THREE.DirectionalLight(
            this.getColor(0xffffff),
            this.getIntensity(1)
          );
          basemesh.castShadow = this.castShadow;
          break;
        case 'hemisphere':
          basemesh = new THREE.HemisphereLight(
            this.getSkyColor(0xffffff),
            this.getGroundColor(0xffffff),
            this.getIntensity(1)
          );
          break;
        case 'lightprobe':
        case 'probe':
          basemesh = new THREE.LightProbe(this.getSh(), this.getIntensity(1));
          if (ThreeUtil.isNotNull(this.texture)) {
            const texture = this.texture.getTexture();
            if (texture instanceof THREE.CubeTexture) {
              TextureComponent.checkTextureImage(texture, () => {
                basemesh.copy( LightProbeGenerator.fromCubeTexture( texture ) );
              });
            }
          } else if (ThreeUtil.isNotNull(this.renderTarget)){
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
              basemesh.copy( LightProbeGenerator.fromCubeRenderTarget( renderer, renderTarget ));
            }
          }
          break;
        case 'point':
          basemesh = new THREE.PointLight(
            this.getColor(0xffffff),
            this.getIntensity(1),
            this.getDistance(),
            this.getDecay()
          );
          basemesh.castShadow = this.castShadow;
          break;
        case 'area':
        case 'rectarea':
          basemesh = new THREE.RectAreaLight(
            this.getColor(0xffffff),
            this.getIntensity(1),
            this.getWidth(10),
            this.getHeight(10)
          );
          break;
        case 'spot':
          basemesh = new THREE.SpotLight(
            this.getColor(0xffffff),
            this.getIntensity(1),
            this.getDistance(),
            this.getAngle(),
            this.getPenumbra(),
            this.getDecay()
          );
          basemesh.castShadow = this.castShadow;
          break;
        case 'ambient':
        default:
          basemesh = new THREE.AmbientLight(
            this.getColor(0x0c0c0c),
            this.getIntensity(1)
          );
          break;
      }
      this.light = basemesh;
      if (this.name !== null) {
        this.light.name = this.name;
      }
      this.light.visible = this.visible;
      if (
        this.object3d instanceof THREE.SpotLight ||
        this.object3d instanceof THREE.DirectionalLight
      ) {
        const target = this.getTarget(null);
        if (target != null) {
          this.object3d.target = target;
        }
      }
      if (this.light.shadow) {
        this.light.shadow.bias = this.getShadowBias(0);
        this.light.shadow.mapSize.width = this.getShadowMapSizeWidth(512);
        this.light.shadow.mapSize.height = this.getShadowMapSizeHeight(512);
        if (this.light.shadow.camera) {
          if (this.light.shadow.camera instanceof THREE.PerspectiveCamera) {
            this.light.shadow.camera.fov = this.getShadowCameraFov(50);
            this.light.shadow.camera.near = this.getShadowCameraNear(0.5);
            this.light.shadow.camera.far = this.getShadowCameraFar(500);
            this.light.shadow.camera.zoom = this.getShadowCameraZoom(1);
          } else if (
            this.light.shadow.camera instanceof THREE.OrthographicCamera
          ) {
            this.light.shadow.camera.left = this.getShadowCameraLeft(-5);
            this.light.shadow.camera.right = this.getShadowCameraRight(5);
            this.light.shadow.camera.top = this.getShadowCameraTop(5);
            this.light.shadow.camera.bottom = this.getShadowCameraBottom(-5);
            this.light.shadow.camera.near = this.getShadowCameraNear(0.5);
            this.light.shadow.camera.far = this.getShadowCameraFar(500);
            this.light.shadow.camera.zoom = this.getShadowCameraZoom(1);
          }
        }
        this.light.shadow.updateMatrices(this.light);
      }
      if (ThreeUtil.isNull(this.light.userData.component)) {
        this.light.userData.component = this;
      }
      this.setObject3D(this.light);
      this.synkObject3D(['position', 'rotation', 'scale', 'lookat','helpers']);
      this.onLoad.emit(this);
    }
    return this.light;
  }
}
