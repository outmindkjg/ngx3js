import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-shadow-contact',
  templateUrl: './webgl-shadow-contact.component.html',
  styleUrls: ['./webgl-shadow-contact.component.scss']
})
export class WebglShadowContactComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
