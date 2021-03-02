import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-geometry-hierarchy',
  templateUrl: './webgl-geometry-hierarchy.component.html',
  styleUrls: ['./webgl-geometry-hierarchy.component.scss']
})
export class WebglGeometryHierarchyComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
