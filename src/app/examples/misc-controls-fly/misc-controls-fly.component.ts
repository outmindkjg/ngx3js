import { Component } from '@angular/core';
import { Vector3 } from 'three';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls';
import { AbstractGeometryComponent, AbstractMaterialComponent, BaseComponent, ControlComponent, GeometryComponent, MaterialComponent, MeshComponent, RendererTimer, SharedComponent } from '../../three';

@Component({
  selector: 'app-misc-controls-fly',
  templateUrl: './misc-controls-fly.component.html',
  styleUrls: ['./misc-controls-fly.component.scss']
})
export class MiscControlsFlyComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  ngOnInit() {
    const r = 6371;
    const vertices1 = [];
    const vertices2 = [];
    for ( let i = 0; i < 250; i ++ ) {
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      const z = Math.random() * 2 - 1;
      vertices1.push( x * r, y * r, z * r );
    }
    for ( let i = 0; i < 1500; i ++ ) {
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      const z = Math.random() * 2 - 1;
      vertices2.push( x * r, y * r, z * r );
    }
    this.starVertices1 = vertices1;
    this.starVertices2 = vertices2;
    this.starMaterial = [];
    this.starMaterial.push({
      color : 0x555555,
      size : 2
    });
    this.starMaterial.push({
      color : 0x555555,
      size : 1
    });
    this.starMaterial.push({
      color : 0x333333,
      size : 2
    });
    this.starMaterial.push({
      color : 0x3a3a3a,
      size : 1
    });
    this.starMaterial.push({
      color : 0x1a1a1a,
      size : 2
    });
    this.starMaterial.push({
      color : 0x1a1a1a,
      size : 1
    });
  }

  starVertices1 : number[] = [];
  starVertices2 : number[] = [];
  starMaterial : {
    color : number;
    size : number
  }[] = [];

  setShared ( shared : SharedComponent) {
    const starsMaterials = shared.getMaterialComponents();
    const starsGeometry = shared.getGeometryComponents();
    setTimeout(() => {
      this.starInfos = [];
      for ( let i = 10; i < 30; i ++ ) {
        this.starInfos.push({
          geometry : starsGeometry[ i % 2 ],
          material : starsMaterials[ i % 6 ],
          x : Math.random() * 360,
          y : Math.random() * 360,
          z : Math.random() * 360,
          scale : i * 10
        })
      }
    }, 500);
  }

  starInfos : {
    x : number;
    y : number;
    z : number;
    scale : number;
    geometry : AbstractGeometryComponent;
    material : AbstractMaterialComponent;
  }[] = [];

  setMesh(mesh : MeshComponent) {
    super.setMesh(mesh);
    this.meshPlanet = this.meshObject3d.getObjectByName('meshPlanet');
    this.meshClouds = this.meshObject3d.getObjectByName('meshClouds');
    this.meshMoon = this.meshObject3d.getObjectByName('meshMoon');
  }

  meshPlanet : THREE.Object3D = null;
  meshClouds : THREE.Object3D = null;
  meshMoon : THREE.Object3D = null;
 
  setControl(control : ControlComponent) {
    this.flyControl = control.getControl();
  }

  flyControl : FlyControls = null;
  dMoonVec = new Vector3();
  radius = 6371;
  onRender(timer : RendererTimer) {
    super.onRender(timer);
    const delta = timer.delta;
    const rotationSpeed = 0.02;
    if (this.meshPlanet !== null && this.meshClouds !== null) {
      this.meshPlanet.rotation.y += rotationSpeed * delta;
      this.meshClouds.rotation.y += 1.25 * rotationSpeed * delta;
    }
    if (this.flyControl !== null && this.camera !== null && this.meshMoon !== null) {
      const camera = this.camera.getCamera();
      const dPlanet = camera.position.length();
      this.dMoonVec.subVectors( camera.position, this.meshMoon.position );
      const dMoon = this.dMoonVec.length();
      let d = 0;
      if ( dMoon < dPlanet ) {
        d = ( dMoon - this.radius * 0.23 * 1.01 );
      } else {
        d = ( dPlanet - this.radius * 1.01 );
      }
      this.flyControl.movementSpeed = 0.33 * d;
    }

  }
}
