import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-shadowmap-viewer',
  templateUrl: './webgl-shadowmap-viewer.component.html',
  styleUrls: ['./webgl-shadowmap-viewer.component.scss']
})
export class WebglShadowmapViewerComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
