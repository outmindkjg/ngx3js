import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-geometry-terrain-raycast',
  templateUrl: './webgl-geometry-terrain-raycast.component.html',
  styleUrls: ['./webgl-geometry-terrain-raycast.component.scss']
})
export class WebglGeometryTerrainRaycastComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
