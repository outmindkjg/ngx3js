import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-interactive-lines',
  templateUrl: './webgl-interactive-lines.component.html',
  styleUrls: ['./webgl-interactive-lines.component.scss']
})
export class WebglInteractiveLinesComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
