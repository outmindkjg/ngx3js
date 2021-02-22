import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-camera',
  templateUrl: './webgl-camera.component.html',
  styleUrls: ['./webgl-camera.component.scss']
})
export class WebglCameraComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }
}

