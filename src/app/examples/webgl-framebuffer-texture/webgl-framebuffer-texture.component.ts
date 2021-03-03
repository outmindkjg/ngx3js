import { Component } from '@angular/core';
import { GeometryUtils } from 'three/examples/jsm/utils/GeometryUtils';
import { BaseComponent, RendererTimer } from '../../three';
import * as THREE from 'three';

@Component({
  selector: 'app-webgl-framebuffer-texture',
  templateUrl: './webgl-framebuffer-texture.component.html',
  styleUrls: ['./webgl-framebuffer-texture.component.scss']
})
export class WebglFramebufferTextureComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  loadGeometry(geometry : THREE.BufferGeometry) {
    const points = GeometryUtils.gosper( 8 );
    const positionAttribute = new THREE.Float32BufferAttribute( points, 3 );
    geometry.setAttribute( 'position', positionAttribute );
    geometry.center();
    const colorAttribute = new THREE.BufferAttribute( new Float32Array( positionAttribute.array.length ), 3 );
    colorAttribute.setUsage( THREE.DynamicDrawUsage );
    geometry.setAttribute( 'color', colorAttribute );
  }

  ngOnInit() {
    this.dpr = window.devicePixelRatio;
    this.textureSize = 128 * this.dpr;
    this.vector = new THREE.Vector2();
    this.color = new THREE.Color();
  }
  offset = 0;
  dpr = 0;

  textureSize = 0;
  vector : THREE.Vector2 = null;
  color : THREE.Color = null;

  updateColors( colorAttribute ) {
    const l = colorAttribute.count;
    for ( let i = 0; i < l; i ++ ) {
      const h = ( ( this.offset + i ) % l ) / l;
      this.color.setHSL( h, 1, 0.5 );
      colorAttribute.setX( i, this.color.r );
      colorAttribute.setY( i, this.color.g );
      colorAttribute.setZ( i, this.color.b );
    }
    colorAttribute.needsUpdate = true;
    this.offset -= 25;
  }

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.mesh !== null) {
      const mesh = this.mesh.getMesh().children[0] as THREE.Line;
      if (mesh.geometry) {
        const geometry = mesh.geometry;
        const colorAttribute = geometry.getAttribute( 'color' );
        this.updateColors( colorAttribute );
      }
    }
  }
}
