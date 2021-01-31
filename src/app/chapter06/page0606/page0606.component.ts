import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer, GeometriesParametric } from './../../three';

@Component({
  selector: 'app-page0606',
  templateUrl: './page0606.component.html',
  styleUrls: ['./page0606.component.scss']
})
export class Page0606Component implements OnInit {

  controls = {
    parametric: 'radialWave',
    slices: 20,
    stacks: 10,
    wireframe: false
  }

  parametric: string | GeometriesParametric = 'mobius3d';

  controlsParams: GuiControlParam[] = [
    {
      name: "parametric", type: "select", select: ["klein", "mobius", "plane","radialWave", "mobius3d"], change: (e) => {
        switch (e) {
          case 'klein':
            this.parametric = this.klein;
            break;
          case 'radialWave':
            this.parametric = this.radialWave;
            break;
          default:
            this.parametric = e;
            break;
        }
      }
    },
    { name: "slices", type: "number", min: 0, max: 30, step :1 },
    { name: "stacks", type: "number", min: 0, max: 20, step :1 },
    { name: "wireframe", type: "button" },
  ]


  klein: GeometriesParametric = (u, v) => {
    u *= Math.PI;
    v *= 2 * Math.PI;
    u = u * 2;
    var x, y, z;
    if (u < Math.PI) {
      x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(u) * Math.cos(v);
      z = -8 * Math.sin(u) - 2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v);
    } else {
      x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(v + Math.PI);
      z = -8 * Math.sin(u);
    }
    y = -2 * (1 - Math.cos(u) / 2) * Math.sin(v);
    return { x: x, y: y, z: z };
  };

  radialWave: GeometriesParametric = (u, v) => {
    var r = 50;
    var x = Math.sin(u) * r;
    var z = Math.sin(v / 2) * 2 * r;
    var y = (Math.sin(u * 4 * Math.PI) + Math.cos(v * 2 * Math.PI)) * 2.8;
    return { x: x, y: y, z: z };
  };

  constructor() { }

  ngOnInit(): void {
    this.parametric = this.radialWave;
  }

  points: GeometriesVector3[] = [];
  rotation: GeometriesVector3 = {
    x: 0, y: 0, z: 0
  }

  onRender(timer: RendererTimer) {
    this.rotation.y += timer.delta * 20;
    this.rotation.x = this.rotation.z = this.rotation.y;
  }
}
