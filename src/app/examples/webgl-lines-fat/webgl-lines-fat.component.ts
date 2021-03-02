import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-lines-fat',
  templateUrl: './webgl-lines-fat.component.html',
  styleUrls: ['./webgl-lines-fat.component.scss']
})
export class WebglLinesFatComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
