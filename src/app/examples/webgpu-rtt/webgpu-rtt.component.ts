import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgpu-rtt',
  templateUrl: './webgpu-rtt.component.html',
  styleUrls: ['./webgpu-rtt.component.scss']
})
export class WebgpuRttComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
