import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from './../../three';

@Component({
  selector: 'app-page0910',
  templateUrl: './page0910.component.html',
  styleUrls: ['./page0910.component.scss']
})
export class Page0910Component implements OnInit {

  controls = {
    model : true,
    skeleton : true,
    action : 'Idle',
    actionxbot : 'idle',
    girl : {
      sneak_pose : 0,
      sad_pose : 0,
      agree : 0,
      headShake : 0,
    },
    duration : 1,
    rotate: true,
    wireframe: false,
  }

  controlsParams: GuiControlParam[] = [
    { name: "model", type: "checkbox" },
    { name: "skeleton", type: "checkbox" },
    { name: "action", type: "select", select : ['Idle', 'Run', 'TPose', 'Walk'] },
    { name: "actionxbot", type: "select", select : ['None','idle', 'run', 'walk'] },
    { name: "Additive Action Weights", type: "folder" , control : 'girl', children : [
      { name: "sneak_pose", type: "number", min : 0.0, max : 2, step : 0.01 },
      { name: "sad_pose", type: "number", min : 0.0, max : 1, step : 0.01 },
      { name: "agree", type: "number", min : 0.0, max : 1, step : 0.01 },
      { name: "headShake", type: "number", min : 0.0, max : 1, step : 0.01 },
    ], isOpen : true },
    { name: "duration", type: "number", min : 0.2, max : 5 },
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
