import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webxr-vr-sandbox',
  templateUrl: './webxr-vr-sandbox.component.html',
  styleUrls: ['./webxr-vr-sandbox.component.scss']
})
export class WebxrVrSandboxComponent extends BaseComponent<{
  radius: number,
  tube: number,
  tubularSegments: number,
  radialSegments: number,
  p: number,
  q: number
}> {

  constructor() {
    super({
      radius: 0.5,
      tube: 0.2,
      radialSegments: 150,
      tubularSegments: 20,
      p: 2,
      q: 3
    },[
      { name : 'radius', type : 'number', min : 0.0, max : 1.0 },
      { name : 'tube', type : 'number', min : 0.0, max : 1.0 },
      { name : 'radialSegments', type : 'number', min : 10, max : 150, step : 1 },
      { name : 'tubularSegments', type : 'number', min : 2, max : 20, step : 1 },
      { name : 'p', type : 'number', min : 1, max : 10, step : 1 },
      { name : 'q', type : 'number', min : 0, max : 10, step : 1 },
    ]);
  }

}
