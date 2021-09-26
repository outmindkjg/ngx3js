import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

@Component({
  selector: 'app-webgl-multiple-elements',
  templateUrl: './webgl-multiple-elements.component.html',
  styleUrls: ['./webgl-multiple-elements.component.scss']
})
export class WebglMultipleElementsComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
