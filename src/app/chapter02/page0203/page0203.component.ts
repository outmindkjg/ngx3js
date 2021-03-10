import { Component, OnInit, ViewChild } from '@angular/core';
import { GeometryComponent } from './../../three/geometry/geometry.component';
import { MeshComponent } from './../../three/mesh/mesh.component';
import { SceneComponent } from './../../three/scene/scene.component';
import * as THREE from 'three';
import { GuiControlParam } from '../../three';

@Component({
  selector: 'app-page0203',
  templateUrl: './page0203.component.html',
  styleUrls: ['./page0203.component.scss']
})
export class Page0203Component implements OnInit {
  @ViewChild('planeGeometry') planeGeometry: GeometryComponent = null;
  @ViewChild('plane') plane: MeshComponent = null;
  @ViewChild('scene') scene: SceneComponent = null;

  cubes : {
    x : number,
    y : number,
    z : number,
    name : string,
    size : number,
    color : number
  }[]= []
  controls = {
    rotationSpeed : 0.02,
    numberOfObjects : 10,
    removeCube : () => {
      this.cubes.pop();
      this.updateNumberOfObjects();
    },
    addCube : () => {
      const cubeSize = Math.ceil((Math.random() * 3));
      const cubeColor = Math.random() * 0xffffff;
      const x = -30 + Math.round((Math.random() * 60));
      const y = Math.round((Math.random() * 5));
      const z = -20 + Math.round((Math.random() * 40));
      this.cubes.push({
        name : 'cube-' + this.cubes.length,
        x : x,
        y : y,
        z : z,
        size : cubeSize,
        color : cubeColor
      })
      this.updateNumberOfObjects();
    },
    outputObjects : () => {
      console.log(this.scene.getScene().children);
    }
  }

  updateNumberOfObjects() {
    setTimeout(() => {
      this.controls.numberOfObjects = this.scene.getScene().children.length;
    }, 100);
  }

  controlsParams : GuiControlParam[] = [
    { name : 'rotationSpeed', type : 'number', min : 0, max : 0.5},
    { name : 'addCube', type : 'button'},
    { name : 'removeCube', type : 'button'},
    { name : 'outputObjects', type : 'button'},
    { name : 'numberOfObjects', type : 'listen'}
  ]
 
  constructor() { }

  ngOnInit(): void {
  }

  step : number = 0;
  onRender(timer : any) {
    const plane = this.plane.getMesh();
    const rotationSpeed = this.controls.rotationSpeed;
    this.scene.getScene().traverse(e => {
      if (e instanceof THREE.Mesh && e != plane) {
        e.rotation.x += rotationSpeed;
        e.rotation.y += rotationSpeed;
        e.rotation.z += rotationSpeed;
      }
    });
  }
 
}
