import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webxr-vr-sandbox',
  templateUrl: './webxr-vr-sandbox.component.html',
  styleUrls: ['./webxr-vr-sandbox.component.scss']
})
export class WebxrVrSandboxComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
