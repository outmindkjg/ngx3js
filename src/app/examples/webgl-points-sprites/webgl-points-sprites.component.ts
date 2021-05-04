import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-points-sprites',
  templateUrl: './webgl-points-sprites.component.html',
  styleUrls: ['./webgl-points-sprites.component.scss']
})
export class WebglPointsSpritesComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
