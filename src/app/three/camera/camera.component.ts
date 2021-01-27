import { Component, ContentChildren, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { LookatComponent } from '../lookat/lookat.component';
import { PositionComponent } from '../position/position.component';
import { RotationComponent } from '../rotation/rotation.component';
import { ScaleComponent } from '../scale/scale.component';
import { PassComponent } from '../pass/pass.component';
import { AbstractEffectComposer, RendererTimer } from './../interface';
import { SceneComponent } from './../scene/scene.component';
import { ComposerComponent } from '../composer/composer.component';


/*
ArrayCamera
CubeCamera
StereoCamera
*/

@Component({
  selector: 'three-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit, AbstractEffectComposer {

  @Input() type: 'perspective' | 'orthographic' = 'perspective';
  @Input() fov: number = 45;
  @Input() near: number = null;
  @Input() far: number = null;
  @Input() left: number = -0.5;
  @Input() right: number = 0.5;
  @Input() top: number = 0.5;
  @Input() bottom: number = -0.5;
  @Input() autoClear: boolean = null;
  @Input() controlType: string = "none";
  @Input() controlAutoRotate: boolean = null;
  @Input() scene: SceneComponent = null;

  @ContentChildren(PositionComponent, { descendants: false }) position: QueryList<PositionComponent>;
  @ContentChildren(RotationComponent, { descendants: false }) rotation: QueryList<RotationComponent>;
  @ContentChildren(ScaleComponent, { descendants: false }) scale: QueryList<ScaleComponent>;
  @ContentChildren(LookatComponent, { descendants: false }) lookat: QueryList<LookatComponent>;
  @ContentChildren(PassComponent,{descendants: false}) pass: QueryList<PassComponent>;
  @ContentChildren(ComposerComponent,{descendants: false}) composer: QueryList<ComposerComponent>;


  constructor() { }

  ngOnInit(): void {
  }

  private camera: THREE.Camera = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.type) {
      this.camera = null;
    }
  }

  private renderer : THREE.Renderer = null;
  private rendererScenes : QueryList<SceneComponent>;
  private effectComposer : EffectComposer = null;

  getRenderer() : THREE.Renderer{
    return this.renderer;
  }

  setRenderer(renderer : THREE.Renderer, rendererScenes : QueryList<SceneComponent>) {
    if (this.renderer !== renderer) {
      this.renderer = renderer;
      this.rendererScenes = rendererScenes;
      this.effectComposer = this.getEffectComposer();
      if (this.composer !== null && this.composer.length > 0) {
        this.composer.forEach(composer => {
          composer.setCamera(this);
        })
      }
    }
  }

  resetEffectComposer() {
    this.effectComposer = this.getEffectComposer();
  }

  getEffectComposer() : EffectComposer {
    if (this.pass != null && this.pass.length > 0) {
      if (this.renderer instanceof THREE.WebGLRenderer) {
        const effectComposer : EffectComposer = new EffectComposer(this.renderer);
        this.pass.forEach(item => {
          const pass = item.getPass(this.getScene(), this.getCamera(), this);
          if (pass !== null) {
            effectComposer.addPass(pass);
          }
        })
        return effectComposer;
      }
    }
    return null;
  }

  ngAfterContentInit(): void {
    this.position.changes.subscribe(() => {
      this.synkObject3D(['position']);
    });
    this.rotation.changes.subscribe(() => {
      this.synkObject3D(['rotation']);
    });
    this.scale.changes.subscribe(() => {
      this.synkObject3D(['scale']);
    });
    this.lookat.changes.subscribe(() => {
      this.synkObject3D(['lookat']);
    });
  }

  synkObject3D(synkTypes: string[]) {
    if (this.camera !== null) {
      synkTypes.forEach((synkType) => {
        switch (synkType) {
          case 'position':
            this.position.forEach((position) => {
              position.setObject3D(this.camera);
            });
            break;
          case 'rotation':
            this.rotation.forEach((rotation) => {
              rotation.setObject3D(this.camera);
            });
            break;
          case 'scale':
            this.scale.forEach((scale) => {
              scale.setObject3D(this.camera);
            });
            break;
          case 'lookat':
            this.lookat.forEach((lookat) => {
              lookat.setObject3D(this.camera);
            });
            break;
        }
      })
    }
  }

  getFov(def: number): number {
    return this.fov === null ? def : this.fov;
  }

  getNear(def: number): number {
    return this.near === null ? def : this.near;
  }

  getFar(def: number): number {
    return this.far === null ? def : this.far;
  }

  getLeft(width: number): number {
    return width * this.left;
  }

  getRight(width: number): number {
    return width * this.right;
  }

  getTop(height: number): number {
    return height * this.top;
  }

  getBottom(height: number): number {
    return height * this.bottom;
  }

  getAspect(width: number, height: number): number {
    return width > 0 && height > 0 ? width / height : 1;
  }

  private cameraWidth: number = 0;
  private cameraHeight: number = 0;

  getObject3D(): THREE.Object3D {
    return this.getCamera();
  }

  getRaycaster(event): THREE.Raycaster {
    const vector = new THREE.Vector3((event.clientX / this.cameraWidth) * 2 - 1, -(event.clientY / this.cameraHeight) * 2 + 1, 0.5);
    const camera = this.getCamera();
    const v = vector.unproject(camera);
    const raycaster = new THREE.Raycaster(camera.position, v.sub(camera.position).normalize());
    return raycaster;
  }

  setCameraSize(width : number, height : number) {
    this.cameraWidth = width;
    this.cameraHeight = height;
    if (this.camera !== null) {
      if (this.camera instanceof THREE.OrthographicCamera) {
        this.camera.left = this.getLeft(width);
        this.camera.right = this.getRight(width);
        this.camera.top = this.getTop(height);
        this.camera.bottom = this.getBottom(height);
        this.camera.updateProjectionMatrix();
      } else if (this.camera instanceof THREE.PerspectiveCamera) {
        this.camera.aspect = this.getAspect(width, height);
        this.camera.updateProjectionMatrix();
      }
    }
    if (this.composer !== null && this.composer.length > 0) {
      this.composer.forEach(composer => {
        composer.setCameraSize(this.cameraWidth, this.cameraHeight);
      })
    }
  }

  getCamera(): THREE.Camera {
    if (this.camera === null) {
        const width = this.cameraWidth;
        const height = this.cameraHeight;
        switch (this.type.toLowerCase()) {
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
          this.camera = new THREE.PerspectiveCamera(
            this.getFov(50),
            this.getAspect(width, height),
            this.getNear(0.1),
            this.getFar(2000)
          );
          break;
      }
      this.synkObject3D(['position', 'rotation', 'scale', 'lookat']);
    }
    return this.camera;
  }

  getScene(scenes?: QueryList<SceneComponent>) : THREE.Scene {
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

  render(renderer: THREE.Renderer, scenes: QueryList<SceneComponent>, renderTimer : RendererTimer) {
    const scene = this.getScene(scenes);
    if (scene !== null) {
      if (this.autoClear !== null) {
        if (renderer instanceof THREE.WebGLRenderer) {
          renderer.autoClear = this.autoClear;
        }
      }
      if (renderer instanceof THREE.WebGLRenderer) {
        this.composer.forEach(composer => {
          composer.render(renderer, renderTimer);
        })
      }
      if (this.effectComposer !== null) {
        this.effectComposer.render(renderTimer.delta);
      } else {
        renderer.render(scene, this.getCamera());
      }
    }
  }
}
