import { Component } from '@angular/core';
import { CanvasTexture, Material, Mesh, MeshBasicMaterial, SphereGeometry } from 'three';
import { BaseComponent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webgl-test-memory',
  templateUrl: './webgl-test-memory.component.html',
  styleUrls: ['./webgl-test-memory.component.scss']
})
export class WebglTestMemoryComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  createImage() {
    const canvas = document.createElement( 'canvas' );
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext( '2d' );
    context.fillStyle = 'rgb(' + Math.floor( Math.random() * 256 ) + ',' + Math.floor( Math.random() * 256 ) + ',' + Math.floor( Math.random() * 256 ) + ')';
    context.fillRect( 0, 0, 256, 256 );
    return canvas;
  }
  lastMesh : Mesh = null;
  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.lastMesh !== null) {
      this.lastMesh.parent.remove(this.lastMesh);
      this.lastMesh.geometry.dispose();
      (this.lastMesh.material as Material).dispose();
    }
    const geometry = new SphereGeometry( 50, Math.random() * 64, Math.random() * 32 );
    const texture = new CanvasTexture( this.createImage() );
    const material = new MeshBasicMaterial( { map: texture, wireframe: true } );
    const mesh = new Mesh( geometry, material );
    this.mesh.getObject3d().add(mesh);
    this.lastMesh = mesh;
  }
}
