import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-materials-normalmap',
  templateUrl: './webgl-materials-normalmap.component.html',
  styleUrls: ['./webgl-materials-normalmap.component.scss']
})
export class WebglMaterialsNormalmapComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}