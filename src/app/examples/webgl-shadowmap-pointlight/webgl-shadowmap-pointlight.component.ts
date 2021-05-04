import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-shadowmap-pointlight',
  templateUrl: './webgl-shadowmap-pointlight.component.html',
  styleUrls: ['./webgl-shadowmap-pointlight.component.scss']
})
export class WebglShadowmapPointlightComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
