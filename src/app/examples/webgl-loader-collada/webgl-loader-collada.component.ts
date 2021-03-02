import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-loader-collada',
  templateUrl: './webgl-loader-collada.component.html',
  styleUrls: ['./webgl-loader-collada.component.scss']
})
export class WebglLoaderColladaComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
