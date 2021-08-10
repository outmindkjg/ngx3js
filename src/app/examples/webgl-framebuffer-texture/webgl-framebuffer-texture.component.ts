import { Component } from '@angular/core';
import { GeometryUtils } from 'three/examples/jsm/utils/GeometryUtils';
import { BaseComponent, RendererTimer } from '../../three';
import * as THREE from 'three';
import { TextureComponent } from '../../three/texture/texture.component';
import { DataTexture, Vector2, WebGLRenderer } from 'three';

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
    this.spriteData = new Uint8Array(this.textureSize * this.textureSize * 3);
  }

  setTexture(texture : TextureComponent) {
    this.texture = texture.getTexture() as DataTexture;
  }

  texture : DataTexture = null;

  spriteData : Uint8Array = null;

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

  onBeforeRenderOrthographicCamera (timer : RendererTimer){
    if (this.texture !== null && timer.renderer instanceof WebGLRenderer) {
      this.vector.x = ( timer.event.width * this.dpr / 2 ) - ( this.textureSize / 2 );
      this.vector.y = ( timer.event.height * this.dpr / 2 ) - ( this.textureSize / 2 );
      timer.renderer.copyFramebufferToTexture( this.vector, this.texture);
      timer.renderer.clearDepth();
    }
  }

  varctor : Vector2 = new Vector2();
  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.mesh !== null) {
      const mesh = this.mesh.getObject3d() as THREE.Line;
      if (mesh.geometry) {
        const geometry = mesh.geometry;
        const colorAttribute = geometry.getAttribute( 'color' );
        this.updateColors( colorAttribute );
      }
    }
  }
}
