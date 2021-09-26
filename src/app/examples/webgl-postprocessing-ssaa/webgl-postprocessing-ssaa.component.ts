import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

@Component({
  selector: 'app-webgl-postprocessing-ssaa',
  templateUrl: './webgl-postprocessing-ssaa.component.html',
  styleUrls: ['./webgl-postprocessing-ssaa.component.scss']
})
export class WebglPostprocessingSsaaComponent extends BaseComponent<{
  sampleLevel: number,
  renderToScreen: boolean,
  unbiased: boolean,
  camera: string,
  clearColor: string,
  clearAlpha: number,
  autoRotate: boolean
}> {

  constructor() {
    super({
      sampleLevel: 4,
      renderToScreen: false,
      unbiased: true,
      camera: 'perspective',
      clearColor: 'black',
      clearAlpha: 1.0,
      autoRotate: true
    },[
      { name : 'unbiased', type : 'checkbox'},
      { name : 'renderToScreen', type : 'checkbox'},
      { name : 'sampleLevel', type : 'select' , select : {
        'Level 0: 1 Sample': 0,
        'Level 1: 2 Samples': 1,
        'Level 2: 4 Samples': 2,
        'Level 3: 8 Samples': 3,
        'Level 4: 16 Samples': 4,
        'Level 5: 32 Samples': 5
      }},
      { name : 'camera', type : 'select', select : ['perspective', 'orthographic']},
      { name : 'clearColor', type : 'select', select : ['black', 'white', 'blue', 'green', 'red']},
      { name : 'clearAlpha', type : 'number', min : 0, max : 1},
      { name : 'autoRotate', type : 'checkbox'},
    ]);
  }

  ngOnInit() {
    this.meshInfos = [];
    for ( let i = 0; i < 120; i ++ ) {
      this.meshInfos.push({
        position : { 
          x : Math.random() * 4 - 2,
          y : Math.random() * 4 - 2,
          z : Math.random() * 4 - 2,
        },
        rotation : {
          x : Math.random() * 180,
          y : Math.random() * 180,
          z : Math.random() * 180,
        },
        scale : Math.random() * 0.2 + 0.05,
        color : 'hsl('+Math.random()+',1.0,0.3)',
        roughness : 0.5 * Math.random() + 0.25,
        metalness : 0
      })
    }
  }
  meshInfos : {
    position : { x : number, y : number, z : number},
    rotation : { x : number, y : number, z : number},
    scale : number,
    color : string,
    roughness : number,
    metalness : number
  }[] = [];
}
