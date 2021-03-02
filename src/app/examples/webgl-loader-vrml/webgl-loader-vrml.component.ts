import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-loader-vrml',
  templateUrl: './webgl-loader-vrml.component.html',
  styleUrls: ['./webgl-loader-vrml.component.scss']
})
export class WebglLoaderVrmlComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
