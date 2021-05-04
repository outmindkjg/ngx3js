import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-sprites',
  templateUrl: './webgl-sprites.component.html',
  styleUrls: ['./webgl-sprites.component.scss']
})
export class WebglSpritesComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
