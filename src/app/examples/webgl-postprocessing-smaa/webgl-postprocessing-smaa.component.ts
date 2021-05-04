import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-postprocessing-smaa',
  templateUrl: './webgl-postprocessing-smaa.component.html',
  styleUrls: ['./webgl-postprocessing-smaa.component.scss']
})
export class WebglPostprocessingSmaaComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
