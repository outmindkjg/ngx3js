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
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { CinematicCamera } from 'three/examples/jsm/cameras/CinematicCamera.js';
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
import { ParallaxBarrierEffect } from 'three/examples/jsm/effects/ParallaxBarrierEffect.js';
import { PeppersGhostEffect } from 'three/examples/jsm/effects/PeppersGhostEffect.js';

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
  @Input() private active:boolean = true;
  @Input() private effectType:string = null;
  @Input() private cameraDistance:number = null;
  @Input() private reflectFromAbove:boolean = null;
  @Input() private fov:number|string = 45;
  @Input() private near:number|string = null;
  @Input() private far:number|string = null;
  @Input() private left:number = -0.5;
  @Input() private right:number = 0.5;
  @Input() private top:number = 0.5;
  @Input() private bottom:number = -0.5;
  @Input() private autoClear:boolean = null;
  @Input() public controlType:string = 'none';
  @Input() public controlAutoRotate:boolean = null;
  @Input() private scene:any = null;
  @Input() private scenes:any[] = null;
  @Input() private storageName:string = null;
  @Input() private viewport:boolean = false;
  @Input() private viewportType:string = "renderer";
  @Input() private x:number | string = 0;
  @Input() private y:number | string = 0;
  @Input() private width:number | string = '100%';
  @Input() private height:number | string = '100%';
  @Output() private onLoad:EventEmitter<CameraComponent> = new EventEmitter<CameraComponent>();

  @ContentChildren(PassComponent, { descendants: false }) pass: QueryList<PassComponent>;
  @ContentChildren(ComposerComponent, { descendants: false }) composer: QueryList<ComposerComponent>;
  @ContentChildren(ListenerComponent, { descendants: false }) listner: QueryList<ListenerComponent>;
  @ContentChildren(AudioComponent, { descendants: false }) audio: QueryList<AudioComponent>;
  @ContentChildren(MixerComponent, { descendants: false }) mixer: QueryList<MixerComponent>;
  @ContentChildren(HelperComponent, { descendants: false }) private helpers: QueryList<HelperComponent>;
  @ContentChildren(CameraComponent, { descendants: false }) private cameras: QueryList<CameraComponent>;
  @ContentChildren(LightComponent, { descendants: false }) private lights: QueryList<LightComponent>;

  private getFov(def?: number | string): number {
    const fov = ThreeUtil.getTypeSafe(this.fov,def);
    if (typeof fov === 'string') {
      return parseFloat(fov);
    } else {
      return fov;
    }
  }

  private getNear(def?: number | string): number {
    const near = ThreeUtil.getTypeSafe(this.near,def);
    if (typeof near === 'string') {
      return parseFloat(near);
    } else {
      return near;
    }
  }

  private getFar(def?: number | string): number {
    const far = ThreeUtil.getTypeSafe(this.far,def);
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
    const x = ThreeUtil.getTypeSafe(this.x, def);
    if (ThreeUtil.isNotNull(x)) {
      if (typeof (x) == 'string') {
        if (x.endsWith('%')) {
          return Math.floor(this.cameraWidth * parseFloat(x.slice(0, -1)) / 100);
        } else {
          return parseFloat(x)
        }
      } else {
        return x;
      }
    }
    return 0;
  }

  private getY(def?: number | string): number {
    const y = ThreeUtil.getTypeSafe(this.y, def);
    if (ThreeUtil.isNotNull(y)) {
      if (typeof (y) == 'string') {
        if (y.endsWith('%')) {
          return Math.floor(this.cameraHeight * parseFloat(y.slice(0, -1)) / 100);
        } else {
          return parseFloat(y);
        }
      } else {
        return y;
      }
    }
    return 0;
  }

  private getWidth(def?: number | string): number {
    const width = ThreeUtil.getTypeSafe(this.width, def);
    if (ThreeUtil.isNotNull(width)) {
      if (typeof (width) == 'string') {
        if (width.endsWith('%')) {
          return Math.ceil(this.cameraWidth * parseFloat(width.slice(0, -1)) / 100);
        } else {
          return parseFloat(width)
        }
      } else {
        return width;
      }
    }
    return 0;
  }

  private getHeight(def?: number | string): number {
    const height = ThreeUtil.getTypeSafe(this.height, def);
    if (ThreeUtil.isNotNull(height)) {
      if (typeof (height) == 'string') {
        if (height.endsWith('%')) {
          return Math.ceil(this.cameraHeight * parseFloat(height.slice(0, -1)) / 100);
        } else {
          return parseFloat(height)
        }
      } else {
        return height;
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
  


  constructor(private localStorageService: LocalStorageService) {
    super();
  }

  ngOnInit(): void {}

  private camera: THREE.Camera = null;
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

  setCameraParams(params : {[key : string] : any}) {
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
        this.camera.aspect = this.getAspect(this.cameraWidth, this.cameraHeight);
        this.camera.fov = this.getFov(50);
        this.camera.near = this.getNear(0.1);
        this.camera.far = this.getFar(2000);
        this.camera.updateProjectionMatrix();
      }
      this.helpers.forEach(helper => {
        helper.setUpdate()
      });
    }

  }
  resetEffectComposer() {
    this.effectComposer = this.getEffectComposer();
  }

  getEffectComposer(): EffectComposer | any {
    if (this.pass !== null && this.pass.length > 0) {
      if (this.renderer instanceof THREE.WebGLRenderer) {
        const effectComposer: EffectComposer = new EffectComposer(
          this.renderer
        );
        this.pass.forEach((item) => {
          item.getPass(this.getScene(), this.getCamera(), effectComposer);
        });
        return effectComposer;
      }
    } else if (this.effectType !== null) {
      if (this.renderer instanceof THREE.WebGLRenderer) {
        switch(this.effectType.toLowerCase()) {
          case 'peppersghost' :
            const peppersGhostEffect =  new PeppersGhostEffect(this.renderer);
            peppersGhostEffect.cameraDistance = this.getCameraDistance(15);
            peppersGhostEffect.reflectFromAbove = this.getReflectFromAbove(false);
            return peppersGhostEffect;
          case 'parallaxbarrier' :
          default :
            return new ParallaxBarrierEffect(this.renderer);
            
        } 
      }
    }
    return null;
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
    if (
      helperVisible !== null &&
      helperVisible !== undefined
    ) {
      this.helpers.forEach(helper => {
        helper.setVisible(helperVisible);
      })
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

  getRaycaster(event? : any): THREE.Raycaster {
    const vector = new THREE.Vector3(
      (event.clientX / this.cameraWidth) * 2 - 1,
      -(event.clientY / this.cameraHeight) * 2 + 1,
      0.5
    );
    const camera = this.getCamera();
    const v = vector.unproject(camera);
    const raycaster = new THREE.Raycaster(
      camera.position,
      v.sub(camera.position).normalize()
    );
    return raycaster;
  }

  private raycaster : THREE.Raycaster = null;
  private intersects : THREE.Intersection[] = [];
  getIntersections(mouse : THREE.Vector2, mesh : THREE.Object3D | THREE.Object3D[], recursive : boolean = false ): THREE.Intersection[] {
    if (this.raycaster === null) {
      this.raycaster = new THREE.Raycaster();
    }
    this.raycaster.setFromCamera( mouse, this.getCamera());
    this.intersects.length = 0;
    if (mesh instanceof THREE.Object3D) {
      return this.raycaster.intersectObject( mesh, recursive, this.intersects );
    } else { 
      return this.raycaster.intersectObjects( mesh, recursive, this.intersects );
    }
  }

  getIntersection(mouse : THREE.Vector2, mesh : THREE.Object3D | THREE.Object3D[], recursive : boolean = false ): THREE.Intersection {
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

  isCameraChild : boolean = false;
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

  getCamera(): THREE.Camera {
    if (this.camera === null) {
      const width = this.cameraWidth;
      const height = this.cameraHeight;
      switch (this.type.toLowerCase()) {
        case 'array' :
          this.camera = new THREE.ArrayCamera();
          break;
        case 'cinematic':
          this.camera = new CinematicCamera(
            this.getFov(50),
            this.getAspect(width, height),
            this.getNear(0.1),
            this.getFar(2000)
          );
          break;
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

  render(
    renderer: THREE.Renderer,
    cssRenderer: CSS3DRenderer | CSS2DRenderer,
    scenes: QueryList<any>,
    renderTimer: RendererTimer
  ) {
    if (!this.visible || !this.active || this.isCameraChild) {
      return ;
    }
    if (this.scenes !== null && this.scenes.length > 0) {
      this.scenes.forEach((sceneCom) => {
        const scene = sceneCom.getScene();
        if (scene !== null) {
          if (this.autoClear !== null) {
            if (renderer instanceof THREE.WebGLRenderer) {
              renderer.autoClear = this.autoClear;
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
          } else {
            if (this.effectComposer !== null) {

              this.effectComposer.render(renderTimer.delta);
            } else {
              if (renderer instanceof THREE.WebGLRenderer && this.viewport && this.viewportType === 'renderer') {
                renderer.setViewport(
                  this.getX(),
                  this.getY(),
                  this.getWidth(),
                  this.getHeight()
                );
              }
              renderer.render(scene, this.getCamera());
            }
          }
        }
      });
    } else {
      const scene = this.getScene(scenes);
      if (scene !== null) {
        if (this.autoClear !== null) {
          if (renderer instanceof THREE.WebGLRenderer) {
            renderer.autoClear = this.autoClear;
          }
        }
        if (renderer instanceof THREE.WebGLRenderer) {
          this.composer.forEach((composer) => {
            composer.render(renderer, renderTimer);
          });
        }
        if (this.effectComposer !== null) {
          if (this.effectComposer instanceof EffectComposer) {
            this.effectComposer.render(renderTimer.delta);
          } else {
            this.effectComposer.render(scene, this.getCamera());
          }
        } else {
          if (renderer instanceof THREE.WebGLRenderer && this.viewport && this.viewportType === 'renderer') {
            renderer.setViewport(
              this.getX(),
              this.getY(),
              this.getWidth(),
              this.getHeight()
            );
          }
          renderer.render(scene, this.getCamera());
        }
      }
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
}
