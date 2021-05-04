import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-css3d-orthographic',
  templateUrl: './css3d-orthographic.component.html',
  styleUrls: ['./css3d-orthographic.component.scss']
})
export class Css3dOrthographicComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
