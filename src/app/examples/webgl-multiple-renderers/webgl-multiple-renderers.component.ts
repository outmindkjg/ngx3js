import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-multiple-renderers',
  templateUrl: './webgl-multiple-renderers.component.html',
  styleUrls: ['./webgl-multiple-renderers.component.scss']
})
export class WebglMultipleRenderersComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
