import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-loader-vox',
  templateUrl: './webgl-loader-vox.component.html',
  styleUrls: ['./webgl-loader-vox.component.scss']
})
export class WebglLoaderVoxComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
