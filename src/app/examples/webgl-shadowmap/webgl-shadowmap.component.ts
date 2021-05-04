import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-shadowmap',
  templateUrl: './webgl-shadowmap.component.html',
  styleUrls: ['./webgl-shadowmap.component.scss']
})
export class WebglShadowmapComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
