import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from './../../three';

@Component({
  selector: 'app-page0915',
  templateUrl: './page0915.component.html',
  styleUrls: ['./page0915.component.scss']
})
export class Page0915Component implements OnInit {

  controls = {
    action : "stand",
    timeScale : 1,
    rotate: true,
    wireframe: false,
  }

  controlsParams: GuiControlParam[] = [
    { name: "action", type: "select", select : [
      "stand", "run", "attack", "paina", "painb", "painc", "jump", "flip", "salute_alt", "bumflop", "wavealt", "sniffsniff", 
      "crattack", "crpain", "crdeath", "deatha", "deathb", "deathc", "boomhc"
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
