import { Component, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { ProgressiveLightMap } from 'three/examples/jsm/misc/ProgressiveLightMap';
import { ShadowMesh } from 'three/examples/jsm/objects/ShadowMesh';
import { ShadowMapViewer } from 'three/examples/jsm/utils/ShadowMapViewer';
import { HelperComponent } from '../helper/helper.component';
import { RendererTimer, ThreeUtil } from '../interface';
import { LightComponent } from '../light/light.component';
import { MeshComponent } from '../mesh/mesh.component';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { ViewerCanvas } from './viewer-canvas';

/**
 * ViewerComponent
 */
@Component({
  selector: 'ngx3js-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
})
export class ViewerComponent extends AbstractSubscribeComponent implements OnInit {
  /**
   * Input  of viewer component
   *
   * Notice - case insensitive.
   * 
   */
  @Input() private type: string = 'shadowmap';

  /**
   * Input  of viewer component
   */
  @Input() private light: LightComponent | MeshComponent | THREE.Light = null;

  /**
   * Input  of viewer component
   */
  @Input() private mesh: MeshComponent | HelperComponent | THREE.Mesh = null;

  /**
   * Input  of viewer component
   */
  @Input() private plane: MeshComponent | HelperComponent | THREE.Object3D | THREE.Plane = null;

  /**
   * Input  of viewer component
   */
  @Input() private x: number | string = 0;

  /**
   * Input  of viewer component
   */
  @Input() private y: number | string = 0;

  /**
   * Input  of viewer component
   */
  @Input() private width: number | string = '100%';

  /**
   * Input  of viewer component
   */
  @Input() private height: number | string = '100%';

  /**
   * Input  of viewer component
   */
  @Input() private lightMapRes: number = 1024;

  /**
   * Input  of viewer component
   */
  @Input() private blendWindow: number = 200;

  /**
   * Input  of viewer component
   */
  @Input() private blurEdges: boolean = true;

  /**
   * Input  of viewer component
   */
  @Input() private debugLightmap: boolean = false;

  /**
   * Input  of viewer component
   */
  @Input() private canvasOptions: any = null;

  /**
   * Gets light
   * @returns light
   */
  private getLight(): THREE.Light {
    this.unSubscribeRefer('light');
    if (ThreeUtil.isNotNull(this.light)) {
      const light = ThreeUtil.getLight(this.light);
      this.subscribeRefer(
        'light',
        ThreeUtil.getSubscribe(
          this.light,
          () => {
            this.needUpdate = true;
          },
          'light'
        )
      );
      return light;
    }
    return new THREE.PointLight();
  }

  /**
   * Gets mesh
   * @returns mesh
   */
  private getMesh(): THREE.Mesh {
    this.unSubscribeRefer('mesh');
    if (ThreeUtil.isNotNull(this.mesh)) {
      const mesh = ThreeUtil.getMesh(this.mesh);
      this.subscribeRefer(
        'mesh',
        ThreeUtil.getSubscribe(
          this.mesh,
          () => {
            this.needUpdate = true;
          },
          'mesh'
        )
      );
      return mesh;
    }
    return new THREE.Mesh();
  }

  /**
   * Gets plane
   * @returns plane
   */
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
              this.needUpdate = true;
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

  /**
   * Gets x
   * @param [def]
   * @returns x
   */
  private getX(def?: number | string): number {
    const x = this.getViewPortSize(this.x, this.rendererWidth, def);
    if (x < 0) {
      return this.rendererWidth - this.getWidth() + x;
    } else {
      return x;
    }
  }

  /**
   * Gets y
   * @param [def]
   * @returns y
   */
  private getY(def?: number | string): number {
    const y = this.getViewPortSize(this.y, this.rendererHeight, def);
    if (y < 0) {
      return this.rendererHeight - this.getHeight() + y;
    } else {
      return y;
    }
  }

  /**
   * Gets width
   * @param [def]
   * @returns width
   */
  private getWidth(def?: number | string): number {
    return this.getViewPortSize(this.width, this.rendererWidth, def);
  }

  /**
   * Gets height
   * @param [def]
   * @returns height
   */
  private getHeight(def?: number | string): number {
    return this.getViewPortSize(this.height, this.rendererHeight, def);
  }

  /**
   * Gets view port size
   * @param size
   * @param cameraSize
   * @param [def]
   * @returns view port size
   */
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

  /**
   * Creates an instance of viewer component.
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
    super.ngOnInit('viewer');
  }

  /**
   * A callback method that performs custom clean-up, invoked immediately
   * before a directive, pipe, or service instance is destroyed.
   */
  ngOnDestroy(): void {
    if (this.viewer !== null && ThreeUtil.isNotNull(this.viewer.dispose)) {
      this.viewer.dispose();
    }
    this.viewer = null;
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
    if (changes && this.viewer) {
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
   * Renderer  of viewer component
   */
  private renderer: THREE.Renderer = null;

  /**
   * Sets renderer
   * @param renderer
   */
  public setRenderer(renderer: THREE.Renderer) {
    this.renderer = renderer;
    this.getViewer();
  }

  /**
   * Gets renderer
   * @returns renderer
   */
  public getRenderer(): THREE.Renderer {
    return this.renderer;
  }

  /**
   * Viewer  of viewer component
   */
  private viewer: any = null;

  /**
   * Renderer width of viewer component
   */
  private rendererWidth: number = 0;

  /**
   * Renderer height of viewer component
   */
  private rendererHeight: number = 0;

  /**
   * Sets viewer size
   * @param width
   * @param height
   */
  public setViewerSize(width: number, height: number) {
    this.rendererWidth = width;
    this.rendererHeight = height;
  }

  /**
   * Resizes viewer
   */
  public resizeViewer() {
    if (this.viewer !== null) {
      switch (this.type.toLowerCase()) {
        case 'canvas':
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

  /**
   * Applys changes
   * @param changes
   * @returns
   */
  protected applyChanges(changes: string[]) {
    if (this.viewer !== null) {
      if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
        this.getViewer();
        return;
      }
      if (!ThreeUtil.isOnlyIndexOf(changes, ['x', 'y', 'width', 'height', 'canvasoptions'], this.OBJECT_ATTR)) {
        this.needUpdate = true;
        return;
      }
      if (ThreeUtil.isIndexOf(changes, ['x', 'y', 'width', 'height'])) {
        changes = ThreeUtil.pushUniq(changes, ['reset']);
      }
      changes.forEach((change) => {
        switch (change.toLowerCase()) {
          case 'reset':
            this.resizeViewer();
            break;
          case 'canvasoptions':
            if (this.viewer instanceof ViewerCanvas) {
              this.viewer.setOptions(this.canvasOptions);
            }
            break;
        }
      });
      super.applyChanges(changes);
    }
  }


  /**
   * Gets viewer
   * @returns
   */
  public getViewer() {
    if (this.viewer === null || this._needUpdate) {
      if (this.viewer !== null) {
        if (ThreeUtil.isNotNull(this.viewer.parent)) {
          this.viewer.parent.remove(this.viewer);
        }
        if (ThreeUtil.isNotNull(this.viewer.dispose)) {
          this.viewer.dispose();
        }
      }
      this.needUpdate = false;
      this.unSubscribeRefer('referTarget');
      this.unSubscribeRefer('light');
      this.unSubscribeRefer('mesh');
      switch (this.type.toLowerCase()) {
        case 'canvas':
          this.viewer = new ViewerCanvas(this.renderer, this.canvasOptions);
          this.resizeViewer();
          break;
        case 'shadowmapviewer':
        case 'shadowmap':
          this.viewer = new ShadowMapViewer(this.getLight());
          this.resizeViewer();
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
          break;
        case 'progressivelightmap':
        case 'progressivelight':
          const progressiveSurfacemap = new ProgressiveLightMap(this.getRenderer() as THREE.WebGLRenderer, ThreeUtil.getTypeSafe(this.lightMapRes, 1024));
          const lightmapObjects = [];
          progressiveSurfacemap.addObjectsToLightMap(lightmapObjects);
          this.viewer = progressiveSurfacemap;
          break;
        default:
          break;
      }
      this.setObject(this.viewer);
    }
    return this.viewer;
  }

  /**
   * Ref light of viewer component
   */
  private _refLight: THREE.Light = null;

  /**
   * Ref plane of viewer component
   */
  private _refPlane: THREE.Plane = null;

  /**
   * Ref light position of viewer component
   */
  private _refLightPosition: THREE.Vector4 = null;

  /**
   * Updates viewer component
   * @param _
   */
  public update(_: RendererTimer) {
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

  /**
   * Gets scene
   * @param [scenes]
   * @returns scene
   */
  public getScene(scenes?: QueryList<any> | any): THREE.Scene {
    if (ThreeUtil.isNotNull(scenes)) {
      if (scenes instanceof QueryList && scenes.length > 0) {
        return scenes.first.getScene();
      } else if (scenes instanceof THREE.Scene) {
        return scenes;
      } else if (ThreeUtil.isNotNull(scenes.getScene)) {
        return scenes.getScene();
      }
    }
    return new THREE.Scene();
  }

  /**
   * Gets camera
   * @param [cameras]
   * @returns camera
   */
  public getCamera(cameras?: QueryList<any> | any): THREE.Camera {
    if (ThreeUtil.isNotNull(cameras)) {
      if (cameras instanceof QueryList && cameras.length > 0) {
        return cameras.first.getCamera();
      } else if (cameras instanceof THREE.Camera) {
        return cameras;
      } else if (ThreeUtil.isNotNull(cameras.getCamera)) {
        return cameras.getCamera();
      }
    }
    return new THREE.Camera();
  }

  /**
   * Renders viewer component
   * @param renderer
   * @param scenes
   * @param cameras
   * @param [renderTimer]
   */
  public render(renderer: THREE.Renderer, scenes: QueryList<any> | any, cameras: QueryList<any> | any, renderTimer?: RendererTimer) {
    if (this.viewer !== null && this.enabled) {
      switch (this.type.toLowerCase()) {
        case 'shadowmapviewer':
        case 'shadowmap':
          this.viewer.render(renderer);
          break;
        case 'canvas':
          {
            const scene = this.getScene(scenes);
            const camera = this.getCamera(cameras);
            this.viewer.render(renderer, scene, camera);
          }
          break;
        case 'progressivelightmap':
        case 'progressivelight':
          if (this.viewer instanceof ProgressiveLightMap) {
            const camera = this.getCamera(cameras);
            this.viewer.update(camera, ThreeUtil.getTypeSafe(this.blendWindow, 200), ThreeUtil.getTypeSafe(this.blurEdges, true));
            if (!this.viewer.firstUpdate) {
              this.viewer.showDebugLightmap(ThreeUtil.getTypeSafe(this.debugLightmap, false));
            }
          }
          break;
        default:
          break;
      }
    }
  }
}
