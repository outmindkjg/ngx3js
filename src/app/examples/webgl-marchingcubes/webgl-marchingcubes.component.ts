import { Component } from '@angular/core';
import { BaseComponent, MeshComponent, RendererTimer, ThreeUtil } from 'ngx3js';

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
  enableUvs? : boolean;
  enableColors? : boolean;
}

@Component({
  selector: 'app-webgl-marchingcubes',
  templateUrl: './webgl-marchingcubes.component.html',
  styleUrls: ['./webgl-marchingcubes.component.scss']
})
export class WebglMarchingcubesComponent extends BaseComponent<{
  material : string;
  speed: 1.0,
  numBlobs: 10,
  resolution: 28,
  isolation: 80,
  floor: true,
  wallx: false,
  wallz: false,
  hue: 0.0,
  saturation: 0.8,
  lightness: 0.1,
  lhue: 0.04,
  lsaturation: 1.0,
  llightness: 0.5,
  lx: 0.5,
  ly: 0.5,
  lz: 1.0
}> {

  constructor() {
    super({ 
      material : 'shiny',
      speed: 1.0,
      numBlobs: 10,
      resolution: 28,
      isolation: 80,
      floor: true,
      wallx: false,
      wallz: false,
      hue: 0.0,
      saturation: 0.8,
      lightness: 0.1,
      lhue: 0.04,
      lsaturation: 1.0,
      llightness: 0.5,
      lx: 0.5,
      ly: 0.5,
      lz: 1.0,
    },[
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
      }},
      { name : 'Material color' , type : 'folder', children : [
        { name : 'hue', type: 'number', min : 0.0, max : 1.0, step : 0.025 },
        { name : 'saturation', type: 'number', min : 0.0, max : 1.0, step : 0.025 },
        { name : 'lightness', type: 'number', min : 0.0, max : 1.0, step : 0.025 }
      ]},
      { name : 'Point light color' , type : 'folder', children : [
        { name : 'lhue', title : 'hue', type: 'number', min : 0.0, max : 1.0, step : 0.025 },
        { name : 'lsaturation', title : 'saturation', type: 'number', min : 0.0, max : 1.0, step : 0.025 },
        { name : 'llightness', title : 'lightness', type: 'number', min : 0.0, max : 1.0, step : 0.025 }
      ]},
      { name : 'Directional light orientation' , type : 'folder', children : [
        { name : 'lx', title : 'x', type: 'number', min : -1.0, max : 1.0, step : 0.025 },
        { name : 'ly', title : 'y', type: 'number', min : -1.0, max : 1.0, step : 0.025 },
        { name : 'lz', title : 'z', type: 'number', min : -1.0, max : 1.0, step : 0.025 },
      ]},
      { name : 'Simulation' , type : 'folder', children : [
        { name : 'speed', title : 'speed', type: 'number', min : 0.1, max : 8.0, step : 0.05 },
        { name : 'numBlobs', title : 'numBlobs', type: 'number', min : 1, max : 50, step : 1 , change : () => { this.blobInfos = this.getBlobInfos(0)}},
        { name : 'resolution', title : 'resolution', type: 'number', min : 14, max : 100, step : 1 },
        { name : 'isolation', title : 'isolation', type: 'number', min : 10, max : 300, step : 1 },
        { name : 'floor', title : 'floor', type: 'checkbox', change : () => {this.setWallInfo()}},
        { name : 'wallx', title : 'wallx', type: 'checkbox', change : () => {this.setWallInfo()}},
        { name : 'wallz', title : 'wallz', type: 'checkbox', change : () => {this.setWallInfo()}},
      ]},
    ]);
  }

  ngOnInit() {
    this.setMaterialInfo(this.controls.material);
    this.setWallInfo();
  }
  
  setWallInfo() {
    this.planeInfos = [];
    if (this.controls.floor) {
      this.planeInfos.push({
        type : 'y',
        strength : 2,
        subtract : 12
      })
    }
    if (this.controls.wallx) {
      this.planeInfos.push({
        type : 'x',
        strength : 2,
        subtract : 12
      })
    }
    if (this.controls.wallz) {
      this.planeInfos.push({
        type : 'z',
        strength : 2,
        subtract : 12
      })
    }
  }

  planeInfos : {type : string, strength: number, subtract: number}[] = [];

  rainbow = [
    0xff0000,
    0xff7f00,
    0xffff00,
    0x00ff00,
    0x0000ff,
    0x4b0082,
    0x9400d3
  ];

  getBlobInfos(time : number) : { x : number, y : number, z : number, strength: number, subtract: number, colors? : any }[] {
    const subtract = 12;
    const numblobs = this.controls.numBlobs;
    const strength = 1.2 / ( ( Math.sqrt( numblobs ) - 1 ) / 4 + 1 );
    const blobInfos : { x : number, y : number, z : number, strength: number, subtract: number, colors? : any }[] = [];
    for ( let i = 0; i < numblobs; i ++ ) {
      const ballx = Math.sin( i + 1.26 * time * ( 1.03 + 0.5 * Math.cos( 0.21 * i ) ) ) * 0.27 + 0.5;
      const bally = Math.abs( Math.cos( i + 1.12 * time * Math.cos( 1.22 + 0.1424 * i ) ) ) * 0.77; // dip into the floor
      const ballz = Math.cos( i + 1.32 * time * 0.1 * Math.sin( ( 0.92 + 0.53 * i ) ) ) * 0.27 + 0.5;
      blobInfos.push({
        x : ballx,
        y : bally,
        z : ballz,
        strength : strength,
        subtract : subtract,
        colors : (this.controls.material ==='multiColors') ? this.rainbow[i % 7] : undefined
      })
    }
    return blobInfos;
  }

  blobInfos: { x : number, y : number, z : number, strength: number, subtract: number, colors? : any }[] = [];

  setMaterialInfo(id : string) {
    const info = this.materials[id];
    this.blobInfos = this.getBlobInfos(0);
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
      enableUvs : ( id === "textured" ) ? true : false,
      enableColors : ( id === "colors" || id === "multiColors" ) ? true : false
    }
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

  setMesh(mesh : MeshComponent) {
    super.setMesh(mesh);
    this.effect = mesh.getObject3d();
  }

  effect : any = null;
  time : number = 0;
  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.effect !== null) {
			this.time += timer.delta * this.controls.speed * 0.5;
      this.effect.reset();
      const blobInfos = this.getBlobInfos(this.time);
      blobInfos.forEach(blobInfo => {
        this.effect.addBall( blobInfo.x, blobInfo.y, blobInfo.z, blobInfo.strength, blobInfo.subtract, ThreeUtil.getColorSafe(blobInfo.colors));
      });
      this.planeInfos.forEach(plane => {
        switch(plane.type.toLowerCase()) {
          case 'x' :
            this.effect.addPlaneX( plane.strength, plane.subtract );
            break;
          case 'y' :
            this.effect.addPlaneY( plane.strength, plane.subtract );
            break;
          case 'z' :
            this.effect.addPlaneZ( plane.strength, plane.subtract );
            break;
        }
      })
    }
  }
}
