import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-sandbox',
  templateUrl: './webgl-sandbox.component.html',
  styleUrls: ['./webgl-sandbox.component.scss']
})
export class WebglSandboxComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
