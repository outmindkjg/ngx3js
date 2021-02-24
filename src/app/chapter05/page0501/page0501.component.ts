import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from './../../three';

@Component({
  selector: 'app-page0501',
  templateUrl: './page0501.component.html',
  styleUrls: ['./page0501.component.scss']
})
export class Page0501Component implements OnInit {

  controls = {
    width: 10,
    height: 14,
    widthSegments: 4,
    heightSegments: 4,
    wireframe : false
  }

  controlsParams: GuiControlParam[] = [
    { name: "width", type: "number", min: 0, max: 40 },
    { name: "height", type: "number", min: 0, max: 40 },
    { name: "widthSegments", type: "number", min: 0, max: 10, step : 1 },
    { name: "heightSegments", type: "number", min: 0, max: 10, step : 1 },
    { name: "wireframe", type: "button"},
  ]

  constructor() { 
    
  }

  ngOnInit(): void {
  }

  rotation: GeometriesVector3 = {
    x: 0, y: 0, z: 0
  }

  onRender(timer: RendererTimer) {
    this.rotation.y += timer.delta * 20;
  }
 

}
