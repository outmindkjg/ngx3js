import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-loader-vtk',
  templateUrl: './webgl-loader-vtk.component.html',
  styleUrls: ['./webgl-loader-vtk.component.scss']
})
export class WebglLoaderVtkComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
