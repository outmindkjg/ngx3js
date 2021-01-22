import { Component, ContentChild, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';

import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { LookatComponent } from '../lookat/lookat.component';
import { PositionComponent } from '../position/position.component';
import { RotationComponent } from '../rotation/rotation.component';
import { ScaleComponent } from '../scale/scale.component';
import { SceneComponent } from '../scene/scene.component';

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
export class CameraComponent implements OnInit {

  @Input() type : 'perspective' | 'orthographic' = 'perspective';
  @Input() fov : number = 45;
  @Input() near : number = null;
  @Input() far : number = null;
  @Input() left : number = -0.5;
  @Input() right : number = 0.5;
  @Input() top : number = 0.5;
  @Input() bottom : number = -0.5;
  @Input() autoClear : boolean = null;
  @Input() controlType: string = "none";
  @Input() scene : SceneComponent = null;
  
  @ContentChild(PositionComponent,{descendants: false}) position: PositionComponent = null;
  @ContentChild(RotationComponent,{descendants: false}) rotation: RotationComponent = null;
  @ContentChild(ScaleComponent,{descendants: false}) scale: ScaleComponent = null;
  @ContentChild(LookatComponent,{descendants: false}) lookat: LookatComponent = null;
  

  constructor() { }

  ngOnInit(): void {
  }

  private camera : THREE.Camera = null;


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.type) {
      this.camera = null;
    }
  }

  getFov(def : number) : number {
    return this.fov === null ? def : this.fov;
  }

  getNear(def : number) : number {
    return this.near === null ? def : this.near;
  }
 
  getFar(def : number) : number {
    return this.far === null ? def : this.far;
  }

  getLeft(width : number) : number {
    return width * this.left;
  }

  getRight(width : number) : number {
    return width * this.right;
  }

  getTop(height : number) : number {
    return height * this.top;
  }

  getBottom(height : number) : number {
    return height * this.bottom;
  }

  getAspect(width : number, height : number) : number {
    return width > 0 && height > 0 ? width / height : 1;
  }
  
  private cameraWidth: number = 0;
  private cameraHeight: number = 0;

  getObject3D() : THREE.Object3D {
    return this.getCamera();
  }

  getCamera(width? : number, height? : number) : THREE.Camera {
    if (width == null) {
      width = this.cameraWidth;
    }
    if (height == null) {
      height = this.cameraHeight;
    }
    if (this.camera === null) {
      this.cameraWidth = width;
      this.cameraHeight = height;
      switch(this.type.toLowerCase()) {
        case 'orthographic' :
          this.camera = new THREE.OrthographicCamera(
            this.getLeft(width),
            this.getRight(width),
            this.getTop(height),
            this.getBottom(height),
            this.getNear(-200),
            this.getFar(2000)
          );
          break;
        case 'perspective' :
        default :
          this.camera = new THREE.PerspectiveCamera(
            this.getFov(50), 
            this.getAspect(width, height), 
            this.getNear(0.1),
            this.getFar(2000)
          );
          break;
      }
      if (this.position !== null && this.position != undefined) {
        this.camera.position.copy(this.position.getPosition());
        this.position.setPosition(this.camera.position);
      }
      if (this.rotation !== null && this.rotation != undefined) {
        this.camera.rotation.copy(this.rotation.getRotation());
        this.rotation.setRotation(this.camera.rotation);
      }
      if (this.scale !== null && this.scale != undefined) {
        this.camera.scale.copy(this.scale.getScale());
        this.scale.setScale(this.camera.scale);
      }
      if (this.lookat !== null && this.lookat != undefined) {
        this.camera.lookAt(this.lookat.getLookAt());
        this.lookat.setObject3D(this.camera);
      }
    }
    if (this.cameraWidth !== width || this.cameraHeight !== height ) {
      this.cameraWidth = width;
      this.cameraHeight = height;
      if (this.camera instanceof THREE.PerspectiveCamera) {
        const aspect = this.getAspect(width, height);
        if (this.camera.aspect != aspect) {
          this.camera.aspect = aspect;
          this.camera.updateProjectionMatrix();
        }
      } else if (this.camera instanceof THREE.OrthographicCamera) {
        const left = this.getLeft(width);
        const right = this.getRight(width);
        const top = this.getTop(height);
        const bottom = this.getBottom(height);
        if (this.camera.left != left || this.camera.right != right || this.camera.top != top || this.camera.bottom != bottom) {
          this.camera.left = left;
          this.camera.right = right;
          this.camera.top = top;
          this.camera.bottom = bottom;
          this.camera.updateProjectionMatrix();
        }
        // const effect = new EffectComposer(null);
        // effect.addPass();


      }
    }
    return this.camera;
  }

  render(renderer : THREE.Renderer , scenes : QueryList<SceneComponent>, width? : number, height? : number) {
    const scene = ((this.scene !== null) ? this.scene : scenes.first);
    if (scene !== null) {
      if (this.autoClear !== null) {
        if (renderer instanceof THREE.WebGLRenderer || renderer instanceof THREE.WebGL1Renderer) {
          renderer.autoClear = this.autoClear;
        }
      }
      renderer.render(scene.getScene(), this.getCamera(width, height));
    }
  }
}
