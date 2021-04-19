import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-materials-texture-canvas',
  templateUrl: './webgl-materials-texture-canvas.component.html',
  styleUrls: ['./webgl-materials-texture-canvas.component.scss']
})
export class WebglMaterialsTextureCanvasComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
