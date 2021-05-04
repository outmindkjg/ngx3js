import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-postprocessing-afterimage',
  templateUrl: './webgl-postprocessing-afterimage.component.html',
  styleUrls: ['./webgl-postprocessing-afterimage.component.scss']
})
export class WebglPostprocessingAfterimageComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
