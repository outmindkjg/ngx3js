import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

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
