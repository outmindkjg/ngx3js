import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-geometry-text',
  templateUrl: './webgl-geometry-text.component.html',
  styleUrls: ['./webgl-geometry-text.component.scss']
})
export class WebglGeometryTextComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
