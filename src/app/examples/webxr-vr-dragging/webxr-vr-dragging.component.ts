import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webxr-vr-dragging',
  templateUrl: './webxr-vr-dragging.component.html',
  styleUrls: ['./webxr-vr-dragging.component.scss']
})
export class WebxrVrDraggingComponent extends BaseComponent<{
  lookat : {
    x : number;
    y : number;
    z : number
  }
}> {

  constructor() {
    super({
      lookat : {
        x : 0,
        y : 0,
        z : 0
      }
    },[
      { name : 'Look At', type : 'folder', control : 'lookat', children : [
        { name : 'x', type : 'number', min : -1, max : 1, step : 0.1 },
        { name : 'y', type : 'number', min : -1, max : 1, step : 0.1 },
        { name : 'z', type : 'number', min : -1, max : 1, step : 0.1 }
      ]}
    ]);
  }


}
