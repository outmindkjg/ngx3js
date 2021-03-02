import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-lights-physical',
  templateUrl: './webgl-lights-physical.component.html',
  styleUrls: ['./webgl-lights-physical.component.scss']
})
export class WebglLightsPhysicalComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
