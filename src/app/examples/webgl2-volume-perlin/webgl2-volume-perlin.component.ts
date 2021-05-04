import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl2-volume-perlin',
  templateUrl: './webgl2-volume-perlin.component.html',
  styleUrls: ['./webgl2-volume-perlin.component.scss']
})
export class Webgl2VolumePerlinComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
