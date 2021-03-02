import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-loader-svg',
  templateUrl: './webgl-loader-svg.component.html',
  styleUrls: ['./webgl-loader-svg.component.scss']
})
export class WebglLoaderSvgComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
