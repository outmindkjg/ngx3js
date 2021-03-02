import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-geometry-shapes',
  templateUrl: './webgl-geometry-shapes.component.html',
  styleUrls: ['./webgl-geometry-shapes.component.scss']
})
export class WebglGeometryShapesComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
