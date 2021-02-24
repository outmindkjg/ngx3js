import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from './../../three';

@Component({
  selector: 'app-page0405',
  templateUrl: './page0405.component.html',
  styleUrls: ['./page0405.component.scss']
})
export class Page0405Component implements OnInit {


  controls = {
    rotationSpeed: 30,
    bouncingSpeed: 0.03,
    opacity: 1,
    transparent: false,
    visible: true,
    side: "front",
    wireframe: false,
    wireframeLinewidth: 1,
    selectedMesh: "box",
    shadow: "flat"
  }

  controlsParams: GuiControlParam[] = [
    { name: "rotationSpeed", type: "number", min: 0, max: 360 }
  ]

  constructor() { }

  cubePosition: GeometriesVector3[] = []
  ngOnInit(): void {
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        for (let z = 0; z < 3; z++) {
          this.cubePosition.push({x : x * 3 - 3, y : y * 3, z : z * 3 - 3})
        }
      }
    }
  }

  rotationY: number = 0;
  onRender(timer: RendererTimer) {
    this.rotationY += timer.delta * this.controls.rotationSpeed;
  }
}
