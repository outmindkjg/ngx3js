import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-multiple-elements-text',
  templateUrl: './webgl-multiple-elements-text.component.html',
  styleUrls: ['./webgl-multiple-elements-text.component.scss']
})
export class WebglMultipleElementsTextComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
