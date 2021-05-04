import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-read-float-buffer',
  templateUrl: './webgl-read-float-buffer.component.html',
  styleUrls: ['./webgl-read-float-buffer.component.scss']
})
export class WebglReadFloatBufferComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
