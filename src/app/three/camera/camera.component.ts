import { Component, forwardRef, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { CinematicCamera } from 'three/examples/jsm/cameras/CinematicCamera';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { AbstractObject3dComponent } from '../object3d.abstract';
import { RendererTimer, ThreeUtil } from './../interface';
import { LocalStorageService } from './../local-storage.service';

@Component({
  selector: 'ngx3js-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  providers: [{provide: AbstractObject3dComponent, useExisting: forwardRef(() => CameraComponent) }]
})
export class CameraComponent extends AbstractObject3dComponent implements OnInit {
  @Input() public type: string = 'perspective';
  @Input() private active: boolean = true;
  @Input() private fov: number | string = 45;
  @Input() private aspect: number = 1;
  @Input() private focalLength: number = null;
  @Input() private near: number | string = null;
  @Input() private far: number | string = null;
  @Input() private orthoSize: number = 0.5;
  @Input() private left: number = null;
  @Input() private right: number = null;
  @Input() private top: number = null;
  @Input() private bottom: number = null;
  @Input() private zoom: number | string = null;
  @Input() private autoClear: boolean = null;
  @Input() private material: any = null;
  @Input() public controlType: string = 'none';
  @Input() public autoRotate: boolean = null;
  @Input() private scene: any = null;
  @Input() private scenes: any[] = null;
  @Input() private storageName: string = null;
  @Input() private viewport: boolean = false;
  @Input() private viewportType: string = 'renderer';
  @Input() private x: number | string = 0;
  @Input() private y: number | string = 0;
  @Input() private width: number | string = '100%';
  @Input() private height: number | string = '100%';
  @Input() private clearColor: string | number = null;
  @Input() private clearAlpha: number = null;
  @Input() private clearDepth: boolean = null;
  @Input() private clear: boolean = null;
  @Input() private scissorTest: boolean = false;
  @Input() private scissorX: number | string = 0;
  @Input() private scissorY: number | string = 0;
  @Input() private scissorWidth: number | string = '100%';
  @Input() private scissorHeight: number | string = '100%';
  @Input() private referObject3d: AbstractObject3dComponent | THREE.Object3D = null;
  @Input() private onBeforeRender: (timer : RendererTimer) => void = null;
  
  private getFov(def?: number | string): number {
    const fov = ThreeUtil.getTypeSafe(this.fov, def);
    if (typeof fov === 'string') {
      return parseFloat(fov);
    } else {
      return fov;
    }
  }

  private getNear(def?: number | string): number {
    const near = ThreeUtil.getTypeSafe(this.near, def);
    if (typeof near === 'string') {
      return parseFloat(near);
    } else {
      return near;
    }
  }

  private getFar(def?: number | string): number {
    const far = ThreeUtil.getTypeSafe(this.far, def);
    if (typeof far === 'string') {
      return parseFloat(far);
    } else {
      return far;
    }
  }

  private getLeft(width?: number): number {
    return width * ThreeUtil.getTypeSafe(this.left, this.orthoSize * -1);
  }

  private getRight(width?: number): number {
    return width * ThreeUtil.getTypeSafe(this.right, this.orthoSize);
  }

  private getTop(height?: number): number {
    return height * ThreeUtil.getTypeSafe(this.top, this.orthoSize);
  }

  private getBottom(height?: number): number {
    return height * ThreeUtil.getTypeSafe(this.bottom, this.orthoSize * -1);
  }

  private getZoom(def?: number | string): number {
    const zoom = ThreeUtil.getTypeSafe(this.zoom, def, 1);
    if (typeof zoom === 'number') {
      return zoom;
    } else {
      switch (this.type.toLowerCase()) {
        case 'orthographiccamera':
        case 'orthographic':
        case 'ortho':
          switch (zoom.toLowerCase()) {
            case 'auto':
              const fov = THREE.MathUtils.degToRad(this.getFov(50));
              const hyperfocus = (this.getNear(-200) + this.getFar(2000)) / 2;
              const _height = 2 * Math.tan(fov / 2) * hyperfocus;
              return this.getHeight() / _height;
          }
          break;
      }
    }
    return 1;
  }

  private getAspect(width?: number, height?: number): number {
    if (this.viewport) {
      const cWidth = this.getWidth();
      const cHeight = this.getHeight();
      return cWidth / cHeight;
    } else {
      return width > 0 && height > 0 ? (width / height) * this.aspect : 0.5;
    }
  }

  private getX(def?: number | string): number {
    const x = this.getViewPortSize(this.x, this.cameraWidth, def);
    if (x < 0) {
      return this.cameraWidth - this.getWidth() + x;
    } else {
      return x;
    }
  }

  private getY(def?: number | string): number {
    const y = this.getViewPortSize(this.y, this.cameraHeight, def);
    if (y < 0) {
      return this.cameraHeight - this.getHeight() + y;
    } else {
      return y;
    }
  }

  private getWidth(def?: number | string): number {
    return this.getViewPortSize(this.width, this.cameraWidth, def);
  }

  private getHeight(def?: number | string): number {
    return this.getViewPortSize(this.height, this.cameraHeight, def);
  }

  private getScissorX(def?: number | string): number {
    return this.getViewPortSize(this.scissorX, this.cameraWidth, def);
  }

  private getScissorY(def?: number | string): number {
    return this.getViewPortSize(this.scissorY, this.cameraHeight, def);
  }

  private getScissorWidth(def?: number | string): number {
    return this.getViewPortSize(this.scissorWidth, this.cameraWidth, def);
  }

  private getScissorHeight(def?: number | string): number {
    return this.getViewPortSize(this.scissorHeight, this.cameraHeight, def);
  }

  private getViewPortSize(size: number | string, cameraSize: number, def?: number | string): number {
    const baseSize = ThreeUtil.getTypeSafe(size, def);
    if (ThreeUtil.isNotNull(baseSize)) {
      if (typeof baseSize == 'string') {
        if (baseSize.indexOf('%') > 0) {
          const [percent, extra] = baseSize.split('%');
          const viewSize = Math.ceil(cameraSize * parseFloat(percent) / 100);
          if (extra === '') {
            return viewSize;
          } else {
            return viewSize + parseInt(extra);
          }
        } else {
          switch (baseSize) {
            case 'x':
              return this.getX(def);
            case 'y':
              return this.getY(def);
            case 'width':
              return this.getWidth(def);
            case 'height':
              return this.getHeight(def);
            case 'scissorx':
            case 'scissorX':
              return this.getScissorX(def);
            case 'scissory':
            case 'scissorY':
              return this.getScissorY(def);
            case 'scissorwidth':
            case 'scissorWidth':
              return this.getScissorWidth(def);
            case 'scissorheight':
            case 'scissorHeight':
              return this.getScissorHeight(def);
            default:
              return parseFloat(baseSize);
          }
        }
      } else {
        return baseSize;
      }
    }
    return 0;
  }

  private getClearColor(def?: string | number): THREE.Color {
    return ThreeUtil.getColorSafe(this.clearColor, def);
  }

  private getClearAlpha(def?: number): number {
    return ThreeUtil.getTypeSafe(this.clearAlpha, def);
  }

  constructor(private localStorageService: LocalStorageService) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit('camera');
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.camera) {
      this.addChanges(changes);
    }
  }

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }

  private camera: THREE.Camera = null;
  public cubeCamera1: THREE.CubeCamera = null;
  public cubeCamera2: THREE.CubeCamera = null;
  private clips: THREE.AnimationClip[] = null;

  private renderer: THREE.Renderer = null;
  private cssRenderer: CSS3DRenderer | CSS2DRenderer = null;
  private rendererScenes: QueryList<any>;

  getRenderer(): THREE.Renderer {
    return this.renderer;
  }

  setRenderer(renderer: THREE.Renderer, cssRenderer: CSS3DRenderer | CSS2DRenderer, rendererScenes: QueryList<any>) {
    if (this.cssRenderer !== cssRenderer) {
      this.cssRenderer = cssRenderer;
    }
    if (this.renderer !== renderer) {
      this.renderer = renderer;
      this.rendererScenes = rendererScenes;
    }
    this.getObject3d();
  }

  setParent(parent: THREE.Object3D): boolean {
    if (super.setParent(parent)) {
      this.getCamera();
      return true;
    }
    return false;
  }

  applyChanges3d(changes: string[]) {
    if (this.camera !== null) {
      if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
        this.getObject3d();
        return;
      }
      if (!ThreeUtil.isOnlyIndexOf(changes, ['rigidbody','mesh', 'geometry', 'material', 'svg', 'listener', 'audio', 'helper', 'light'], this.OBJECT3D_ATTR)) {
        this.needUpdate = true;
        return;
      }
      if (ThreeUtil.isIndexOf(changes, 'init')) {
        changes = ThreeUtil.pushUniq(changes, []);
      }
      changes.forEach((change) => {
        switch (change.toLowerCase()) {
        }
      });
      super.applyChanges3d(changes);
    }
  }

  private cameraWidth: number = 0;
  private cameraHeight: number = 0;

  getSize(): THREE.Vector2 {
    return new THREE.Vector2(this.cameraWidth, this.cameraHeight);
  }

  private raycaster: THREE.Raycaster = null;

  getRaycaster(mouse: THREE.Vector2 = null): THREE.Raycaster {
    if (this.raycaster === null) {
      this.raycaster = new THREE.Raycaster();
    }
    if (mouse !== null) {
      this.raycaster.setFromCamera(mouse, this.getCamera());
    }
    return this.raycaster;
  }

  getIntersections(mouse: THREE.Vector2, mesh: THREE.Object3D | THREE.Object3D[], recursive: boolean = false): THREE.Intersection[] {
    const raycaster = this.getRaycaster(mouse);
    if (mesh instanceof THREE.Object3D) {
      return raycaster.intersectObject(mesh, recursive);
    } else {
      return raycaster.intersectObjects(mesh, recursive);
    }
  }

  getIntersection(mouse: THREE.Vector2, mesh: THREE.Object3D | THREE.Object3D[], recursive: boolean = false): THREE.Intersection {
    const intersects = this.getIntersections(mouse, mesh, recursive);
    if (intersects !== null && intersects.length > 0) {
      return intersects[0];
    } else {
      return null;
    }
  }

  setCameraSize(width: number, height: number) {
    if (this.isCameraChild) {
      this.cameraWidth = width;
      this.cameraHeight = height;
    } else {
      this.cameraWidth = width;
      this.cameraHeight = height;
    }
    if (this.camera !== null) {
      if (this.camera instanceof THREE.OrthographicCamera) {
        this.camera.left = this.getLeft(width);
        this.camera.right = this.getRight(width);
        this.camera.top = this.getTop(height);
        this.camera.bottom = this.getBottom(height);
        this.camera.updateProjectionMatrix();
      } else if (this.camera instanceof THREE.PerspectiveCamera) {
        this.camera.aspect = this.getAspect(width, height);
        if (this.viewport && this.viewportType === 'camera') {
          this.camera['viewport'].set(this.getX(), this.getY(), this.getWidth(), this.getHeight()).multiplyScalar(window.devicePixelRatio);
        }
        this.camera.updateProjectionMatrix();
      }
      this.camera.dispatchEvent({
        type: 'change',
        width: width,
        height: height,
      });
    }
    this.setSubscribeNext('size');
  }

  isCameraChild: boolean = false;

  getCubeRenderTarget(): THREE.WebGLCubeRenderTarget {
    if (this.camera === null) {
      this.getObject3d();
    }
    switch(this.type.toLowerCase()) {
      case 'cube' :
      case 'cubecamera' :
        return this.cubeCamera1.renderTarget;
    }
    return undefined;
  }

  getTexture() : THREE.WebGLCubeRenderTarget {
    return this.getCubeRenderTarget();
  }

  getObject3d<T extends THREE.Object3D>(): T {
    return this.getCamera() as any;
  }

  getCamera<T extends THREE.Camera>(): T {
    if (this.camera === null || this._needUpdate) {
      this.needUpdate = false;
      const width = this.cameraWidth;
      const height = this.cameraHeight;
      switch (this.type.toLowerCase()) {
        case 'arraycamera':
        case 'array':
          this.camera = new THREE.ArrayCamera();
          break;
        case 'cubecamera':
        case 'cube':
          const cubeCamera1 = new THREE.CubeCamera(
            this.getNear(0.1),
            this.getFar(2000),
            new THREE.WebGLCubeRenderTarget(512, {
              encoding: THREE.sRGBEncoding,
              format: THREE.RGBFormat,
              generateMipmaps: true,
              minFilter: THREE.LinearMipmapLinearFilter,
            })
          );
          const cubeCamera2 = new THREE.CubeCamera(
            this.getNear(0.1),
            this.getFar(2000),
            new THREE.WebGLCubeRenderTarget(512, {
              encoding: THREE.sRGBEncoding,
              format: THREE.RGBFormat,
              generateMipmaps: true,
              minFilter: THREE.LinearMipmapLinearFilter,
            })
          );
          this.cubeCamera1 = cubeCamera1;
          this.cubeCamera2 = cubeCamera2;
          const cubeGroup = new THREE.Group();
          cubeGroup.add(this.cubeCamera1);
          cubeGroup.add(this.cubeCamera2);
          this.camera = cubeGroup as any;
          break;
        case 'cinematic':
          this.camera = new CinematicCamera(this.getFov(50), this.getAspect(width, height), this.getNear(0.1), this.getFar(2000));
          break;
        case 'orthographiccamera':
        case 'orthographic':
        case 'ortho':
          const orthographicCamera = new THREE.OrthographicCamera(this.getLeft(width), this.getRight(width), this.getTop(height), this.getBottom(height), this.getNear(-200), this.getFar(2000));
          if (ThreeUtil.isNotNull(this.zoom)) {
            orthographicCamera.zoom = this.getZoom(1);
          }
          this.camera = orthographicCamera;
          break;
        case 'perspectivecamera':
        case 'perspective':
        default:
          const perspectiveCamera = new THREE.PerspectiveCamera(this.getFov(50), this.getAspect(width, height), this.getNear(0.1), this.getFar(2000));
          if (ThreeUtil.isNotNull(this.focalLength)) {
            perspectiveCamera.setFocalLength(ThreeUtil.getTypeSafe(this.focalLength, 35));
          }
          if (this.viewport && this.viewportType === 'camera') {
            perspectiveCamera['viewport'] = new THREE.Vector4(this.getX(), this.getY(), this.getWidth(), this.getHeight()).multiplyScalar(window.devicePixelRatio);
          }
          this.camera = perspectiveCamera;
          break;
      }
      if (this.parentObject3d instanceof THREE.ArrayCamera) {
        this.isCameraChild = true;
        this.parentObject3d.cameras.push(this.camera as THREE.PerspectiveCamera);
        this.object3d = this.camera;
        this.setObject(this.camera);

      } else {
        this.isCameraChild = false;
        this.setObject3d(this.camera);
      }
      this.setUserData('clips', null);
      if (ThreeUtil.isNotNull(this.storageName)) {
        this.localStorageService.getObject(
          this.storageName,
          (_: THREE.Object3D, clips?: THREE.AnimationClip[]) => {
            this.setUserData('clips', clips);
            this.setSubscribeNext('loaded');
          },
          { object: this.camera }
        );
      }
    }
    return this.camera as T;
  }

  getScene(scenes?: QueryList<any> | any): THREE.Scene {
    if (ThreeUtil.isNotNull(this.scene) && ThreeUtil.isNotNull(this.scene.getScene)) {
      return this.scene.getScene();
    }
    if (ThreeUtil.isNotNull(scenes)) {
      if (scenes instanceof QueryList && scenes.length > 0) {
        return scenes.first.getScene();
      } else if (ThreeUtil.isNotNull(scenes.getScene)){
        return scenes.getScene()
      }
    }
    if (ThreeUtil.isNotNull(this.rendererScenes)) {
      if (this.rendererScenes.length > 0) {
        return this.rendererScenes.first.getScene();
      }
    }
    return new THREE.Scene();
  }

  private _cubeRenderCount = 0;

  render(renderer: THREE.Renderer, cssRenderer: CSS3DRenderer | CSS2DRenderer, scenes: QueryList<any> | any, renderTimer: RendererTimer) {
    if (!this.active || this.isCameraChild || this.camera === null || !this.camera.visible) {
      return;
    }
    const camera = this.getCamera();
    if (ThreeUtil.isNotNull(this.referObject3d)) {
      const object3d = this.referObject3d instanceof AbstractObject3dComponent ? this.referObject3d.getObject3d() : this.referObject3d;
      if (ThreeUtil.isNotNull(this.object3d)) {
        camera.position.copy(object3d.position);
        camera.quaternion.copy(object3d.quaternion);
      }
    }
    if (renderer instanceof THREE.WebGLRenderer) {
      if (this.cubeCamera1 !== null) {
        this._cubeRenderCount++;
        this._cubeRenderCount = this._cubeRenderCount % 2;
        // const cubeCamera = this._cubeRenderCount % 2 === 0 ? this.cubeCamera1 : this.cubeCamera2;
        const cubeCamera = this.cubeCamera1;
        cubeCamera.update(renderer, this.getScene(scenes));
        if (ThreeUtil.isNotNull(this.material) && this.material.getMaterial) {
          const material = this.material.getMaterial();
          material.envMap = cubeCamera.renderTarget.texture;
        }
        return;
      }
      if (ThreeUtil.isNotNull(this.autoClear)) {
        renderer.autoClear = this.autoClear;
      }
      if (ThreeUtil.isNotNull(this.clearColor)) {
        renderer.setClearColor(this.getClearColor(), this.getClearAlpha(1));
      }
    }
    if (ThreeUtil.isNotNull(this.onBeforeRender)) {
      this.onBeforeRender(renderTimer);
    }
    if (this.scenes !== null && this.scenes.length > 0) {
      this.scenes.forEach((sceneCom) => {
        this.renderWithScene(renderer, camera, sceneCom.getScene());
      });
    } else {
      this.renderWithScene(renderer, camera, this.getScene(scenes));
    }
    if (cssRenderer !== null) {
      if (this.scenes !== null && this.scenes.length > 0) {
        this.scenes.forEach((sceneCom) => {
          const scene = sceneCom.getScene();
          if (scene !== null) {
            cssRenderer.render(scene, this.getObject3d());
          }
        });
      } else {
        const scene = this.getScene(scenes);
        if (scene !== null) {
          cssRenderer.render(scene, this.getObject3d());
        }
      }
    }
  }

  private renderWithScene(renderer: THREE.Renderer, camera: THREE.Camera, scene: THREE.Scene) {
    if (scene !== null) {
      try {
        if (renderer instanceof THREE.WebGLRenderer && this.viewport && this.viewportType === 'renderer') {
          if (this.scissorTest) {
            renderer.setScissorTest(true);
            renderer.setScissor(this.getScissorX(), this.getScissorY(), this.getScissorWidth(), this.getScissorHeight());
          }
          renderer.setViewport(this.getX(), this.getY(), this.getWidth(), this.getHeight());
        }
        if (renderer instanceof THREE.WebGLRenderer) {
          if (ThreeUtil.isNotNull(this.clear) && this.clear) {
            renderer.clear();
          }
          if (ThreeUtil.isNotNull(this.clearDepth) && this.clearDepth) {
            renderer.clearDepth();
          }
        }
        renderer.render(scene, camera);
        if (renderer instanceof THREE.WebGLRenderer && this.viewport && this.viewportType === 'renderer') {
          if (this.scissorTest) {
            renderer.setScissorTest(false);
          }
        }
      } catch (ex) {}
    }
  }
}
