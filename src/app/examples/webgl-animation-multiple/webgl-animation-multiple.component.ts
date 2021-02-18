import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-animation-multiple',
  templateUrl: './webgl-animation-multiple.component.html',
  styleUrls: ['./webgl-animation-multiple.component.scss']
})
export class WebglAnimationMultipleComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }
}
