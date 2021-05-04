import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-misc-controls-fly',
  templateUrl: './misc-controls-fly.component.html',
  styleUrls: ['./misc-controls-fly.component.scss']
})
export class MiscControlsFlyComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
