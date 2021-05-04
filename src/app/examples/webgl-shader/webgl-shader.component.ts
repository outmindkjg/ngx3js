import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-shader',
  templateUrl: './webgl-shader.component.html',
  styleUrls: ['./webgl-shader.component.scss']
})
export class WebglShaderComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
