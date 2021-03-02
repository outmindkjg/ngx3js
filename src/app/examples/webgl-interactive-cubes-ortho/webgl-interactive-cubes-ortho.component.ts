import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-interactive-cubes-ortho',
  templateUrl: './webgl-interactive-cubes-ortho.component.html',
  styleUrls: ['./webgl-interactive-cubes-ortho.component.scss']
})
export class WebglInteractiveCubesOrthoComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
