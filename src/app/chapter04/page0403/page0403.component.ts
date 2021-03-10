import { Component, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { SceneComponent } from './../../three/scene/scene.component';
import { GuiControlParam } from './../../three/interface';

@Component({
  selector: 'app-page0403',
  templateUrl: './page0403.component.html',
  styleUrls: ['./page0403.component.scss']
})
export class Page0403Component implements OnInit {

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
    color : 0x00ff00,
    rotationSpeed : 0.02,
    numberOfObjects : 10,
    cameraNear : 10,
    cameraFar : 130,
    removeCube : () => {
      this.cubes.pop();
      this.updateNumberOfObjects();
    },
    addCube : () => {
      const cubeSize = 3 + Math.ceil((Math.random() * 3));
      const cubeColor = this.controls.color;
      const x = -60 + Math.round((Math.random() * 100));
      const y = Math.round((Math.random() * 10));
      const z = -100 + Math.round((Math.random() * 150));
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

  controlsParams : GuiControlParam[]= [
    { name : 'color', type : 'color'},
    { name : 'rotationSpeed', type : 'number', min : 0, max : 0.5},
    { name : 'addCube', type : 'button'},
    { name : 'removeCube', type : 'button'},
    { name : 'cameraNear', type : 'number', min : 0, max : 50},
    { name : 'cameraFar', type : 'number', min : 50, max : 200},
    { name : 'outputObjects', type : 'button'},
    { name : 'numberOfObjects', type : 'listen'}
  ]
 
  constructor() { }

  ngOnInit(): void {
    for(let i = 0 ; i < 5 ; i++) {
       this.controls.addCube();
    }
  }

  step : number = 0;
  onRender(timer : any) {
    const rotationSpeed = this.controls.rotationSpeed;
    this.scene.getScene().traverse(e => {
      if (e instanceof THREE.Mesh) {
        e.rotation.x += rotationSpeed;
        e.rotation.y += rotationSpeed;
        e.rotation.z += rotationSpeed;
      }
    });
  }
}
