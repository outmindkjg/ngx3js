import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-shaders-sky',
  templateUrl: './webgl-shaders-sky.component.html',
  styleUrls: ['./webgl-shaders-sky.component.scss']
})
export class WebglShadersSkyComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
