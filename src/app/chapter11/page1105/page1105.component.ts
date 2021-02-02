import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer, ThreeUtil } from './../../three';

@Component({
  selector: 'app-page1105',
  templateUrl: './page1105.component.html',
  styleUrls: ['./page1105.component.scss']
})
export class Page1105Component implements OnInit {

  controls = {
    hBlur:false,
    vBlur:false,
    hTilt:false,
    vTilt:false,
    triBlur:false,
    hTiltR:0.35,
    vTiltR:0.35,
    deltaX:0.05,
    deltaY:0.05,
    rotate: true,
    wireframe: false,
  }

  controlsParams: GuiControlParam[] = [
    { name: "hBlur", type: "checkbox" },
    { name: "vBlur", type: "checkbox" },
    { name: "hTilt", type: "checkbox" },
    { name: "hTiltR", type: "number", min : 0, max : 1},
    { name: "vTilt", type: "checkbox" },
    { name: "vTiltR", type: "number", min : 0, max : 1},
    { name: "triBlur", type: "checkbox" },
    { name: "deltaX", type: "number", min : 0, max : 0.05, step : 0.001},
    { name: "deltaY", type: "number", min : 0, max : 0.05, step : 0.001},
    { name: "rotate", type: "checkbox" },
    { name: "wireframe", type: "checkbox" },
  ]

  constructor() { }

  ngOnInit(): void {
    var range = 3;
    var stepX = 8;
    var stepZ = 8;
    this.cubes = [];
    const scale = ThreeUtil.getChromaScale('white', 'blue');
    for (var i = -25; i < 5; i++) {
        for (var j = -15; j < 15; j++) {
            const color = scale(Math.random()).hex()
            const x = i * stepX + (Math.random() - 0.5) * range;
            const z = j * stepZ + (Math.random() - 0.5) * range;
            const y = (Math.random() - 0.5) * 2;
            this.cubes.push( { position : { x : x, y : y, z : z}, color : color })
        }
    }

  }

  rotation: GeometriesVector3 = {
    x: 0, y: 0, z: 0
  }

  cubes : { position : GeometriesVector3, color : string | number}[] = [];

  onRender(timer: RendererTimer) {
    if (this.controls.rotate) {
      this.rotation.y += timer.delta * 20;
      // this.rotation.x = this.rotation.z = this.rotation.y;
    }

  }
}
