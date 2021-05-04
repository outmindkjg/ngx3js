import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-buffergeometry-points',
  templateUrl: './webgl-buffergeometry-points.component.html',
  styleUrls: ['./webgl-buffergeometry-points.component.scss']
})
export class WebglBuffergeometryPointsComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
