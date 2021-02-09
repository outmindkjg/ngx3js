import { Component, OnInit } from '@angular/core';
import { AutoRotationController, AutoScaleController, AutoPositionController, AutoMaterialController } from '../../three/controller.abstract';
import { GeometriesVector3, GuiControlParam, RendererTimer } from './../../three';

@Component({
  selector: 'app-page1302',
  templateUrl: './page1302.component.html',
  styleUrls: ['./page1302.component.scss']
})
export class Page1302Component implements OnInit {

  rotationController = AutoRotationController;
  rotationParam = {
    x: 30, y: 0, z: 0, enable: true
  }

  scaleController = AutoScaleController;
  scaleParam = {
    x: 1, y: 1, z: 1, enable: true
  }

  positionController = AutoPositionController;
  positionParam = {
    x: 0, y: 0, z: 0, enable: true
  }
  
  materialController = AutoMaterialController;
  materialParam = {
    color: 0x000000, opacity : 0 , enable: true
  }
 
  controls = {
    rotation: {
      x: 0, y: 0, z: 0, enable: true,
      reset: () => {
        this.controls.rotation.x = 0;
        this.controls.rotation.y = 0;
        this.controls.rotation.z = 0;
        this.controls.rotationApply();
      }
    },
    rotationApply: () => {
      this.rotationParam = {
        x: this.controls.rotation.x,
        y: this.controls.rotation.y,
        z: this.controls.rotation.z,
        enable: this.controls.rotation.enable,
      }
    },
    scale: {
      x: 0, y: 0, z: 0, enable: true,
      reset: () => {
        this.controls.scale.x = 0;
        this.controls.scale.y = 0;
        this.controls.scale.z = 0;
        this.controls.scaleApply();
      }
    },
    scaleApply: () => {
      this.scaleParam = {
        x: this.controls.scale.x,
        y: this.controls.scale.y,
        z: this.controls.scale.z,
        enable: this.controls.scale.enable,
      }
    },
    position: {
      x: 0, y: 0, z: 0, enable: true,
      reset: () => {
        this.controls.position.x = 0;
        this.controls.position.y = 0;
        this.controls.position.z = 0;
        this.controls.positionApply();
      }
    },
    positionApply: () => {
      this.positionParam = {
        x: this.controls.position.x,
        y: this.controls.position.y,
        z: this.controls.position.z,
        enable: this.controls.position.enable,
      }
    },
    material: {
      color: 0xff0000, opacity: 1,enable: true,
      reset: () => {
        this.controls.material.color = 0xff0000;
        this.controls.material.opacity = 1;
        this.controls.materialApply();
      }
    },
    materialApply: () => {
      this.materialParam = {
        color : this.controls.material.color,
        opacity: this.controls.material.opacity,
        enable: this.controls.material.enable,
      }
    },
    rotate: true,
    wireframe: false,
  }

  controlsParams: GuiControlParam[] = [
    {
      name: "Rotation", type: "folder", control: 'rotation', children: [
        { name: "enable", type: "checkbox", change: () => (this.controls.rotationApply()) },
        { name: "x", type: "number", min: -360, max: 360, step: 1, listen:true, change: () => (this.controls.rotationApply()) },
        { name: "y", type: "number", min: -360, max: 360, step: 1, listen:true, change: () => (this.controls.rotationApply()) },
        { name: "z", type: "number", min: -360, max: 360, step: 1, listen:true, change: () => (this.controls.rotationApply()) },
        { name: "reset", type: "button"}
      ], isOpen: false
    },
    {
      name: "Scale", type: "folder", control: 'scale', children: [
        { name: "enable", type: "checkbox", change: () => (this.controls.scaleApply()) },
        { name: "x", type: "number", min: -0.3, max: 0.3, step: 0.001, listen:true, change: () => (this.controls.scaleApply()) },
        { name: "y", type: "number", min: -0.3, max: 0.3, step: 0.001, listen:true, change: () => (this.controls.scaleApply()) },
        { name: "z", type: "number", min: -0.3, max: 0.3, step: 0.001, listen:true, change: () => (this.controls.scaleApply()) },
        { name: "reset", type: "button"}
      ], isOpen: false
    },
    {
      name: "Position", type: "folder", control: 'position', children: [
        { name: "enable", type: "checkbox", change: () => (this.controls.positionApply()) },
        { name: "x", type: "number", min: -0.3, max: 0.3, step: 0.001, listen:true, change: () => (this.controls.positionApply()) },
        { name: "y", type: "number", min: -0.3, max: 0.3, step: 0.001, listen:true, change: () => (this.controls.positionApply()) },
        { name: "z", type: "number", min: -0.3, max: 0.3, step: 0.001, listen:true, change: () => (this.controls.positionApply()) },
        { name: "reset", type: "button"}
      ], isOpen: false
    },
    {
      name: "Material", type: "folder", control: 'material', children: [
        { name: "enable", type: "checkbox", change: () => (this.controls.materialApply()) },
        { name: "color", type: "color", listen:true, finishChange: () => (this.controls.materialApply()) },
        { name: "opacity", type: "number", min: 0, max: 1, step: 0.001, listen:true, change: () => (this.controls.materialApply()) },
        { name: "reset", type: "button"}
      ], isOpen: false
    },
    { name: "rotate", type: "checkbox" },
    { name: "wireframe", type: "checkbox" },
  ]

  constructor() { }

  ngOnInit(): void {
    this.controls.rotationApply();
    this.controls.scaleApply();
    this.controls.positionApply();
    this.controls.materialApply();
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
