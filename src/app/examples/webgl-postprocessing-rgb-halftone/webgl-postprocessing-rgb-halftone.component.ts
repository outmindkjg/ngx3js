import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-postprocessing-rgb-halftone',
  templateUrl: './webgl-postprocessing-rgb-halftone.component.html',
  styleUrls: ['./webgl-postprocessing-rgb-halftone.component.scss']
})
export class WebglPostprocessingRgbHalftoneComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
