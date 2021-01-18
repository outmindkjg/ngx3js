import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from './../../three';

@Component({
  selector: 'app-page0407',
  templateUrl: './page0407.component.html',
  styleUrls: ['./page0407.component.scss']
})
export class Page0407Component implements OnInit {

  controls = {
    rotationSpeed: 0.02,
    bouncingSpeed: 0.03,
    opacity: 1,
    transparent: false,
    overdraw: 0,
    visible: true,
    ambient : "#000000",
    emissive : "#000000",
    specular : "#000000",
    shininess : 0,
    side: "front",
    color: "#7777ff",
    wireframe: false,
    wireframeLinewidth: 1,
    wireFrameLineJoin: "round",
    selectedMesh: "box",
    rendererType: 'webGL',
    switchRenderer: () => {
      switch (this.controls.rendererType) {
        case 'webGL':
          this.controls.rendererType = 'webGL1';
          break;
        default:
          this.controls.rendererType = 'webGL';
          break;
      }
    }
  }

  controlsParams: GuiControlParam[] = [
    {
      name: "Mesh", type: "folder", children: [
        { name: "opacity", type: "number", min: 0, max: 1 },
        { name: "transparent", type: "button" },
        { name: "visible", type: "button" },
        { name: "wireframe", type: "button" },
        { name: "ambient", type: "color" },
        { name: "emissive", type: "color" },
        { name: "specular", type: "color" },
        { name: "shininess", type: "number", min: 0, max: 200 },
        { name: "side", type: "select", select: ["front", "back", "double"] },
        { name: "color", type: "color" },
        { name: "wireframeLinewidth", type: "number", min: 0, max: 20 },
        { name: "selectedMesh", type: "select", select: ["box", "sphere", "plane"] },
      ]
    },
    { name: "switchRenderer", type: "button" },
    {
      name: "Canvas renderer", type: "folder", children: [
        { name: "overdraw", type: "number" },
        { name: "wireFrameLineJoin", type: "select", select: ['round', 'bevel', 'miter'] },
      ]
    }
  ]

  rotation: GeometriesVector3 = {
    x: 0, y: 0, z: 0
  }

  constructor() { }

  ngOnInit(): void {
  }

  onRender(timer: RendererTimer) {
    this.rotation.y += timer.delta * 20;
  }
}
