import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-instancing-dynamic',
  templateUrl: './webgl-instancing-dynamic.component.html',
  styleUrls: ['./webgl-instancing-dynamic.component.scss']
})
export class WebglInstancingDynamicComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
