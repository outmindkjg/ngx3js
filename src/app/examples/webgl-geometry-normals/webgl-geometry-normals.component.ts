import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-geometry-normals',
  templateUrl: './webgl-geometry-normals.component.html',
  styleUrls: ['./webgl-geometry-normals.component.scss']
})
export class WebglGeometryNormalsComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
