import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-misc-lookat',
  templateUrl: './misc-lookat.component.html',
  styleUrls: ['./misc-lookat.component.scss']
})
export class MiscLookatComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
