import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-modifier-curve-instanced',
  templateUrl: './webgl-modifier-curve-instanced.component.html',
  styleUrls: ['./webgl-modifier-curve-instanced.component.scss']
})
export class WebglModifierCurveInstancedComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
