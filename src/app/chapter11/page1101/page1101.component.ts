import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from 'src/app/three';

@Component({
  selector: 'app-page1101',
  templateUrl: './page1101.component.html',
  styleUrls: ['./page1101.component.scss']
})
export class Page1101Component implements OnInit {

  controls = {
    scanlinesCount : 256,
    grayscale : false,
    scanlinesIntensity : 0.3,
    noiseIntensity : 0.8,
    updateEffectFilm : () => {

    },
    rotate: true,
    wireframe: false,
  }

  controlsParams: GuiControlParam[] = [
    { name: "scanlinesIntensity", type: "number", min : 0, max : 1 },
    { name: "noiseIntensity", type: "number", min : 0, max : 3 },
    { name: "grayscale", type: "checkbox" },
    { name: "scanlinesCount", type: "number", min : 0, max : 2048 },
    { name: "updateEffectFilm", type: "button" },
    { name: "rotate", type: "checkbox" },
    { name: "wireframe", type: "checkbox" },
  ]

  constructor() { }

  ngOnInit(): void {

  }

  rotation: GeometriesVector3 = {
    x: 0, y: 0, z: -20
  }

  onRender(timer: RendererTimer) {
    if (this.controls.rotate) {
      this.rotation.y += timer.delta * 10;
      // this.rotation.x = this.rotation.z = this.rotation.y;
    }

  }
}
