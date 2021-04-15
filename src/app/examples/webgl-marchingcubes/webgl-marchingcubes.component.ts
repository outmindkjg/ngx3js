import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

export interface MaterialInfo {
  type : string;
  color? : string | number;
  envMap? : boolean;
  map? : boolean;
  refractionRatio? : number;
  roughness? : number;
  metalness? : number;
  flatShading? : boolean;
  specular? : string | number;
  shininess? : number;
  vertexColors? : boolean; 
  h? : number;
  s? : number;
  l? : number;
}

@Component({
  selector: 'app-webgl-marchingcubes',
  templateUrl: './webgl-marchingcubes.component.html',
  styleUrls: ['./webgl-marchingcubes.component.scss']
})
export class WebglMarchingcubesComponent extends BaseComponent<{
  material : string;
}> {

  constructor() {
    super({ material : 'shiny'},[
      { name : 'material', type : 'select' , select : [
        'chrome',
        'liquid',
        'shiny',
        'matte',
        'flat',
        'textured',
        'colors',
        'multiColors',
        'plastic',
      ], change : () => {
        this.setMaterialInfo(this.controls.material);
      }}
    ]);
  }

  ngOnInit() {
    this.setMaterialInfo(this.controls.material);
  }

  setMaterialInfo(id : string) {
    const info = this.materials[id];
    this.materialInfo = {
      type : info.type,
      // color : 'hsl('+info.h+','+info.s+','+info.l + ')',
      color : info.color,
      envMap : info.envMap,
      map : info.map,
      refractionRatio : info.refractionRatio,
      roughness : info.roughness,
      metalness : info.metalness,
      flatShading : info.flatShading,
      specular : info.specular,
      shininess : info.shininess,
      vertexColors : info.vertexColors,
      h : info.h,
      s : info.s,
      l : info.l,
    }
    console.log(this.materialInfo);
  }

  materialInfo : MaterialInfo = null;

  materials : {[key : string] : MaterialInfo} ={
    "chrome": {
      type: 'MeshLambert',
      envMap: true,
      h: 0, s: 0, l: 1
    },
    "liquid": {
      type: 'MeshLambert',
      color: 0xffffff, 
      envMap: true, 
      refractionRatio: 0.85,
      h: 0, s: 0, l: 1
    },

    "shiny": {
      type: 'MeshStandard',
      color: 0x550000, 
      envMap: true, 
      roughness: 0.1, 
      metalness: 1.0,
      h: 0, s: 0.8, l: 0.2
    },

    "matte": {
      type: 'MeshPhong',
      color: 0x000000, 
      specular: 0x111111, 
      shininess: 1,
      h: 0, 
      s: 0, 
      l: 1
    },

    "flat": {
      type : 'MeshLambert',
      color: 0x000000, 
      flatShading: true,
      h: 0, s: 0, l: 1
    },

    "textured": {
      type :'MeshPhong',
      color: 0xffffff, 
      specular: 0x111111, 
      shininess: 1, 
      map: true,
      h: 0, s: 0, l: 1
    },

    "colors": {
      type : 'MeshPhong',
      color: 0xffffff, 
      specular: 0xffffff, 
      shininess: 2, 
      vertexColors: true,
      h: 0, s: 0, l: 1
    },

    "multiColors": {
      type : 'MeshPhong',
      shininess: 2, 
      vertexColors: true,
      h: 0, s: 0, l: 1
    },

    "plastic": {
      type : 'MeshPhong',
      color: 0x000000, 
      specular: 0x888888, 
      shininess: 250,
      h: 0.6, s: 0.8, l: 0.1
    },
    "toon1": {
      type : 'MeshPhong',
      h: 0.2, s: 1, l: 0.75
    },
    "toon2": {
      type : 'MeshPhong',
      h: 0.4, s: 1, l: 0.75
    },
    "hatching": {
      type : 'MeshPhong',
      h: 0.2, s: 1, l: 0.9
    },
    "dotted": {
      type : 'MeshPhong',
      h: 0.2, s: 1, l: 0.9
    }
  };
}
