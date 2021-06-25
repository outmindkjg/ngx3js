import { Component } from '@angular/core';
import { BufferGeometry, Color, Float32BufferAttribute, IUniform, Object3D } from 'three';
import { BaseComponent, MeshComponent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webgl-custom-attributes-lines',
  templateUrl: './webgl-custom-attributes-lines.component.html',
  styleUrls: ['./webgl-custom-attributes-lines.component.scss']
})
export class WebglCustomAttributesLinesComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  object3d : Object3D = null;
  geometry : BufferGeometry = null;
  uniforms : { [uniform: string]: IUniform } = null;
  setMesh(mesh : MeshComponent) {
    super.setMesh(mesh);
    this.object3d = mesh.getObject3d();
    const geometry:BufferGeometry = (this.object3d as any).geometry;
    if (geometry !== null && geometry.getAttribute('position') !== undefined) {
      this.geometry = geometry;
      this.uniforms = (this.object3d as any).material.uniforms;
      const customColor = this.geometry.attributes.customColor as Float32BufferAttribute;
      const color = new Color( 0xffffff );
      for ( let i = 0, l = customColor.count; i < l; i ++ ) {
        color.setHSL( i / l, 0.5, 0.5 );
        color.toArray( customColor.array, i * customColor.itemSize );
      }
    }
  }

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.object3d !== null && this.geometry !== null) {
      const time = timer.elapsedTime;
      this.object3d.rotation.y = 0.25 * time;

      this.uniforms[ "amplitude" ].value = Math.sin( 0.5 * time );
      this.uniforms[ "color" ].value.offsetHSL( 0.0005, 0, 0 );

      const attributes = this.geometry.attributes as any;
      const array = attributes.displacement.array;

      for ( let i = 0, l = array.length; i < l; i += 3 ) {
        array[ i ] += 0.3 * ( 0.5 - Math.random() );
        array[ i + 1 ] += 0.3 * ( 0.5 - Math.random() );
        array[ i + 2 ] += 0.3 * ( 0.5 - Math.random() );
      }
      attributes.displacement.needsUpdate = true;
    }
  }

}
