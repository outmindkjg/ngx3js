import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-postprocessing-taa',
  templateUrl: './webgl-postprocessing-taa.component.html',
  styleUrls: ['./webgl-postprocessing-taa.component.scss']
})
export class WebglPostprocessingTaaComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
