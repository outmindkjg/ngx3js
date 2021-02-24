import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from './../../three';

@Component({
  selector: 'app-page0604',
  templateUrl: './page0604.component.html',
  styleUrls: ['./page0604.component.scss']
})
export class Page0604Component implements OnInit {
  controls = {
    numberOfPoints: 5,
    segments: 64,
    radius: 1,
    radiusSegments: 8,
    closed: false,
    redraw: () => {
      this.points = [];
      var count = this.controls.numberOfPoints;
      for (var i = 0; i < count; i++) {
        var randomX = -20 + Math.round(Math.random() * 50);
        var randomY = -15 + Math.round(Math.random() * 40);
        var randomZ = -20 + Math.round(Math.random() * 40);
        this.points.push({ x: randomX, y: randomY, z: randomZ });
      }
    },
    wireframe: false
  }

  controlsParams: GuiControlParam[] = [
    { name: "numberOfPoints", type: "number", min: 2, max: 15 },
    { name: "segments", type: "number", min: 0, max: 50, step: 1 },
    { name: "radius", type: "number", min: 0, max: 10 },
    { name: "radiusSegments", type: "number", min: 0, max: 100, step : 1},
    { name: "closed", type: "button" },
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
