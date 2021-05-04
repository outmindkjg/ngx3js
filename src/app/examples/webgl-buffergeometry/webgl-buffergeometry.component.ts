import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-buffergeometry',
  templateUrl: './webgl-buffergeometry.component.html',
  styleUrls: ['./webgl-buffergeometry.component.scss']
})
export class WebglBuffergeometryComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
