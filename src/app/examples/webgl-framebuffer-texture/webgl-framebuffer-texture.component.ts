import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-framebuffer-texture',
  templateUrl: './webgl-framebuffer-texture.component.html',
  styleUrls: ['./webgl-framebuffer-texture.component.scss']
})
export class WebglFramebufferTextureComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
