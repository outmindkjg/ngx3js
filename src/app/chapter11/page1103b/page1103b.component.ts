import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from './../../three';

@Component({
  selector: 'app-page1103b',
  templateUrl: './page1103b.component.html',
  styleUrls: ['./page1103b.component.scss']
})
export class Page1103bComponent implements OnInit {

  controls = {
    dtSize : 64,
    goWild : false,
    rotate: true,
    wireframe: false,
  }

  controlsParams: GuiControlParam[] = [
    { name: "dtSize", type: "number", min : 1, max : 256 },
    { name: "goWild", type: "checkbox" },
    { name: "rotate", type: "checkbox" },
    { name: "wireframe", type: "checkbox" },
  ]

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
