import { Component } from '@angular/core';
import { BufferGeometry, Color, Object3D } from 'three';
import { BaseComponent, MeshComponent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webgl-buffergeometry-custom-attributes-particles',
  templateUrl: './webgl-buffergeometry-custom-attributes-particles.component.html',
  styleUrls: ['./webgl-buffergeometry-custom-attributes-particles.component.scss']
})
export class WebglBuffergeometryCustomAttributesParticlesComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  ngOnInit() {
    const particles = 100000;
    const radius = 200;
    const positions = [];
    const colors = [];
    const sizes = [];
    const color = new Color();
    for ( let i = 0; i < particles; i ++ ) {
      positions.push( ( Math.random() * 2 - 1 ) * radius );
      positions.push( ( Math.random() * 2 - 1 ) * radius );
      positions.push( ( Math.random() * 2 - 1 ) * radius );
      color.setHSL( i / particles, 1.0, 0.5 );
      colors.push( color.r, color.g, color.b );
      sizes.push( 20 );
    }
    this.positions = positions;
    this.colors = colors;
    this.sizes = sizes;
  }

  positions : number[] = [];
  colors : number[] = [];
  sizes : number[] = [];

  vertexShader = `
  attribute float size;

  varying vec3 vColor;

  void main() {

    vColor = color;

    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

    gl_PointSize = size * ( 300.0 / -mvPosition.z );

    gl_Position = projectionMatrix * mvPosition;

  }
  `;

  fragmentShader = `
  uniform sampler2D pointTexture;

  varying vec3 vColor;

  void main() {

    gl_FragColor = vec4( vColor, 1.0 );

    gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );

  }

  `;

  setMesh(mesh : MeshComponent) {
    super.setMesh(mesh);
    this.particleSystem = mesh.getObject3d();
    const geometry : BufferGeometry = (mesh.getObject3d() as any).geometry;
    this.attributesSizes = geometry.attributes.size;
  }

  particleSystem : Object3D = null;
  attributesSizes : any  = null;

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.particleSystem !== null) {
      const time = timer.elapsedTime * 5;
      this.particleSystem.rotation.z = 0.01 * time;
      const sizes = this.attributesSizes.array;
      for ( let i = 0; i < this.attributesSizes.count; i ++ ) {
        sizes[ i ] = 10 * ( 1 + Math.sin( 0.1 * i + time ) );
      }
      this.attributesSizes.needsUpdate = true;
    }
  }
}
