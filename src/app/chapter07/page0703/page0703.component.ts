import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GeometriesVector3, GuiControlParam, RendererTimer } from './../../three';

@Component({
  selector: 'app-page0703',
  templateUrl: './page0703.component.html',
  styleUrls: ['./page0703.component.scss']
})
export class Page0703Component implements OnInit {
  controls = {
    dotCnt : 15000,
    size : 4,
    transparent : true,
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
        const color = new THREE.Color(0x00ff00);
        const hsl: THREE.HSL = color.getHSL({ h : 0, s : 0, l : 0});
        color.setHSL(hsl.h, hsl.s, Math.random() * hsl.l);
        this.colors.push(color.getHex());
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
