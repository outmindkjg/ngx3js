import { Component, OnInit, ViewChild } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer, GeometriesParametric, MeshComponent } from './../../three';

@Component({
  selector: 'app-page0608',
  templateUrl: './page0608.component.html',
  styleUrls: ['./page0608.component.scss']
})
export class Page0608Component implements OnInit {

  controls = {
    sphere1 : {
      x : -2,
      y : 0,
      z : 0,
      scale : 1
    },
    sphere2 : {
      x : 3,
      y : 0,
      z : 0,
      scale : 1,
      typeCsg : 'subtract'
    },
    cube : {
      x : -7,
      y : 0,
      z : 0,
      scaleX : 1,
      scaleY : 1,
      scaleZ : 1,
      typeCsg : 'subtract'
    },
    showResult : () => {
      this.sphere1.x = this.controls.sphere1.x;
      this.sphere1.y = this.controls.sphere1.y;
      this.sphere1.z = this.controls.sphere1.z;
      this.sphere1.scale = this.controls.sphere1.scale;
      this.sphere2.x = this.controls.sphere2.x;
      this.sphere2.y = this.controls.sphere2.y;
      this.sphere2.z = this.controls.sphere2.z;
      this.sphere2.scale = this.controls.sphere2.scale;
      this.sphere2.typeCsg = this.controls.sphere2.typeCsg;
      this.cube.x = this.controls.cube.x;
      this.cube.y = this.controls.cube.y;
      this.cube.z = this.controls.cube.z;
      this.cube.scaleX = this.controls.cube.scaleX;
      this.cube.scaleY = this.controls.cube.scaleY;
      this.cube.scaleZ = this.controls.cube.scaleZ;
      this.cube.typeCsg = this.controls.cube.typeCsg;
      if (this.result !== null && this.result !== undefined) {
        // this.result.resetMesh(true);
      }
    },
    rotateResult : false,
    hideWireframes : false
  }

  sphere1 = {
    x : -2,
    y : 0,
    z : 0,
    scale : 1
  }

  sphere2 = {
    x : 3,
    y : 0,
    z : 0,
    scale : 1,
    typeCsg : 'subtract'
  }
  cube = {
    x : -7,
    y : 0,
    z : 0,
    scaleX : 1,
    scaleY : 1,
    scaleZ : 1,
    typeCsg : 'subtract'
  }

  controlsParams: GuiControlParam[] = [
    { name : 'Sphere1' , type : 'folder', control : 'sphere1', children :[
      { name : 'x', type : 'number' , min : -15, max : 15 },
      { name : 'y', type : 'number' , min : -15, max : 15 },
      { name : 'z', type : 'number' , min : -15, max : 15 },
      { name : 'scale', type : 'number' , min : 0, max : 10 }
    ], isOpen : true },
    { name : 'Sphere2' , type : 'folder', control : 'sphere2', children :[
      { name : 'x', type : 'number' , min : -15, max : 15 },
      { name : 'y', type : 'number' , min : -15, max : 15 },
      { name : 'z', type : 'number' , min : -15, max : 15 },
      { name : 'scale', type : 'number' , min : 0, max : 10 },
      { name : 'typeCsg', type : 'select' , select : ['subtract', 'intersect','union','none'] },
    ], isOpen : true },
    { name : 'Cube' , type : 'folder', control : 'cube', children :[
      { name : 'x', type : 'number' , min : -15, max : 15 },
      { name : 'y', type : 'number' , min : -15, max : 15 },
      { name : 'z', type : 'number' , min : -15, max : 15 },
      { name : 'scaleX', type : 'number' , min : 0, max : 10 },
      { name : 'scaleY', type : 'number' , min : 0, max : 10 },
      { name : 'scaleZ', type : 'number' , min : 0, max : 10 },
      { name : 'typeCsg', type : 'select' , select : ['subtract', 'intersect','union','none'] },
    ], isOpen : true },
    { name: "showResult", type: "button" },
    { name: "rotateResult", type: "checkbox" },
    { name: "hideWireframes", type: "checkbox" }
  ]

  @ViewChild('result') result : MeshComponent = null;

  constructor() { }

  ngOnInit(): void {
    this.controls.showResult();
  }

  points: GeometriesVector3[] = [];
  rotation: GeometriesVector3 = {
    x: 0, y: 0, z: 0
  }

  onRender(timer: RendererTimer) {
    if (this.controls.rotateResult) {
      this.rotation.y += timer.delta * 20;
      this.rotation.x = this.rotation.z = this.rotation.y;
    }
  }
}
