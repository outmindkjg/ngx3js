import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgpu-lights-selective',
  templateUrl: './webgpu-lights-selective.component.html',
  styleUrls: ['./webgpu-lights-selective.component.scss']
})
export class WebgpuLightsSelectiveComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
