import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-loader-texture-hdr',
  templateUrl: './webgl-loader-texture-hdr.component.html',
  styleUrls: ['./webgl-loader-texture-hdr.component.scss']
})
export class WebglLoaderTextureHdrComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
