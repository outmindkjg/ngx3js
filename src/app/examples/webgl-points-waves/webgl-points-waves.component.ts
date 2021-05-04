import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-points-waves',
  templateUrl: './webgl-points-waves.component.html',
  styleUrls: ['./webgl-points-waves.component.scss']
})
export class WebglPointsWavesComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
