import { Component } from '@angular/core';
import { BaseComponent, RendererTimer } from 'ngx3js';

@Component({
  selector: 'app-webgl-shadowmap-viewer',
  templateUrl: './webgl-shadowmap-viewer.component.html',
  styleUrls: ['./webgl-shadowmap-viewer.component.scss']
})
export class WebglShadowmapViewerComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.meshChildren !== null) {
      const delta = timer.delta;
      this.meshChildren.forEach(child => {
        child.rotation.x += 0.25 * delta;
        child.rotation.y += 2 * delta;
        child.rotation.z += 1 * delta;
      });
    }
  }

}
