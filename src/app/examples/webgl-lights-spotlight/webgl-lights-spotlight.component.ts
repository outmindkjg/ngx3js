import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-lights-spotlight',
  templateUrl: './webgl-lights-spotlight.component.html',
  styleUrls: ['./webgl-lights-spotlight.component.scss']
})
export class WebglLightsSpotlightComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
