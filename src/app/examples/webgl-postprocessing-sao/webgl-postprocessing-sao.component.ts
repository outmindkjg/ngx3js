import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-postprocessing-sao',
  templateUrl: './webgl-postprocessing-sao.component.html',
  styleUrls: ['./webgl-postprocessing-sao.component.scss']
})
export class WebglPostprocessingSaoComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
