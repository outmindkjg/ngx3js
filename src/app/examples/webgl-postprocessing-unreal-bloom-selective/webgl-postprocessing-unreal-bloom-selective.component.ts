import { Component } from '@angular/core';
import { BaseComponent, RendererEvent } from 'ngx3js';

@Component({
  selector: 'app-webgl-postprocessing-unreal-bloom-selective',
  templateUrl: './webgl-postprocessing-unreal-bloom-selective.component.html',
  styleUrls: ['./webgl-postprocessing-unreal-bloom-selective.component.scss']
})
export class WebglPostprocessingUnrealBloomSelectiveComponent extends BaseComponent<{
  exposure: number,
  bloomStrength: number,
  bloomThreshold: number,
  bloomRadius: number,
  scene: string
}> {

  constructor() {
    super({
      exposure: 1,
      bloomStrength: 5,
      bloomThreshold: 0,
      bloomRadius: 0,
      scene: "Scene with Glow"
    },[
      { name : 'scene', type : 'select', select : [ 'Scene with Glow', 'Glow only', 'Scene only']},
      { name : 'exposure', type : 'number', min : 0.1, max : 2 },
      { name : 'bloomThreshold', type : 'number', min : 0.0, max : 1.0 },
      { name : 'bloomStrength', type : 'number', min : 0.0, max : 10.0 },
      { name : 'bloomRadius', type : 'number', min : 0.0, max : 1.0, step : 0.01 },
    ]);
  }

  ngOnInit() {
    this.meshInfos = [];
    for ( let i = 0; i < 50; i ++ ) {
      this.meshInfos.push({
        color : 'hsl('+Math.random() + ',0.7,'+(Math.random() * 0.2 + 0.05)+')',
        x : Math.random() * 10 - 5,
        y : Math.random() * 10 - 5,
        z : Math.random() * 10 - 5,
        multiply : Math.random() * 4.0 + 2.0,
        scale : Math.random() * Math.random() + 0.5,
        layer : Math.random() < 0.25 ? [1] : null
      });
    }
  }

  meshInfos : {
    color : string;
    x : number;
    y : number;
    z : number;
    multiply : number;
    scale : number;
    layer? : number[];
  }[] = [];

  onPointerDown(event : RendererEvent) {
    if (this.camera !== null) {
      const intersect = this.camera.getIntersection(event.mouse, this.meshChildren);
      if (intersect !== null && intersect.object !== null) {
        intersect.object.layers.toggle(1);
      }
    }
  }
}
