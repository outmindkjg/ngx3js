import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-multiple-canvases-circle',
  templateUrl: './webgl-multiple-canvases-circle.component.html',
  styleUrls: ['./webgl-multiple-canvases-circle.component.scss']
})
export class WebglMultipleCanvasesCircleComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
