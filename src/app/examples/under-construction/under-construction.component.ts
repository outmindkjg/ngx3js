import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-under-construction',
  templateUrl: './under-construction.component.html',
  styleUrls: ['./under-construction.component.scss']
})
export class UnderConstructionComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
