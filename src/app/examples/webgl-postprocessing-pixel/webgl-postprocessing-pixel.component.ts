import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-postprocessing-pixel',
  templateUrl: './webgl-postprocessing-pixel.component.html',
  styleUrls: ['./webgl-postprocessing-pixel.component.scss']
})
export class WebglPostprocessingPixelComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
