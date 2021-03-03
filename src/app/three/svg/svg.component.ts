import { Component, ContentChildren, ElementRef, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import * as THREE from 'three';
import { SVGLoader, SVGResult } from 'three/examples/jsm/loaders/SVGLoader';
import { InterfaceSvgGeometry } from '../interface';
import { MaterialComponent } from '../material/material.component';
import { PositionComponent } from '../position/position.component';
import { RotationComponent } from '../rotation/rotation.component';
import { ScaleComponent } from '../scale/scale.component';
import { TranslationComponent } from '../translation/translation.component';

export interface SvgGeometry {
  geometry: THREE.BufferGeometry
  style?: {
    fill?: string
    fillOpacity?: number
    strokeLineCap?: string
    strokeLineJoin?: string
    strokeMiterLimit?: number
    strokeOpacity?: number
    strokeWidth?: number
  }
}

@Component({
  selector: 'three-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss']
})
export class SvgComponent implements OnInit, InterfaceSvgGeometry {


  @Input() public type:string = 'shape';
  @Input() private visible:boolean = true;
  @Input() private castShadow:boolean = true;
  @Input() private receiveShadow:boolean = false;
  @Input() public name:string = null;
  @Input() private url:string = null;
  @Input() private curveSegments:number = null;
  @Input() private depth:number = null;
  @Input() private steps:number = null;
  @Input() private bevelEnabled:boolean = null;
  @Input() private bevelThickness:number = null;
  @Input() private bevelSize:number = null;
  @Input() private bevelOffset:number = null;
  @Input() private bevelSegments:number = null;
  @Input() private closed:boolean = null;
  @Input() private isCCW:boolean = null;
  @Input() private noHoles:boolean = null;

  @Input() private material : MaterialComponent = null;
  @Input() private position : PositionComponent = null;
  @Input() private rotation : RotationComponent = null;
  @Input() private scale : ScaleComponent = null;
  @Input() private translation : TranslationComponent = null;

  @ContentChildren(MaterialComponent,{descendants: false}) private materialList: QueryList<MaterialComponent>;
  @ContentChildren(PositionComponent, { descendants: false }) private positionList: QueryList<PositionComponent>;
  @ContentChildren(RotationComponent, { descendants: false }) private rotationList: QueryList<RotationComponent>;
  @ContentChildren(ScaleComponent, { descendants: false }) private scaleList: QueryList<ScaleComponent>;
  @ContentChildren(TranslationComponent, { descendants: false }) private translationList: QueryList<TranslationComponent>;

  meshPositions: THREE.Vector3[] = [];
  meshRotations: THREE.Euler[] = [];
  meshScales: THREE.Vector3[] = [];
  meshTranslations: THREE.BufferGeometry[] = [];
  meshMaterials: THREE.Material[] = [];

  constructor(private ele: ElementRef) {
  }

  private getCurveSegments(def: number): number {
    return this.curveSegments === null ? def : this.curveSegments;
  }

  private getDepth(def: number): number {
    return this.depth === null ? def : this.depth;
  }

  private getSteps(def: number): number {
    return this.steps === null ? def : this.steps;
  }

  private getBevelEnabled(def: boolean): boolean {
    return this.bevelEnabled === null ? def : this.bevelEnabled;
  }

  private getBevelThickness(def: number): number {
    return this.bevelThickness === null ? def : this.bevelThickness;
  }

  private getBevelSize(def: number): number {
    return this.bevelSize === null ? def : this.bevelSize;
  }

  private getBevelOffset(def: number): number {
    return this.bevelOffset === null ? def : this.bevelOffset;
  }

  private getBevelSegments(def: number): number {
    return this.bevelSegments === null ? def : this.bevelSegments;
  }

  private getIsCCW(def: boolean): boolean {
    return this.isCCW === null ? def : this.isCCW;
  }

  private getNoHoles(def: boolean): boolean {
    return this.noHoles === null ? def : this.noHoles;
  }

