import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-geometry-terrain-fog',
  templateUrl: './webgl-geometry-terrain-fog.component.html',
  styleUrls: ['./webgl-geometry-terrain-fog.component.scss']
})
export class WebglGeometryTerrainFogComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}