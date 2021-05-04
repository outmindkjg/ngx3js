import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-postprocessing-ssao',
  templateUrl: './webgl-postprocessing-ssao.component.html',
  styleUrls: ['./webgl-postprocessing-ssao.component.scss']
})
export class WebglPostprocessingSsaoComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
