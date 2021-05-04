import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-postprocessing-outline',
  templateUrl: './webgl-postprocessing-outline.component.html',
  styleUrls: ['./webgl-postprocessing-outline.component.scss']
})
export class WebglPostprocessingOutlineComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
