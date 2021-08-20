import { Component } from '@angular/core';
import { BaseComponent, CurveUtils, MeshComponent, RendererTimer } from '../../three';
import * as THREE from 'three';
import { Object3D } from 'three';

@Component({
  selector: 'app-webxr-vr-rollercoaster',
  templateUrl: './webxr-vr-rollercoaster.component.html',
  styleUrls: ['./webxr-vr-rollercoaster.component.scss']
})
export class WebxrVrRollercoasterComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  curve : THREE.Curve<THREE.Vector3> = null;
  ngOnInit() {
    this.curve = CurveUtils.getCurve('rollercoaster');
  }

  initGeometry(geometry : THREE.BufferGeometry) {
    geometry.rotateX( - Math.PI / 2 );
    const positions = geometry.attributes.position.array;
    const vertex = new THREE.Vector3();
    const scenePosition = new THREE.Vector3();
    for ( let i = 0; i < positions.length; i += 3 ) {
      vertex.fromArray( positions, i );
      vertex.x += Math.random() * 10 - 5;
      vertex.z += Math.random() * 10 - 5;
      const distance = ( vertex.distanceTo( scenePosition ) / 5 ) - 25;
      vertex.y = Math.random() * Math.max( 0, distance );
      vertex.toArray( positions, i );
    }
    geometry.computeVertexNormals();
  }

  setFunfairs(mesh : MeshComponent) {
    this.funfairs = mesh.getMesh().children;
  }

  funfairs : Object3D[] = [];

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    const time = timer.elapsedTime * 1000;
    this.funfairs.forEach(funfair => {
      funfair.rotation.y = time * 0.0004;
    })

  }
}
