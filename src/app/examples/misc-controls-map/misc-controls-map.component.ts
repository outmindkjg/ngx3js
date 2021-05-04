import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-misc-controls-map',
  templateUrl: './misc-controls-map.component.html',
  styleUrls: ['./misc-controls-map.component.scss']
})
export class MiscControlsMapComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
