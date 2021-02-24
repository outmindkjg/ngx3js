import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from './../../three';

@Component({
  selector: 'app-page0603',
  templateUrl: './page0603.component.html',
  styleUrls: ['./page0603.component.scss']
})
export class Page0603Component implements OnInit {

  controls = {
    amount : 2,
    bevelThickness : 2,
    bevelSize : 0.5,
    bevelEnabled : true,
    bevelSegments : 3,
    curveSegments : 12,
    steps : 1,
    redraw: () => {
    },
    wireframe: false
  }

  controlsParams: GuiControlParam[] = [
    { name: "amount", type: "number", min: 0, max: 20 },
    { name: "bevelThickness", type: "number", min: 0, max: 10 },
    { name: "bevelSize", type: "number", min: 0, max: 10 },
    { name: "bevelSegments", type: "number", min: 0, max: 30 , step : 1 },
    { name: "bevelEnabled", type: "button"},
    { name: "curveSegments", type: "number", min: 0, max: 30, step : 1 },
    { name: "steps", type: "number", min: 0, max: 30, step : 1 },
    { name: "redraw", type: "button" },
    { name: "wireframe", type: "button" },
  ]


  constructor() { }

  ngOnInit(): void {
    this.controls.redraw();
  }

  points: GeometriesVector3[] = [];
  rotation: GeometriesVector3 = {
    x: 0, y: 0, z: 0
  }

  onRender(timer: RendererTimer) {
    this.rotation.y += timer.delta * 20;
    this.rotation.x = this.rotation.z = this.rotation.y;
  }
}
