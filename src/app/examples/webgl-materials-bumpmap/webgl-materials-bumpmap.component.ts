import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-materials-bumpmap',
  templateUrl: './webgl-materials-bumpmap.component.html',
  styleUrls: ['./webgl-materials-bumpmap.component.scss']
})
export class WebglMaterialsBumpmapComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
