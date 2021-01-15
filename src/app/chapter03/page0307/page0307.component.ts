import { Component, OnInit, ViewChild } from '@angular/core';
import { GeometriesVector3, GuiControlParam, MeshComponent, RendererTimer } from './../../three';

@Component({
  selector: 'app-page0307',
  templateUrl: './page0307.component.html',
  styleUrls: ['./page0307.component.scss']
})
export class Page0307Component implements OnInit {

  @ViewChild('cube') cube: MeshComponent = null;
  @ViewChild('sphere') sphere: MeshComponent = null;
  @ViewChild('plane') plane: MeshComponent = null;


  controls = {
    rotationSpeed : 60,
    bouncingSpeed : 3,
    ambientColor: '#1c1c1c',
    pointColor: '#ffffff',
    intensity : 0.1
  }

  controlsParams: GuiControlParam[] = [
    { name: 'ambientColor', type: 'color' },
    { name: 'pointColor', type: 'color' },
    { name: 'intensity', type: 'number', min: 0, max: 5 }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }
  
  spherePosition: GeometriesVector3 = { x: 0, y: 0, z: 0 }
  boxRotation: GeometriesVector3 = { x: 0, y: 0, z: 0 }

  step = 0;

  onRender(timer: RendererTimer) {
    this.boxRotation.x += this.controls.rotationSpeed * timer.delta;
    this.boxRotation.y += this.controls.rotationSpeed * timer.delta;
    this.boxRotation.z += this.controls.rotationSpeed * timer.delta;
    // bounce the sphere up and down
    this.step += this.controls.bouncingSpeed * timer.delta;
    this.spherePosition.x = 20 + (10 * (Math.cos(this.step)));
    this.spherePosition.y = 2 + (10 * Math.abs(Math.sin(this.step)));
  }
}
