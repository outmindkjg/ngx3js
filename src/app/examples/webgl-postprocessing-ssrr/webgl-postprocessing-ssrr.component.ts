import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-postprocessing-ssrr',
  templateUrl: './webgl-postprocessing-ssrr.component.html',
  styleUrls: ['./webgl-postprocessing-ssrr.component.scss']
})
export class WebglPostprocessingSsrrComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
