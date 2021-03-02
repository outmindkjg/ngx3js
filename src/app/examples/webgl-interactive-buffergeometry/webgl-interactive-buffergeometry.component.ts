import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-interactive-buffergeometry',
  templateUrl: './webgl-interactive-buffergeometry.component.html',
  styleUrls: ['./webgl-interactive-buffergeometry.component.scss']
})
export class WebglInteractiveBuffergeometryComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
