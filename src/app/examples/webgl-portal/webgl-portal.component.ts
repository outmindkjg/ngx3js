import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-portal',
  templateUrl: './webgl-portal.component.html',
  styleUrls: ['./webgl-portal.component.scss']
})
export class WebglPortalComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
