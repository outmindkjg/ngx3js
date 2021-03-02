import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-lines-fat-wireframe',
  templateUrl: './webgl-lines-fat-wireframe.component.html',
  styleUrls: ['./webgl-lines-fat-wireframe.component.scss']
})
export class WebglLinesFatWireframeComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
