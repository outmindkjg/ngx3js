import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-test-memory',
  templateUrl: './webgl-test-memory.component.html',
  styleUrls: ['./webgl-test-memory.component.scss']
})
export class WebglTestMemoryComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
