import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webxr-ar-paint',
  templateUrl: './webxr-ar-paint.component.html',
  styleUrls: ['./webxr-ar-paint.component.scss']
})
export class WebxrArPaintComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
