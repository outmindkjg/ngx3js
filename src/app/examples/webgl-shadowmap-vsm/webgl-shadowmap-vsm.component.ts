import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-shadowmap-vsm',
  templateUrl: './webgl-shadowmap-vsm.component.html',
  styleUrls: ['./webgl-shadowmap-vsm.component.scss']
})
export class WebglShadowmapVsmComponent extends BaseComponent<{
  spotlight : number;
  directional : number;
}> {

  constructor() {
    super({
      spotlight : 4,
      directional : 4
    },[
      { name : 'spotlight', title : 'Spotlight Radius', type : 'number', min : 2, max : 8 },
      { name : 'directional', title : 'Directional light Radius', type : 'number', min : 2, max : 8 },
    ]);
  }

}
