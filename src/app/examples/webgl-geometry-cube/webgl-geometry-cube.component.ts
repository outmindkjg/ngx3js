import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-geometry-cube',
  templateUrl: './webgl-geometry-cube.component.html',
  styleUrls: ['./webgl-geometry-cube.component.scss']
})
export class WebglGeometryCubeComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
