import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from './../../three';

@Component({
  selector: 'app-page1207',
  templateUrl: './page1207.component.html',
  styleUrls: ['./page1207.component.scss']
})
export class Page1207Component implements OnInit {

  controls = {
    rotate: true,
    wireframe: false,
  }

  controlsParams: GuiControlParam[] = [
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
