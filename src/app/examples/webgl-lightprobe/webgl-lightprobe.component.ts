import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-lightprobe',
  templateUrl: './webgl-lightprobe.component.html',
  styleUrls: ['./webgl-lightprobe.component.scss']
})
export class WebglLightprobeComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
