import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-buffergeometry-drawrange',
  templateUrl: './webgl-buffergeometry-drawrange.component.html',
  styleUrls: ['./webgl-buffergeometry-drawrange.component.scss']
})
export class WebglBuffergeometryDrawrangeComponent extends BaseComponent<{
  showDots: true,
  showLines: true,
  minDistance: 150,
  limitConnections: false,
  maxConnections: 20,
  particleCount: 500
}> {

  constructor() {
    super({
      showDots: true,
      showLines: true,
      minDistance: 150,
      limitConnections: false,
      maxConnections: 20,
      particleCount: 500
    },[
      { name : 'showDots', type : 'checkbox'},
      { name : 'showLines', type : 'checkbox'},
      { name : 'minDistance', type : 'number', min :10, max : 300 },
      { name : 'limitConnections', type : 'checkbox'},
      { name : 'maxConnections', type : 'number', min : 0, max : 30, step : 1 },
      { name : 'particleCount', type : 'number', min : 0, max : 1000, step : 1},
    ]);
  }

}
