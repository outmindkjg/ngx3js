import { Component } from '@angular/core';
import { Object3D } from 'three';
import { BaseComponent, MeshComponent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webgl-shadowmap-pointlight',
  templateUrl: './webgl-shadowmap-pointlight.component.html',
  styleUrls: ['./webgl-shadowmap-pointlight.component.scss']
})
export class WebglShadowmapPointlightComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  setMesh(mesh : MeshComponent) {
    super.setMesh(mesh);
    this.lights = mesh.getMesh().children;
  }

  lights : Object3D[] = null;

  pointLightColors : number[] = [0x0088ff, 0x88ff88, 0xff8888];

  sphereCanvas(context : CanvasRenderingContext2D) {
    context.fillStyle = 'white';
    context.fillRect( 0, 1, 2, 1 );
  }

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.lights !== null) {
      const time = timer.elapsedTime * 0.2;
      this.lights.forEach((light, idx) =>  {
        const lightTime = time + idx * 1000;
        light.position.x = Math.sin( lightTime * 0.6 ) * 9;
        light.position.y = Math.sin( lightTime * 0.7 ) * 9 + 6;
        light.position.z = Math.sin( lightTime * 0.8 ) * 9;
				light.rotation.x = time * ((idx + 1) * 3);
				light.rotation.z = time * ((idx + 1) * 3);
      });
    }
  }
}
