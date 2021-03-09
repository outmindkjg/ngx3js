import { Component } from '@angular/core';
import { BaseComponent } from '../../three';
import { TeapotGeometry } from 'three/examples/jsm/geometries/TeapotGeometry.js';
import * as THREE from 'three';

@Component({
  selector: 'app-webgl-geometry-teapot',
  templateUrl: './webgl-geometry-teapot.component.html',
  styleUrls: ['./webgl-geometry-teapot.component.scss']
})
export class WebglGeometryTeapotComponent extends BaseComponent<{
  shininess: number,
  ka: number,
  kd: number,
  ks: number,
  metallic: boolean,
  hue:	number,
  saturation: number,
  lightness: number,
  lhue:	number,
  lsaturation: number,	// non-zero so that fractions will be shown
  llightness: number,
  lx: number,
  ly: number,
  lz: number,
  newTess: number,
  bottom: boolean,
  lid: boolean,
  body: boolean,
  fitLid: boolean,
  nonblinn: boolean,
  newShading: string      
}> {
  constructor() {
    super({
      shininess: 40.0,
      ka: 0.17,
      kd: 0.51,
      ks: 0.2,
      metallic: true,
      hue:	0.121,
      saturation: 0.73,
      lightness: 0.66,
      lhue:	0.04,
      lsaturation: 0.01,	// non-zero so that fractions will be shown
      llightness: 1.0,
      lx: 0.32,
      ly: 0.39,
      lz: 0.7,
      newTess: 15,
      bottom: true,
      lid: true,
      body: true,
      fitLid: false,
      nonblinn: false,
      newShading: "glossy"      
    },[
      { name : 'Material control', type : 'folder', children : [
        { name : 'shininess', type : 'number', min : 1.0, max : 400.0, step : 1.0, title : 'shininess', change : () => {
          this.changeColor();
        }},
        { name : 'kd', type : 'number', min : 0.0, max : 1.0, step : 0.025, title : 'diffuse strength', change : () => {
          this.changeColor();
        }},
        { name : 'ks', type : 'number', min : 0.0, max : 1.0, step : 0.025, title : 'specular strength', change : () => {
          this.changeColor();
        }},
        { name : 'metallic', type : 'checkbox',title : 'metallic', change : () => {
          this.changeColor();
        }},
      ]},
      { name : 'Material color', type : 'folder', children : [
        { name : 'hue', type : 'number', min : 0.0, max : 1.0, step : 0.025, title : 'hue', change : () => {
          this.changeColor();
        }},
        { name : 'saturation', type : 'number', min : 0.0, max : 1.0, step : 0.025, title : 'saturation', change : () => {
          this.changeColor();
        }},
        { name : 'lightness', type : 'number', min : 0.0, max : 1.0, step : 0.025, title : 'lightness', change : () => {
          this.changeColor();
        }},
      ]},
      { name : 'Lighting', type : 'folder', children : [
        { name : 'lhue', type : 'number', min : 0.0, max : 1.0, step : 0.025, title : 'hue', change : () => {
          this.changeColor();
        }},
        { name : 'lsaturation', type : 'number', min : 0.0, max : 1.0, step : 0.025, title : 'saturation', change : () => {
          this.changeColor();
        }},
        { name : 'llightness', type : 'number', min : 0.0, max : 1.0, step : 0.025, title : 'lightness', change : () => {
          this.changeColor();
        }},
        { name : 'ka', type : 'number', min : 0.0, max : 1.0, step : 0.025, title : 'ambient', change : () => {
          this.changeColor();
        }},
      ]},
      { name : 'Light direction', type : 'folder', children : [
        { name : 'lx', type : 'number', min : -1.0, max : 1.0, step : 0.025, title : 'x'},
        { name : 'ly', type : 'number', min : -1.0, max : 1.0, step : 0.025, title : 'y'},
        { name : 'lz', type : 'number', min : -1.0, max : 1.0, step : 0.025, title : 'z'},
      ]},
      { name : 'Tessellation control', type : 'folder', children : [
        { name : 'newTess', type : 'select', select : [ 2, 3, 4, 5, 6, 8, 10, 15, 20, 30, 40, 50 ], title : 'Tessellation Level', change : () => { this.createTeapot();}},
        { name : 'lid', type : 'checkbox', title : 'display lid', change : () => { this.createTeapot();}},
        { name : 'body', type : 'checkbox', title : 'display body', change : () => { this.createTeapot();}},
        { name : 'bottom', type : 'checkbox', title : 'display bottom', change : () => { this.createTeapot();}},
        { name : 'fitLid', type : 'checkbox', title : 'snug lid', change : () => { this.createTeapot();}},
        { name : 'nonblinn', type : 'checkbox', title : 'original scale', change : () => { this.createTeapot();}},
      ]},
      { name : 'newShading', title : 'Shading', type : 'select' , select : ["wireframe", "flat", "smooth", "glossy", "textured", "reflective"], change : () => {
        this.changeShading();
      }}
    ]);
  }

  teapot : THREE.BufferGeometry = null;
  material : { type : string, color : number, specular: number, flatShading: boolean, wireframe : boolean, side : string, map? : string, env? : string , envPath? : string[]} = null;

  lightColor : number = 0;
  ambientLight : number = 0;

  ngOnInit() {
    this.createTeapot();
    this.changeColor();
    this.changeShading();
  }


  changeColor () {
    const diffuseColor = new THREE.Color();
    const specularColor = new THREE.Color();
    diffuseColor.setHSL( this.controls.hue, this.controls.saturation, this.controls.lightness );
    if ( this.controls.metallic ) {
      specularColor.copy( diffuseColor );
    } else {
      specularColor.setRGB( 1, 1, 1 );
    }
    diffuseColor.multiplyScalar( this.controls.kd );
    Object.entries(this.teapotMaterial).forEach(([, value]) => {
      value.color = diffuseColor.getHex();
    })
    specularColor.multiplyScalar( this.controls.ks );
    this.teapotMaterial.phong.specular = specularColor.getHex();
    this.teapotMaterial.textured.specular = specularColor.getHex();

    const ambientLight = new THREE.Color();
    ambientLight.setHSL( this.controls.hue, this.controls.saturation, this.controls.lightness * this.controls.ka );
    this.ambientLight = ambientLight.getHex();

    const light = new THREE.Color();
    light.setHSL( this.controls.lhue, this.controls.lsaturation, this.controls.llightness );
    this.lightColor = light.getHex();
  }

  changeShading() {
    switch(this.controls.newShading) {
      case "wireframe" :
        this.material = this.teapotMaterial.wire;
        break;
      case "flat" :
        this.material = this.teapotMaterial.flat;
        break;
      case "smooth" :
        this.material = this.teapotMaterial.gouraud;
        break;
      case "glossy" :
        this.material = this.teapotMaterial.phong;
        break;
      case "textured" :
        this.material = this.teapotMaterial.textured;
        break;
      case "reflective" :
        this.material = this.teapotMaterial.reflective;
        break;
    }
  }

  teapotSize = 400;

  teapotMaterial : { [key : string] : any }= {
    wire : { type : 'MeshBasic', color : 0xFFFFFF, wireframe : true},
    flat : { type : 'MeshPhong', color : 0xFFFFFF, specular: 0x000000, flatShading: true, side : 'double', wireframe : false},
    gouraud : { type : 'MeshLambert', color : 0xFFFFFF, side : 'double', wireframe : false},
    phong : { type : 'MeshPhong', color : 0xFFFFFF, side : 'double', wireframe : false},
    textured : { type : 'MeshPhong', color : 0xFFFFFF, side : 'double', wireframe : false, map : true },
    reflective : { type : 'MeshPhong', color : 0xFFFFFF, side : 'double', wireframe : false, map : true , env : true},
  }

  createTeapot() {
    if (this.teapot !== null) {
      this.teapot.dispose();
    }
    this.teapot = new TeapotGeometry(
      this.teapotSize,
      this.controls.newTess,
      this.controls.bottom,
      this.controls.lid,
      this.controls.body,
      this.controls.fitLid,
      this.controls.nonblinn ? 0 : 1
    );
  }

}
