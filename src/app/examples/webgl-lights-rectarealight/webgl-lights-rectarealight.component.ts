import { Component } from '@angular/core';
import { BaseComponent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webgl-lights-rectarealight',
  templateUrl: './webgl-lights-rectarealight.component.html',
  styleUrls: ['./webgl-lights-rectarealight.component.scss']
})
export class WebglLightsRectarealightComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (!this.controls.meshRotate.autoRotate) {
      this.mesh.setRotation(null, timer.elapsedTime * 60, null);
    }
  }
}
