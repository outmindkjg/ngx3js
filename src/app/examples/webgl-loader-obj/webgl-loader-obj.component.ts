import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-loader-obj',
  templateUrl: './webgl-loader-obj.component.html',
  styleUrls: ['./webgl-loader-obj.component.scss']
})
export class WebglLoaderObjComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
