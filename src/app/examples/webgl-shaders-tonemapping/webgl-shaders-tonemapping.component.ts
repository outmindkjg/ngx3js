import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-shaders-tonemapping',
  templateUrl: './webgl-shaders-tonemapping.component.html',
  styleUrls: ['./webgl-shaders-tonemapping.component.scss']
})
export class WebglShadersTonemappingComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
