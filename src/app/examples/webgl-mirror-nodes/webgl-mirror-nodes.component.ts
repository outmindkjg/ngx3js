import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-mirror-nodes',
  templateUrl: './webgl-mirror-nodes.component.html',
  styleUrls: ['./webgl-mirror-nodes.component.scss']
})
export class WebglMirrorNodesComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
