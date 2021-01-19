import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from 'src/app/three';

@Component({
  selector: 'app-page0506',
  templateUrl: './page0506.component.html',
  styleUrls: ['./page0506.component.scss']
})
export class Page0506Component implements OnInit {

  controls = {
    radius : 4,
    widthSegments : 10,
    heightSegments : 10,
    phiStart : 0,
    phiLength : 360,
    thetaStart : 0,
    thetaLength : 180,
    wireframe : false
  }

  controlsParams: GuiControlParam[] = [
    { name: "radius", type: "number", min: 0, max: 40 },
    { name: "widthSegments", type: "number", min: 0, max: 20, step : 1 },
    { name: "heightSegments", type: "number", min: 0, max: 20, step : 1  },
    { name: "phiStart", type: "number", min: 0, max: 360 },
    { name: "phiLength", type: "number", min: 0, max: 360 },
    { name: "thetaStart", type: "number", min: 0, max: 360  },
    { name: "thetaLength", type: "number", min: 0, max: 360 },
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
