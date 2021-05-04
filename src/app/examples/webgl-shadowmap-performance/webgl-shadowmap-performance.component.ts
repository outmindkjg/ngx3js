import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-shadowmap-performance',
  templateUrl: './webgl-shadowmap-performance.component.html',
  styleUrls: ['./webgl-shadowmap-performance.component.scss']
})
export class WebglShadowmapPerformanceComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
