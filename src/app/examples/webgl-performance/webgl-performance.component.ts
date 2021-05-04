import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-performance',
  templateUrl: './webgl-performance.component.html',
  styleUrls: ['./webgl-performance.component.scss']
})
export class WebglPerformanceComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
