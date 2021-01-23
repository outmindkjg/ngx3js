import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from 'src/app/three';

@Component({
  selector: 'app-page0510',
  templateUrl: './page0510.component.html',
  styleUrls: ['./page0510.component.scss']
})
export class Page0510Component implements OnInit {

  controls = {
    radius : 10,
    tube : 1,
    radialSegments : 64,
    tubularSegments : 8,
    p : 2,
    q : 3,
    wireframe : false
  }

  controlsParams: GuiControlParam[] = [
    { name: "radius", type: "number", min: 0, max: 40 },
    { name: "tube", type: "number", min: 0, max: 40},
    { name: "radialSegments", type: "number", min: 0, max: 400, step : 1 },
    { name: "tubularSegments", type: "number", min: 1, max: 20, step : 1 },
    { name: "p", type: "number", min: 1, max: 10, step : 1 },
    { name: "q", type: "number", min: 1, max: 15, step : 1 },
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
