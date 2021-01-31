import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GeometriesVector3, GuiControlParam, RendererTimer } from './../../three';

@Component({
  selector: 'app-page0706',
  templateUrl: './page0706.component.html',
  styleUrls: ['./page0706.component.scss']
})
export class Page0706Component implements OnInit {

  controls = {
    dotCnt: 15,
    size: 4,
    transparent: true,
    opacity: 0.6,
    color: 0xffffff,
    sizeAttenuation: true,
    rotate: false,
    wireframe: false,
    reDraw: () => {
      this.positions = [];
      this.colors = [];
      const range = 500;
      for (let i = 0; i < this.controls.dotCnt; i++) {
        this.positions.push({
          x: Math.random() * range - range / 2,
          y: Math.random() * range - range / 2,
          z: Math.random() * range - range / 2,
          velocityY: 0.1 + Math.random() / 5,
          velocityX: (Math.random() - 0.5) / 3
        });
        const color = new THREE.Color(0x00ff00);
        const hsl: THREE.HSL = color.getHSL({ h: 0, s: 0, l: 0 });
        color.setHSL(hsl.h, hsl.s, Math.random() * hsl.l);
        this.colors.push(color.getHex());
      }
    }
  }

  controlsParams: GuiControlParam[] = [
    { name: "dotCnt", type: "number", min: 50, max: 20000, step: 1 },
    { name: "size", type: "number", min: 0, max: 10, step: 1 },
    { name: "transparent", type: "checkbox" },
    { name: "opacity", type: "number", min: 0, max: 1 },
    { name: "color", type: "color" },
    { name: "sizeAttenuation", type: "checkbox" },
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

  positions: {
    x: number, y: number, z: number,
    velocityY: number,
    velocityX: number
  }[] = [];
  colors: number[] = [];

  onRender(timer: RendererTimer) {
    const newpositions = [];
    this.positions.forEach((v) => {
      v.y = v.y - (v.velocityY);
      v.x = v.x - (v.velocityX);
      if (v.y <= 0) v.y = 60;
      if (v.x <= -20 || v.x >= 20) v.velocityX = v.velocityX * -1;
      newpositions.push(v);
    });
    this.positions = newpositions;

    if (this.controls.rotate) {
      this.rotation.y += timer.delta * 20;
      this.rotation.x = this.rotation.z = this.rotation.y;
    }

  }
}
