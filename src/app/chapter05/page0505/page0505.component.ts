import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from 'src/app/three';

@Component({
  selector: 'app-page0505',
  templateUrl: './page0505.component.html',
  styleUrls: ['./page0505.component.scss']
})
export class Page0505Component implements OnInit {

  controls = {
    width : 10,
    height : 10,
    depth : 10,
    widthSegments : 1,
    heightSegments : 1,
    depthSegments : 1,
    wireframe : false
  }

  controlsParams: GuiControlParam[] = [
    { name: "width", type: "number", min: 0, max: 40 },
    { name: "height", type: "number", min: 0, max: 40 },
    { name: "depth", type: "number", min: 0, max: 40 , step : 1 },
    { name: "widthSegments", type: "number", min: 0, max: 10, step : 1 },
    { name: "heightSegments", type: "number", min: 0, max: 10, step : 1  },
    { name: "depthSegments", type: "number", min: 0, max: 10, step : 1  },
    { name: "wireframe", type: "button"},
  ]

  constructor() { }

  ngOnInit(): void {
  }

  rotation: GeometriesVector3 = {
    x: 0, y: 0, z: 0
  }

  onRender(timer: RendererTimer) {
    this.rotation.y += timer.delta * 20;
  }
 
}
