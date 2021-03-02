import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-interactive-points',
  templateUrl: './webgl-interactive-points.component.html',
  styleUrls: ['./webgl-interactive-points.component.scss']
})
export class WebglInteractivePointsComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
