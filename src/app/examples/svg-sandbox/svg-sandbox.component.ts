import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-svg-sandbox',
  templateUrl: './svg-sandbox.component.html',
  styleUrls: ['./svg-sandbox.component.scss']
})
export class SvgSandboxComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
