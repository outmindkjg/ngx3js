import { Component } from '@angular/core';
import { Object3D } from 'three';
import { BaseComponent, MeshComponent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webgl-shadowmesh',
  templateUrl: './webgl-shadowmesh.component.html',
  styleUrls: ['./webgl-shadowmesh.component.scss']
})
export class WebglShadowmeshComponent extends BaseComponent<{
  lightType : string;
}> {

  constructor() {
    super({
      lightType : 'DirectionalLight'
    },[
      { name : 'lightType', title : 'Light Type', type : 'select', select : ['DirectionalLight','PointLight'], change : () => {
        this.setLightPosition();
      }}
    ]);
  }

  ngOnInit() {
    this.setLightPosition();
  }

  setLightPosition() {
    switch(this.controls.lightType) {
      case 'PointLight' :
        this.lightPosition = { x : 0, y : 6, z : -2};
        break;
      default :
        this.lightPosition = { x : 5, y : 7, z : -1};
      break;
    }
  }

  lightPosition : {x : number, y : number, z : number } = null;

  cube : Object3D = null;
  setCube(mesh : MeshComponent) {
    this.cube = mesh.getObject3D();
  }

  cylinder : Object3D = null;
  setCylinder(mesh : MeshComponent) {
    this.cylinder = mesh.getObject3D();
  }

  torus : Object3D = null;
  setTorus(mesh : MeshComponent) {
    this.torus = mesh.getObject3D();
  }

  pyramid : Object3D = null;
  setPyramid(mesh : MeshComponent) {
    this.pyramid = mesh.getObject3D();
  }
  horizontalAngle : number = 0;
  verticalAngle : number = 0;
  TWO_PI : number = Math.PI * 2;
  onRender(timer : RendererTimer) {
    super.onRender(timer);
    const frameTime = timer.delta;
    this.horizontalAngle += 0.5 * frameTime;
    if ( this.horizontalAngle > this.TWO_PI ) {
      this.horizontalAngle -= this.TWO_PI;
    }
    this.verticalAngle += 1.5 * frameTime;
    if ( this.verticalAngle > this.TWO_PI ) {
      this.verticalAngle -= this.TWO_PI;
    }
    if (this.cube !== null) {
      this.cube.rotation.x += 1.0 * frameTime;
      this.cube.rotation.y += 1.0 * frameTime;
      this.cube.position.x = Math.sin( this.horizontalAngle ) * 4;
      this.cube.position.y = Math.sin( this.verticalAngle ) * 2 + 2.9;
    }
    if (this.cylinder !== null) {
      this.cylinder.rotation.y += 1.0 * frameTime;
      this.cylinder.rotation.z -= 1.0 * frameTime;
      this.cylinder.position.x = Math.sin( this.horizontalAngle ) * - 4;
      this.cylinder.position.y = Math.sin( this.verticalAngle ) * 2 + 3.1;
    }
    if (this.torus !== null) {
      this.torus.rotation.x -= 1.0 * frameTime;
      this.torus.rotation.y -= 1.0 * frameTime;
      this.torus.position.x = Math.cos( this.horizontalAngle ) * 4;
      this.torus.position.y = Math.cos( this.verticalAngle ) * 2 + 3.3;
    }
    if (this.pyramid !== null) {
      this.pyramid.rotation.y += 0.5 * frameTime;
    }
  }
}
