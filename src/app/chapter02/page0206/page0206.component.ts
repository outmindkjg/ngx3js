import { Component, OnInit, ViewChild } from '@angular/core';
import { GeometriesVector3, GuiControlParam, MeshComponent } from '../../three';

@Component({
  selector: 'app-page0206',
  templateUrl: './page0206.component.html',
  styleUrls: ['./page0206.component.scss']
})
export class Page0206Component implements OnInit {

  @ViewChild('cube') cube : MeshComponent;

  position : GeometriesVector3 = {
    x : 0,
    y : 4,
    z : 0
  }

  scale : GeometriesVector3 = {
    x : 1,
    y : 1,
    z : 1
  }

  rotation : GeometriesVector3 = {
    x : 0,
    y : 0,
    z : 0
  }

  translate : any = {
    x : 0,
    y : 0,
    z : 0,
    translate : () => {
      const mesh = this.cube.getObject3d();
      mesh.translateX(this.translate.x);
      mesh.translateY(this.translate.y);
      mesh.translateZ(this.translate.z);
      const position = mesh.position;
      this.position.x = position.x;
      this.position.y = position.y;
      this.position.z = position.z;
    }
  }
 
  controls = {
    position : null,
    scale : null,
    rotation : null,
    translate : null,
    visible : true
  }

  controlsParams : GuiControlParam[] = [

  ];


  constructor() { }

  ngOnInit(): void {
    this.controls.position = this.position;
    this.controls.scale = this.scale;
    this.controls.rotation = this.rotation;
    this.controls.translate = this.translate;
    this.controlsParams.push({
      name : 'Scale',
      type : 'folder',
      control : 'scale',
      children : [
        { name : 'x', type : 'number', min : 0.5, max : 5 },
        { name : 'y', type : 'number', min : 0.5, max : 5 },
        { name : 'z', type : 'number', min : 0.5, max : 5 },
      ]
    });
    this.controlsParams.push({
      name : 'Position',
      type : 'folder',
      control : 'position',
      children : [
        { name : 'x', type : 'number', min : 0, max : 10, listen : true },
        { name : 'y', type : 'number', min : 0, max : 10, listen : true },
        { name : 'z', type : 'number', min : 0, max : 10, listen : true },
      ]
    });
    this.controlsParams.push({
      name : 'Rotation',
      type : 'folder',
      control : 'rotation',
      children : [
        { name : 'x', type : 'number', min : -360, max : 360, step : 10 },
        { name : 'y', type : 'number', min : -360, max : 360, step : 10 },
        { name : 'z', type : 'number', min : -360, max : 360, step : 10 },
      ]
    });
    this.controlsParams.push({
      name : 'Translate',
      type : 'folder',
      control : 'translate',
      children : [
        { name : 'x', type : 'number', min : -10, max : 10 },
        { name : 'y', type : 'number', min : -10, max : 10 },
        { name : 'z', type : 'number', min : -10, max : 10 },
        { name : 'translate', type : 'button'},
      ]
    });
    this.controlsParams.push({
      name : 'visible',
      type : 'button'
    });
  }



}
