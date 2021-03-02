import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-loader-draco',
  templateUrl: './webgl-loader-draco.component.html',
  styleUrls: ['./webgl-loader-draco.component.scss']
})
export class WebglLoaderDracoComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
