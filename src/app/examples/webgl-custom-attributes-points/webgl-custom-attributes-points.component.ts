import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-custom-attributes-points',
  templateUrl: './webgl-custom-attributes-points.component.html',
  styleUrls: ['./webgl-custom-attributes-points.component.scss']
})
export class WebglCustomAttributesPointsComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
