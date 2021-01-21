import { Component, ContentChild, ContentChildren, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { CSG } from 'three-csg-ts';
import { Lensflare } from 'three/examples/jsm/objects/Lensflare';
import { SceneUtils } from 'three/examples/jsm/utils/SceneUtils';
import { GeometryComponent } from '../geometry/geometry.component';
import { LensflareelementComponent } from '../lensflareelement/lensflareelement.component';
import { MaterialComponent } from '../material/material.component';
import { PositionComponent } from '../position/position.component';
import { RotationComponent } from '../rotation/rotation.component';
import { ScaleComponent } from '../scale/scale.component';
import { SvgComponent } from '../svg/svg.component';

@Component({
  selector: 'three-mesh',
  templateUrl: './mesh.component.html',
  styleUrls: ['./mesh.component.scss']
})
export class MeshComponent implements OnInit {

  @Input() type: string = "mesh";
  @Input() typeCsg: 'subtract' | 'intersect' | 'union' | 'none' = "none";
  @Input() scaleStep: number = 1;
  @Input() visible: boolean = true;
  @Input() castShadow: boolean = true;
  @Input() receiveShadow: boolean = false;
  @Input() name: string = null;

  @ContentChild(GeometryComponent, { descendants: false }) geometry: GeometryComponent = null;
  @ContentChildren(MaterialComponent, { descendants: false }) materials: QueryList<MaterialComponent>;
  @ContentChildren(MeshComponent, { descendants: false }) meshes: QueryList<MeshComponent>;
  @ContentChildren(LensflareelementComponent, { descendants: false }) lensflareElements: QueryList<LensflareelementComponent>;
  @ContentChild(PositionComponent, { descendants: false }) position: PositionComponent = null;
  @ContentChild(RotationComponent, { descendants: false }) rotation: RotationComponent = null;
  @ContentChild(ScaleComponent, { descendants: false }) scale: ScaleComponent = null;
  @ContentChild(SvgComponent, { descendants: false }) svg: SvgComponent = null;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterContentInit(): void {
    this.meshes.changes.subscribe((e) => {
      if (this.mesh !== null) {
        this.meshes.forEach(mesh => {
          mesh.setObject3D(this.mesh);
        })
      }
    });
  }

  ngOnDestroy(): void {
    if (this.mesh != null && this.refObject3d != null) {
      this.refObject3d.remove(this.mesh)
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (this.refObject3d !== null && this.mesh !== null) {
        this.refObject3d.remove(this.mesh);
      }
      if (this.mesh && changes.visible) {
        this.mesh.visible = this.visible;
      }
      this.resetMesh();
      if (this._onChange !== null) {
        this._onChange.onChange();
      }
    }
  }

  private mesh: THREE.Mesh | THREE.Group | THREE.Line  | THREE.Object3D = null;

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

  private getMaterials(): THREE.Material[] {
    const materials: THREE.Material[] = [];
    if (this.materials !== null && this.materials.length > 0) {
      this.materials.forEach(material => {
        materials.push(material.getMaterial())
      });
    }
    if (materials.length == 0) {
      materials.push(new THREE.MeshBasicMaterial());
    }
    return materials;
  }

  private _onChange: {
    onChange(): void;
  } = null;

  setOnChange(onChange: { onChange(): void }) {
    this._onChange = onChange;
  }
 
  onChange(): void {
    if (this.mesh !== null) {
      if (this.refObject3d !== null && this.mesh !== null) {
        this.refObject3d.remove(this.mesh);
      }
      this.mesh = null;
      this.resetMesh();
    }
  }

  private refObject3d: THREE.Object3D = null;

  setObject3D(refObject3d: THREE.Object3D) {
    if (this.refObject3d !== refObject3d) {
      this.refObject3d = refObject3d;
      this.resetMesh();
    }
  }

  resetMesh(clearMesh = false) {
    if (this.refObject3d !== null) {
      if (clearMesh && this.mesh !== null) {
        this.refObject3d.remove(this.mesh);
        this.mesh = null;
      }
      this.refObject3d.add(this.getMesh());
    }
  }

  getObject3D(): THREE.Object3D {
    return this.getMesh();
  }

  getMesh(): THREE.Mesh | THREE.Group | THREE.Line | THREE.Object3D{
    if (this.mesh === null) {
      let geometry: THREE.Geometry | THREE.BufferGeometry = null;
      if (this.geometry != null && this.geometry != undefined) {
        geometry = this.geometry.getGeometry();
      }
      switch (this.type.toLowerCase()) {
        case 'lensflare':
          const lensflare = new Lensflare();
          this.lensflareElements.forEach(lensflareElement => {
            lensflareElement.setLensflare(lensflare);
          });
          this.mesh = lensflare;
          break;
        case 'multi':
        case 'multimaterial':
          this.mesh = SceneUtils.createMultiMaterialObject(geometry as THREE.Geometry, this.getMaterials());
          this.mesh.children.forEach(function (e) {
            e.castShadow = true
          });
          if (this.scaleStep != 1) {
            let scaleStep = this.scaleStep;
            this.mesh.children.forEach((mesh) => {
              mesh.scale.x *= scaleStep;
              mesh.scale.y *= scaleStep;
              mesh.scale.z *= scaleStep;
              scaleStep *= this.scaleStep;
            });
          }
          break;
        case 'sprite' :
          this.mesh = new THREE.Sprite(this.getMaterials()[0] as THREE.SpriteMaterial);
          break;
        case 'points' :
          this.mesh = new THREE.Points(geometry, this.getMaterials()[0]);
          break;
        case 'line':
          const mesh = new THREE.Line(geometry, this.getMaterials()[0]);
          mesh.computeLineDistances();
          this.mesh = mesh;
          break;
        case 'mesh':
        default:
          const materials = this.getMaterials();
          if (geometry !== null) {
            if (materials.length > 1) {
              this.mesh = new THREE.Mesh(geometry , materials);
            } else if (materials.length == 1) {
              this.mesh = new THREE.Mesh(geometry , materials[0]);
            } else {
              this.mesh = new THREE.Mesh(geometry);
            }
          } else {
            this.mesh = new THREE.Mesh();
          }
          this.mesh.castShadow = this.castShadow;
          break;
      }
      if (this.meshes && this.meshes.length > 0) {
        const meshBSP: MeshComponent[] = [];
        this.meshes.forEach(mesh => {
          switch (mesh.typeCsg.toLowerCase()) {
            case 'subtract':
            case 'intersect':
            case 'union':
              mesh.setOnChange(this);
              meshBSP.push(mesh);
              break;
            default:
              mesh.setObject3D(this.mesh);
              break;
          }
        })
        if (this.mesh instanceof THREE.Mesh) {
          if (meshBSP.length > 0) {
            this.mesh.updateMatrix();
            let sourceCsg: CSG = CSG.fromMesh(this.mesh);
            if (sourceCsg['polygons'].length == 0) {
              sourceCsg = null;
            }
            const matrix: THREE.Matrix4 = this.mesh.matrix;
            meshBSP.forEach(mesh => {
              const meshIns = mesh.getMesh();
              if (meshIns instanceof THREE.Mesh) {
                meshIns.updateMatrix();
                const targetBsp: CSG = CSG.fromMesh(meshIns);
                if (sourceCsg != null) {
                  switch (mesh.typeCsg) {
                    case 'subtract':
                      sourceCsg = sourceCsg.subtract(targetBsp);
                      break;
                    case 'intersect':
                      sourceCsg = sourceCsg.intersect(targetBsp);
                      break;
                    case 'union':
                      sourceCsg = sourceCsg.union(targetBsp);
                      break;
                  }
                } else {
                  sourceCsg = targetBsp;
                }
              }
            });
            if (sourceCsg != null) {
              const mesh = CSG.toMesh(sourceCsg, matrix);
              const materials = this.getMaterials();
              if (materials.length > 0) {
                if (mesh.material instanceof Array) {
                  mesh.material.forEach(material => {
                    material.copy(materials[0]);
                  })
                } else {
                  mesh.material = materials[0];
                }
              }
              this.mesh = mesh;
            }
          }
        }
      }
      if (this.name !== null) {
        this.mesh.name = this.name;
      }
      this.mesh.receiveShadow = this.receiveShadow;
      if (this.position !== null && this.position != undefined) {
        this.position.setPosition(this.mesh.position);
      }
      if (this.rotation !== null && this.rotation != undefined) {
        this.rotation.setRotation(this.mesh.rotation);
      }
      if (this.scale !== null && this.scale != undefined) {
        this.scale.setScale(this.mesh.scale);
      }
      this.mesh.visible = this.visible;
      if (this.svg !== null && this.svg !== undefined) {
        this.svg.setObject3D(this.mesh);
      }
      if (this.mesh instanceof THREE.Mesh || this.mesh instanceof THREE.Points) {
        const mesh = this.mesh;
        if (this.mesh instanceof THREE.Mesh) {
          mesh.castShadow = this.castShadow;
        }
        if (geometry !== null) {
          this.geometry.setMesh(mesh);
          console.log(this.geometry);
        }
        if (mesh.material instanceof Array) {
          this.materials.forEach((material, idx) => {
            if (mesh.material[idx])
              material.setMaterial(mesh.material[idx])
          });
        } else if (this.materials.length == 1) {
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
    return this.mesh;
  }
}
