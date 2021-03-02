import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-lines-sphere',
  templateUrl: './webgl-lines-sphere.component.html',
  styleUrls: ['./webgl-lines-sphere.component.scss']
})
export class WebglLinesSphereComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
