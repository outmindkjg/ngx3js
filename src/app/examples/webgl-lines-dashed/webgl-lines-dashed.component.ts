import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-lines-dashed',
  templateUrl: './webgl-lines-dashed.component.html',
  styleUrls: ['./webgl-lines-dashed.component.scss']
})
export class WebglLinesDashedComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
