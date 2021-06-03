import { Component } from '@angular/core';
import { Object3D } from 'three';
import { BaseComponent, MeshComponent, RendererEvent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webgl-performance',
  templateUrl: './webgl-performance.component.html',
  styleUrls: ['./webgl-performance.component.scss']
})
export class WebglPerformanceComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  ngOnInit() {
    this.meshInfos = [];
    for ( let i = 0; i < 5000; i ++ ) {
      const scale = Math.random() * 50 + 100;
      this.meshInfos.push({
        position : {
          x : Math.random() * 8000 - 4000,
          y : Math.random() * 8000 - 4000,
          z : Math.random() * 8000 - 4000
        },
        rotation : {
          x : Math.random() * 360,
          y : Math.random() * 360,
          z : Math.random() * 360
        },
        scale : {
          x : scale,
          y : scale,
          z : scale
        }
      })
    }
  }

  meshInfos : {
    position : { x : number, y : number, z : number},
    rotation : { x : number, y : number, z : number},
    scale : { x : number, y : number, z : number}
  }[] = [];

  setMesh(mesh : MeshComponent) {
    super.setMesh(mesh);
    this.meshChildren = mesh.getObject3d().children;
  }

  meshChildren : Object3D[] = [];

  mouseX : number = 0;
  mouseY : number = 0;
  
  onMouseMove(event  : RendererEvent) {
    this.mouseX = ( event.mouse.x ) * event.width * 5;
    this.mouseY = ( event.mouse.y ) * event.height * 5;
  }

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.meshChildren !== null && this.meshChildren.length > 0) {
      if (this.camera !== null) {
        const camera = this.camera.getObject3d();
        camera.position.x += ( this.mouseX - camera.position.x ) * .05;
        camera.position.y += ( - this.mouseY - camera.position.y ) * .05;
        camera.lookAt( 0, 0, 0 );
      }
      this.meshChildren.forEach(mesh => {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;
      })
    }
  }
}
