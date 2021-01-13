import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from 'src/app/three';

@Component({
  selector: 'app-page0301',
  templateUrl: './page0301.component.html',
  styleUrls: ['./page0301.component.scss']
})
export class Page0301Component implements OnInit {

  controls = {
    rotationSpeed : 50,
    bouncingSpeed : 0.03,
    ambientColor : '#0c0c0c',
    disableSpotlight : false
  }

  controlsParams: GuiControlParam[] = [
    { name: 'ambientColor', type: 'color'},
    { name: 'disableSpotlight', type: 'button' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  spherePosition : GeometriesVector3 = { x : 0, y : 0, z : 0}
  boxRotation : GeometriesVector3 = { x : 0, y : 0, z : 0}
  
  onRender(timer : RendererTimer) {
    this.boxRotation.x += this.controls.rotationSpeed * timer.delta;
    this.boxRotation.y += this.controls.rotationSpeed * timer.delta;
    this.boxRotation.z += this.controls.rotationSpeed * timer.delta;
    // bounce the sphere up and down
    this.spherePosition.x = 20 + ( 10 * (Math.cos(timer.elapsedTime)));
    this.spherePosition.y = 2 + ( 10 * Math.abs(Math.sin(timer.elapsedTime)));

  }
}
