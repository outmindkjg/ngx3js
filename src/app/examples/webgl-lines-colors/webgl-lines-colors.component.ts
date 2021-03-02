import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-lines-colors',
  templateUrl: './webgl-lines-colors.component.html',
  styleUrls: ['./webgl-lines-colors.component.scss']
})
export class WebglLinesColorsComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
