import { Component, OnInit } from '@angular/core';
import { GuiControlParam, RendererTimer } from './../../three';

@Component({
  selector: 'app-page0404',
  templateUrl: './page0404.component.html',
  styleUrls: ['./page0404.component.scss']
})
export class Page0404Component implements OnInit {

  controls = {
    rotationSpeed : 30,
    bouncingSpeed : 0.03,
    opacity : 1,
    transparent : false,
    visible : true,
    side : "front",
    wireframe : false,
    wireframeLinewidth : 1,
    selectedMesh : "box",
    shadow : "flat"
  }

  controlsParams: GuiControlParam[] = [
    { name : "opacity", type : "number", min : 0, max : 1},
    { name : "transparent", type : "button"},
    { name : "wireframe", type : "button"},
    { name : "wireframeLinewidth", type : "number", min : 0, max : 20},
    { name : "visible", type : "button"},
    { name : "side", type : "select", select :["front", "back", "double"]},
    { name : "shadow", type : "select", select :["flat", "smooth"]},
    { name : "selectedMesh", type : "select", select :["box", "sphere", "plane"]},
  ]

  constructor() { }

  ngOnInit(): void {
  }

  rotationY : number = 0;
  onRender(timer : RendererTimer) {
    this.rotationY += timer.delta * this.controls.rotationSpeed;
  }
}
