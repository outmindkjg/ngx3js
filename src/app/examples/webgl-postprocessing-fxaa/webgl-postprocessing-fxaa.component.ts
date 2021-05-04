import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-postprocessing-fxaa',
  templateUrl: './webgl-postprocessing-fxaa.component.html',
  styleUrls: ['./webgl-postprocessing-fxaa.component.scss']
})
export class WebglPostprocessingFxaaComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
