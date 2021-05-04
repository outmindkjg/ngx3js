import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-furnace-test',
  templateUrl: './webgl-furnace-test.component.html',
  styleUrls: ['./webgl-furnace-test.component.scss']
})
export class WebglFurnaceTestComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
