import { HelperComponent } from './../helper/helper.component';
import { LocalStorageService } from './../local-storage.service';
import { MixerComponent } from './../mixer/mixer.component';
import { AudioComponent } from './../audio/audio.component';
import {
  Component,
  ContentChildren,
  Input,
  Output,
  EventEmitter,
  OnInit,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import * as THREE from 'three';
import { Observable, Subject } from 'rxjs';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { CinematicCamera } from 'three/examples/jsm/cameras/CinematicCamera';
import { PassComponent } from '../pass/pass.component';
import {
  InterfaceEffectComposer,
  RendererTimer,
  ThreeUtil,
} from './../interface';
import { ComposerComponent } from '../composer/composer.component';
import { ListenerComponent } from '../listener/listener.component';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { ParallaxBarrierEffect } from 'three/examples/jsm/effects/ParallaxBarrierEffect';
import { PeppersGhostEffect } from 'three/examples/jsm/effects/PeppersGhostEffect';
import { OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect';

import { AbstractObject3dComponent } from '../object3d.abstract';
import { LightComponent } from '../light/light.component';

@Component({
  selector: 'three-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent
  extends AbstractObject3dComponent
  implements OnInit, InterfaceEffectComposer {
  @Input() public type: string = 'perspective';
  @Input() private active: boolean = true;
  @Input() private effectType: string = null;
  @Input() private cameraDistance: number = null;
  @Input() private reflectFromAbove: boolean = null;
  @Input() private fov: number | string = 45;
  @Input() private near: number | string = null;
  @Input() private far: number | string = null;
  @Input() private left: number = -0.5;
  @Input() private right: number = 0.5;
  @Input() private top: number = 0.5;
  @Input() private bottom: number = -0.5;
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
  @Input() private scissorTest: boolean = null;
  @Input() private scissorX: number | string = 0;
  @Input() private scissorY: number | string = 0;
  @Input() private scissorWidth: number | string = '100%';
  @Input() private scissorHeight: number | string = '100%';
  @Input() private referObject3d: AbstractObject3dComponent | THREE.Object3D = null;

  @Output()
  private onLoad: EventEmitter<CameraComponent> = new EventEmitter<CameraComponent>();

  @ContentChildren(PassComponent, { descendants: false }) pass: QueryList<PassComponent>;
  @ContentChildren(ComposerComponent, { descendants: false }) composer: QueryList<ComposerComponent>;
  @ContentChildren(ListenerComponent, { descendants: false }) listner: QueryList<ListenerComponent>;
  @ContentChildren(AudioComponent, { descendants: false }) audio: QueryList<AudioComponent>;
  @ContentChildren(MixerComponent, { descendants: false }) mixer: QueryList<MixerComponent>;
  @ContentChildren(HelperComponent, { descendants: false }) private helpers: QueryList<HelperComponent>;
  @ContentChildren(CameraComponent, { descendants: false }) private cameras: QueryList<CameraComponent>;
  @ContentChildren(LightComponent, { descendants: false }) private lights: QueryList<LightComponent>;

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
    return width * this.left;
  }

  private getRight(width?: number): number {
    return width * this.right;
  }

  private getTop(height?: number): number {
    return height * this.top;
  }

  private getBottom(height?: number): number {
    return height * this.bottom;
  }

  private getAspect(width?: number, height?: number): number {
    if (this.viewport) {
      const cWidth = this.getWidth();
      const cHeight = this.getHeight();
      return cWidth / cHeight;
    } else {
      return width > 0 && height > 0 ? width / height : 0.5;
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

  private getViewPortSize(
    size: number | string,
    cameraSize: number,
    def?: number | string
  ): number {
    const baseSize = ThreeUtil.getTypeSafe(size, def);
    if (ThreeUtil.isNotNull(baseSize)) {
      if (typeof baseSize == 'string') {
        if (baseSize.endsWith('%')) {
          return Math.ceil(
            (cameraSize * parseFloat(baseSize.slice(0, -1))) / 100
          );
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

  private getCameraDistance(def?: number): number {
    return ThreeUtil.getTypeSafe(this.cameraDistance, def);
  }

  private getReflectFromAbove(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.reflectFromAbove, def);
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

  ngOnInit(): void {}

  private camera: THREE.Camera = null;
  public cubeCamera1: THREE.CubeCamera = null;
  public cubeCamera2: THREE.CubeCamera = null;
  private clips: THREE.AnimationClip[] = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.type) {
      this.camera = null;
    }
    super.ngOnChanges(changes);
  }

  private renderer: THREE.Renderer = null;
  private cssRenderer: CSS3DRenderer | CSS2DRenderer = null;
  private rendererScenes: QueryList<any>;
  private effectComposer: EffectComposer | any = null;

  getRenderer(): THREE.Renderer {
    return this.renderer;
  }

  setRenderer(
    renderer: THREE.Renderer,
    cssRenderer: CSS3DRenderer | CSS2DRenderer,
    rendererScenes: QueryList<any>
  ) {
    if (this.cssRenderer !== cssRenderer) {
      this.cssRenderer = cssRenderer;
    }
    if (this.renderer !== renderer) {
      this.renderer = renderer;
      this.rendererScenes = rendererScenes;
      this.effectComposer = this.getEffectComposer();
      if (this.composer !== null && this.composer.length > 0) {
        this.composer.forEach((composer) => {
          composer.setCamera(this);
        });
      }
    }
  }

  setParent(parent: THREE.Object3D | any, isRestore: boolean = false): boolean {
    if (super.setParent(parent, isRestore)) {
      if (isRestore) {
        this.object3d = parent;
        this.synkObject3D([
          'position',
          'rotation',
          'scale',
          'lookat',
          'rigidbody',
          'mesh',
          'rigidbody',
          'geometry',
          'material',
          'svg',
          'listner',
          'audio',
          'helpers',
          'lights',
          'controller',
        ]);
      } else {
        this.resetCamera(true);
      }
      return true;
    }
    return false;
  }

  setCameraParams(params: { [key: string]: any }) {
    Object.entries(params).forEach(([key, value]) => {
      if (this[key] !== undefined) {
        this[key] = value;
      }
    });
    if (this.camera !== null) {
      if (this.camera instanceof THREE.OrthographicCamera) {
        this.camera.left = this.getLeft(this.cameraWidth);
        this.camera.right = this.getRight(this.cameraWidth);
        this.camera.top = this.getTop(this.cameraHeight);
        this.camera.bottom = this.getBottom(this.cameraHeight);
        this.camera.near = this.getNear(-200);
        this.camera.far = this.getFar(2000);
        this.camera.updateProjectionMatrix();
      } else if (this.camera instanceof THREE.PerspectiveCamera) {
        this.camera.aspect = this.getAspect(
          this.cameraWidth,
          this.cameraHeight
        );
        this.camera.fov = this.getFov(50);
        this.camera.near = this.getNear(0.1);
        this.camera.far = this.getFar(2000);
        this.camera.updateProjectionMatrix();
      }
      this.helpers.forEach((helper) => {
        helper.setUpdate();
      });
    }
  }

  resetEffectComposer() {
    this.effectComposer = null;
    this.effectComposer = this.getEffectComposer();
  }

  getEffectComposer(): EffectComposer {
    if (this.effectComposer == null) {
      if (this.pass !== null && this.pass.length > 0) {
        if (this.renderer instanceof THREE.WebGLRenderer) {
          const effectComposer: EffectComposer = new EffectComposer(
            this.renderer
          );
          this.pass.forEach((item) => {
            item.getPass(this.getScene(), this.getCamera(), effectComposer);
          });
          this.effectComposer = effectComposer;
        }
      } else if (this.effectType !== null) {
        if (this.renderer instanceof THREE.WebGLRenderer) {
          switch (this.effectType.toLowerCase()) {
            case 'peppersghost':
              const peppersGhostEffect = new PeppersGhostEffect(this.renderer);
              peppersGhostEffect.cameraDistance = this.getCameraDistance(15);
              peppersGhostEffect.reflectFromAbove = this.getReflectFromAbove(
                false
              );
              this.effectComposer = peppersGhostEffect;
              break;
            case 'outline' :
              const outlineEffect = new OutlineEffect(this.renderer, {
              });
              this.effectComposer = outlineEffect;
              break;
            case 'parallaxbarrier':
            default:
              this.effectComposer = new ParallaxBarrierEffect(this.renderer);
              break;
          }
        }
      }
    }
    return this.effectComposer;
  }

  ngAfterContentInit(): void {
    this.listner.changes.subscribe(() => {
      this.synkObject3D(['listner']);
    });
    this.audio.changes.subscribe(() => {
      this.synkObject3D(['audio']);
    });
    this.mixer.changes.subscribe(() => {
      this.synkObject3D(['mixer']);
    });
    this.helpers.changes.subscribe(() => {
      this.synkObject3D(['helpers']);
    });
    this.lights.changes.subscribe(() => {
      this.synkObject3D(['lights']);
    });
    this.cameras.changes.subscribe(() => {
      this.synkObject3D(['cameras']);
    });
    super.ngAfterContentInit();
  }

  setVisible(visible: boolean, helperVisible: boolean = null) {
    super.setVisible(visible);
    if (helperVisible !== null && helperVisible !== undefined) {
      this.helpers.forEach((helper) => {
        helper.setVisible(helperVisible);
      });
    }
  }

  synkObject3D(synkTypes: string[]) {
    if (this.camera !== null) {
      synkTypes.forEach((synkType) => {
        switch (synkType) {
          case 'listner':
            this.listner.forEach((listner) => {
              listner.setParent(this.camera);
            });
            break;
          case 'audio':
            this.audio.forEach((audio) => {
              audio.setParent(this.camera);
            });
            break;
          case 'mixer':
            if (this.clips !== null && this.clips.length > 0) {
              this.mixer.forEach((mixer) => {
                mixer.setModel(this.camera, this.clips);
              });
            }
            break;
          case 'helpers':
            this.helpers.forEach((helper) => {
              helper.setParent(this.camera);
            });
            break;
          case 'lights':
            this.lights.forEach((light) => {
              light.setParent(this.camera);
            });
            break;
          case 'cameras':
            this.cameras.forEach((camera) => {
              camera.setParent(this.camera);
            });
            break;
        }
      });
      super.synkObject3D(synkTypes);
    }
  }

  private cameraWidth: number = 0;
  private cameraHeight: number = 0;

  getObject3D(): THREE.Object3D {
    return this.getCamera();
  }

  private raycaster: THREE.Raycaster = null;

  getRaycaster(event: any = null): THREE.Raycaster {
    if (this.raycaster === null) {
      this.raycaster = new THREE.Raycaster();
    }
    if (event !== null) {
      const mouse = new THREE.Vector2(
        (event.clientX / this.cameraWidth) * 2 - 1,
        -(event.clientY / this.cameraHeight) * 2 + 1
      );
      this.raycaster.setFromCamera(mouse, this.getCamera());
    }
    return this.raycaster;
  }

  getIntersections(
    mouse: THREE.Vector2,
    mesh: THREE.Object3D | THREE.Object3D[],
    recursive: boolean = false
  ): THREE.Intersection[] {
    const raycaster = this.getRaycaster();
    raycaster.setFromCamera(mouse, this.getCamera());
    if (mesh instanceof THREE.Object3D) {
      return raycaster.intersectObject(mesh, recursive);
    } else {
      return raycaster.intersectObjects(mesh, recursive);
    }
  }
  
  getIntersection(
    mouse: THREE.Vector2,
    mesh: THREE.Object3D | THREE.Object3D[],
    recursive: boolean = false
  ): THREE.Intersection {
    const intersects = this.getIntersections(mouse, mesh, recursive);
    if (intersects !== null && intersects.length > 0) {
      return intersects[0];
    } else {
      return null;
    }
  }

  setCameraSize(width: number, height: number) {
    if (this.isCameraChild) {
      this.cameraWidth = width * window.devicePixelRatio;
      this.cameraHeight = height * window.devicePixelRatio;
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
          this.camera['viewport'] = new THREE.Vector4(
            this.getX(),
            this.getY(),
            this.getWidth(),
            this.getHeight()
          );
        }
        this.camera.updateProjectionMatrix();
      }
      this.camera.dispatchEvent({
        type : 'change',
        width : width,
        height : height
      });
    }
    if (this.composer !== null && this.composer.length > 0) {
      this.composer.forEach((composer) => {
        composer.setCameraSize(this.cameraWidth, this.cameraHeight);
      });
    }
    if (this.effectComposer !== null) {
      if (this.effectComposer instanceof EffectComposer) {
        this.effectComposer.setSize(width, height);
      } else if (this.effectComposer.setSize) {
        this.effectComposer.setSize(width, height);
      }
    }
  }

  isCameraChild: boolean = false;
  resetCamera(clearCamera: boolean = false) {
    if (this.parent !== null) {
      if (clearCamera && this.camera !== null && this.camera.parent) {
        this.camera.parent.remove(this.camera);
        this.camera = null;
      }
      if (this.parent instanceof THREE.ArrayCamera) {
        this.isCameraChild = true;
        this.parent.cameras.push(this.getCamera() as THREE.PerspectiveCamera);
      } else {
        this.isCameraChild = false;
        this.parent.add(this.getCamera());
      }
    }
  }

  getCubeRenderTarget(): THREE.WebGLCubeRenderTarget {
    if (this.camera === null) {
      this.getCamera();
    }
    if (this.type == 'cube') {
      return this.cubeCamera1.renderTarget;
    }
    return undefined;
  }

  getCamera(): THREE.Camera {
    if (this.camera === null) {
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
            new THREE.WebGLCubeRenderTarget(256, {
              encoding: THREE.sRGBEncoding,
              format: THREE.RGBFormat,
              generateMipmaps: true,
              minFilter: THREE.LinearMipmapLinearFilter
            })
          );
          const cubeCamera2 = new THREE.CubeCamera(
            this.getNear(0.1),
            this.getFar(2000),
            new THREE.WebGLCubeRenderTarget(256, {
              encoding: THREE.sRGBEncoding,
              format: THREE.RGBFormat,
              generateMipmaps: true,
              minFilter: THREE.LinearMipmapLinearFilter
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
          this.camera = new CinematicCamera(
            this.getFov(50),
            this.getAspect(width, height),
            this.getNear(0.1),
            this.getFar(2000)
          );
          break;
        case 'orthographiccamera':
        case 'orthographic':
          this.camera = new THREE.OrthographicCamera(
            this.getLeft(width),
            this.getRight(width),
            this.getTop(height),
            this.getBottom(height),
            this.getNear(-200),
            this.getFar(2000)
          );
          break;
        case 'perspectivecamera':
        case 'perspective':
        default:
          const perspectiveCamera = new THREE.PerspectiveCamera(
            this.getFov(50),
            this.getAspect(width, height),
            this.getNear(0.1),
            this.getFar(2000)
          );
          if (this.viewport && this.viewportType === 'camera') {
            perspectiveCamera['viewport'] = new THREE.Vector4(
              this.getX(),
              this.getY(),
              this.getWidth(),
              this.getHeight()
            );
          }
          this.camera = perspectiveCamera;
          break;
      }
      if (ThreeUtil.isNotNull(this.name)) {
        this.camera.name = this.name;
      }
      if (ThreeUtil.isNull(this.camera.userData.component)) {
        this.camera.userData.component = this;
      }
      this.setObject3D(this.camera, this.isCameraChild ? false : true);
      if (ThreeUtil.isNotNull(this.storageName)) {
        this.localStorageService.getObject(
          this.storageName,
          (
            loadedMesh: THREE.Object3D,
            clips?: THREE.AnimationClip[],
            geometry?: THREE.BufferGeometry
          ) => {
            this.clips = clips;
            this.synkObject3D(['mixer']);
          },
          { object: this.camera }
        );
      }
      this.synkObject3D([
        'position',
        'rotation',
        'scale',
        'lookat',
        'listner',
        'helpers',
        'lights',
        'cameras',
        'audio',
        'mixer',
      ]);
      this.onLoad.emit(this);
    }
    return this.camera;
  }

  getScene(scenes?: QueryList<any>): THREE.Scene {
    if (this.scene !== null) {
      return this.scene.getScene();
    } else if (scenes && scenes.length > 0) {
      return scenes.first.getScene();
    } else if (this.rendererScenes && this.rendererScenes.length > 0) {
      return this.rendererScenes.first.getScene();
    } else {
      return new THREE.Scene();
    }
  }

  private _cubeRenderCount = 0;

  render(
    renderer: THREE.Renderer,
    cssRenderer: CSS3DRenderer | CSS2DRenderer,
    scenes: QueryList<any>,
    renderTimer: RendererTimer
  ) {
    if (
      !this.visible ||
      !this.active ||
      this.isCameraChild
    ) {
      return;
    }
    const camera = this.getCamera();
    if (ThreeUtil.isNotNull(this.referObject3d)) {
      const object3d = (this.referObject3d instanceof AbstractObject3dComponent) ? this.referObject3d.getObject3D() : this.referObject3d;
      if (ThreeUtil.isNotNull(this.object3d)) {
        camera.position.copy( object3d.position );
        camera.quaternion.copy( object3d.quaternion );
      }
    }
    if (renderer instanceof THREE.WebGLRenderer) {
      if (this.type === 'cube' && this.cubeCamera1 !== null && this.cubeCamera2 !== null) {
        this._cubeRenderCount ++;
        this._cubeRenderCount = this._cubeRenderCount  % 2;
        const cubeCamera = (this._cubeRenderCount % 2 === 0) ? this.cubeCamera1 : this.cubeCamera2;
        cubeCamera.update(renderer, this.getScene(scenes));
        if (ThreeUtil.isNotNull(this.material) && this.material.getMaterial) {
          const material = this.material.getMaterial();
          material.envMap = cubeCamera.renderTarget.texture;
        }
        return ;
      }
      if (ThreeUtil.isNotNull(this.autoClear)) {
        renderer.autoClear = this.autoClear;
      }
      if (ThreeUtil.isNotNull(this.clearColor)) {
        renderer.setClearColor(this.getClearColor(), this.getClearAlpha(1));
      }
      if (ThreeUtil.isNotNull(this.clearDepth) && this.clearDepth) {
        renderer.clearDepth();
      }
    }
    if (
      renderer instanceof THREE.WebGLRenderer &&
      this.composer &&
      this.composer.length > 0
    ) {
      this.composer.forEach((composer) => {
        composer.render(renderer, renderTimer);
      });
    } else if (this.effectComposer !== null) {
      if (this.effectComposer instanceof EffectComposer) {
        this.effectComposer.render(renderTimer.delta);
      } else if (this.effectComposer instanceof OutlineEffect) {
        this.effectComposer.render(this.getScene(scenes), camera);
      } else if (this.effectComposer instanceof PeppersGhostEffect) {
        this.effectComposer.render(this.getScene(scenes), camera);
      } else if (this.effectComposer instanceof ParallaxBarrierEffect) {
        this.effectComposer.render(this.getScene(scenes), camera);
      } else {
        this.effectComposer.render(this.getScene(scenes), camera);
      }
    } else if (this.scenes !== null && this.scenes.length > 0) {
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
            cssRenderer.render(scene, this.getCamera());
          }
        });
      } else {
        const scene = this.getScene(scenes);
        if (scene !== null) {
          cssRenderer.render(scene, this.getCamera());
        }
      }
    }
  }

  private renderWithScene(
    renderer: THREE.Renderer,
    camera: THREE.Camera,
    scene: THREE.Scene
  ) {
    if (scene !== null) {
      if (
        renderer instanceof THREE.WebGLRenderer &&
        this.viewport &&
        this.viewportType === 'renderer'
      ) {
        if (this.scissorTest) {
          renderer.setScissorTest(true);
          renderer.setScissor(
            this.getScissorX(),
            this.getScissorY(),
            this.getScissorWidth(),
            this.getScissorHeight()
          );
        }
        renderer.setViewport(
          this.getX(),
          this.getY(),
          this.getWidth(),
          this.getHeight()
        );
      }
      renderer.render(scene, camera);
      if (
        renderer instanceof THREE.WebGLRenderer &&
        this.viewport &&
        this.viewportType === 'renderer'
      ) {
        if (this.scissorTest) {
          renderer.setScissorTest(false);
        }
      }
    }
  }
}
