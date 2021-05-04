import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-panorama-cube',
  templateUrl: './webgl-panorama-cube.component.html',
  styleUrls: ['./webgl-panorama-cube.component.scss']
})
export class WebglPanoramaCubeComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
