import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-postprocessing-ssr',
  templateUrl: './webgl-postprocessing-ssr.component.html',
  styleUrls: ['./webgl-postprocessing-ssr.component.scss']
})
export class WebglPostprocessingSsrComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
