import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgpu-compute',
  templateUrl: './webgpu-compute.component.html',
  styleUrls: ['./webgpu-compute.component.scss']
})
export class WebgpuComputeComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
