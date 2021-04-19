import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-materials-standard',
  templateUrl: './webgl-materials-standard.component.html',
  styleUrls: ['./webgl-materials-standard.component.scss']
})
export class WebglMaterialsStandardComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
