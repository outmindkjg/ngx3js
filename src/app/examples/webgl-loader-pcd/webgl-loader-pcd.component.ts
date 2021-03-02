import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-loader-pcd',
  templateUrl: './webgl-loader-pcd.component.html',
  styleUrls: ['./webgl-loader-pcd.component.scss']
})
export class WebglLoaderPcdComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
