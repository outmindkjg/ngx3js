import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-css3d-sandbox',
  templateUrl: './css3d-sandbox.component.html',
  styleUrls: ['./css3d-sandbox.component.scss']
})
export class Css3dSandboxComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
