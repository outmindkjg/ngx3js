import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-loader-gcode',
  templateUrl: './webgl-loader-gcode.component.html',
  styleUrls: ['./webgl-loader-gcode.component.scss']
})
export class WebglLoaderGcodeComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}