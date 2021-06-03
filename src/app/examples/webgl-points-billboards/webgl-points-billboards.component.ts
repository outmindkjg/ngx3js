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

  setMesh(mesh : MeshComponent) {
    super.setMesh(mesh);
    const tmpMesh = mesh.getObject3d() as Points;
    this.material = tmpMesh.material as PointsMaterial;
  }

  material : PointsMaterial = null;

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.material !== null) {
      const time = timer.elapsedTime * 0.05;
      const h = ( 360 * ( 1.0 + time ) % 360 ) / 360;
      this.material.color.setHSL( h, 0.5, 0.5 );
    }
  }
}


