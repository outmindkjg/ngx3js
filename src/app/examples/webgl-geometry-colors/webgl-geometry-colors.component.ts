import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-geometry-colors',
  templateUrl: './webgl-geometry-colors.component.html',
  styleUrls: ['./webgl-geometry-colors.component.scss']
})
export class WebglGeometryColorsComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
