import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-materials-envmaps-hdr-nodes',
  templateUrl: './webgl-materials-envmaps-hdr-nodes.component.html',
  styleUrls: ['./webgl-materials-envmaps-hdr-nodes.component.scss']
})
export class WebglMaterialsEnvmapsHdrNodesComponent extends BaseComponent<{
  envMap: string,
  roughness: number,
  metalness: number,
  exposure: number,
  nodes: boolean,
  animate: boolean,
  debug: boolean
}> {

  constructor() {
    super({
      envMap: 'HDR',
      roughness: 0.0,
      metalness: 0.0,
      exposure: 1.0,
      nodes: true,
      animate: true,
      debug: false
    },[
      { name : 'envMap', type : 'select', select : ['Generated', 'LDR', 'HDR', 'RGBM16']},
      { name : 'roughness', type : 'number', min : 0, max : 1, step : 0.01},
      { name : 'metalness', type : 'number', min : 0, max : 1, step : 0.01},
      { name : 'exposure', type : 'number', min : 0, max : 2, step : 0.01},
      { name : 'nodes', type : 'checkbox'},
      { name : 'animate', type : 'checkbox'},
      { name : 'debug', type : 'checkbox'}
    ]);
  }

}
