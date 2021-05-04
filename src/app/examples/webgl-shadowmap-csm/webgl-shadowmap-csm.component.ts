import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-shadowmap-csm',
  templateUrl: './webgl-shadowmap-csm.component.html',
  styleUrls: ['./webgl-shadowmap-csm.component.scss']
})
export class WebglShadowmapCsmComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
