import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgpu-sandbox',
  templateUrl: './webgpu-sandbox.component.html',
  styleUrls: ['./webgpu-sandbox.component.scss']
})
export class WebgpuSandboxComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
