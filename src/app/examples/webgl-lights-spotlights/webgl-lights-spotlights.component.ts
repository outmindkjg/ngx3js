import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-lights-spotlights',
  templateUrl: './webgl-lights-spotlights.component.html',
  styleUrls: ['./webgl-lights-spotlights.component.scss']
})
export class WebglLightsSpotlightsComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
