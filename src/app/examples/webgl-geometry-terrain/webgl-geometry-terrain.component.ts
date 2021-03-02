import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-geometry-terrain',
  templateUrl: './webgl-geometry-terrain.component.html',
  styleUrls: ['./webgl-geometry-terrain.component.scss']
})
export class WebglGeometryTerrainComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
