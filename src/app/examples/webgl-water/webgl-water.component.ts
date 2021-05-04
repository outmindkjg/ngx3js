import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-water',
  templateUrl: './webgl-water.component.html',
  styleUrls: ['./webgl-water.component.scss']
})
export class WebglWaterComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
