import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

@Component({
  selector: 'app-webgl-shadowmap-progressive',
  templateUrl: './webgl-shadowmap-progressive.component.html',
  styleUrls: ['./webgl-shadowmap-progressive.component.scss']
})
export class WebglShadowmapProgressiveComponent extends BaseComponent<{
  enable : boolean;
  blurEdges : boolean;
  blendWindow : number;
  lightRadius : number;
  ambientWeight : number;
  debugLightmap : boolean;
}> {

  constructor() {
    super({
      enable : true,
      blurEdges : true,
      blendWindow : 200,
      lightRadius : 50,
      ambientWeight : 0.5,
      debugLightmap : false
    },[
      { name : 'enable' ,  title : 'Enable', type : 'checkbox'},
      { name : 'blurEdges' ,  title : 'Blur Edges', type : 'checkbox'},
      { name : 'blendWindow' ,  title : 'Blend Window', type : 'number', min : 1, max : 500, step : 1},
      { name : 'lightRadius' ,  title : 'Light Radius', type : 'number', min : 0, max : 200, step : 10 },
      { name : 'ambientWeight' ,  title : 'Ambient Weight', type : 'number', min : 0, max : 1, step : 0.1},
      { name : 'enable' ,  title : 'Debug Lightmap', type : 'checkbox'},

    ]);
  }

}
