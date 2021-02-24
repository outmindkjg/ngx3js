import { Component } from '@angular/core';
import {
  BaseComponent
} from './../../three/interface';

@Component({
  selector: 'app-webgl-animation-keyframes',
  templateUrl: './webgl-animation-keyframes.component.html',
  styleUrls: ['./webgl-animation-keyframes.component.scss'],
})
export class WebglAnimationKeyframesComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
