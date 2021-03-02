import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-lensflares',
  templateUrl: './webgl-lensflares.component.html',
  styleUrls: ['./webgl-lensflares.component.scss']
})
export class WebglLensflaresComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
