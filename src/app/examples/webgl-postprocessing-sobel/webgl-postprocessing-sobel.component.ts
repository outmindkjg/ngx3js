import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-postprocessing-sobel',
  templateUrl: './webgl-postprocessing-sobel.component.html',
  styleUrls: ['./webgl-postprocessing-sobel.component.scss']
})
export class WebglPostprocessingSobelComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
