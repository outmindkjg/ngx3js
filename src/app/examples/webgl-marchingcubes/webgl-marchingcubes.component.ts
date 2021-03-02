import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-marchingcubes',
  templateUrl: './webgl-marchingcubes.component.html',
  styleUrls: ['./webgl-marchingcubes.component.scss']
})
export class WebglMarchingcubesComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
