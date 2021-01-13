import { Component, ContentChild, ContentChildren, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { SceneUtils } from 'three/examples/jsm/utils/SceneUtils';
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

  @Input() type: string = "mesh";
  @Input() visible: boolean = true;
  @Input() castShadow: boolean = true;
  @Input() receiveShadow: boolean = false;
  @Input() name: string = null;

  @ContentChild(GeometryComponent) geometry: GeometryComponent = null;
  @ContentChildren(MaterialComponent) materials: QueryList<MaterialComponent>;
  @ContentChild(PositionComponent) position: PositionComponent = null;
  @ContentChild(RotationComponent) rotation: RotationComponent = null;
  @ContentChild(ScaleComponent) scale: ScaleComponent = null;

  constructor() { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if (this.mesh != null && this.refObject3d != null) {
      this.refObject3d.remove(this.mesh)
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.mesh && changes.visible) {
      this.mesh.visible = this.visible;
    }
  }

  private mesh: THREE.Mesh | THREE.Group = null;

  getPosition(): THREE.Vector3 {
    return this.getMesh().position;
  }

  getScale(): THREE.Vector3 {
    return this.getMesh().scale;
  }

  getRotation(): THREE.Euler {
    return this.getMesh().rotation;
  }

  getGeometry(): THREE.Geometry | THREE.BufferGeometry {
    return (this.getMesh() as THREE.Mesh).geometry;
  }

  private refObject3d: THREE.Object3D = null;

  setObject3D(refObject3d: THREE.Object3D) {
    if (this.refObject3d !== refObject3d) {
      this.refObject3d = refObject3d;
      this.refObject3d.add(this.getMesh());
    }
  }

  getMesh(): THREE.Mesh | THREE.Group {
    if (this.mesh === null) {
      if (this.geometry != null && this.geometry != undefined) {
        const materials: THREE.Material[] = [];
        this.materials.forEach(material => {
          materials.push(material.getMaterial())
        });
        switch (this.type.toLowerCase()) {
          case 'multi':
          case 'multimaterial':
            this.mesh = SceneUtils.createMultiMaterialObject(this.geometry.getGeometry() as THREE.Geometry , materials);
            this.mesh.children.forEach(function (e) {
              e.castShadow = true
            });
            break;
          case 'mesh':
          default:
            this.mesh = new THREE.Mesh(this.geometry.getGeometry(), materials.length > 1 ? materials : materials[0]);
            this.mesh.castShadow = this.castShadow;
            break;
        }
        if (this.name !== null) {
          this.mesh.name = this.name;
        }
        this.mesh.receiveShadow = this.receiveShadow;
        if (this.position !== null && this.position != undefined) {
          this.mesh.position.copy(this.position.getPosition())
          this.position.setPosition(this.mesh.position);
        }
        if (this.rotation !== null && this.rotation != undefined) {
          this.mesh.rotation.copy(this.rotation.getRotation())
          this.rotation.setRotation(this.mesh.rotation);
        }
        if (this.scale !== null && this.scale != undefined) {
          this.mesh.scale.copy(this.scale.getScale())
          this.scale.setScale(this.mesh.scale);
        }
        this.mesh.visible = this.visible;
        if (this.mesh instanceof THREE.Mesh) {
          const mesh = this.mesh;
          this.geometry.setMesh(mesh);
          if (mesh.material instanceof Array) {
            this.materials.forEach((material, idx) => {
              if (mesh.material[idx])
                material.setMaterial(mesh.material[idx])
            });
          } else if (this.materials.length == 0) {
            this.materials.first.setMaterial(mesh.material);
          }
        } else if (this.mesh instanceof THREE.Group) {
          const meshes = this.mesh.children as THREE.Mesh[];
          this.geometry.setMesh(meshes);
          meshes.forEach((mesh, idx) => {
            if (mesh.material instanceof Array) {
              this.materials[idx].setMaterial(mesh.material[idx])
            } else if (this.materials.length == 0) {
              this.materials[idx].setMaterial(mesh.material);
            }
          });
        }
      }
    }
    return this.mesh;
  }
}