  private getMaterials():THREE.Material[] {
    const materials: THREE.Material[] = [];
    if (this.materialList !== null && this.materialList.length > 0) {
      this.materialList.forEach(material => {
        materials.push(material.getMaterial())
      });
    }
    return materials;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (this.parent !== null && this.meshes !== null ) {
        this.meshes.forEach(mesh => {
          this.parent.remove(mesh);
        })
      }
      this.meshes = null;
    }
    this.resetMeshes();
  }

  ngOnDestroy() {
    this._materialSubscribe = this.unSubscription(this._materialSubscribe);
    this._positionSubscribe = this.unSubscription(this._positionSubscribe);
    this._rotationSubscribe = this.unSubscription(this._rotationSubscribe);
    this._scaleSubscribe = this.unSubscription(this._scaleSubscribe);
    this._translationSubscribe = this.unSubscription(this._translationSubscribe);
  }

  ngAfterContentInit(): void {
    
    if (this.materialList !== null && this.materialList !== undefined) {
      this.setMaterialSubscribe();
      this.materialList.changes.subscribe((e) => {
        this.setMaterialSubscribe();
      });
		}
		if (this.positionList !== null && this.positionList !== undefined) {
      this.setPositionSubscribe();
      this.positionList.changes.subscribe((e) => {
        this.setPositionSubscribe();
      });
		}
		if (this.rotationList !== null && this.rotationList !== undefined) {
      this.setRotationSubscribe();
      this.rotationList.changes.subscribe((e) => {
        this.setRotationSubscribe();
      });
		}
		if (this.scaleList !== null && this.scaleList !== undefined) {
      this.setScaleSubscribe();
      this.scaleList.changes.subscribe((e) => {
        this.setScaleSubscribe();
      });
		}
    if (this.translationList !== null && this.translationList !== undefined) {
      this.setTranslationSubscribe();
      this.translationList.changes.subscribe((e) => {
        this.setTranslationSubscribe();
      });
		}
  }

  private _materialSubscribe: Subscription[] = [];
  private _positionSubscribe: Subscription[] = [];
  private _rotationSubscribe: Subscription[] = [];
  private _scaleSubscribe: Subscription[] = [];
  private _translationSubscribe: Subscription[] = [];

  unSubscription(subscriptions : Subscription[]) : Subscription[] {
    if (subscriptions !== null && subscriptions.length > 0) {
      subscriptions.forEach(subscription => {
        subscription.unsubscribe();
      })
    }
    return [];
  }

  setMaterialSubscribe() {
		if (this.materialList !== null && this.materialList !== undefined) {
      this._materialSubscribe = this.unSubscription(this._materialSubscribe);
      if (this.material !== null) {
        this._materialSubscribe.push(this.material.materialSubscribe().subscribe((mat) => {
          this.meshMaterials.forEach(material => {
            material.copy(mat);
          });
        }));
      }
      this.materialList.forEach((material, idx) => {
        this._materialSubscribe.push(material.materialSubscribe().subscribe((mat) => {
          if (this.meshMaterials && this.meshMaterials.length > idx) {
            this.meshMaterials[idx].copy(mat);
          };
        }));
      });
    }
  }

  setPositionSubscribe() {
		if (this.positionList !== null && this.positionList !== undefined) {
      this._positionSubscribe = this.unSubscription(this._positionSubscribe);
      if (this.position !== null) {
        this._positionSubscribe.push(this.position.positionSubscribe().subscribe((pos) => {
          this.meshPositions.forEach(position => {
            position.copy(pos);
          });
        }));
      }
      this.positionList.forEach(position => {
        this._positionSubscribe.push(position.positionSubscribe().subscribe((pos) => {
          this.meshPositions.forEach(position => {
            position.copy(pos);
          });
        }));
      });
    }
  }

  setRotationSubscribe() {
		if (this.rotationList !== null && this.rotationList !== undefined) {
      this._rotationSubscribe = this.unSubscription(this._rotationSubscribe);
      if (this.rotation !== null) {
        this._rotationSubscribe.push(this.rotation.rotationSubscribe().subscribe((rot) => {
          this.meshRotations.forEach(rotation => {
            rotation.copy(rot);
          });
        }));
      }
      this.rotationList.forEach(rotation => {
        this._rotationSubscribe.push(rotation.rotationSubscribe().subscribe((rot) => {
          this.meshRotations.forEach(rotation => {
            rotation.copy(rot);
          });
        }));
      });
    }
  }

  setScaleSubscribe() {
		if (this.scaleList !== null && this.scaleList !== undefined) {
      this._scaleSubscribe = this.unSubscription(this._scaleSubscribe);
      if (this.scale !== null) {
        this._scaleSubscribe.push(this.scale.scaleSubscribe().subscribe((sca) => {
          this.meshScales.forEach(scale => {
            scale.copy(sca);
          });
        }));
      }
      this.scaleList.forEach(scale => {
        this._scaleSubscribe.push(scale.scaleSubscribe().subscribe((sca) => {
          this.meshScales.forEach(scale => {
            scale.copy(sca);
          });
        }));
      });
    }
  }

  setTranslationSubscribe() {
		if (this.translationList !== null && this.translationList !== undefined) {
      this._translationSubscribe = this.unSubscription(this._translationSubscribe);
      if (this.translation !== null) {
        this._translationSubscribe.push(this.translation.translationSubscribe().subscribe((tra) => {
          this.meshTranslations.forEach(translation => {
            translation.applyMatrix4(tra);
          });
        }));
      }
      this.translationList.forEach(translation => {
        this._translationSubscribe.push(translation.translationSubscribe().subscribe((tra) => {
          this.meshTranslations.forEach(translation => {
            translation.applyMatrix4(tra);
          });
        }));
      });
    }
  }

  synkObject3D(synkTypes: string[]) {
    if (this.meshes !== null) {
      synkTypes.forEach((synkType) => {
        switch (synkType) {
					case 'position':
            if (this.position !== null && this.position.visible) {
              this.meshPositions.forEach(position => {
                position.copy(this.position.getPosition());
              });
            }
            if (this.positionList !== null && this.positionList !== undefined) {
              this.positionList.forEach((pos) => {
                if (pos.visible) {
                  this.meshPositions.forEach(position => {
                    position.copy(pos.getPosition());
                  });
                }
              });
            }
						break;
					case 'rotation':
            if (this.rotation !== null && this.rotation.visible) {
              this.meshRotations.forEach(rotation => {
                rotation.copy(this.rotation.getRotation());
              });
            }
            if (this.rotationList !== null && this.rotationList !== undefined) {
              this.rotationList.forEach((rot) => {
                if (rot.visible) {
                  this.meshRotations.forEach(rotation => {
                    rotation.copy(rot.getRotation());
                  });
                }
              });
            }
						break;
					case 'scale':
            if (this.scale !== null && this.scale.visible) {
              this.meshScales.forEach(scale => {
                scale.copy(this.scale.getScale());
              });
            }
            if (this.scaleList !== null && this.scaleList !== undefined) {
              this.scaleList.forEach((sca) => {
                if (sca.visible) {
                  this.meshScales.forEach(scale => {
                    scale.copy(sca.getScale());
                  });
                }
              });
            }
            break;
          case 'material':
            const mainMaterials = this.meshMaterials;
            if (this.material !== null && this.material.visible) {
              const materialClone = this.material.getMaterial();
              mainMaterials.forEach(material => {
                if (material !== materialClone) {
                  material.copy(materialClone);
                }
              })
            } else {
              this.materialList.forEach((material,idx) => {
                if (material.visible && mainMaterials.length > idx) {
                  const materialClone = material.getMaterial();
                  if (mainMaterials[idx] !== materialClone) {
                    mainMaterials[idx].copy(materialClone);
                  }
                }
              });
            }
            break;
          case 'translation':
            if (this.translation !== null) {
              this.meshTranslations.forEach(translation => {
                translation.applyMatrix4(this.translation.getTranslation());
              });
            } else {
              this.translationList.forEach((translation, idx) => {
                if (this.meshTranslations.length > idx) {
                  this.meshTranslations[idx].applyMatrix4(translation.getTranslation());
                } 
              });
            }
            break;

        }
      })
    }
  }

  private meshes : THREE.Mesh[] = null;
  private parent: THREE.Object3D = null;

  setParent(parent: THREE.Object3D) {
    if (this.parent !== parent) {
      this.parent = parent;
      this.meshes = null;
      this.resetMeshes();
    }
  }

  resetMeshes() {
    if (this.parent !== null && this.meshes === null) {
      this.getPaths((result : SvgGeometry[]) => {
        this.meshes = [];
        this.meshPositions = [];
        this.meshRotations = [];
        this.meshScales = [];
        this.meshTranslations = [];
        this.meshMaterials = [];
        const materials = this.getMaterials();
        result.forEach((data, idx) => {
          const geom = data.geometry;
          var meshMaterial = (materials.length > idx) ? materials[idx] : new THREE.MeshPhongMaterial({color: 0x333333, shininess: 100});
          var mesh = new THREE.Mesh(geom, meshMaterial);
          if (this.name !== null) {
            mesh.name = this.name;
          }
          mesh.receiveShadow = this.receiveShadow;
          this.meshPositions.push(mesh.position);
          this.meshRotations.push(mesh.rotation);
          this.meshScales.push(mesh.scale);
          this.meshTranslations.push(geom);
          this.meshMaterials.push(meshMaterial);
          this.meshes.push(mesh);
          this.parent.add(mesh);
        })
        this.synkObject3D(['translation', 'position','rotation','scale','material']);
      });
    }
  }

  private getGeometries(data: SVGResult) : SvgGeometry[] {
    const geometries: SvgGeometry[] = [];
    data.paths.forEach(path => {
      const shape = path.toShapes(this.getIsCCW(true), this.getNoHoles(false));
      let geometry: THREE.BufferGeometry = null;
      switch (this.type.toLowerCase()) {
        case 'extrudebuffer':
          geometry = new THREE.ExtrudeBufferGeometry(
            shape,
            {
              curveSegments: this.getCurveSegments(12),
              steps: this.getSteps(1),
              depth: this.getDepth(100),
              bevelEnabled: this.getBevelEnabled(true),
              bevelThickness: this.getBevelThickness(6),
              bevelSize: this.getBevelSize(0),
              bevelOffset: this.getBevelOffset(0),
              bevelSegments: this.getBevelSegments(3),
              // extrudePath: new THREE.Curve<THREE.Vector3>(),
              // UVGenerator: null // THREE.UVGenerator;
            }
          );
          break;
        case 'extrude':
          geometry = new THREE.ExtrudeGeometry(
            shape,
            {
              curveSegments: this.getCurveSegments(12),
              steps: this.getSteps(1),
              depth: this.getDepth(100),
              bevelEnabled: this.getBevelEnabled(true),
              bevelThickness: this.getBevelThickness(6),
              bevelSize: this.getBevelSize(0),
              bevelOffset: this.getBevelOffset(0),
              bevelSegments: this.getBevelSegments(3),
              // extrudePath: new THREE.Curve<THREE.Vector3>(),
              // UVGenerator: null // THREE.UVGenerator;
            }
          );
          break;
        case 'shapebuffer':
          geometry = new THREE.ShapeBufferGeometry(
            shape,
            this.getCurveSegments(12),
          );
          break;
        case 'shape':
        default:
          geometry = new THREE.ShapeGeometry(
            shape,
            this.getCurveSegments(12),
          );
          break;
      }
      geometries.push({
        geometry: geometry,
        style: path['userData'] ? path['userData'] : null
      });
    });
    return geometries;
  }

  getPaths(onload : (geometry : SvgGeometry[]) => void){
    const loader = new SVGLoader();
    if (this.url !== null) {
      loader.load(this.url, (data: SVGResult) => {
        onload(this.getGeometries(data));
      })
    } else {
      const svgs = this.ele.nativeElement.getElementsByTagName('svg');
      if (svgs.length > 0) {
        onload(this.getGeometries(loader.parse(svgs[0].innerHTML.trim())));
      }
    }
  }
}
