import { Component } from '@angular/core';
import { BaseComponent, RendererEvent } from '../../three';

@Component({
  selector: 'app-webgl-loader-pcd',
  templateUrl: './webgl-loader-pcd.component.html',
  styleUrls: ['./webgl-loader-pcd.component.scss']
})
export class WebglLoaderPcdComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  setKeyPress(event : RendererEvent) {
    if (this.mesh !== null && this.mesh.storageSource !== null && this.mesh.storageSource !== undefined) {
      const points = this.mesh.storageSource;
      switch( event.event.key || String.fromCharCode( event.event.keyCode || event.event.charCode)) {
        case '+':
          points.material.size *= 1.2;
          points.material.needsUpdate = true;
          break;
        case '-':
          points.material.size /= 1.2;
          points.material.needsUpdate = true;
          break;
        case 'c':
          points.material.color.setHex( Math.random() * 0xffffff );
          points.material.needsUpdate = true;
          break;
      }
    }
  }
}
