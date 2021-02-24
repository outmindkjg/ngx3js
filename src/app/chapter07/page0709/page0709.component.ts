import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from './../../three';

@Component({
  selector: 'app-page0709',
  templateUrl: './page0709.component.html',
  styleUrls: ['./page0709.component.scss']
})
export class Page0709Component implements OnInit {

  controls = {
    spriteCnt : 100,
    reDraw : () => {
      this.spritePosition = [];
      const range = 200;
      for(let i = 0 ; i < this.controls.spriteCnt ; i++) {
        this.spritePosition.push({
          x : Math.random() * range - range / 2,
          y : Math.random() * range - range / 2,
          z : Math.random() * range - range / 2,
          size : 10,
          sprite : i % 5
        })
      }
    },
    rotate : true,
    wireframe: false
  }

  controlsParams: GuiControlParam[] = [
    { name: "spriteCnt", type: "number", min : 10, max : 500, step : 1 },
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

  spritePosition : {
    x : number,
    y : number,
    z : number,
    size : number,
    sprite : number
  }[] = [];

  onRender(timer: RendererTimer) {
    if (this.controls.rotate) {
      this.rotation.y += timer.delta * 20;
      this.rotation.x = this.rotation.z = this.rotation.y;
    }
  }
}
