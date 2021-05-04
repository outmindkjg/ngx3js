import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-shader-lava',
  templateUrl: './webgl-shader-lava.component.html',
  styleUrls: ['./webgl-shader-lava.component.scss']
})
export class WebglShaderLavaComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
