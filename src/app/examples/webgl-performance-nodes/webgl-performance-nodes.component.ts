import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-performance-nodes',
  templateUrl: './webgl-performance-nodes.component.html',
  styleUrls: ['./webgl-performance-nodes.component.scss']
})
export class WebglPerformanceNodesComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
