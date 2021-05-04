import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-loader-nodes',
  templateUrl: './webgl-loader-nodes.component.html',
  styleUrls: ['./webgl-loader-nodes.component.scss']
})
export class WebglLoaderNodesComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
