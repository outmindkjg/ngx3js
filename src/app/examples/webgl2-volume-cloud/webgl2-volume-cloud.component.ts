import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl2-volume-cloud',
  templateUrl: './webgl2-volume-cloud.component.html',
  styleUrls: ['./webgl2-volume-cloud.component.scss']
})
export class Webgl2VolumeCloudComponent extends BaseComponent<{
  geometry : {
    type : string;
    width : number;
    height : number;
    depth : number;
    radius : number;
  },
  material : {
    type : string;
    color : number;
    colorMultiply : number,
    transparent : boolean;
    opacity : number;
  },
  mesh : {
    type : string;
    usePosition : boolean;
    position : {
      x : number;
      y : number;
      z : number;
    },
    castShadow : boolean;
  }
}> {

  constructor() {
    super({
      geometry : {
        type : 'box',
        width : 1,
        height : 1,
        depth : 1,
        radius : 1
      },
      material : {
        type : 'meshlambert',
        color : 0xff0000,
        colorMultiply : 1,
        transparent : false,
        opacity : 1
      },
      mesh : {
        type : 'mesh',
        usePosition : false,
        position : {
          x : -2,
          y : 3,
          z : 0
        },
        castShadow : true
      }
    },[
      { name : 'geometry', type : 'folder', control : 'geometry', isOpen : true , children : [
        { name : 'type', type : 'select', select : ['box', 'sphere','ring','text', 'torus']},
        { name : 'width', type : 'number', min : 0.1, max : 2, step : 0.1},
        { name : 'height', type : 'number', min : 0.1, max : 2, step : 0.1},
        { name : 'depth', type : 'number', min : 0.1, max : 2, step : 0.1},
        { name : 'radius', type : 'number', min : 0.1, max : 2, step : 0.1},
      ]},
      { name : 'material', type : 'folder', control : 'material', isOpen : true , children : [
        { name : 'type', type : 'select', select : ['meshlambert', 'meshnormal','meshphong','meshstandard']},
        { name : 'color', type : 'color'},
        { name : 'colorMultiply', type : 'number', min : 0, max : 1, step : 0.1},
        { name : 'transparent', type : 'checkbox'},
        { name : 'opacity', type : 'number', min : 0, max : 1, step : 0.1}
      ]},
      { name : 'mesh', type : 'folder', control : 'mesh', isOpen : true , children : [
        { name : 'type', type : 'select', select : ['mesh', 'line','points']},
        { name : 'usePosition', type : 'checkbox'},
        { name : 'position', type : 'folder', control : 'position', isOpen : true, children : [
          { name : 'x', type : 'number', min : -2, max : 2, step : 0.1},
          { name : 'y', type : 'number', min : -2, max : 2, step : 0.1},
          { name : 'z', type : 'number', min : -2, max : 2, step : 0.1},
        ]},
        { name : 'castShadow', type : 'checkbox'}
      ]}
    ]);
  }

}
