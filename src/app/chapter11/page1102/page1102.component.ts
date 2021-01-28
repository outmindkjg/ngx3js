import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from 'src/app/three';

@Component({
  selector: 'app-page1102',
  templateUrl: './page1102.component.html',
  styleUrls: ['./page1102.component.scss']
})
export class Page1102Component implements OnInit {

  controls = {
    rotate: true,
    wireframe: false,
    film: {
      scanlinesCount: 256,
      grayscale: false,
      scanlinesIntensity: 0.3,
      noiseIntensity: 0.8,
    },
    bloompass: {
      strength: 3,
      kernelSize: 25,
      sigma: 5.0,
      resolution: 256,
    },
    dotscreen: {
      centerX: 0.5,
      centerY: 0.5,
      angle: 1.57,
      scale: 1,
    },
  }

  controlsParams: GuiControlParam[] = [
    { name: "BloomPass", type: "folder", control : 'bloompass', children : [
      { name: "strength", type: "number", min: 1, max: 10 },
      { name: "kernelSize", type: "number", min: 1, max: 100 },
      { name: "sigma", type: "number", min: 0, max: 10 },
      { name: "resolution", type: "number", min: 0, max: 1024 }
    ], isOpen : false},
    { name: "FilmPass", type: "folder", control : 'film', children : [
      { name: "scanlinesCount", type: "number", min: 0, max: 1 },
      { name: "scanlinesIntensity", type: "number", min: 0, max: 3 },
      { name: "grayscale", type: "checkbox" },
      { name: "noiseIntensity", type: "number", min: 0, max: 2048 }
    ], isOpen : false},
    { name: "DotScreenPass", type: "folder", control : 'dotscreen', children : [
      { name: "centerX", type: "number", min: 0, max: 1 },
      { name: "centerY", type: "number", min: 0, max: 1 },
      { name: "angle", type: "number", min: 0, max: 180 },
      { name: "scale", type: "number", min: 0, max: 10 }
    ], isOpen : false},
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
      this.rotation.y += timer.delta * 30;
      // this.rotation.x = this.rotation.z = this.rotation.y;
    }

  }
}
