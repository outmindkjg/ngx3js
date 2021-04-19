import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-materials-matcap',
  templateUrl: './webgl-materials-matcap.component.html',
  styleUrls: ['./webgl-materials-matcap.component.scss']
})
export class WebglMaterialsMatcapComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
