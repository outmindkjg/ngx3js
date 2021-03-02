import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-loader-tilt',
  templateUrl: './webgl-loader-tilt.component.html',
  styleUrls: ['./webgl-loader-tilt.component.scss']
})
export class WebglLoaderTiltComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
