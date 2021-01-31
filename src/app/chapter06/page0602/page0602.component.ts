import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from './../../three';

@Component({
  selector: 'app-page0602',
  templateUrl: './page0602.component.html',
  styleUrls: ['./page0602.component.scss']
})
export class Page0602Component implements OnInit {

  controls = {
    len: 10,
    segments: 12,
    phiStart: 0,
    phiLength: 160,
    redraw: () => {
      this.points = [];
      var height = 5;
      var count = this.controls.len;
      for (var i = 0; i < count; i++) {
        var randomX = (Math.sin(i * 0.2) + Math.cos(i * 0.3)) * height + 12;
        var randomZ = 0;
        var randomY = (i - count) + count / 2;
        this.points.push({ x: randomX, y: randomY, z: randomZ });
      }
    },
    wireframe: false
  }

  controlsParams: GuiControlParam[] = [
    { name: "len", type: "number", min: 3, max: 40 },
    { name: "segments", type: "number", min: 0, max: 50, step: 1 },
    { name: "phiStart", type: "number", min: 0, max: 360 },
    { name: "phiLength", type: "number", min: 0, max: 360 },
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
