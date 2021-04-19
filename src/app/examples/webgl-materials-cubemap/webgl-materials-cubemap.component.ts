import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-materials-cubemap',
  templateUrl: './webgl-materials-cubemap.component.html',
  styleUrls: ['./webgl-materials-cubemap.component.scss']
})
export class WebglMaterialsCubemapComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
