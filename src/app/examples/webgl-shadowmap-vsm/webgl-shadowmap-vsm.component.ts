import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-shadowmap-vsm',
  templateUrl: './webgl-shadowmap-vsm.component.html',
  styleUrls: ['./webgl-shadowmap-vsm.component.scss']
})
export class WebglShadowmapVsmComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
