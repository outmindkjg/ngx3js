import { ThreeUtil } from './../interface';
import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { AbstractObject3dComponent } from '../object3d.abstract';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper';
import { VertexTangentsHelper } from 'three/examples/jsm/helpers/VertexTangentsHelper';
import { LightProbeHelper } from 'three/examples/jsm/helpers/LightProbeHelper';

import * as THREE from 'three';

@Component({
  selector: 'three-helper',
  templateUrl: './helper.component.html',
  styleUrls: ['./helper.component.scss']
})
export class HelperComponent extends AbstractObject3dComponent implements OnInit {

  @Input() public type: string = 'spot';
  @Input() private color: string | number = null;
  @Input() private target: any = null;
  @Input() private size: number = null;
  @Input() private radius: number = null;
  @Input() private radials: number = null;
  @Input() private circles: number = null;
  @Input() private divisions: number = null;
  @Input() private color1: string | number = null;
  @Input() private color2: string | number = null;
  @Input() private opacity: number = null;
  @Input() private dirX: number = null;
  @Input() private dirY: number = null;
  @Input() private dirZ: number = null;
  @Input() private originX: number = null;
  @Input() private originY: number = null;
  @Input() private originZ: number = null;
  @Input() private length: number = null;
  @Input() private headLength: number = null;
  @Input() private headWidth: number = null;

  @Output() private onLoad: EventEmitter<HelperComponent> = new EventEmitter<HelperComponent>();

  private getTarget(target?: THREE.Object3D): THREE.Object3D {
    if (this.targetMesh !== null) {
      return this.targetMesh;
    } else if (ThreeUtil.isNotNull(this.target)) {
      if (ThreeUtil.isNotNull(this.target.getMesh)) {
        return this.target.getMesh();
      } else if (ThreeUtil.isNotNull(this.target.getLight)) {
        return this.target.getLight();
      } else if (ThreeUtil.isNotNull(this.target.getHelper)) {
        return this.target.getHelper();
      }
    }
    return target;
  }

