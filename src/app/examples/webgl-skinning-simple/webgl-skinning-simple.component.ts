import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

@Component({
  selector: 'app-webgl-skinning-simple',
  templateUrl: './webgl-skinning-simple.component.html',
  styleUrls: ['./webgl-skinning-simple.component.scss']
})
export class WebglSkinningSimpleComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
