import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-materials-lightmap',
  templateUrl: './webgl-materials-lightmap.component.html',
  styleUrls: ['./webgl-materials-lightmap.component.scss']
})
export class WebglMaterialsLightmapComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
