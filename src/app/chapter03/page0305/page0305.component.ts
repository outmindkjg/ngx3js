import { Component, OnInit, ViewChild } from '@angular/core';
import { GeometriesVector3, GuiControlParam, MeshComponent, RendererTimer } from './../../three';

@Component({
  selector: 'app-page0305',
  templateUrl: './page0305.component.html',
  styleUrls: ['./page0305.component.scss']
})
export class Page0305Component implements OnInit {

  @ViewChild('cube') cube: MeshComponent = null;
  @ViewChild('sphere') sphere: MeshComponent = null;
  @ViewChild('plane') plane: MeshComponent = null;


  controls = {
    rotationSpeed : 60,
    bouncingSpeed : 3,
    hemisphere : true,
    color : 0x00ff00,
    skyColor : 0x0000ff,
    intensity : 0.6
  }

  controlsParams: GuiControlParam[] = [
    { name: 'hemisphere', type: 'button'},
    { name: 'color', type: 'color' },
    { name: 'skyColor', type: 'color' },
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
