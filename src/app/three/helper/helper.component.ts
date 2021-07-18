import { Component, forwardRef, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { CSM } from 'three/examples/jsm/csm/CSM';
import { CSMHelper } from 'three/examples/jsm/csm/CSMHelper';
import { LightProbeHelper } from 'three/examples/jsm/helpers/LightProbeHelper';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper';
import { VertexTangentsHelper } from 'three/examples/jsm/helpers/VertexTangentsHelper';
import { Gyroscope } from 'three/examples/jsm/misc/Gyroscope';
import { AbstractObject3dComponent } from '../object3d.abstract';
import { ThreeUtil } from './../interface';
import { PositionalAudioHelper } from 'three/examples/jsm/helpers/PositionalAudioHelper';

@Component({
  selector: 'ngx3js-helper',
  templateUrl: './helper.component.html',
  styleUrls: ['./helper.component.scss'],
  providers: [{ provide: AbstractObject3dComponent, useExisting: forwardRef(() => HelperComponent) }],
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
  @Input() private depthWrite: boolean = null;
  @Input() private materialColor: string | number = null;
  @Input() private materialBlending: string = null;
  @Input() private materialTransparent: boolean = null;
  @Input() private dirX: number = null;
  @Input() private dirY: number = null;
  @Input() private dirZ: number = null;
  @Input() private originX: number = null;
  @Input() private originY: number = null;
  @Input() private originZ: number = null;
  @Input() private arrowFrom: any = null;
  @Input() private arrowTo: any = null;
  @Input() private length: number = null;
  @Input() private headLength: number = null;
  @Input() private headWidth: number = null;
  @Input() private matrix: THREE.Matrix4 = null;
  @Input() private children: any[] = null;
  @Input() private control: any = null;
  @Input() private range: number = null;
  @Input() private divisionsInnerAngle: number = null;
  @Input() private divisionsOuterAngle: number = null;

  private getTarget(target?: THREE.Object3D): THREE.Object3D {
    this.unSubscribeRefer('target');
    let targetMesh: THREE.Object3D = null;
    if (this.targetMesh !== null) {
      targetMesh = ThreeUtil.getObject3d(this.targetMesh, false);
    }
    if (targetMesh === null && ThreeUtil.isNotNull(this.target)) {
      targetMesh = ThreeUtil.getObject3d(this.target, false);
      this.subscribeRefer('target', ThreeUtil.getSubscribe(this.target, () => {
        this.needUpdate = true;
      },'loaded'));
    }
    if (targetMesh === null && ThreeUtil.isNotNull(target)) {
      targetMesh = ThreeUtil.getObject3d(target, false);
    }
    if (ThreeUtil.isNotNull(targetMesh) && targetMesh instanceof THREE.Object3D && ThreeUtil.isNotNull(targetMesh.userData.refTarget)) {
      targetMesh = ThreeUtil.getObject3d(targetMesh.userData.refTarget, false) || targetMesh;
    }
    return targetMesh;
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

  private getColor1(def?: string | number | THREE.Color): THREE.Color {
    return ThreeUtil.getColorSafe(this.color1, this.color, def);
  }

  private getColor2(def?: string | number | THREE.Color): THREE.Color {
    return ThreeUtil.getColorSafe(this.color2, this.color1 || this.color, def);
  }

  private getOpacity(def?: number): number {
    return ThreeUtil.getTypeSafe(this.opacity, def);
  }

  private getDepthWrite(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.depthWrite, def);
  }

  private getDir(def?: THREE.Vector3): THREE.Vector3 {
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

  private getObjectPosition(obj: any): THREE.Vector3 {
    if (ThreeUtil.isNotNull(obj)) {
      if (obj instanceof THREE.Vector3) {
        return obj;
      } else if (ThreeUtil.isNotNull(obj.getPosition)) {
        return obj.getPosition();
      }
    }
    return new THREE.Vector3(0, 0, 0);
  }

  private getLength(def?: number): number {
    return ThreeUtil.getTypeSafe(this.length, def);
  }

  private getHeadLength(def?: number): number {
    return ThreeUtil.getTypeSafe(this.headLength, def);
  }

  private getHeadWidth(def?: number): number {
    return ThreeUtil.getTypeSafe(this.headWidth, def);
  }

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit('helper');
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.helper) {
      this.addChanges(changes);
    }
  }

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }

  private targetMesh: THREE.Mesh = null;

  setUpdate() {
    const helper: any = this.helper;
    if (ThreeUtil.isNotNull(helper.update)) {
      setTimeout(() => {
        helper.update();
      }, 100);
    }
  }

  private helper: THREE.Object3D = null;

  setParent(parent: THREE.Object3D): boolean {
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

  applyChanges3d(changes: string[]) {
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

  getObject3d<T extends THREE.Object3D>(): T {
    return this.getHelper();
  }

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
          basemesh = new THREE.ArrowHelper(this.getDir(new THREE.Vector3(0, 0, 1)), this.getOrigin(new THREE.Vector3(0, 0, 0)), this.getLength(1), this.getColor(0xffff00), this.getHeadLength(), this.getHeadWidth());
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
            const positionalAudioHelper = new PositionalAudioHelper(audioTarget, this.range, this.divisionsInnerAngle, this.divisionsOuterAngle);
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
            switch (this.type.toLowerCase()) {
              case 'vertextangentshelper':
              case 'vertextangents':
                basemesh = new VertexTangentsHelper(this.getTarget(this.parent), this.getSize(), this.getColorHex());
                break;
              case 'vertexnormalshelper':
              case 'vertexnormals':
              default:
                basemesh = new VertexNormalsHelper(this.getTarget(this.parent), this.getSize(), this.getColorHex());
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
