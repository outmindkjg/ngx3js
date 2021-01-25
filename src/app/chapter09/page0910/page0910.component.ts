import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from 'src/app/three';

@Component({
  selector: 'app-page0910',
  templateUrl: './page0910.component.html',
  styleUrls: ['./page0910.component.scss']
})
export class Page0910Component implements OnInit {

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
