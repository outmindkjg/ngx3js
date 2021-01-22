import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from 'src/app/three';

@Component({
  selector: 'app-page0708',
  templateUrl: './page0708.component.html',
  styleUrls: ['./page0708.component.scss']
})
export class Page0708Component implements OnInit {
  controls = {
    size : 150,
    sprite : 0,
    transparent : true,
    opacity : 0.6,
    color : 0xffffff,
    rotate : true,
    wireframe: false
  }

  controlsParams: GuiControlParam[] = [
    { name: "sprite", type: "number", min : 0, max : 4, step : 1},
    { name: "size", type: "number", min : 0, max : 120 },
    { name: "transparent", type: "checkbox" },
    { name: "opacity", type: "number", min : 0, max : 1},
    { name: "color", type: "color" },
    { name: "rotate", type: "checkbox" },
    { name: "wireframe", type: "checkbox" },
  ]

  constructor() { }

  ngOnInit(): void {
    
  }

  rotation: GeometriesVector3 = {
    x: 0, y: 0, z: 0
  }

  cameraPosition :GeometriesVector3 = {
    x: 0, y: 0, z: 50
  }

  spritePosition :GeometriesVector3 = {
    x: 100, y: 50, z: -10
  }
  spriteVelocityX : number = -5;
  onRender(timer: RendererTimer) {
    this.cameraPosition.y = Math.sin(timer.elapsedTime) * 20;
    this.spritePosition.x = this.spritePosition.x + this.spriteVelocityX;
    if (this.spritePosition.x > window.innerWidth) {
      this.spriteVelocityX = -5;
    } else if (this.spritePosition.x < 0) {
      this.spriteVelocityX = 5;
    }
    if (this.controls.rotate) {
      this.rotation.y += timer.delta * 20;
      this.rotation.x = this.rotation.z = this.rotation.y;
    }
  }
}
