import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-geometry-spline-editor',
  templateUrl: './webgl-geometry-spline-editor.component.html',
  styleUrls: ['./webgl-geometry-spline-editor.component.scss']
})
export class WebglGeometrySplineEditorComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
