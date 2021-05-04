import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-gpgpu-birds',
  templateUrl: './webgl-gpgpu-birds.component.html',
  styleUrls: ['./webgl-gpgpu-birds.component.scss']
})
export class WebglGpgpuBirdsComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
