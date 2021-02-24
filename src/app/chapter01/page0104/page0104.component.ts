import { Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { MeshComponent } from './../../three/mesh/mesh.component';

@Component({
  selector: 'app-page0104',
  templateUrl: './page0104.component.html',
  styleUrls: ['./page0104.component.scss']
})
export class Page0104Component implements OnInit {

  @ViewChild('cube') cube: MeshComponent = null;
  @ViewChild('sphere') sphere: MeshComponent = null;

  constructor() { }

  ngOnInit(): void {
  }

  step : number = 0;
  onRender(timer : any) {
    const rotation = this.cube.getRotation();
    rotation.x += 0.02;
    rotation.y += 0.02;
    rotation.z += 0.02;
    // bounce the sphere up and down
    this.step += 0.04;
    const position = this.sphere.getPosition();
    position.x = 20 + ( 10 * (Math.cos(this.step)));
    position.y = 2 + ( 10 * Math.abs(Math.sin(this.step)));
  }

}
