import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from './../../three';

@Component({
  selector: 'app-page0504',
  templateUrl: './page0504.component.html',
  styleUrls: ['./page0504.component.scss']
})
export class Page0504Component implements OnInit {

  controls = {
    innerRadius : 0,
    outerRadius : 50,
    thetaSegments : 8,
    phiSegments : 8,
    thetaStart : 0,
    thetaLength : 90,
    wireframe : false
  }

  controlsParams: GuiControlParam[] = [
    { name: "innerRadius", type: "number", min: 0, max: 40 },
    { name: "outerRadius", type: "number", min: 0, max: 40 },
    { name: "thetaSegments", type: "number", min: 0, max: 40 , step : 1 },
    { name: "phiSegments", type: "number", min: 0, max: 40, step : 1 },
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
