import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-interactive-raycasting-points',
  templateUrl: './webgl-interactive-raycasting-points.component.html',
  styleUrls: ['./webgl-interactive-raycasting-points.component.scss']
})
export class WebglInteractiveRaycastingPointsComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
