import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-custom-attributes',
  templateUrl: './webgl-custom-attributes.component.html',
  styleUrls: ['./webgl-custom-attributes.component.scss']
})
export class WebglCustomAttributesComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
