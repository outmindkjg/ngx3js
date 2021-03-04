import { Component } from '@angular/core';
import { BaseComponent } from '../../three';
import * as THREE from 'three';

@Component({
  selector: 'app-webgl-geometry-colors',
  templateUrl: './webgl-geometry-colors.component.html',
  styleUrls: ['./webgl-geometry-colors.component.scss']
})
export class WebglGeometryColorsComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  radius = 200;

  
  setShadowCanvas(context : CanvasRenderingContext2D) {
    const canvas = context.canvas;
    const gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
    gradient.addColorStop( 0.1, 'rgba(210,210,210,1)' );
    gradient.addColorStop( 1, 'rgba(255,255,255,1)' );
    context.fillStyle = gradient;
    context.fillRect( 0, 0, canvas.width, canvas.height );
    console.log(context);
  }

  setGeometry1(geometry : THREE.BufferGeometry) {
    const count = geometry.attributes.position.count;
    geometry.setAttribute( 'color', new THREE.BufferAttribute( new Float32Array( count * 3 ), 3 ) );
    const color = new THREE.Color();
    const positions = geometry.attributes.position;
    const colors = geometry.attributes.color;
    for ( let i = 0; i < count; i ++ ) {
      color.setHSL( ( positions.getY( i ) / this.radius + 1 ) / 2, 1.0, 0.5 );
      colors.setXYZ( i, color.r, color.g, color.b );
    }
  }

  setGeometry2(geometry : THREE.BufferGeometry) {
    const count = geometry.attributes.position.count;
    geometry.setAttribute( 'color', new THREE.BufferAttribute( new Float32Array( count * 3 ), 3 ) );
    const color = new THREE.Color();
    const positions = geometry.attributes.position;
    const colors = geometry.attributes.color;
    for ( let i = 0; i < count; i ++ ) {
      color.setHSL( 0, ( positions.getY( i ) / this.radius + 1 ) / 2, 0.5 );
      colors.setXYZ( i, color.r, color.g, color.b );
    }
  }

  setGeometry3(geometry : THREE.BufferGeometry) {
    const count = geometry.attributes.position.count;
    geometry.setAttribute( 'color', new THREE.BufferAttribute( new Float32Array( count * 3 ), 3 ) );
    const color = new THREE.Color();
    const positions = geometry.attributes.position;
    const colors = geometry.attributes.color;
    for ( let i = 0; i < count; i ++ ) {
      color.setRGB( 1, 0.8 - ( positions.getY( i ) / this.radius + 1 ) / 2, 0 );
      colors.setXYZ( i, color.r, color.g, color.b );
    }
  }

}
