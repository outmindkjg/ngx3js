import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-water-flowmap',
  templateUrl: './webgl-water-flowmap.component.html',
  styleUrls: ['./webgl-water-flowmap.component.scss']
})
export class WebglWaterFlowmapComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
