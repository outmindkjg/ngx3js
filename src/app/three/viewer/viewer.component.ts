import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { ShadowMesh } from 'three/examples/jsm/objects/ShadowMesh';
import { ShadowMapViewer } from 'three/examples/jsm/utils/ShadowMapViewer';
import { HelperComponent } from '../helper/helper.component';
import { RendererTimer, ThreeUtil } from '../interface';
import { LightComponent } from '../light/light.component';
import { MeshComponent } from '../mesh/mesh.component';
import { AbstractSubscribeComponent } from '../subscribe.abstract';

@Component({
  selector: 'three-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
})
export class ViewerComponent extends AbstractSubscribeComponent implements OnInit {
  @Input() private type: string = 'shadowmap';
  @Input() private light: LightComponent | MeshComponent | THREE.Light = null;
  @Input() private mesh: MeshComponent | HelperComponent | THREE.Mesh = null;
  @Input() private plane: MeshComponent | HelperComponent | THREE.Object3D | THREE.Plane = null;
  @Input() private x: number | string = 0;
  @Input() private y: number | string = 0;
  @Input() private width: number | string = '50%';
  @Input() private height: number | string = '50%';

  private getLight(): THREE.Light {
    this.unSubscribeRefer('light');
    if (ThreeUtil.isNotNull(this.light)) {
      const light = ThreeUtil.getLight(this.light);
      this.subscribeRefer(
        'light',
        ThreeUtil.getSubscribe(
          this.light,
          () => {
            this.resetViewer();
          },
          'light'
        )
      );
      return light;
    }
    return new THREE.PointLight();
  }

  private getMesh(): THREE.Mesh {
    this.unSubscribeRefer('mesh');
    if (ThreeUtil.isNotNull(this.mesh)) {
      const mesh = ThreeUtil.getMesh(this.mesh);
      this.subscribeRefer(
        'mesh',
        ThreeUtil.getSubscribe(
          this.mesh,
          () => {
            this.resetViewer();
          },
          'mesh'
        )
      );
      return mesh;
    }
    return new THREE.Mesh();
  }

