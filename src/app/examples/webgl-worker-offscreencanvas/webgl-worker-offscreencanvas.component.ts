import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-worker-offscreencanvas',
  templateUrl: './webgl-worker-offscreencanvas.component.html',
  styleUrls: ['./webgl-worker-offscreencanvas.component.scss']
})
export class WebglWorkerOffscreencanvasComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
