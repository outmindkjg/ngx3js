import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-raycast-texture',
  templateUrl: './webgl-raycast-texture.component.html',
  styleUrls: ['./webgl-raycast-texture.component.scss']
})
export class WebglRaycastTextureComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
