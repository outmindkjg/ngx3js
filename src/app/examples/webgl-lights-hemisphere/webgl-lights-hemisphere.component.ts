import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-lights-hemisphere',
  templateUrl: './webgl-lights-hemisphere.component.html',
  styleUrls: ['./webgl-lights-hemisphere.component.scss']
})
export class WebglLightsHemisphereComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
