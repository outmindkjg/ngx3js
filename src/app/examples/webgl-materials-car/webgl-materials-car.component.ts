import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-materials-car',
  templateUrl: './webgl-materials-car.component.html',
  styleUrls: ['./webgl-materials-car.component.scss']
})
export class WebglMaterialsCarComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
