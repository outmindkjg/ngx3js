import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-custom-attributes-lines',
  templateUrl: './webgl-custom-attributes-lines.component.html',
  styleUrls: ['./webgl-custom-attributes-lines.component.scss']
})
export class WebglCustomAttributesLinesComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
