import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-multiple-views',
  templateUrl: './webgl-multiple-views.component.html',
  styleUrls: ['./webgl-multiple-views.component.scss']
})
export class WebglMultipleViewsComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
