import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-geometry-teapot',
  templateUrl: './webgl-geometry-teapot.component.html',
  styleUrls: ['./webgl-geometry-teapot.component.scss']
})
export class WebglGeometryTeapotComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
