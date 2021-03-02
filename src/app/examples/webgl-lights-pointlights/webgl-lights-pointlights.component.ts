import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-lights-pointlights',
  templateUrl: './webgl-lights-pointlights.component.html',
  styleUrls: ['./webgl-lights-pointlights.component.scss']
})
export class WebglLightsPointlightsComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
