import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-postprocessing-ssaa',
  templateUrl: './webgl-postprocessing-ssaa.component.html',
  styleUrls: ['./webgl-postprocessing-ssaa.component.scss']
})
export class WebglPostprocessingSsaaComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
