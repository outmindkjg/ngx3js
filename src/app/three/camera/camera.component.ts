import { Component, ContentChild, Input, OnInit, SimpleChanges } from '@angular/core';

import * as THREE from 'three';
import { LookatComponent } from '../lookat/lookat.component';
import { PositionComponent } from '../position/position.component';
import { RotationComponent } from '../rotation/rotation.component';
import { ScaleComponent } from '../scale/scale.component';

@Component({
  selector: 'three-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {

  @Input() type : string = 'perspective';
  @Input() fov : number = 45;
  @Input() near : number = null;
  @Input() far : number = null;
  @Input() left : number = -16;
  @Input() right : number = 16;
  @Input() top : number = 16;
  @Input() bottom : number = -16;

  @ContentChild(PositionComponent) position: PositionComponent = null;
  @ContentChild(RotationComponent) rotation: RotationComponent = null;
  @ContentChild(ScaleComponent) scale: ScaleComponent = null;
  @ContentChild(LookatComponent) lookat: LookatComponent = null;
  

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
    return width / this.left;
  }

  getRight(width : number) : number {
    return width / this.right;
  }

  getTop(height : number) : number {
    return height / this.top;
  }

  getBottom(height : number) : number {
    return height / this.bottom;
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

      }
    }
    return this.camera;
  }
}
