import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from './../../three';
import * as THREE from 'three';
import { Vector3 } from 'three';

@Component({
  selector: 'app-page0408',
  templateUrl: './page0408.component.html',
  styleUrls: ['./page0408.component.scss']
})
export class Page0408Component implements OnInit {

  uniforms = {
    time: {type: 'f', value: 0.2},
    scale: {type: 'f', value: 0.2},
    alpha: {type: 'f', value: 0.6},
    resolution: {type: "v2", value: new THREE.Vector2()}
  }

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
    this.uniforms.resolution.value = new THREE.Vector2(window.innerWidth, window.innerHeight);
  }

  onRender(timer: RendererTimer) {
    this.rotation.z += timer.delta * 20;
    this.rotation.x = this.rotation.y = this.rotation.z;
  }
}
