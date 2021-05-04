import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-performance-static',
  templateUrl: './webgl-performance-static.component.html',
  styleUrls: ['./webgl-performance-static.component.scss']
})
export class WebglPerformanceStaticComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
