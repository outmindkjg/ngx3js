import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-raycast-sprite',
  templateUrl: './webgl-raycast-sprite.component.html',
  styleUrls: ['./webgl-raycast-sprite.component.scss']
})
export class WebglRaycastSpriteComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
