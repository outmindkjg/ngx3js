import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { GeometriesVector3, GuiControlParam, MeshComponent, RendererTimer } from 'src/app/three';
import { CameraComponent } from 'src/app/three/camera/camera.component';
import * as THREE from 'three';
@Component({
  selector: 'app-page0902',
  templateUrl: './page0902.component.html',
  styleUrls: ['./page0902.component.scss']
})
export class Page0902Component implements OnInit {

  controls = {
    rotationSpeed : 0.02,
    bouncingSpeed : 0.03,
    scalingSpeed : 0.03,
    showRay : true,
    rotate: true,
    wireframe: false,
  }

  controlsParams: GuiControlParam[] = [
    { name: "rotationSpeed", type: "number", min : 0, max : 0.5 },
    { name: "bouncingSpeed", type: "number", min : 0, max : 0.5 },
    { name: "scalingSpeed", type: "number", min : 0, max : 0.5 },
    { name: "showRay", type: "checkbox" },
    { name: "rotate", type: "checkbox" },
    { name: "wireframe", type: "checkbox" },
  ]

  @ViewChild('camera') camera: CameraComponent = null;
  @ViewChild('cylinder') cylinder: MeshComponent = null;
  @ViewChild('sphere') sphere: MeshComponent = null;
  @ViewChild('box') box: CameraComponent = null;

  constructor() { }

  ngOnInit(): void {
  }

  getObjects(): THREE.Object3D[] {
    const objects : THREE.Object3D[] = [];
    if (this.cylinder !== null && this.cylinder !== undefined) {
      objects.push(this.cylinder.getObject3D());
    }
    if (this.sphere !== null && this.sphere !== undefined) {
      objects.push(this.sphere.getObject3D());
    }
    if (this.box !== null && this.box !== undefined) {
      objects.push(this.box.getObject3D());
    }
    return objects;
  }

  lastMaterial : THREE.Material = null;

  @HostListener('document:mousedown', ['$event']) 
  hasPressed(event) {
    if (this.camera !== null && this.camera !== undefined) {
      var v = this.camera.getRaycaster(event);
      const intersects = v.intersectObjects(this.getObjects());
      if (intersects.length > 0) {
        if (intersects[0].object instanceof THREE.Mesh) {
          if (this.lastMaterial !== null) {
            this.lastMaterial.transparent = false;
            this.lastMaterial.opacity = 1;
          }
          if (intersects[0].object.material instanceof THREE.Material) {
            this.lastMaterial = intersects[0].object.material;
            this.lastMaterial.transparent = true;
            this.lastMaterial.opacity = 0.1;
          }
        }
      }
    }
  }

  tubePoints : GeometriesVector3[] = null;
  
  @HostListener('document:mousemove', ['$event']) 
  hasReleased(event) {
    if (this.controls.showRay) {
      if (this.camera !== null && this.camera !== undefined) {
        var v = this.camera.getRaycaster(event);
        const intersects = v.intersectObjects(this.getObjects());
        if (intersects.length > 0) {
          this.tubePoints = [];
          this.tubePoints.push({ x : -30, y : 39.8, z : 30});
          this.tubePoints.push(intersects[0].point);
        } else {
          this.tubePoints = null;
        }
      } else {
        this.tubePoints = null;
      }
    } else {
      this.tubePoints = null;
    }
  }

  rotation: GeometriesVector3 = {
    x: 0, y: 0, z: 0
  }

  spherePosition : GeometriesVector3 = {
    x: 0, y: 0, z: 0
  }
  scalingStep  : GeometriesVector3 = {
    x: 1, y: 1, z: 1
  }

  onRender(timer: RendererTimer) {    
    if (this.controls.rotate) {
      this.rotation.y += this.controls.rotationSpeed * timer.delta * 250;
      this.rotation.x = this.rotation.z = this.rotation.y;
      
      const step = this.controls.bouncingSpeed * timer.elapsedTime * 60;
      this.spherePosition.x = 20 + ( 10 * (Math.cos(step)));
      this.spherePosition.y = 2 + ( 10 * Math.abs(Math.sin(step)));

      const scalingStep = this.controls.scalingSpeed * timer.elapsedTime * 60;
      this.scalingStep.x = Math.abs(Math.sin(scalingStep / 4));
      this.scalingStep.y = Math.abs(Math.cos(scalingStep / 5));
      this.scalingStep.z = Math.abs(Math.sin(scalingStep / 7));
    }

  }
}
