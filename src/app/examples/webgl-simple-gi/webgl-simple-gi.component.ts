import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-simple-gi',
  templateUrl: './webgl-simple-gi.component.html',
  styleUrls: ['./webgl-simple-gi.component.scss']
})
export class WebglSimpleGiComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
