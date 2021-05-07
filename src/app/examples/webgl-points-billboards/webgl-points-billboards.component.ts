import { Component, OnInit } from '@angular/core';
import { Mesh, Points, PointsMaterial } from 'three';
import { BaseComponent, MeshComponent, RendererEvent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webgl-points-billboards',
  templateUrl: './webgl-points-billboards.component.html',
  styleUrls: ['./webgl-points-billboards.component.scss']
})
export class WebglPointsBillboardsComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  ngOnInit() {
    this.vertices = [];
    for ( let i = 0; i < 10000; i ++ ) {
      const x = 2000 * Math.random() - 1000;
      const y = 2000 * Math.random() - 1000;
      const z = 2000 * Math.random() - 1000;
      this.vertices.push( x, y, z );
    }
  }
  vertices : number[] = [];

  mouseX : number = 0;
  mouseY : number = 0;
  
  onMouseMove(event  : RendererEvent) {
    this.mouseX = ( event.mouse.x ) * event.width * 2;
    this.mouseY = ( event.mouse.y ) * event.height * 2;
  }

  setMesh(mesh : MeshComponent) {
    super.setMesh(mesh);
    const tmpMesh = mesh.getMesh() as Points;
    this.material = tmpMesh.material as PointsMaterial;
  }

  material : PointsMaterial = null;

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.camera !== null) {
      const camera = this.camera.getCamera();
      camera.position.x += ( this.mouseX - camera.position.x ) * .05;
      camera.position.y += ( - this.mouseY - camera.position.y ) * .05;
      camera.lookAt( 0, 0, 0 );
      if (this.material !== null) {
        const time = timer.elapsedTime * 0.05;
				const h = ( 360 * ( 1.0 + time ) % 360 ) / 360;
				this.material.color.setHSL( h, 0.5, 0.5 );
      }
    }
  }
}


