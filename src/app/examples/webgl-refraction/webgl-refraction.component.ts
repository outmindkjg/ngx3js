import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-refraction',
  templateUrl: './webgl-refraction.component.html',
  styleUrls: ['./webgl-refraction.component.scss']
})
export class WebglRefractionComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
