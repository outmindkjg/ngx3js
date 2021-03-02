import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-geometries',
  templateUrl: './webgl-geometries.component.html',
  styleUrls: ['./webgl-geometries.component.scss']
})
export class WebglGeometriesComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
