import { Component } from '@angular/core';
import { BaseComponent, MeshComponent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webgl-lights-pointlights',
  templateUrl: './webgl-lights-pointlights.component.html',
  styleUrls: ['./webgl-lights-pointlights.component.scss']
})
export class WebglLightsPointlightsComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  light1 : any = null;
  setLight1(mesh : MeshComponent) {
    this.light1 = mesh.getMesh();
  }

  light2 : any = null;
  setLight2(mesh : MeshComponent) {
    this.light2 = mesh.getMesh();
  }

  light3 : any = null;
  setLight3(mesh : MeshComponent) {
    this.light3 = mesh.getMesh();
  }

  light4 : any = null;
  setLight4(mesh : MeshComponent) {
    this.light4 = mesh.getMesh();
  }

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    const time = timer.elapsedTime;
    if (this.light1 !== null) {
      this.light1.position.x = Math.sin( time * 0.7 ) * 30;
      this.light1.position.y = Math.cos( time * 0.5 ) * 40;
      this.light1.position.z = Math.cos( time * 0.3 ) * 30;
    }
    if (this.light2 !== null) {
      this.light2.position.x = Math.sin( time * 0.3 ) * 30;
      this.light2.position.y = Math.cos( time * 0.5 ) * 40;
      this.light2.position.z = Math.cos( time * 0.7 ) * 30;
    }
    if (this.light3 !== null) {
      this.light3.position.x = Math.sin( time * 0.7 ) * 30;
      this.light3.position.y = Math.cos( time * 0.3 ) * 40;
      this.light3.position.z = Math.cos( time * 0.5 ) * 30;
    }
    if (this.light4 !== null) {
      this.light4.position.x = Math.sin( time * 0.3 ) * 30;
      this.light4.position.y = Math.cos( time * 0.7 ) * 40;
      this.light4.position.z = Math.cos( time * 0.5 ) * 30;
    }
  }
}
