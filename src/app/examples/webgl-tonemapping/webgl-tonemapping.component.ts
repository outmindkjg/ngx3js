import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-tonemapping',
  templateUrl: './webgl-tonemapping.component.html',
  styleUrls: ['./webgl-tonemapping.component.scss']
})
export class WebglTonemappingComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
