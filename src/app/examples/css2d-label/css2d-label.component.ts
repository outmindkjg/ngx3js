import { Component } from '@angular/core';
import { Object3D } from 'three';
import { BaseComponent, MeshComponent, RendererTimer } from '../../three';

@Component({
  selector: 'app-css2d-label',
  templateUrl: './css2d-label.component.html',
  styleUrls: ['./css2d-label.component.scss']
})
export class Css2dLabelComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  setMoon(mesh : MeshComponent) {
    this.moon = mesh.getObject3d();
  }

  moon : Object3D = null;

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.moon !== null) {
      const elapsed = timer.elapsedTime;
      this.moon.position.set( Math.sin( elapsed ) * 5, 0, Math.cos( elapsed ) * 5 );
    }
  }

}
