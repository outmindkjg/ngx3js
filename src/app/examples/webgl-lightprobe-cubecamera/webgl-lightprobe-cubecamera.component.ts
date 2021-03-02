import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-lightprobe-cubecamera',
  templateUrl: './webgl-lightprobe-cubecamera.component.html',
  styleUrls: ['./webgl-lightprobe-cubecamera.component.scss']
})
export class WebglLightprobeCubecameraComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
