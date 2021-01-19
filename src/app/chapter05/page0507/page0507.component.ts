import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from 'src/app/three';

@Component({
  selector: 'app-page0507',
  templateUrl: './page0507.component.html',
  styleUrls: ['./page0507.component.scss']
})
export class Page0507Component implements OnInit {
  controls = {
    radiusTop : 20,
    radiusBottom : 20,
    height : 20,
    radialSegments : 8,
    heightSegments : 8,
    openEnded : false,
    wireframe : false
  }

  controlsParams: GuiControlParam[] = [
    { name: "radiusTop", type: "number", min: -40, max: 40 },
    { name: "radiusBottom", type: "number", min: -40, max: 40},
    { name: "height", type: "number", min: 0, max: 40  },
    { name: "radialSegments", type: "number", min: 0, max: 20, step : 1 },
    { name: "heightSegments", type: "number", min: 0, max: 20, step : 1 },
    { name: "openEnded", type: "button"},
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
    this.rotation.x = this.rotation.z = this.rotation.y;
  }
 
}
