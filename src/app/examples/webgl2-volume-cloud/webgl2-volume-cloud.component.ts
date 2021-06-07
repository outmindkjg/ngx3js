import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl2-volume-cloud',
  templateUrl: './webgl2-volume-cloud.component.html',
  styleUrls: ['./webgl2-volume-cloud.component.scss']
})
export class Webgl2VolumeCloudComponent extends BaseComponent<{
  renderer : {
    antialias : boolean;
    clearColor : number;
    shadowMapEnabled : boolean;
    enablePan : boolean;
    enableDamping : boolean;
  },
  camera : {
    type : string;
    fov : number;
    near : number;
    far : number;
  }
  useGeometry : number;
  geometry : {
    type : string;
    alignX : string;
    alignY : string;
    alignZ : string;
    width : number;
    height : number;
    depth : number;
    radius : number;
  },
  useMaterial : number;
  material : {
    type : string;
    color : number;
    colorMultiply : number,
    transparent : boolean;
    opacity : number;
  },
  mesh : {
    type : string;
    materialIsArray : boolean;
    castShadow : boolean;
  },
  usePosition : number;
  position : {
    x : number;
    y : number;
    z : number;
  },
  useRotation : number;
  rotation : {
    x : number;
    y : number;
    z : number;
  },
  useScale : number;
  scale : {
    x : number;
    y : number;
    z : number;
  },
  useLookat : number;
  lookat : {
    x : number;
    y : number;
    z : number;
  }
}> {

  constructor() {
    super({
      renderer : {
        antialias : true,
        clearColor : 0xffffff,
        shadowMapEnabled : true,
        enablePan : false,
        enableDamping : true
      },
      camera : {
        type : 'perspective',
        fov : 45,
        near : 1,
        far : 1000
      },
      useGeometry : 0,
      geometry : {
        type : 'box',
        alignX : 'left',
        alignY : 'none',
        alignZ : 'none',
        width : 1,
        height : 1,
        depth : 1,
        radius : 1
      },
      useMaterial: 0,
      material : {
        type : 'meshlambert',
        color : 0xff0000,
        colorMultiply : 1,
        transparent : false,
        opacity : 1
      },
      mesh : {
        type : 'mesh',
        materialIsArray: false,
        castShadow : true
      },
      usePosition : 0,
      position : {
        x : 0,
        y : 1,
        z : 0
      },
      useRotation : 0,
      rotation : {
        x : 0,
        y : 0,
        z : 0
      },
      useScale : 0,
      scale : {
        x : 1,
        y : 1,
        z : 1
      },
      useLookat : 1,
      lookat : {
        x : 1,
        y : 1,
        z : 1
      },
    },[
      { name : 'renderer', type : 'folder', control : 'renderer', isOpen : false , children : [
        { name : 'antialias', type : 'checkbox'},
        { name : 'clearColor', type : 'color'},
        { name : 'shadowMapEnabled', type : 'checkbox'},
        { name : 'enablePan', type : 'checkbox'},
        { name : 'enableDamping', type : 'checkbox'},
      ]},
      { name : 'camera', type : 'folder', control : 'camera', isOpen : false , children : [
        { name : 'type', type : 'select', select : ['orthographic', 'perspective']},
        { name : 'fov', type : 'number', min : 10, max : 90, step : 5},
        { name : 'near', type : 'number', min : 0.1, max : 100, step : 0.1},
        { name : 'far', type : 'number', min : 100, max : 10000, step : 10}
      ]},
      { name : 'useGeometry', type : 'number', min : 0, max : 5, step : 1},
      { name : 'geometry', type : 'folder', control : 'geometry', isOpen : true , children : [
        { name : 'type', type : 'select', select : ['box', 'sphere','ring','text', 'torus']},
        { name : 'alignX', type : 'select', select : ['none', 'left','right','center']},
        { name : 'alignY', type : 'select', select : ['none', 'top','middle','bottom']},
        { name : 'alignZ', type : 'select', select : ['none', 'front','double','back']},
        { name : 'width', type : 'number', min : 0.1, max : 2, step : 0.1},
        { name : 'height', type : 'number', min : 0.1, max : 2, step : 0.1},
        { name : 'depth', type : 'number', min : 0.1, max : 2, step : 0.1},
        { name : 'radius', type : 'number', min : 0.1, max : 2, step : 0.1},
      ]},
      { name : 'useMaterial', type : 'number', min : 0, max : 5, step : 1},
      { name : 'material', type : 'folder', control : 'material', isOpen : false , children : [
        { name : 'type', type : 'select', select : ['meshlambert', 'meshnormal','meshphong','meshstandard','points']},
        { name : 'color', type : 'color'},
        { name : 'colorMultiply', type : 'number', min : 0, max : 1, step : 0.1},
        { name : 'transparent', type : 'checkbox'},
        { name : 'opacity', type : 'number', min : 0, max : 1, step : 0.1}
      ]},
      { name : 'mesh', type : 'folder', control : 'mesh', isOpen : false , children : [
        { name : 'type', type : 'select', select : ['mesh', 'line','points']},
        { name : 'materialIsArray', type : 'checkbox'},
        { name : 'castShadow', type : 'checkbox'}
      ]},
      { name : 'usePosition', type : 'number', min : 0, max : 5, step : 1},
      { name : 'position', type : 'folder', control : 'position', isOpen : false, children : [
        { name : 'x', type : 'number', min : -2, max : 2, step : 0.1},
        { name : 'y', type : 'number', min : -2, max : 2, step : 0.1},
        { name : 'z', type : 'number', min : -2, max : 2, step : 0.1},
      ]},
      { name : 'useRotation', type : 'number', min : 0, max : 5, step : 1},
      { name : 'rotation', type : 'folder', control : 'rotation', isOpen : false, children : [
        { name : 'x', type : 'number', min : -180, max : 180, step : 0.1},
        { name : 'y', type : 'number', min : -180, max : 180, step : 0.1},
        { name : 'z', type : 'number', min : -180, max : 180, step : 0.1},
      ]},
      { name : 'useScale', type : 'number', min : 0, max : 5, step : 1},
      { name : 'scale', type : 'folder', control : 'scale', isOpen : false, children : [
        { name : 'x', type : 'number', min : 0.5, max : 2, step : 0.1},
        { name : 'y', type : 'number', min : 0.5, max : 2, step : 0.1},
        { name : 'z', type : 'number', min : 0.5, max : 2, step : 0.1},
      ]},
      { name : 'useLookat', type : 'number', min : 0, max : 5, step : 1},
      { name : 'lookat', type : 'folder', control : 'lookat', isOpen : false, children : [
        { name : 'x', type : 'number', min : 0.5, max : 2, step : 0.1},
        { name : 'y', type : 'number', min : 0.5, max : 2, step : 0.1},
        { name : 'z', type : 'number', min : 0.5, max : 2, step : 0.1},
      ]},
    ]);
  }

}
