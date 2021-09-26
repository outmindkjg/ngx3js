import { Component } from '@angular/core';
import { BaseComponent, RendererEvent } from 'ngx3js';

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
    if (this.meshObject3d !== null && this.meshObject3d.userData.storageSource !== null && this.meshObject3d.userData.storageSource !== undefined) {
      const points = this.meshObject3d.userData.storageSource;
      switch( event.keyInfo.code) {
        case 'Equal':
          points.material.size *= 1.2;
          points.material.needsUpdate = true;
          break;
        case 'Minus':
          points.material.size /= 1.2;
          points.material.needsUpdate = true;
          break;
        case 'KeyC':
          points.material.color.setHex( Math.random() * 0xffffff );
          points.material.needsUpdate = true;
          break;
      }
    }
  }
}
