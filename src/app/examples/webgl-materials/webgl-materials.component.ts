import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-materials',
  templateUrl: './webgl-materials.component.html',
  styleUrls: ['./webgl-materials.component.scss']
})
export class WebglMaterialsComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
