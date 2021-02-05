import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from './../../three';

@Component({
  selector: 'app-page1205',
  templateUrl: './page1205.component.html',
  styleUrls: ['./page1205.component.scss']
})
export class Page1205Component implements OnInit {

  controls = {
    anchorSeparat: true,
    x: 0,
    y: 0,
    z: 0,
    width: 100,
    height: 199,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    anchors : {
      min : {
        x : 0.2,
        y : 0.2
      },
      max : {
        x : 0.8,
        y : 0.8
      }
    },
    pivot : {
      x : 0.5,
      y : 0.5
    },
    rotation : {
      x : 0,
      y : 0,
      z : 0
    },
    scale : {
      x : 1,
      y : 1,
      z : 1
    },
    rotate: true,
    wireframe: false,
  }

  controlsParams: GuiControlParam[] = [
    { name: "anchorSeparat", type: "checkbox" },
    { name: "Abs position", type: "folder", children : [
      { name: "x", type: "number", min : -100, max : 100 },
      { name: "y", type: "number", min : -100, max : 100 },
      { name: "z", type: "number", min : -100, max : 100 },
    ], isOpen : false},
    { name: "Rel position", type: "folder", children : [
      { name: "left", type: "number", min : -100, max : 100 },
      { name: "top", type: "number", min : -100, max : 100 },
      { name: "right", type: "number", min : -100, max : 100 },
      { name: "bottom", type: "number", min : -100, max : 100 },
    ], isOpen : true},
    { name: "size", type: "folder", children : [
      { name: "width", type: "number", min : 0, max : 300 },
      { name: "height", type: "number", min : 0, max : 300 },
    ], isOpen : false},
    { name: "Anchors", type: "folder", control : 'anchors', children : [
      { name: "Min", type: "folder", control : 'min', children : [
        { name: "x", type: "number", min : 0, max : 1,step : 0.01 },
        { name: "y", type: "number", min : 0, max : 1,step : 0.01 },
      ]},
      { name: "Max", type: "folder", control : 'max', children : [
        { name: "x", type: "number", min : 0, max : 1,step : 0.01 },
        { name: "y", type: "number", min : 0, max : 1,step : 0.01 },
      ]}
    ], isOpen : true},
    { name: "Pivot", type: "folder", control : 'pivot', children : [
      { name: "x", type: "number", min : -1, max : 2,step : 0.01 },
      { name: "y", type: "number", min : -1, max : 2,step : 0.01 },
    ], isOpen : false},
    { name: "Rotation", type: "folder", control : 'rotation', children : [
      { name: "x", type: "number", min : 0, max : 360 },
      { name: "y", type: "number", min : 0, max : 360 },
      { name: "z", type: "number", min : 0, max : 360 },
    ], isOpen : true},
    { name: "Scale", type: "folder", control : 'scale', children : [
      { name: "x", type: "number", min : 0.01, max : 2, step : 0.01 },
      { name: "y", type: "number", min : 0.01, max : 2, step : 0.01 },
      { name: "z", type: "number", min : 0.01, max : 2, step : 0.01 },
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
