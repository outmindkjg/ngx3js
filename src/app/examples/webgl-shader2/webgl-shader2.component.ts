import { Component } from '@angular/core';
import { Object3D } from 'three';
import { BaseComponent, MeshComponent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webgl-shader2',
  templateUrl: './webgl-shader2.component.html',
  styleUrls: ['./webgl-shader2.component.scss']
})
export class WebglShader2Component extends BaseComponent<{  speed : number;
}> {

  constructor() {
    super({
      speed : 1
    },[
      { name : 'speed', type : 'number', min : 0.1, max : 2, step : 0.2 }
    ]);
  }

  setMesh(mesh : MeshComponent) {
    super.setMesh(mesh);
    this.children = mesh.getObject3d().children;
  }

  children : Object3D[] = null;

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.children !== null) {
      const delta = timer.delta;
      this.children.forEach((child, i) => {
        child.rotation.y += delta * 0.5 * ( i % 2 ? 1 : - 1 );
        child.rotation.x += delta * 0.5 * ( i % 2 ? - 1 : 1 );
      });
    }
  }
}
