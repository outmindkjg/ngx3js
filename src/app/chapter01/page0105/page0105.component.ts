import { Component, OnInit, ViewChild } from '@angular/core';
import { MeshComponent } from 'src/app/three/mesh/mesh.component';

@Component({
  selector: 'app-page0105',
  templateUrl: './page0105.component.html',
  styleUrls: ['./page0105.component.scss']
})
export class Page0105Component implements OnInit {

  @ViewChild('cube') cube: MeshComponent = null;
  @ViewChild('sphere') sphere: MeshComponent = null;
 
  controls = {
    rotationSpeed : 0.02,
    bouncingSpeed : 0.03
  }

  controlsParams = [
    { name : 'rotationSpeed', type : 'number', min : 0, max : 0.5},
    { name : 'bouncingSpeed', type : 'number', min : 0, max : 0.5}
  ]

  constructor() { }

  ngOnInit(): void {
  }

  step : number = 0;
  onRender(timer : any) {
    const rotation = this.cube.getRotation();
    rotation.x += this.controls.rotationSpeed;
    rotation.y += this.controls.rotationSpeed;
    rotation.z += this.controls.rotationSpeed;
    // bounce the sphere up and down
    this.step += this.controls.bouncingSpeed;
    const position = this.sphere.getPosition();
    position.x = 20 + ( 10 * (Math.cos(this.step)));
    position.y = 2 + ( 10 * Math.abs(Math.sin(this.step)));
  }

 

}
