import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-shadowmesh',
  templateUrl: './webgl-shadowmesh.component.html',
  styleUrls: ['./webgl-shadowmesh.component.scss']
})
export class WebglShadowmeshComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
