import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-lod',
  templateUrl: './webgl-lod.component.html',
  styleUrls: ['./webgl-lod.component.scss']
})
export class WebglLodComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
