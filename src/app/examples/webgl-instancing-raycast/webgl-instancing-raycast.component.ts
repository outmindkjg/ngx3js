import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-instancing-raycast',
  templateUrl: './webgl-instancing-raycast.component.html',
  styleUrls: ['./webgl-instancing-raycast.component.scss']
})
export class WebglInstancingRaycastComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
