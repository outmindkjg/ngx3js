import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from 'src/app/three';

@Component({
  selector: 'app-page0710',
  templateUrl: './page0710.component.html',
  styleUrls: ['./page0710.component.scss']
})
export class Page0710Component implements OnInit {

  controls = {
    radius : 13,
    tube : 1.7,
    radialSegments : 156,
    tubularSegments : 12,
    p : 5,
    q : 4,
    heightScale : 3.5,
    asParticles : true,
    rotate : false,
    wireframe : false
  }

  controlsParams: GuiControlParam[] = [
    { name: "radius", type: "number", min: 0, max: 40 },
    { name: "tube", type: "number", min: 0, max: 40},
    { name: "radialSegments", type: "number", min: 0, max: 400, step : 1 },
    { name: "tubularSegments", type: "number", min: 1, max: 20, step : 1 },
    { name: "p", type: "number", min: 1, max: 10, step : 1 },
    { name: "q", type: "number", min: 1, max: 15, step : 1 },
    { name: "heightScale", type: "number", min: 0, max: 5 },
    { name: "asParticles", type: "checkbox"},
    { name: "rotate", type: "checkbox"},
    { name: "wireframe", type: "checkbox"}
  ]

  textureSize = { width : 16, height : 16}

  textureProgram : (context: CanvasRenderingContext2D) => void = (context) => {
    var gradient = context.createRadialGradient(this.textureSize.width / 2, this.textureSize.height / 2, 0, this.textureSize.width / 2, this.textureSize.height / 2, this.textureSize.width / 2);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.2, 'rgba(0,255,255,1)');
    gradient.addColorStop(0.4, 'rgba(0,0,64,1)');
    gradient.addColorStop(1, 'rgba(0,0,0,1)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, this.textureSize.width, this.textureSize.height);
  }

  constructor() { }

  ngOnInit(): void {
  }

  rotation: GeometriesVector3 = {
    x: 0, y: 0, z: 0
  }

  onRender(timer: RendererTimer) {
    if (this.controls.rotate) {
      this.rotation.y += timer.delta * 20;
      this.rotation.x = this.rotation.z = this.rotation.y;
    }
  }
 }
