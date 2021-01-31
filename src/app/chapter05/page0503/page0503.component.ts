import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from './../../three';

@Component({
  selector: 'app-page0503',
  templateUrl: './page0503.component.html',
  styleUrls: ['./page0503.component.scss']
})
export class Page0503Component implements OnInit {

  controls = {
    radius : 4,
    thetaStart : 30,
    thetaLength : 90,
    segments : 10,
    wireframe : false
  }

  controlsParams: GuiControlParam[] = [
    { name: "radius", type: "number", min: 0, max: 40 },
    { name: "segments", type: "number", min: 0, max: 40, step : 1 },
    { name: "thetaStart", type: "number", min: 0, max: 360 },
    { name: "thetaLength", type: "number", min: 0, max: 360 },
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
