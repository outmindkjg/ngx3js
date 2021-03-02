import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-interactive-cubes-gpu',
  templateUrl: './webgl-interactive-cubes-gpu.component.html',
  styleUrls: ['./webgl-interactive-cubes-gpu.component.scss']
})
export class WebglInteractiveCubesGpuComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
