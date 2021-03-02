import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-instancing-scatter',
  templateUrl: './webgl-instancing-scatter.component.html',
  styleUrls: ['./webgl-instancing-scatter.component.scss']
})
export class WebglInstancingScatterComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
