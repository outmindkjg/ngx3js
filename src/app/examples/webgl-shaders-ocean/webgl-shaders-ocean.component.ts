import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-shaders-ocean',
  templateUrl: './webgl-shaders-ocean.component.html',
  styleUrls: ['./webgl-shaders-ocean.component.scss']
})
export class WebglShadersOceanComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
