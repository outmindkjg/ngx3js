import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-interactive-cubes',
  templateUrl: './webgl-interactive-cubes.component.html',
  styleUrls: ['./webgl-interactive-cubes.component.scss']
})
export class WebglInteractiveCubesComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
