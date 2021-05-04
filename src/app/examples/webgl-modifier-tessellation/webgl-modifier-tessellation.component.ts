import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-modifier-tessellation',
  templateUrl: './webgl-modifier-tessellation.component.html',
  styleUrls: ['./webgl-modifier-tessellation.component.scss']
})
export class WebglModifierTessellationComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
