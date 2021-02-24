import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from './../../three';

@Component({
  selector: 'app-page0911',
  templateUrl: './page0911.component.html',
  styleUrls: ['./page0911.component.scss']
})
export class Page0911Component implements OnInit {

  controls = {
    master :  {
      volume : 1,
      visible : true
    },
    box :  {
      volume : 1,
      refDistance : 3,
      rolloffFactor : 3,
      maxDistance : 3,
      play : true,
      visible : true
    },
    rotate: true,
    wireframe: false,
  }

  controlsParams: GuiControlParam[] = [
    { name : "Listener" , type : "folder", control : "master", children : [
      { name: "volume", type: "number", min : 0, max : 3 },
      { name: "visible", type: "checkbox" },
    ], isOpen : true},
    { name : "Box" , type : "folder", control : "box", children : [
      { name: "volume", type: "number", min : 0, max : 3 },
      { name: "refDistance", type: "number", min : 0, max : 3 },
      { name: "rolloffFactor", type: "number", min : 0, max : 3 },
      { name: "maxDistance", type: "number", min : 0, max : 3 },
      { name: "play", type: "checkbox" },
      { name: "visible", type: "checkbox" },
    ], isOpen : true},
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
