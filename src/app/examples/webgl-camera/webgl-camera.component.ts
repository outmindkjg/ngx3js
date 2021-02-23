import { MeshComponent } from './../../three/mesh/mesh.component';
import { RendererTimer } from './../../three/interface';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../three';
import * as THREE from 'three';

@Component({
  selector: 'app-webgl-camera',
  templateUrl: './webgl-camera.component.html',
  styleUrls: ['./webgl-camera.component.scss']
})
export class WebglCameraComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  vertices : number[] = [];
  ngOnInit() {
    this.vertices = [];
    for ( let i = 0; i < 10000; i ++ ) {
      this.vertices.push( THREE.MathUtils.randFloatSpread( 2000 ) ); // x
      this.vertices.push( THREE.MathUtils.randFloatSpread( 2000 ) ); // y
      this.vertices.push( THREE.MathUtils.randFloatSpread( 2000 ) ); // z
    }
  }

  public sphere1 : MeshComponent = null;

  setSphere1(sphere1 : MeshComponent) {
    this.sphere1 = sphere1;
  }

  public sphere2 : MeshComponent = null;

  setSphere2(sphere2 : MeshComponent) {
    this.sphere2 = sphere2;
  }

  public sphere3 : MeshComponent = null;

  setSphere3(sphere3 : MeshComponent) {
    this.sphere3 = sphere3;
  }

  public cameraRig : MeshComponent = null;

  setCameraRig(cameraRig : MeshComponent) {
    this.cameraRig = cameraRig;
  }

  onRender(timer: RendererTimer) {
    super.onRender(timer);
    const r = timer.elapsedTime * 0.5;
    if (this.sphere1 !== null) {
      this.sphere1.setPosition(
        700 * Math.cos( r ),
        700 * Math.sin( r ),
        700 * Math.sin( r )
      );
    }
    if (this.sphere2 !== null) {
      this.sphere2.setPosition(
        70 * Math.cos( 2 * r ),
        150,
        70 * Math.sin( r )
      )
    }
    if (this.cameraRig !== null && this.sphere1 !== null) {
      const sphere1Position = this.sphere1.getPosition();
      this.cameraRig.setLookat(sphere1Position.x, sphere1Position.y, sphere1Position.z);
    }
  }
}

