import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from './../../three';

@Component({
  selector: 'app-page0601',
  templateUrl: './page0601.component.html',
  styleUrls: ['./page0601.component.scss']
})
export class Page0601Component implements OnInit {

  controls = {
    len: 10,
    redraw: () => {
      this.points = [];
      for (var i = 0; i < this.controls.len; i++) {
        var randomX = -15 + Math.round(Math.random() * 30);
        var randomY = -15 + Math.round(Math.random() * 30);
        var randomZ = -15 + Math.round(Math.random() * 30);
        this.points.push({ x : randomX, y : randomY, z : randomZ});
    }
    },
    wireframe: false
  }

  controlsParams: GuiControlParam[] = [
    { name: "len", type: "number", min: 3, max: 40 },
    { name: "redraw", type: "button"},
    { name: "wireframe", type: "button" },
  ]


  constructor() { }

  ngOnInit(): void {
    this.controls.redraw();
  }

  points : GeometriesVector3[] = [];
  rotation: GeometriesVector3 = {
    x: 0, y: 0, z: 0
  }

  onRender(timer: RendererTimer) {
    this.rotation.y += timer.delta * 20;
    this.rotation.x = this.rotation.z = this.rotation.y;
  }
}
