import { Component, ContentChildren, ElementRef, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { SVGLoader, SVGResult } from 'three/examples/jsm/loaders/SVGLoader';
import { AbstractSvgGeometry } from '../interface';
import { MaterialComponent } from '../material/material.component';
import { PositionComponent } from '../position/position.component';
import { RotationComponent } from '../rotation/rotation.component';
import { ScaleComponent } from '../scale/scale.component';
import { TranslationComponent } from '../translation/translation.component';

export interface SvgGeometry {
  geometry: THREE.Geometry | THREE.BufferGeometry
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
export class SvgComponent extends AbstractSvgGeometry implements OnInit {


  @Input() type: string = 'shape';
  @Input() visible: boolean = true;
  @Input() castShadow: boolean = true;
  @Input() receiveShadow: boolean = false;
  @Input() name: string = null;
  @Input() url: string = null;
  @Input() curveSegments: number = null;
  @Input() depth: number = null;
  @Input() steps: number = null;
  @Input() bevelEnabled: boolean = null;
  @Input() bevelThickness: number = null;
  @Input() bevelSize: number = null;
  @Input() bevelOffset: number = null;
  @Input() bevelSegments: number = null;
  @Input() closed: boolean = null;
  @Input() isCCW: boolean = null;
  @Input() noHoles: boolean = null;

  @ContentChildren(MaterialComponent,{descendants: false}) materials: QueryList<MaterialComponent>;
  @ContentChildren(PositionComponent, { descendants: false }) position: QueryList<PositionComponent>;
  @ContentChildren(RotationComponent, { descendants: false }) rotation: QueryList<RotationComponent>;
  @ContentChildren(ScaleComponent, { descendants: false }) scale: QueryList<ScaleComponent>;
  @ContentChildren(TranslationComponent, { descendants: false }) translation: QueryList<TranslationComponent>;

  constructor(private ele: ElementRef) { 
    super();
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
    if (this.materials !== null && this.materials.length > 0) {
      this.materials.forEach(material => {
        materials.push(material.getMaterial())
      });
    }
    return materials;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (this.refObject3d !== null && this.meshes !== null ) {
        this.meshes.forEach(mesh => {
          this.refObject3d.remove(mesh);
        })
      }
      this.meshes = null;
    }
    this.resetMeshes();
  }

  ngAfterContentInit(): void {
    this.position.changes.subscribe(() => {
      this.resetMeshes();
    });
    this.rotation.changes.subscribe(() => {
      this.resetMeshes();
    });
    this.scale.changes.subscribe(() => {
      this.resetMeshes();
    });
  }

  synkObject3D(synkTypes: string[]) {
    if (this.meshes !== null) {
      synkTypes.forEach((synkType) => {
        switch (synkType) {
          case 'position':
            this.position.forEach((position) => {
              position.setObject3D(this);
            });
            break;
          case 'rotation':
            this.rotation.forEach((rotation) => {
              rotation.setObject3D(this);
            });
            break;
          case 'scale':
            this.scale.forEach((scale) => {
              scale.setObject3D(this);
            });
            break;
          case 'material':
            this.materials.forEach((material, seqn) => {
              material.setObject3D(this, seqn);
            });
            break;
            case 'translation':
              this.translation.forEach((translation, seqn) => {
                translation.setObject3D(this);
              });
              break;
              
        }
      })
    }
  }
 
  private meshes : THREE.Mesh[] = null;
  private refObject3d: THREE.Object3D = null;

  setObject3D(refObject3d: THREE.Object3D) {
    if (this.refObject3d !== refObject3d) {
      this.refObject3d = refObject3d;
      this.meshes = null;
      this.resetMeshes();
    }
  }
 
  resetMeshes() {
    if (this.refObject3d !== null && this.meshes === null) {
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
          this.refObject3d.add(mesh);
        })
        this.synkObject3D(['translation', 'position','rotation','scale','material']);
      });
    }
  }

  private getGeometries(data: SVGResult) : SvgGeometry[] {
    const geometries: SvgGeometry[] = [];
    data.paths.forEach(path => {
      const shape = path.toShapes(this.getIsCCW(true), this.getNoHoles(false));
      let geometry: THREE.Geometry | THREE.BufferGeometry = null;
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
