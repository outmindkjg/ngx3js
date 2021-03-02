import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-helpers',
  templateUrl: './webgl-helpers.component.html',
  styleUrls: ['./webgl-helpers.component.scss']
})
export class WebglHelpersComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
