import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-panorama-equirectangular',
  templateUrl: './webgl-panorama-equirectangular.component.html',
  styleUrls: ['./webgl-panorama-equirectangular.component.scss']
})
export class WebglPanoramaEquirectangularComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}