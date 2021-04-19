import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-materials-wireframe',
  templateUrl: './webgl-materials-wireframe.component.html',
  styleUrls: ['./webgl-materials-wireframe.component.scss']
})
export class WebglMaterialsWireframeComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
