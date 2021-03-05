import { Component, ViewChild } from '@angular/core';
import { BaseComponent, GeometryComponent } from '../../three';
import * as THREE from 'three';
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js';

@Component({
  selector: 'app-webgl-geometry-minecraft',
  templateUrl: './webgl-geometry-minecraft.component.html',
  styleUrls: ['./webgl-geometry-minecraft.component.scss']
})
export class WebglGeometryMinecraftComponent extends BaseComponent<{}> {

  @ViewChild('pxGeometry') private pxGeometry: GeometryComponent = null;
  @ViewChild('nxGeometry') private nxGeometry: GeometryComponent = null;
  @ViewChild('pyGeometry') private pyGeometry: GeometryComponent = null;
  @ViewChild('pzGeometry') private pzGeometry: GeometryComponent = null;
  @ViewChild('nzGeometry') private nzGeometry: GeometryComponent = null;

  constructor() {
    super({},[]);
  }

  ngAfterViewInit() {
    this.data = this.generateHeight( this.worldWidth, this.worldDepth );
    if (this.pxGeometry !== null) {
      this.geometry.pxGeometry = this.setGeometry(
        this.pxGeometry.getGeometry() as THREE.PlaneGeometry, 
        [1,3],
        {x : 0, y : Math.PI / 2, z : 0},
        {x : 50, y : 0, z : 0}
      );
    }
    if (this.nxGeometry !== null) {
      this.geometry.nxGeometry = this.setGeometry(
        this.nxGeometry.getGeometry() as THREE.PlaneGeometry, 
        [1,3],
        {x : 0, y : -Math.PI/2, z : 0},
        {x : -50, y : 0, z : 0}
      );
    }
    if (this.pyGeometry !== null) {
      this.geometry.pyGeometry = this.setGeometry(
        this.pyGeometry.getGeometry() as THREE.PlaneGeometry, 
        [5,7],
        {x : - Math.PI / 2, y : 0, z : 0},
        {x : 0, y : 50, z : 0}
      );
    }
    if (this.pzGeometry !== null) {
      this.geometry.pzGeometry = this.setGeometry(
        this.pzGeometry.getGeometry() as THREE.PlaneGeometry, 
        [1,3],
        {x : 0, y : 0, z : 0},
        {x : 0, y : 0, z : 50}
      );
    }
    if (this.nzGeometry !== null) {
      this.geometry.nzGeometry = this.setGeometry(
        this.nzGeometry.getGeometry() as THREE.PlaneGeometry, 
        [1,3],
        {x : 0, y : Math.PI, z : 0},
        {x : 50, y : 0, z : -50}
      );
    }
    setTimeout(() => {
      this.geometries = this.getGeometries();
    }, 100);
  }

  geometries : THREE.BufferGeometry[] = null

  generateHeight( width : number, height : number ):number[] {
    const data : number[] = [], perlin = new ImprovedNoise(),
      size = width * height, z = Math.random() * 100;
    let quality = 2;
    for ( let j = 0; j < 4; j ++ ) {
      if ( j === 0 ) for ( let i = 0; i < size; i ++ ) data[ i ] = 0;
      for ( let i = 0; i < size; i ++ ) {
        const x = i % width, y = ( i / width ) | 0;
        data[ i ] += perlin.noise( x / quality, y / quality, z ) * quality;
      }
      quality *= 4;
    }
    return data;
  }  

  geometry : {
    pxGeometry: THREE.PlaneGeometry;
    nxGeometry: THREE.PlaneGeometry;
    pyGeometry: THREE.PlaneGeometry;
    pzGeometry: THREE.PlaneGeometry;
    nzGeometry: THREE.PlaneGeometry;
  } = {
    pxGeometry: null,
    nxGeometry: null,
    pyGeometry: null,
    pzGeometry: null,
    nzGeometry: null
  }

  setGeometry(geometry : THREE.PlaneGeometry, uv : number[], rotate : { x : number, y : number, z : number}, translate : { x : number, y : number, z : number}): THREE.PlaneGeometry {
    const attributesUv = geometry.attributes.uv as any;
    uv.forEach(idx => {
      attributesUv.array[ idx ] = 0.5;
    });
    if (rotate.x !== 0) {
      geometry.rotateX( rotate.x );
    }
    if (rotate.y !== 0) {
      geometry.rotateY( rotate.y );
    }
    if (rotate.z !== 0) {
      geometry.rotateZ( rotate.z );
    }
    geometry.translate(translate.x,translate.y,translate.z);
    return geometry;
  }

  worldWidth : number = 128;
  worldDepth : number = 128;
  matrix = new THREE.Matrix4();
  data : number[] = [];

  getY( x, z ) { 
    return ( this.data[ x + z * this.worldWidth ] * 0.2 ) | 0;
  }

  getGeometries() : THREE.BufferGeometry[] {
    const geometries : THREE.BufferGeometry[] = [];
    const worldDepth = this.worldDepth;
    const worldWidth = this.worldWidth;
    const worldHalfWidth = worldWidth / 2;
    const worldHalfDepth = worldDepth / 2;
    const matrix = this.matrix;
    for ( let z = 0; z < worldDepth; z ++ ) {
      for ( let x = 0; x < worldWidth; x ++ ) {
        const h = this.getY( x, z );
        matrix.makeTranslation(
          x * 100 - worldHalfWidth * 100,
          h * 100,
          z * 100 - worldHalfDepth * 100
        );
        const px = this.getY( x + 1, z );
        const nx = this.getY( x - 1, z );
        const pz = this.getY( x, z + 1 );
        const nz = this.getY( x, z - 1 );
        geometries.push( this.geometry.pyGeometry.clone().applyMatrix4( matrix ) );
        if ( ( px !== h && px !== h + 1 ) || x === 0 ) {
          geometries.push( this.geometry.pxGeometry.clone().applyMatrix4( matrix ) );
        }
        if ( ( nx !== h && nx !== h + 1 ) || x === worldWidth - 1 ) {
          geometries.push( this.geometry.nxGeometry.clone().applyMatrix4( matrix ) );
        }
        if ( ( pz !== h && pz !== h + 1 ) || z === worldDepth - 1 ) {
          geometries.push( this.geometry.pzGeometry.clone().applyMatrix4( matrix ) );
        }
        if ( ( nz !== h && nz !== h + 1 ) || z === 0 ) {
          geometries.push( this.geometry.nzGeometry.clone().applyMatrix4( matrix ) );
        }
      }
    }
    return geometries;
  }
}
