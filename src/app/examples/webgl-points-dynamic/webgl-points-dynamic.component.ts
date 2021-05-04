import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-points-dynamic',
  templateUrl: './webgl-points-dynamic.component.html',
  styleUrls: ['./webgl-points-dynamic.component.scss']
})
export class WebglPointsDynamicComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
