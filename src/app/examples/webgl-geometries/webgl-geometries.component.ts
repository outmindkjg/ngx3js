import { Component } from '@angular/core';
import { BaseComponent, RendererTimer } from '../../three';
import { RotationComponent } from '../../three/rotation/rotation.component';

@Component({
  selector: 'app-webgl-geometries',
  templateUrl: './webgl-geometries.component.html',
  styleUrls: ['./webgl-geometries.component.scss']
})
export class WebglGeometriesComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  points : {x : number, y : number}[] = [];
  ngOnInit() {
    for ( let i = 0; i < 50; i ++ ) {
      this.points.push( { x : Math.sin( i * 0.2 ) * Math.sin( i * 0.1 ) * 15 + 50, y : ( i - 5 ) * 2 });
    }
  }

  rotation : RotationComponent = null;

  setRotation(rotation : RotationComponent) {
    this.rotation = rotation;
  }

  onRender(timer : RendererTimer) {
    const elapsedTime = timer.elapsedTime / 10;
    if (this.camera !== null) {
      this.camera.setPosition(
        Math.cos( elapsedTime ) * 800,
        null,
        Math.sin( elapsedTime ) * 800
      )
      this.camera.setLookat(
        0,
        0, 
        0
      )
    }
    if (this.rotation !== null) {
      this.rotation.setRotation(
        elapsedTime * 120,
        elapsedTime * 90,
        null
      );
    }
  }
}
