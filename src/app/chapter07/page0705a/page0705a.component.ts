import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from 'src/app/three';

@Component({
  selector: 'app-page0705a',
  templateUrl: './page0705a.component.html',
  styleUrls: ['./page0705a.component.scss']
})
export class Page0705aComponent implements OnInit {

  getTexture = (ctx: CanvasRenderingContext2D) => {
    ctx.translate(-81, -84);
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.moveTo(83, 116);
    ctx.lineTo(83, 102);
    ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
    ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
    ctx.lineTo(111, 116);
    ctx.lineTo(106.333, 111.333);
    ctx.lineTo(101.666, 116);
    ctx.lineTo(97, 111.333);
    ctx.lineTo(92.333, 116);
    ctx.lineTo(87.666, 111.333);
    ctx.lineTo(83, 116);
    ctx.fill();
    // the eyes
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(91, 96);
    ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
    ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
    ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
    ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
    ctx.moveTo(103, 96);
    ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
    ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
    ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
    ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
    ctx.fill();

    // the pupils
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();
  };

  controls = {
    dotCnt : 15000,
    size : 4,
    transparent : false,
    opacity : 0.6,
    vertexColors : true,
    color : 0xffffff,
    sizeAttenuation : true,
    rotate : true,
    wireframe: false,
    reDraw : () => {
      this.positions = [];
      this.colors = [];
      const range = 500;
      for (let i = 0; i < this.controls.dotCnt; i++) {
        this.positions.push({ x : Math.random() * range - range / 2, y : Math.random() * range - range / 2, z : Math.random() * range - range / 2});
        this.colors.push(Math.random() * 0x00ffff);
      }
    }
  }

  controlsParams: GuiControlParam[] = [
    { name: "dotCnt", type: "number" , min : 50, max : 20000, step : 1},
    { name: "size", type: "number" , min : 0, max : 10, step : 1},
    { name: "transparent", type: "checkbox"},
    { name: "opacity", type: "number" , min : 0, max : 1},
    { name: "vertexColors", type: "checkbox"},
    { name: "color", type: "color"},
    { name: "sizeAttenuation", type: "checkbox"},
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
