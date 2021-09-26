import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

@Component({
  selector: 'app-webgl-postprocessing-d3lut',
  templateUrl: './webgl-postprocessing-d3lut.component.html',
  styleUrls: ['./webgl-postprocessing-d3lut.component.scss']
})
export class WebglPostprocessingD3lutComponent extends BaseComponent<{
  enabled: boolean,
  lut: string,
  intensity: number,
  use2dLut: boolean,
}> {

  constructor() {
    super({
      enabled: true,
      lut: 'Bourbon 64.CUBE',
      intensity: 1,
      use2dLut: false,
    },[
      { name : 'enabled', type : 'checkbox'},
      { name : 'lut', type : 'select' , select: ['Bourbon 64.CUBE','Chemical 168.CUBE','Clayton 33.CUBE','Cubicle 99.CUBE','Remy 24.CUBE']},
      { name : 'intensity', type : 'number' , min : 0, max : 1},
      { name : 'use2dLut', type : 'checkbox'},
    ]);
  }

}
