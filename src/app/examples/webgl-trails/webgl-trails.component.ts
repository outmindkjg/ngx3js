import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-trails',
  templateUrl: './webgl-trails.component.html',
  styleUrls: ['./webgl-trails.component.scss']
})
export class WebglTrailsComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
