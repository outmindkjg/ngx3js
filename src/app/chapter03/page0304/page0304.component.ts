import { Component, OnInit, ViewChild } from '@angular/core';
import { GeometriesVector3, GuiControlParam, MeshComponent, RendererTimer } from './../../three';

@Component({
  selector: 'app-page0304',
  templateUrl: './page0304.component.html',
  styleUrls: ['./page0304.component.scss']
})
export class Page0304Component implements OnInit {

  @ViewChild('cube') cube: MeshComponent = null;
  @ViewChild('sphere') sphere: MeshComponent = null;
  @ViewChild('plane') plane: MeshComponent = null;


  controls = {
    rotationSpeed: 50,
    bouncingSpeed: 0.03,
    ambientColor: '#1c1c1c',
    pointColor: '#ff5808',
    intensity: 1,
    distance: 0,
    exponent: 30,
    angle: 50,
    debug: false,
    castShadow: true,
    onlyShadow: false,
    target: "Plane",
    stopMovingLight: false,
  }

  controlsParams: GuiControlParam[] = [
    { name: 'ambientColor', type: 'color' },
    { name: 'pointColor', type: 'color' },
    { name: 'angle', type: 'number', min: 0, max: 360 },
    { name: 'intensity', type: 'number', min: 0, max: 5 },
    { name: 'distance', type: 'number', min: 0, max: 200 },
    { name: 'exponent', type: 'number', min: 0, max: 100 },
    { name: 'debug', type: 'button' },
    { name: 'castShadow', type: 'button' },
    { name: 'onlyShadow', type: 'button' },
    {
      name: 'target', type: 'select', select: ['Plane', 'Sphere', 'Cube'], change: (e) => {
        switch (e) {
          case 'Plane':
            this.target = this.plane;
            break;
          case 'Sphere':
            this.target = this.sphere;
            break;
          case 'Cube':
            this.target = this.cube;
            break;
        }
      }
    },
    { name: 'stopMovingLight', type: 'button' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.plane !== null && this.plane != undefined) {
      this.target = this.plane;
    }
  }
  
  spherePosition: GeometriesVector3 = { x: 0, y: 0, z: 0 }
  boxRotation: GeometriesVector3 = { x: 0, y: 0, z: 0 }
  sphereLightPosition: GeometriesVector3 = { x: 0, y: 0, z: 0 }

  invert: number = 1;
  phase: number = 0;

  target = null;

  onRender(timer: RendererTimer) {
    this.boxRotation.x += this.controls.rotationSpeed * timer.delta;
    this.boxRotation.y += this.controls.rotationSpeed * timer.delta;
    this.boxRotation.z += this.controls.rotationSpeed * timer.delta;
    // bounce the sphere up and down
    this.spherePosition.x = 20 + (10 * (Math.cos(timer.elapsedTime)));
    this.spherePosition.y = 2 + (10 * Math.abs(Math.sin(timer.elapsedTime)));
    if (!this.controls.stopMovingLight) {
      if (this.phase > 2 * Math.PI) {
        this.invert = this.invert * -1;
        this.phase -= 2 * Math.PI;
      } else {
        this.phase += this.controls.rotationSpeed / 2000;
      }
      this.sphereLightPosition.z = +(7 * (Math.sin(this.phase)));
      this.sphereLightPosition.x = +(14 * (Math.cos(this.phase)));
      this.sphereLightPosition.y = 10;
      if (this.invert < 0) {
        var pivot = 14;
        this.sphereLightPosition.x = (this.invert * (this.sphereLightPosition.x - pivot)) + pivot;
      }
    }
  }
}