  private getPlane(): THREE.Plane {
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0.01);
    if (ThreeUtil.isNotNull(this.plane)) {
      let mesh: THREE.Object3D = null;
      if (this.plane instanceof THREE.Plane) {
        plane.copy(this.plane);
      } else if (this.plane instanceof THREE.Mesh) {
        mesh = this.plane;
      } else if (this.plane instanceof MeshComponent) {
        mesh = this.plane.getObject3d();
        this.subscribeRefer(
          'referTarget',
          ThreeUtil.getSubscribe(
            this.plane,
            () => {
              this.resetViewer();
            },
            'mesh'
          )
        );
      }
      if (mesh !== null) {
        mesh.updateMatrixWorld();
        const p1 = new THREE.Vector3(0, 0.01, 0);
        const p2 = new THREE.Vector3(100, 0.01, 0);
        const p3 = new THREE.Vector3(0, 0.01, 100);
        mesh.localToWorld(p1);
        mesh.localToWorld(p2);
        mesh.localToWorld(p3);
        plane.setFromCoplanarPoints(p1, p3, p2);
        plane.constant *= -1;
      }
    }
    return plane;
  }

  private getX(def?: number | string): number {
    const x = this.getViewPortSize(this.x, this.rendererWidth, def);
    if (x < 0) {
      return this.rendererWidth - this.getWidth() + x;
    } else {
      return x;
    }
  }

  private getY(def?: number | string): number {
    const y = this.getViewPortSize(this.y, this.rendererHeight, def);
    if (y < 0) {
      return this.rendererHeight - this.getHeight() + y;
    } else {
      return y;
    }
  }

  private getWidth(def?: number | string): number {
    return this.getViewPortSize(this.width, this.rendererWidth, def);
  }

  private getHeight(def?: number | string): number {
    return this.getViewPortSize(this.height, this.rendererHeight, def);
  }

  private getViewPortSize(size: number | string, cameraSize: number, def?: number | string): number {
    const baseSize = ThreeUtil.getTypeSafe(size, def);
    if (ThreeUtil.isNotNull(baseSize)) {
      let resultSize: number = 0;
      if (typeof baseSize == 'string') {
        if (baseSize.endsWith('%')) {
          resultSize = Math.ceil((cameraSize * parseFloat(baseSize.slice(0, -1))) / 100);
        } else {
          switch (baseSize) {
            case 'x':
              resultSize = this.getX(def);
              break;
            case 'y':
              resultSize = this.getY(def);
              break;
            case 'width':
              resultSize = this.getWidth(def);
              break;
            case 'height':
              resultSize = this.getHeight(def);
              break;
            default:
              resultSize = parseFloat(baseSize);
              break;
          }
        }
      } else {
        resultSize = baseSize;
      }
      return resultSize;
    }
    return 0;
  }

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit('viewer');
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.viewer) {
      this.addChanges(changes);
    }
  }

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }

  parent: THREE.Object3D = null;
  setParent(parent: THREE.Object3D): boolean {
    if (this.parent !== parent && parent !== null) {
      this.parent = parent;
      switch (this.type.toLowerCase()) {
        case 'shadowmesh':
        case 'shadow':
          if (this.viewer === null || this.viewer.parent !== this.parent) {
            this.resetViewer();
          } else {
            this.parent.add(this.viewer);
          }
          break;
        default:
          break;
      }
    }
    return false;
  }

  private viewer: any = null;
  private rendererWidth: number = 0;
  private rendererHeight: number = 0;

  setViewerSize(width: number, height: number) {
    this.rendererWidth = width;
    this.rendererHeight = height;
  }

  resizeViewer() {
    if (this.viewer !== null) {
      switch (this.type.toLowerCase()) {
        case 'shadowmapviewer':
        case 'shadowmap':
          this.viewer.position.x = this.getX();
          this.viewer.position.y = this.getY();
          this.viewer.size.width = this.getWidth();
          this.viewer.size.height = this.getHeight();
          this.viewer.enabled = this.enabled;
          this.viewer.updateForWindowResize();
          break;
        default:
          break;
      }
    }
  }

  resetViewer() {
    if (this.viewer !== null) {
      switch (this.type.toLowerCase()) {
        case 'shadowmesh':
        case 'shadow':
          if (ThreeUtil.isNotNull(this.viewer.parent)) {
            this.viewer.parent.remove(this.viewer);
          }
          break;
        default:
          break;
      }
      this.viewer = null;
      setTimeout(() => {
        if (this.viewer === null) {
          this.getViewer();
        }
      }, 30);
    }
  }

  getViewer() {
    if (this.viewer === null || this._needUpdate) {
      this.needUpdate = false;
      this.unSubscribeRefer('referTarget');
      switch (this.type.toLowerCase()) {
        case 'shadowmapviewer':
        case 'shadowmap':
          this.viewer = new ShadowMapViewer(this.getLight());
          this.resizeViewer();
          super.setObject(this.viewer);
          break;
        case 'shadowmesh':
        case 'shadow':
          const shadowMesh = new ShadowMesh(this.getMesh());
          this._refLight = this.getLight();
          this._refPlane = this.getPlane();
          this._refLightPosition = new THREE.Vector4(0, 0, 0, 0.001);
          this.viewer = shadowMesh;
          if (this.parent !== null) {
            this.parent.add(this.viewer);
          }
          super.setObject(this.viewer);
          break;
        default:
          break;
      }
    }
    return this.viewer;
  }
  private _refLight: THREE.Light = null;
  private _refPlane: THREE.Plane = null;
  private _refLightPosition: THREE.Vector4 = null;

  update(_: RendererTimer) {
    if (this.viewer !== null) {
      switch (this.type.toLowerCase()) {
        case 'shadowmesh':
        case 'shadow':
          if (this._refLight !== null && this._refPlane) {
            this._refLightPosition.x = this._refLight.position.x;
            this._refLightPosition.y = this._refLight.position.y;
            this._refLightPosition.z = this._refLight.position.z;
            this.viewer.update(this._refPlane, this._refLightPosition);
          }
          break;
      }
    }
  }

  render(renderer: THREE.Renderer, renderTimer?: RendererTimer) {
    if (this.viewer !== null) {
      switch (this.type.toLowerCase()) {
        case 'shadowmapviewer':
        case 'shadowmap':
          this.viewer.render(renderer);
          break;
        default:
          break;
      }
    }
  }
}
