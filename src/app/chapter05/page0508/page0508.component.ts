import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from 'src/app/three';

@Component({
  selector: 'app-page0508',
  templateUrl: './page0508.component.html',
  styleUrls: ['./page0508.component.scss']
})
export class Page0508Component implements OnInit {

  controls = {
    radius : 10,
    tube : 10,
    radialSegments : 8,
    tubularSegments : 6,
    arc : 360,
    wireframe : false
  }

  controlsParams: GuiControlParam[] = [
    { name: "radius", type: "number", min: 0, max: 40 },
    { name: "tube", type: "number", min: 0, max: 40},
    { name: "radialSegments", type: "number", min: 0, max: 40, step : 1 },
    { name: "tubularSegments", type: "number", min: 1, max: 20, step : 1 },
    { name: "arc", type: "number", min: 0, max: 360},
    { name: "wireframe", type: "button"},
  ]

  constructor() { }

  ngOnInit(): void {
  }

  rotation: GeometriesVector3 = {
    x: 0, y: 0, z: 0
  }

  onRender(timer: RendererTimer) {
    this.rotation.y += timer.delta * 20;
    this.rotation.x = this.rotation.z = this.rotation.y;
  }
 
}
