import { Component } from '@angular/core';
import { BaseComponent, MeshComponent, RendererEvent } from '../../three';
import * as THREE from 'three';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

@Component({
  selector: 'app-webgl-interactive-points',
  templateUrl: './webgl-interactive-points.component.html',
  styleUrls: ['./webgl-interactive-points.component.scss']
})
export class WebglInteractivePointsComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  ngOnInit() {
    const PARTICLE_SIZE = 20;
    let boxGeometry : THREE.BufferGeometry = new THREE.BoxGeometry( 200, 200, 200, 16, 16, 16 );
    // if normal and uv attributes are not removed, mergeVertices() can't consolidate indentical vertices with different normal/uv data
    boxGeometry.deleteAttribute( 'normal' );
    boxGeometry.deleteAttribute( 'uv' );
    boxGeometry = BufferGeometryUtils.mergeVertices( boxGeometry );
    //
    const positionAttribute = boxGeometry.getAttribute( 'position' );
    const colors = [];
    const sizes = [];
    const color = new THREE.Color();
    for ( let i = 0, l = positionAttribute.count; i < l; i ++ ) {
      color.setHSL( 0.01 + 0.1 * ( i / l ), 1.0, 0.5 );
      color.toArray( colors, i * 3 );
      sizes[ i ] = PARTICLE_SIZE * 0.5;
    }
    this.position = positionAttribute;
    this.colors = colors;
    this.sizes = sizes;
  }

  shaderFragment = `
uniform vec3 color;
uniform sampler2D pointTexture;
varying vec3 vColor;
void main() {
  gl_FragColor = vec4( color * vColor, 1.0 );
  gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
  if ( gl_FragColor.a < ALPHATEST ) discard;
}
  `;

  shaderVertex = `
attribute float size;
attribute vec3 customColor;
varying vec3 vColor;
void main() {
  vColor = customColor;
  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  gl_PointSize = size * ( 300.0 / -mvPosition.z );
  gl_Position = projectionMatrix * mvPosition;
}
  `

  uniforms = {
    color: { type : 'color', value: 0xffffff },
    pointTexture: { type : 'Texture', value: '/assets/examples/textures/sprites/disc.png' }
  }

  position : any ;
  colors : number[] = [];
  sizes : number[] = [];

  particles : THREE.Points = null ;
  setMesh(mesh : MeshComponent) {
    super.setMesh(mesh);
    this.particles = mesh.getObject3d().children[0] as THREE.Points;
  } 

  lastIntersect : number = null;
  onMouseMove(event : RendererEvent) {
    if (this.camera !== null && this.mesh !== null && this.particles !== null) {
      const intersect = this.camera.getIntersection(event.mouse, this.particles );
     const PARTICLE_SIZE = 20;
      if ( intersect !== null) {
        if ( this.lastIntersect != intersect.index ) {
          const attributesSize =  this.particles.geometry.getAttribute( 'size' ) as any;
          if (this.lastIntersect !== null) {
            attributesSize.array[ this.lastIntersect ] = PARTICLE_SIZE;
          }
          this.lastIntersect = intersect.index;
          attributesSize.array[ this.lastIntersect ] = PARTICLE_SIZE * 1.25;
          attributesSize.needsUpdate = true;
        }
      } else if ( this.lastIntersect !== null ) {
        const attributesSize =  this.particles.geometry.getAttribute( 'size' ) as any;
        attributesSize.array[ this.lastIntersect ] = PARTICLE_SIZE;
        attributesSize.needsUpdate = true;
        this.lastIntersect = null;
      }
    }
  }

}
