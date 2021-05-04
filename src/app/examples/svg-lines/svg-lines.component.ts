import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-svg-lines',
  templateUrl: './svg-lines.component.html',
  styleUrls: ['./svg-lines.component.scss']
})
export class SvgLinesComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
