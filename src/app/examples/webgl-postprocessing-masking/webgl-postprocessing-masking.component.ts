import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-postprocessing-masking',
  templateUrl: './webgl-postprocessing-masking.component.html',
  styleUrls: ['./webgl-postprocessing-masking.component.scss']
})
export class WebglPostprocessingMaskingComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
