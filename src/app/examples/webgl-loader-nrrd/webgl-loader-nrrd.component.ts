import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-loader-nrrd',
  templateUrl: './webgl-loader-nrrd.component.html',
  styleUrls: ['./webgl-loader-nrrd.component.scss']
})
export class WebglLoaderNrrdComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
