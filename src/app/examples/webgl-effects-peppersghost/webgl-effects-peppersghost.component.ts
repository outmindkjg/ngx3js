import { Component } from '@angular/core';
import { BaseComponent, MeshComponent, RendererTimer } from '../../three';
import * as THREE from 'three';

@Component({
  selector: 'app-webgl-effects-peppersghost',
  templateUrl: './webgl-effects-peppersghost.component.html',
  styleUrls: ['./webgl-effects-peppersghost.component.scss']
})
export class WebglEffectsPeppersghostComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  setMesh(mesh : MeshComponent) {
    super.setMesh(mesh);
    const meshTree = mesh.getObject3d();
    if (meshTree instanceof THREE.Mesh) {
      const geometry = meshTree.geometry;
      meshTree.geometry = geometry.toNonIndexed();
      const position = geometry.attributes.position;
      const colors = [];
      const color = new THREE.Color();
      for ( let i = 0; i < position.count; i += 6 ) {
        color.setHex( Math.random() * 0xffffff );

        // first face

        colors.push( color.r, color.g, color.b );
        colors.push( color.r, color.g, color.b );
        colors.push( color.r, color.g, color.b );

        // second face

        colors.push( color.r, color.g, color.b );
        colors.push( color.r, color.g, color.b );
        colors.push( color.r, color.g, color.b );

      }

      geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

      const material = new THREE.MeshBasicMaterial( { vertexColors: true } );

      for ( let i = 0; i < 10; i ++ ) {

        const cube = new THREE.Mesh( geometry, material );
        cube.position.x = Math.random() * 2 - 1;
        cube.position.y = Math.random() * 2 - 1;
        cube.position.z = Math.random() * 2 - 1;
        cube.scale.multiplyScalar( Math.random() + 0.5 );
        meshTree.add( cube );
      }
    } 
  }

  onRender(timer : RendererTimer) {
    if (this.meshObject3d !== null) {
      this.meshObject3d.rotation.y += 0.01 * 40 * timer.delta;
    }
  }
}
