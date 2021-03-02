import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-layers',
  templateUrl: './webgl-layers.component.html',
  styleUrls: ['./webgl-layers.component.scss']
})
export class WebglLayersComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
