import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-geometry-dynamic',
  templateUrl: './webgl-geometry-dynamic.component.html',
  styleUrls: ['./webgl-geometry-dynamic.component.scss']
})
export class WebglGeometryDynamicComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
