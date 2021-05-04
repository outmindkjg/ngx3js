import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-misc-controls-orbit',
  templateUrl: './misc-controls-orbit.component.html',
  styleUrls: ['./misc-controls-orbit.component.scss']
})
export class MiscControlsOrbitComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