  private getVisible(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.visible, def);
  }

  private getSize(def?: number): number {
    return ThreeUtil.getTypeSafe(this.size, def);
  }

  private getColor(def?: number | string): THREE.Color {
    return ThreeUtil.getColorSafe(this.color, def);
  }

  private getColorHex(def?: number | string): number {
    const color = this.getColor(def);
    if (ThreeUtil.isNotNull(color)) {
      return color.getHex();
    } else {
      return undefined;
    }
  }

  private getRadius(def?: number): number {
    return ThreeUtil.getTypeSafe(this.radius, def);
  }

  private getRadials(def?: number): number {
    return ThreeUtil.getTypeSafe(this.radials, def);
  }

  private getCircles(def?: number): number {
    return ThreeUtil.getTypeSafe(this.circles, def);
  }

  private getDivisions(def?: number): number {
    return ThreeUtil.getTypeSafe(this.divisions, def);
  }

  private getColor1(def?: string | number | THREE.Color ): THREE.Color {
    return ThreeUtil.getColorSafe(this.color1, def);
  }

  private getColor2(def?: string | number | THREE.Color ): THREE.Color {
    return ThreeUtil.getColorSafe(this.color2, def);
  }

  private getOpacity(def?: number ): number {
    return ThreeUtil.getTypeSafe(this.opacity, def);
  }

  private getDir(def?: THREE.Vector3 ): THREE.Vector3 {
    return ThreeUtil.getTypeSafe(ThreeUtil.getVector3Safe(this.dirX, this.dirY, this.dirZ), def);
  }

  private getOrigin(def?: THREE.Vector3 ): THREE.Vector3 {
    return ThreeUtil.getTypeSafe(ThreeUtil.getVector3Safe(this.originX, this.originY, this.originZ), def);
  }

  private getLength(def?: number ): number {
    return ThreeUtil.getTypeSafe(this.length, def);
  }

  private getHeadLength(def?: number ): number {
    return ThreeUtil.getTypeSafe(this.headLength, def);
  }

  private getHeadWidth(def?: number ): number {
    return ThreeUtil.getTypeSafe(this.headWidth, def);
  }

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  private targetMesh : THREE.Mesh = null;

  private needsUpdate : boolean = true;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (changes.target && this.target !== null && this.target.meshSubscribe) {
        this.target.meshSubscribe().subscribe((mesh) => {
          this.targetMesh = mesh;
          this.needsUpdate = true;
          this.resetHelper();
        })
      }
      this.needsUpdate = true;
      this.resetHelper();
    }
    super.ngOnChanges(changes);
  }

  setHelperParams(params : { [key : string] : any } ) {
    Object.entries(params).forEach(([key, value]) => {
      if (this[key] !== undefined) {
        this[key] = value;
      }
    });
  }

  setParent(parent: THREE.Object3D, isRestore: boolean = false):boolean {
    if (super.setParent(parent, isRestore)) {
      this.resetHelper(true);
      return true;
    }
    return false;
  }

  setUpdate() {
    if (this.helper !== null) {
      if (this.helper instanceof THREE.CameraHelper) {
        this.helper.update();
      }
    }
  }

  resetHelper(clearMesh: boolean = false) {
    if (this.parent !== null) {
      if (clearMesh && this.helper !== null && this.helper.parent) {
        this.helper.parent.remove(this.helper);
        this.helper = null;
      }
      if (this.parent instanceof THREE.Object3D) {
        if (this.parent.parent !== null) {
          if (this.parent.parent.parent !== null) {
            this.parent.parent.parent.add(this.getHelper());
          } else {
            this.parent.parent.add(this.getHelper());
          }
        } else {
          this.parent.add(this.getHelper());
          console.log(this.parent);
        }
      }
    } else if (this.needsUpdate && this.helper !== null) {
      this.getHelper();
    }
  }


  private helper : THREE.Object3D = null;

  public getHelper(): THREE.Object3D {
    if (this.helper === null || this.needsUpdate) {
      this.needsUpdate = false;
      if (this.helper !== null && this.helper.parent) {
        this.helper.parent.remove(this.helper);
      }
      if (this.parent !== null) {
        this.parent.updateMatrixWorld( true );
      }
      this.helper = null;
      let basemesh: THREE.Object3D = null;
      switch (this.type.toLowerCase()) {
        case 'arrow':
          basemesh = new THREE.ArrowHelper(
            this.getDir(new THREE.Vector3( 0, 0, 1 )),
            this.getOrigin(new THREE.Vector3( 0, 0, 0 )),
            this.getLength(1),
            this.getColor(0xffff00),
            this.getHeadLength(),
            this.getHeadWidth(),
          );
          break;
        case 'box':
          basemesh = new THREE.BoxHelper(
            this.getTarget(this.parent),
            this.getColor(0xffff00)
          );
          break;
        case 'box3':
          basemesh = new THREE.Box3Helper(null);
          break;
        case 'grid':
          basemesh = new THREE.GridHelper(
            this.getSize(10),
            this.getDivisions(10),
            this.getColor1(0x444444),
            this.getColor2(0x888888)
          );
          break;
        case 'polargrid':
          basemesh = new THREE.PolarGridHelper(
            this.getRadius(10),
            this.getRadials(16),
            this.getCircles(8),
            this.getDivisions(64),
            this.getColor1(0x444444),
            this.getColor2(0x888888),
          );
          basemesh.receiveShadow = true;
          break;
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
        case 'directionallight':
        case 'hemispherelight':
        case 'rectarealight':
        case 'pointlight':
        case 'spotlight':
        case 'lightprobe' :
        case 'light':
          let lightTarget = this.getTarget(this.parent);
          if (lightTarget instanceof THREE.DirectionalLight) {
            const directionalLightHelper = new THREE.DirectionalLightHelper(
              lightTarget,
              this.getSize(10),
              this.getColor()
            );
            setTimeout(() => {
              directionalLightHelper.update();
            },100);
            basemesh = directionalLightHelper;
          } else if (lightTarget instanceof THREE.HemisphereLight) {
            const hemisphereLightHelper = new THREE.HemisphereLightHelper(
              lightTarget,
              this.getSize(10),
              this.getColor()
            );
            setTimeout(() => {
              hemisphereLightHelper.update();
            },100);
            basemesh = hemisphereLightHelper;
          } else if (lightTarget instanceof THREE.PointLight) {
            const pointLightHelper = new THREE.PointLightHelper(
              lightTarget,
              this.getSize(10),
              this.getColor()
            );
            setTimeout(() => {
              pointLightHelper.update();
            },100);
            basemesh = pointLightHelper;
          } else if (lightTarget instanceof THREE.SpotLight) {
            const spotLightHelper = new THREE.SpotLightHelper(
              lightTarget,
              this.getColor()
            );
            setTimeout(() => {
              spotLightHelper.update();
            },100);
            basemesh = spotLightHelper;
          } else if (lightTarget instanceof THREE.RectAreaLight) {
            basemesh = new RectAreaLightHelper(
              lightTarget,
              this.getColor()
            );
          } else if (lightTarget instanceof THREE.LightProbe) {
            basemesh = new LightProbeHelper(
              lightTarget,
              this.getSize(10),
            );
          }
          break;
        case 'plane':
          if (this.parent instanceof THREE.Mesh && this.parent.material instanceof THREE.Material) {
            basemesh = new THREE.Group();
            const clippingPlanes: THREE.Plane[] = this.parent.material.clippingPlanes;
            if (clippingPlanes !== null && clippingPlanes !== undefined) {
              clippingPlanes.forEach(clippingPlane => {
                basemesh.add(new THREE.PlaneHelper(
                  clippingPlane,
                  this.getSize(10),
                  this.getColorHex()
                ));
              });
            }
          } else {
            basemesh = null;
          }
          break;
          case 'vertexnormals' :
          case 'vertextangents' :
            const vertexMesh = this.getTarget(this.parent);
            if (vertexMesh instanceof THREE.Mesh && vertexMesh.geometry instanceof THREE.BufferGeometry && vertexMesh.geometry.attributes.normal) {
              switch (this.type.toLowerCase()) {
                case 'vertextangents' :
                  basemesh = new VertexTangentsHelper(this.getTarget(this.parent), this.getSize(), this.getColorHex());
                  break;
                case 'vertexnormals' :
                default :
                  basemesh = new VertexNormalsHelper(this.getTarget(this.parent), this.getSize(), this.getColorHex());
                  break;
              }
            } else {
              basemesh = new THREE.AxesHelper(this.getSize(10));
            }
            break;
        case 'skeleton':
          basemesh = new THREE.SkeletonHelper(this.getTarget(this.parent));
          break;
        case 'axes':
        default :
          basemesh = new THREE.AxesHelper(this.getSize(10));
          this.parent.add(basemesh);
          break;
      }
      if (basemesh !== null) {
        this.helper = basemesh;
        if (this.helper instanceof THREE.Line && ThreeUtil.isNotNull(this.helper.material) && this.helper.material instanceof THREE.Material) {
          const opacity = this.getOpacity(1);
          if (opacity >= 0 && opacity < 1) {
            this.helper.material.opacity = opacity;
            this.helper.material.transparent = true;
          }
        }
        this.helper.visible = this.getVisible(true);
        this.setObject3D(this.helper, false);
        this.synkObject3D([
          'position',
          'rotation',
          'scale',
          'lookat',
          'controller'
        ]);
        this.onLoad.emit(this);
      } else {
        this.helper = null;
      }
    }
    return this.helper;
  }
}
