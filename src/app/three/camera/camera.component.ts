import { Component, forwardRef, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { CinematicCamera } from 'three/examples/jsm/cameras/CinematicCamera';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { AbstractObject3dComponent } from '../object3d.abstract';
import { RendererTimer, ThreeColor, ThreeUtil } from './../interface';
import { LocalStorageService } from './../local-storage.service';

/**
 * CameraComponent
 *
 * Abstract base class for cameras. This class should always be inherited when you build a new camera.
 * 
 * @see THREE.Camera 
 */
@Component({
  selector: 'ngx3js-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  providers: [{ provide: AbstractObject3dComponent, useExisting: forwardRef(() => CameraComponent) }],
})
export class CameraComponent extends AbstractObject3dComponent implements OnInit {
  /**
   * The type of camera
   *
   * Notice - case insensitive.
   *
   * @see THREE.PerspectiveCamera - PerspectiveCamera, Perspective
   * @see THREE.ArrayCamera       - ArrayCamera, Array
   * @see THREE.CubeCamera        - CubeCamera, Cube
   * @see THREE.OrthographicCamera - OrthographicCamera, Orthographic
   * @see THREE.StereoCamera      - StereoCamera, Stereo
   */
  @Input() public type: string = 'perspective';

  /**
   * The camera is active.
   */
  @Input() private active: boolean = true;

  /**
   * Camera frustum vertical field of view, from bottom to top of view, in degrees. Default is *50*.
   */
  @Input() private fov: number | string = 50;

  /**
   * Camera frustum aspect ratio, usually the canvas width / canvas height. Default is *1* (square canvas).
   */
  @Input() private aspect: number = 1;

  /**
   * Sets the FOV by focal length in respect to the current [page:PerspectiveCamera.filmGauge .filmGauge].<br /><br />
   * By default, the focal length is specified for a 35mm (full frame) camera.
   */
  @Input() private focalLength: number = null;

  /**
   * Camera frustum near plane. Default is *0.1*.<br /><br />
   * The valid range is between 0 and the current value of the [page:.far far] plane.
   * Note that, unlike for the [page:PerspectiveCamera], *0* is a valid value for an
   * OrthographicCamera's near plane.
   */
  @Input() private near: number | string = null;

  /**
   * Camera frustum far plane. Default is *2000*.<br /><br />
   * Must be greater than the current value of [page:.near near] plane.
   */
  @Input() private far: number | string = null;

  /**
   * orthoSize  of camera component
   */
  @Input() private orthoSize: number = 0.5;

  /**
   * Camera frustum left plane.
   */
  @Input() private left: number = null;

  /**
   * Camera frustum right plane.
   */
  @Input() private right: number = null;

  /**
   * Camera frustum top plane.
   */
  @Input() private top: number = null;

  /**
   * Camera frustum bottom plane.
   */
  @Input() private bottom: number = null;

  /**
   * Gets or sets the zoom factor of the camera. Default is *1*.
   */
  @Input() private zoom: number | string = null;

  /**
   * Defines whether the renderer should automatically clear its output before rendering a frame.
   */
  @Input() private autoClear: boolean = null;

  /**
   * Input  of camera component
   */
  @Input() private material: any = null;

  /**
   * Input  of camera component
   *
   * Notice - case insensitive.
   *
   */
  @Input() public controlType: string = 'none';

  /**
   * Input  of camera component
   */
  @Input() public autoRotate: boolean = null;

  /**
   * The given scene
   */
  @Input() private scene: any = null;

  /**
   * The given scene
   */
  @Input() private scenes: any[] = null;

  /**
   * Input  of camera component
   */
  @Input() private storageName: string = null;

  /**
   * The viewport of this render target.
   */
  @Input() private viewport: boolean = false;

  /**
   * The viewport of this render target.
   *
   * Notice - case insensitive.
   *
   */
  @Input() private viewportType: string = 'renderer';

  /**
   * The viewport of this render target.
   * Vector4.x
   */
  @Input() private x: number | string = 0;

  /**
   * The viewport of this render target.
   * Vector4.y
   */
  @Input() private y: number | string = 0;

  /**
   * The viewport of this render target.
   * Vector4.width
   */
  @Input() private width: number | string = '100%';

  /**
   * The viewport of this render target.
   * Vector4.height
   */
  @Input() private height: number | string = '100%';

  /**
   * Clear the color buffer. Equivalent to calling [page:WebGLRenderer.clear .clear]( true, false, false ).
   */
  @Input() private clearColor: ThreeColor = null;

  /**
   * Input  of camera component
   */
  @Input() private clearAlpha: number = null;

  /**
   * Clear the depth buffer. Equivalent to calling [page:WebGLRenderer.clear .clear]( false, true, false ).
   */
  @Input() private clearDepth: boolean = null;

  /**
   * Tells the renderer to clear its color, depth or stencil drawing buffer(s).
   * This method initializes the color buffer to the current clear color value.<br />
   * Arguments default to *true*.
   */
  @Input() private clear: boolean = null;

  /**
   * Indicates whether the scissor test is active or not.
   */
  @Input() private scissorTest: boolean = false;

  /**
   * A rectangular area inside the render target's viewport. Fragments that are outside the area will be discarded.
   * Vector4.x
   */
  @Input() private scissorX: number | string = 0;

  /**
   * A rectangular area inside the render target's viewport. Fragments that are outside the area will be discarded.
   * Vector4.y
   */
  @Input() private scissorY: number | string = 0;

  /**
   * A rectangular area inside the render target's viewport. Fragments that are outside the area will be discarded.
   * Vector4.width
   */
  @Input() private scissorWidth: number | string = '100%';

  /**
   * A rectangular area inside the render target's viewport. Fragments that are outside the area will be discarded.
   * Vector4.height
   */
  @Input() private scissorHeight: number | string = '100%';

  /**
   * Input  of camera component
   */
  @Input() private referObject3d: AbstractObject3dComponent | THREE.Object3D = null;

  /**
   * Creates an instance of camera component.
   * @param localStorageService
   */
  constructor(private localStorageService: LocalStorageService) {
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
    super.ngOnInit('camera');
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
    if (changes && this.camera) {
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
   * Camera frustum vertical field of view, from bottom to top of view, in degrees. Default is *50*.
   *
   * @param [def]
   * @returns fov
   */
  private getFov(def?: number | string): number {
    const fov = ThreeUtil.getTypeSafe(this.fov, def);
    if (typeof fov === 'string') {
      return parseFloat(fov);
    } else {
      return fov;
    }
  }

  /**
   * Camera frustum near plane. Default is *0.1*.<br /><br />
   * The valid range is between 0 and the current value of the [page:.far far] plane.
   * Note that, unlike for the [page:PerspectiveCamera], *0* is a valid value for an
   * OrthographicCamera's near plane.
   *
   * @param [def]
   * @returns near
   */
  private getNear(def?: number | string): number {
    const near = ThreeUtil.getTypeSafe(this.near, def);
    if (typeof near === 'string') {
      return parseFloat(near);
    } else {
      return near;
    }
  }

  /**
   * Camera frustum far plane. Default is *2000*.<br /><br />
   * Must be greater than the current value of [page:.near near] plane.
   *
   * @param [def]
   * @returns far
   */
  private getFar(def?: number | string): number {
    const far = ThreeUtil.getTypeSafe(this.far, def);
    if (typeof far === 'string') {
      return parseFloat(far);
    } else {
      return far;
    }
  }

  /**
   * Camera frustum left plane.
   * @param [width]
   * @returns left
   */
  private getLeft(width?: number): number {
    return width * ThreeUtil.getTypeSafe(this.left, this.orthoSize * -1);
  }

  /**
   * Camera frustum right plane.
   * @param [width]
   * @returns right
   */
  private getRight(width?: number): number {
    return width * ThreeUtil.getTypeSafe(this.right, this.orthoSize);
  }

  /**
   * Camera frustum top plane.
   * @param [top]
   * @returns top
   */
  private getTop(top?: number): number {
    return top * ThreeUtil.getTypeSafe(this.top, this.orthoSize);
  }

  /**
   * Camera frustum bottom plane.
   * @param [bottom]
   * @returns bottom
   */
  private getBottom(bottom?: number): number {
    return bottom * ThreeUtil.getTypeSafe(this.bottom, this.orthoSize * -1);
  }

  /**
   * Gets zoom
   * @param [def]
   * @returns zoom
   */
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

  /**
   * Camera frustum aspect ratio, usually the canvas width / canvas height. Default is *1* (square canvas).
   *
   * @param [width]
   * @param [height]
   * @returns aspect
   */
  private getAspect(width?: number, height?: number): number {
    if (this.viewport) {
      const cWidth = this.getWidth();
      const cHeight = this.getHeight();
      return cWidth / cHeight;
    } else {
      return width > 0 && height > 0 ? (width / height) * this.aspect : 0.5;
    }
  }

  /**
   * Gets x
   * @param [def]
   * @returns x
   */
  private getX(def?: number | string): number {
    const x = this.getViewPortSize(this.x, this.cameraWidth, def);
    if (x < 0) {
      return this.cameraWidth - this.getWidth() + x;
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
    const y = this.getViewPortSize(this.y, this.cameraHeight, def);
    if (y < 0) {
      return this.cameraHeight - this.getHeight() + y;
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
    return this.getViewPortSize(this.width, this.cameraWidth, def);
  }

  /**
   * Gets height
   * @param [def]
   * @returns height
   */
  private getHeight(def?: number | string): number {
    return this.getViewPortSize(this.height, this.cameraHeight, def);
  }

  /**
   * Gets scissor x
   * @param [def]
   * @returns scissor x
   */
  private getScissorX(def?: number | string): number {
    return this.getViewPortSize(this.scissorX, this.cameraWidth, def);
  }

  /**
   * Gets scissor y
   * @param [def]
   * @returns scissor y
   */
  private getScissorY(def?: number | string): number {
    return this.getViewPortSize(this.scissorY, this.cameraHeight, def);
  }

  /**
   * Gets scissor width
   * @param [def]
   * @returns scissor width
   */
  private getScissorWidth(def?: number | string): number {
    return this.getViewPortSize(this.scissorWidth, this.cameraWidth, def);
  }

  /**
   * Gets scissor height
   * @param [def]
   * @returns scissor height
   */
  private getScissorHeight(def?: number | string): number {
    return this.getViewPortSize(this.scissorHeight, this.cameraHeight, def);
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
      if (typeof baseSize == 'string') {
        if (baseSize.indexOf('%') > 0) {
          const [percent, extra] = baseSize.split('%');
          const viewSize = Math.ceil((cameraSize * parseFloat(percent)) / 100);
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

  /**
   * Gets clear color
   * @param [def]
   * @returns clear color
   */
  private getClearColor(def?: string | number): THREE.Color {
    return ThreeUtil.getColorSafe(this.clearColor, def);
  }

  /**
   * Gets clear alpha
   * @param [def]
   * @returns clear alpha
   */
  private getClearAlpha(def?: number): number {
    return ThreeUtil.getTypeSafe(this.clearAlpha, def);
  }

  /**
   * Camera  of camera component
   */
  private camera: THREE.Camera = null;

  /**
   * Cube camera1 of camera component
   */
  public cubeCamera1: THREE.CubeCamera = null;

  /**
   * Cube camera2 of camera component
   */
  public cubeCamera2: THREE.CubeCamera = null;

  /**
   * Clips  of camera component
   */
  private clips: THREE.AnimationClip[] = null;

  /**
   * Renderer  of camera component
   */
  private renderer: THREE.Renderer = null;

  /**
   * Css renderer of camera component
   */
  private cssRenderer: CSS3DRenderer | CSS2DRenderer | (CSS3DRenderer | CSS2DRenderer)[] = null;

  /**
   * Renderer scenes of camera component
   */
  private rendererScenes: QueryList<any> = null;

  /**
   * Gets renderer
   * @returns renderer
   */
  public getRenderer(): THREE.Renderer {
    return this.renderer;
  }

  /**
   * Sets renderer
   * @param renderer
   * @param cssRenderer
   * @param rendererScenes
   */
  public setRenderer(renderer: THREE.Renderer, cssRenderer: CSS3DRenderer | CSS2DRenderer | (CSS3DRenderer | CSS2DRenderer) [], rendererScenes: QueryList<any>) {
    if (this.cssRenderer !== cssRenderer) {
      this.cssRenderer = cssRenderer;
    }
    if (this.renderer !== renderer) {
      this.renderer = renderer;
      this.rendererScenes = rendererScenes;
    }
    this.getObject3d();
  }

  /**
   * Sets parent
   * @param parent
   * @returns true if parent
   */
  public setParent(parent: THREE.Object3D): boolean {
    if (super.setParent(parent)) {
      this.getCamera();
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
    if (this.camera !== null) {
      if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
        this.getObject3d();
        return;
      }
      if (!ThreeUtil.isOnlyIndexOf(changes, ['rigidbody', 'mesh', 'geometry', 'material', 'svg', 'listener', 'audio', 'helper', 'light'], this.OBJECT3D_ATTR)) {
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

  /**
   * Camera width of camera component
   */
  private cameraWidth: number = 0;

  /**
   * Camera height of camera component
   */
  private cameraHeight: number = 0;

  /**
   * Gets size
   * @returns size
   */
  public getSize(): THREE.Vector2 {
    return new THREE.Vector2(this.cameraWidth, this.cameraHeight);
  }

  /**
   * Raycaster  of camera component
   */
  private raycaster: THREE.Raycaster = null;

  /**
   * Gets raycaster
   * @param [mouse]
   * @returns raycaster
   */
  public getRaycaster(mouse: THREE.Vector2 = null): THREE.Raycaster {
    if (this.raycaster === null) {
      this.raycaster = new THREE.Raycaster();
    }
    if (mouse !== null) {
      this.raycaster.setFromCamera(mouse, this.getCamera());
    }
    return this.raycaster;
  }

  /**
   * Gets intersections
   * @param mouse
   * @param mesh
   * @param [recursive]
   * @returns intersections
   */
  public getIntersections(mouse: THREE.Vector2, mesh: THREE.Object3D | THREE.Object3D[], recursive: boolean = false): THREE.Intersection[] {
    const raycaster = this.getRaycaster(mouse);
    if (mesh instanceof THREE.Object3D) {
      return raycaster.intersectObject(mesh, recursive);
    } else {
      return raycaster.intersectObjects(mesh, recursive);
    }
  }

  /**
   * Gets intersection
   * @param mouse
   * @param mesh
   * @param [recursive]
   * @returns intersection
   */
  public getIntersection(mouse: THREE.Vector2, mesh: THREE.Object3D | THREE.Object3D[], recursive: boolean = false): THREE.Intersection {
    const intersects = this.getIntersections(mouse, mesh, recursive);
    if (intersects !== null && intersects.length > 0) {
      return intersects[0];
    } else {
      return null;
    }
  }

  /**
   * Sets camera size
   * @param width
   * @param height
   */
  public setCameraSize(width: number, height: number) {
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

  /**
   * Determines whether camera child is
   */
  private isCameraChild: boolean = false;

  /**
   * Gets cube render target
   * @returns cube render target
   */
  public getCubeRenderTarget(): THREE.WebGLCubeRenderTarget {
    if (this.camera === null) {
      this.getObject3d();
    }
    switch (this.type.toLowerCase()) {
      case 'cube':
      case 'cubecamera':
        return this.cubeCamera1.renderTarget;
    }
    return undefined;
  }

  /**
   * Gets texture
   * @returns texture
   */
  public getTexture(): THREE.WebGLCubeRenderTarget {
    return this.getCubeRenderTarget();
  }

  /**
   * Gets object3d
   * @template T
   * @returns object3d
   */
  public getObject3d<T extends THREE.Object3D>(): T {
    return this.getCamera() as any;
  }

  /**
   * Gets camera
   * @template T
   * @returns camera
   */
  public getCamera<T extends THREE.Camera>(): T {
    if (this.camera === null || this._needUpdate) {
      this.needUpdate = false;
      const width = this.cameraWidth;
      const height = this.cameraHeight;
      switch (this.type.toLowerCase()) {
        case 'arraycamera':
        case 'array':
          this.camera = new THREE.ArrayCamera();
          break;
        case 'stereocamera':
        case 'stereo':
          this.camera = new THREE.StereoCamera();
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
      this.setSubscribeNext('changecamera');
    }
    return this.camera as T;
  }

  /**
   * Gets scene
   * @param [scenes]
   * @returns scene
   */
  public getScene(scenes?: QueryList<any> | any): THREE.Scene {
    if (ThreeUtil.isNotNull(this.scene) && ThreeUtil.isNotNull(this.scene.getScene)) {
      return this.scene.getScene();
    }
    if (ThreeUtil.isNotNull(scenes)) {
      if (scenes instanceof QueryList && scenes.length > 0) {
        return scenes.first.getScene();
      } else if (ThreeUtil.isNotNull(scenes.getScene)) {
        return scenes.getScene();
      }
    }
    if (ThreeUtil.isNotNull(this.rendererScenes)) {
      if (this.rendererScenes.length > 0) {
        return this.rendererScenes.first.getScene();
      }
    }
    return new THREE.Scene();
  }

  /**
   * Cube render count of camera component
   */
  private _cubeRenderCount = 0;

  /**
   * Renders camera component
   * @param renderer
   * @param cssRenderer
   * @param scenes
   * @param renderTimer
   * @returns
   */
  public render(renderer: THREE.Renderer, cssRenderer: CSS3DRenderer | CSS2DRenderer | (CSS3DRenderer | CSS2DRenderer)[], scenes: QueryList<any> | any, renderTimer: RendererTimer) {
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
    if (this.scenes !== null && this.scenes.length > 0) {
      this.scenes.forEach((sceneCom) => {
        this.renderWithScene(renderer, camera, sceneCom.getScene());
      });
    } else {
      this.renderWithScene(renderer, camera, this.getScene(scenes));
    }
    if (cssRenderer !== null) {
      if (Array.isArray(cssRenderer)) {
        if (this.scenes !== null && this.scenes.length > 0) {
          this.scenes.forEach((sceneCom) => {
            const scene = sceneCom.getScene();
            if (scene !== null) {
              cssRenderer.forEach(child => {              
                child.render(scene, this.getObject3d());
              });
            }
          });
        } else {
          const scene = this.getScene(scenes);
          if (scene !== null) {
            cssRenderer.forEach(child => {              
              child.render(scene, this.getObject3d());
            });
          }
        }
      } else {
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
  }

  /**
   * Renders with scene
   * @param renderer
   * @param camera
   * @param scene
   */
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
