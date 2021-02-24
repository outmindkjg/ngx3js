import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from './../../three';

@Component({
  selector: 'app-page0702',
  templateUrl: './page0702.component.html',
  styleUrls: ['./page0702.component.scss']
})
export class Page0702Component implements OnInit {

  controls = {
    x : 10,
    y : 10,
    rotate : true,
    wireframe: false,
    reDraw : () => {
      this.positions = [];
      this.colors = [];
      const maxSize = 100;
      const distX = maxSize / this.controls.x;
      const distY = maxSize / this.controls.y;
      for(let x = 0; x < this.controls.x; x++) {
        for(let y = 0; y < this.controls.y; y++) {
          this.positions.push({ x : x * distX - maxSize / 2, y : y * distY  - maxSize / 2, z : 0})
          this.colors.push(Math.random() * 0x00ffff);
        }
      }
    }
  }

  controlsParams: GuiControlParam[] = [
    { name: "x", type: "number" , min : 1, max : 10, step : 1},
    { name: "y", type: "number" , min : 1, max : 10, step : 1},
    { name: "reDraw", type: "button" },
    { name: "rotate", type: "checkbox" },
    { name: "wireframe", type: "checkbox" },
  ]

  constructor() { }

  ngOnInit(): void {
    this.controls.reDraw();
  }

  rotation: GeometriesVector3 = {
    x: 0, y: 0, z: 0
  }

  positions : GeometriesVector3[] = [];
  colors : number[] = [];

  onRender(timer: RendererTimer) {
    if (this.controls.rotate) {
      this.rotation.y += timer.delta * 20;
      this.rotation.x = this.rotation.z = this.rotation.y;
    }
  }
}
