import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from './../../three';

@Component({
  selector: 'app-page0914',
  templateUrl: './page0914.component.html',
  styleUrls: ['./page0914.component.scss']
})
export class Page0914Component implements OnInit {

  controls = {
    action : "animation_0",
    timeScale : 1,
    rotate: true,
    wireframe: false,
  }

  controlsParams: GuiControlParam[] = [
    { name: "action", type: "select", select : [
      "animation_0", "animation_1", "animation_2", "animation_3", "animation_4", "animation_5", "animation_6", "animation_7", "animation_8", "animation_9", 
      "animation_10", "animation_11", "animation_12", "animation_13", "animation_14", "animation_15", "animation_16", "animation_17", "animation_18", "animation_19", 
      "animation_20", "animation_21", "animation_22", "animation_23", "animation_24", "animation_25", "animation_26", "animation_27", "animation_28", "animation_29", "animation_30", 
      "animation_31"
    ] },
    { name: "timeScale", type: "number", min : 0, max : 3},
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
      // this.rotation.x = this.rotation.z = this.rotation.y;
    }

  }
}
