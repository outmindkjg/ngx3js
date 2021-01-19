import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from 'src/app/three';

@Component({
  selector: 'app-page0511',
  templateUrl: './page0511.component.html',
  styleUrls: ['./page0511.component.scss']
})
export class Page0511Component implements OnInit {
  controls = {
    radius: 10,
    detail: 0,
    type: 'Icosahedron',
    wireframe: false
  }

  controlsParams: GuiControlParam[] = [
    { name: "radius", type: "number", min: 0, max: 40 },
    { name: "detail", type: "number", min: 0, max: 3, step : 1 },
    { name: "type", type: "select", select: ['Icosahedron', 'Tetrahedron', 'Octahedron', 'Dodecahedron', 'Polyhedron'] },
    { name: "wireframe", type: "button" },
  ]

  verticesCustom = [
    1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1
  ];

  indicesCustom = [
    2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1
  ];

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
