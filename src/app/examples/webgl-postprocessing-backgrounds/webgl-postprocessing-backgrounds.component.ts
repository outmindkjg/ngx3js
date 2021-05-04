import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-postprocessing-backgrounds',
  templateUrl: './webgl-postprocessing-backgrounds.component.html',
  styleUrls: ['./webgl-postprocessing-backgrounds.component.scss']
})
export class WebglPostprocessingBackgroundsComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
