import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from './../../three';

@Component({
  selector: 'app-page0302',
  templateUrl: './page0302.component.html',
  styleUrls: ['./page0302.component.scss']
})
export class Page0302Component implements OnInit {

  controls = {
    rotationSpeed: 50,
    bouncingSpeed: 0.03,
    ambientColor: '#0c0c0c',
    pointColor: '#ccffcc',
    intensity: 1,
    distance: 100
  }

  controlsParams: GuiControlParam[] = [
    { name: 'ambientColor', type: 'color' },
    { name: 'pointColor', type: 'color' },
    { name: 'intensity', type: 'number', min: 0, max: 3 },
    { name: 'distance', type: 'number', min: 0, max: 100 }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  spherePosition: GeometriesVector3 = { x: 0, y: 0, z: 0 }
  boxRotation: GeometriesVector3 = { x: 0, y: 0, z: 0 }
  sphereLightPosition: GeometriesVector3 = { x: 0, y: 0, z: 0 }

  invert : number = 1;
  phase : number = 0;
  onRender(timer: RendererTimer) {
    this.boxRotation.x += this.controls.rotationSpeed * timer.delta;
    this.boxRotation.y += this.controls.rotationSpeed * timer.delta;
    this.boxRotation.z += this.controls.rotationSpeed * timer.delta;
    // bounce the sphere up and down
    this.spherePosition.x = 20 + (10 * (Math.cos(timer.elapsedTime)));
    this.spherePosition.y = 2 + (10 * Math.abs(Math.sin(timer.elapsedTime)));

    if (this.phase > 2 * Math.PI) {
      this.invert = this.invert * -1;
      this.phase -= 2 * Math.PI;
    } else {
      this.phase += this.controls.rotationSpeed / 2000;
    }
    this.sphereLightPosition.z = +(7 * (Math.sin(this.phase)));
    this.sphereLightPosition.x = +(14 * (Math.cos(this.phase)));
    this.sphereLightPosition.y = 5;

    if (this.invert < 0) {
      var pivot = 14;
      this.sphereLightPosition.x = (this.invert * (this.sphereLightPosition.x - pivot)) + pivot;
    }

  }
}
