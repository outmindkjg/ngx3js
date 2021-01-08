import { Component, ContentChild, ContentChildren, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';

import * as THREE from 'three';
import { GeometryComponent } from '../geometry/geometry.component';
import { MaterialComponent } from '../material/material.component';
import { PositionComponent } from '../position/position.component';
import { RotationComponent } from '../rotation/rotation.component';
import { ScaleComponent } from '../scale/scale.component';

@Component({
  selector: 'three-mesh',
  templateUrl: './mesh.component.html',
  styleUrls: ['./mesh.component.scss']
})
export class MeshComponent implements OnInit {

  @ContentChild(GeometryComponent) geometry: GeometryComponent = null;
  @ContentChildren(MaterialComponent) materials: QueryList<MaterialComponent>;
  @ContentChild(PositionComponent) position: PositionComponent = null;
  @ContentChild(RotationComponent) rotation: RotationComponent = null;
  @ContentChild(ScaleComponent) scale: ScaleComponent = null;

  constructor() { }

  ngOnInit(): void {
    new THREE.Mesh()
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  private mesh : THREE.Mesh = null;

  getPosition() : THREE.Vector3{
    return this.getMesh().position;
  }

  getScale() : THREE.Vector3{
    return this.getMesh().scale;
  }

  getRotation() : THREE.Euler{
    return this.getMesh().rotation;
  }

  getGeometry() : THREE.Geometry | THREE.BufferGeometry{
    return this.getMesh().geometry;
  }

  getMesh() : THREE.Mesh {
    if (this.mesh === null) {
      if (this.geometry != null && this.geometry != undefined) {
        const materials: THREE.Material[] = [];
        this.materials.forEach(material => {
          materials.push(material.getMaterial())
        });
        this.mesh = new THREE.Mesh(this.geometry.getGeometry(), materials);
        this.mesh.castShadow = true;
        if (this.position !== null && this.position != undefined) {
          this.mesh.position.copy(this.position.getPosition())
        }
        if (this.rotation !== null && this.rotation != undefined) {
          this.mesh.rotation.copy(this.rotation.getRotation())
        }
        if (this.scale !== null && this.scale != undefined) {
          this.mesh.scale.copy(this.scale.getScale())
        }
      }
    }
    return this.mesh;
  }
}
