import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from 'src/app/three';

@Component({
  selector: 'app-page0901',
  templateUrl: './page0901.component.html',
  styleUrls: ['./page0901.component.scss']
})
export class Page0901Component implements OnInit {

  controls = {
    rotationSpeed : 0.02,
    bouncingSpeed : 0.03,
    scalingSpeed : 0.03,
    rotate: true,
    wireframe: false,
  }

  controlsParams: GuiControlParam[] = [
    { name: "rotationSpeed", type: "number", min : 0, max : 0.5 },
    { name: "bouncingSpeed", type: "number", min : 0, max : 0.5 },
    { name: "scalingSpeed", type: "number", min : 0, max : 0.5 },
    { name: "rotate", type: "checkbox" },
    { name: "wireframe", type: "checkbox" },
  ]

  constructor() { }

  ngOnInit(): void {

  }

  rotation: GeometriesVector3 = {
    x: 0, y: 0, z: 0
  }

  spherePosition : GeometriesVector3 = {
    x: 0, y: 0, z: 0
  }
  scalingStep  : GeometriesVector3 = {
    x: 1, y: 1, z: 1
  }

  onRender(timer: RendererTimer) {    
    if (this.controls.rotate) {
      this.rotation.y += timer.delta * 20;
      this.rotation.x = this.rotation.z = this.rotation.y;
      
      const step = this.controls.bouncingSpeed * timer.elapsedTime * 60;
      this.spherePosition.x = 20 + ( 10 * (Math.cos(step)));
      this.spherePosition.y = 2 + ( 10 * Math.abs(Math.sin(step)));

      const scalingStep = this.controls.scalingSpeed * timer.elapsedTime * 60;
      this.scalingStep.x = Math.abs(Math.sin(scalingStep / 4));
      this.scalingStep.y = Math.abs(Math.cos(scalingStep / 5));
      this.scalingStep.z = Math.abs(Math.sin(scalingStep / 7));
    }

  }
}
