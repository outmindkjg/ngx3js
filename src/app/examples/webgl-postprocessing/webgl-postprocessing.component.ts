import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-postprocessing',
  templateUrl: './webgl-postprocessing.component.html',
  styleUrls: ['./webgl-postprocessing.component.scss']
})
export class WebglPostprocessingComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
