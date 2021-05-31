import { Component, ContentChildren, ElementRef, Input, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { SVGLoader, SVGResult } from 'three/examples/jsm/loaders/SVGLoader';
import { ThreeUtil } from '../interface';
import { LocalStorageService } from '../local-storage.service';
import { MaterialComponent } from '../material/material.component';
import { AbstractObject3dComponent } from '../object3d.abstract';
import { TranslationComponent } from '../translation/translation.component';

export interface GeometriesVector3 {
  x: number;
  y: number;
  z?: number;
}

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
export class SvgComponent extends AbstractObject3dComponent {

  @Input() public type:string = 'mesh';
  @Input() public geometryType:string = 'shape';
  @Input() private castShadow:boolean = true;
  @Input() private receiveShadow:boolean = false;
  @Input() public name:string = null;
  @Input() private url:string = null;
  @Input() private path:string = null;
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
  @Input() private translation : TranslationComponent = null;
  @Input() private text:string = null;
  @Input() private textAlign:string = null;
  @Input() private align:string = null;
  @Input() private center:boolean = false;
  @Input() private computeVertexNormals:boolean = false;
  @Input() private font:string = null;
  @Input() private size:number = null;
  @Input() private weight:string = null;

  @Input() private color:string | number = null;
  @Input() private opacity:number = null;
  @Input() private transparent:boolean = null;
  @Input() private wireframe:boolean = null;
  @Input() private shininess:number = null;
  @Input() private stroke:number = null;
  
  @Input() private extrudePath:GeometriesVector3[] = null;
  @Input() private extrudePathType:string = null;
  @Input() private curvePath:GeometriesVector3[] = null;
  @Input() private curvePathType:string = null;
  @Input() private curveType:string = null;
  @Input() private tension:number = null;

  @Input() private uVGenerator:string = null;

  @ContentChildren(MaterialComponent,{descendants: false}) private materialList: QueryList<MaterialComponent>;
  @ContentChildren(TranslationComponent, { descendants: false }) private translationList: QueryList<TranslationComponent>;

  meshPositions: THREE.Vector3[] = [];
  meshRotations: THREE.Euler[] = [];
  meshScales: THREE.Vector3[] = [];
  meshTranslations: THREE.BufferGeometry[] = [];
  meshMaterials: THREE.Material[] = [];

  constructor(private ele: ElementRef, private localStorageService: LocalStorageService) {
    super();
  }

  private getCurveSegments(def?: number): number {
    return ThreeUtil.getTypeSafe(this.curveSegments,def);
  }

  private getDepth(def?: number): number {
    return ThreeUtil.getTypeSafe(this.depth,def);
  }

  private getSteps(def?: number): number {
    return ThreeUtil.getTypeSafe(this.steps,def);
  }

  private getBevelEnabled(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.bevelEnabled,def);
  }

  private getBevelThickness(def?: number): number {
    return ThreeUtil.getTypeSafe(this.bevelThickness,def);
  }

  private getBevelSize(def?: number): number {
    return ThreeUtil.getTypeSafe(this.bevelSize,def);
  }

  private getBevelOffset(def?: number): number {
    return ThreeUtil.getTypeSafe(this.bevelOffset,def);
  }

  private getBevelSegments(def?: number): number {
    return ThreeUtil.getTypeSafe(this.bevelSegments,def);
  }

  private getIsCCW(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.isCCW,def);
  }

  private getNoHoles(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.noHoles,def);
  }

  private getText(def?: string): string {
    return ThreeUtil.getTypeSafe(this.text , def);
  }

  private getTextAlign(def?: string): string {
    return ThreeUtil.getTypeSafe(this.textAlign , this.align, def);
  }

  private getFont(def?: string, callBack?: (font: THREE.Font) => void) {
    const font = ThreeUtil.getTypeSafe(this.font,def,'helvetiker');
    const weight = ThreeUtil.getTypeSafe(this.weight,'');
    this.localStorageService.getFont(callBack, font, weight);
  }

  private getSize(def?: number): number {
    return ThreeUtil.getTypeSafe(this.size, def);
  }

  private getClosed(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.closed, def);
  }

  private getShininess(def?: number): number {
    return ThreeUtil.getTypeSafe(this.shininess, def);
  }

  private getColor(def?: string | number): THREE.Color {
    return ThreeUtil.getColorSafe(this.color, def);
  }

  private getOpacity(def?: number): number {
    return ThreeUtil.getTypeSafe(this.opacity, def);
  }

  private getTransparent(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.transparent, def);
  }

  private getWireframe(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.wireframe, def);
  }

  private getExtrudePath(): THREE.Curve<THREE.Vector3> {
    if (ThreeUtil.isNotNull(this.extrudePath) || ThreeUtil.isNotNull(this.curvePath)) {
      const vectors : THREE.Vector3[] = [];
      if (ThreeUtil.isNotNull(this.extrudePath)) {
        this.extrudePath.forEach(p => {
          vectors.push(new THREE.Vector3( p.x, p.y, p.z));
        })
      }
      if (ThreeUtil.isNotNull(this.curvePath)) {
        this.curvePath.forEach(p => {
          vectors.push(new THREE.Vector3( p.x, p.y, p.z));
        })
      }
      switch(ThreeUtil.getTypeSafe(this.extrudePathType,this.curvePathType,'catmullromcurve3').toLowerCase()) {
        case 'catmullromcurve3' :
        default :
          return new THREE.CatmullRomCurve3(
            vectors , 
            this.getClosed(false), 
            ThreeUtil.getTypeSafe(this.curveType, 'catmullrom'),
            ThreeUtil.getTypeSafe(this.tension, 0.5)
          );
      }
    }
    return undefined;
  }

  private getUVGenerator(def? : string): THREE.UVGenerator {
    const uVGenerator = ThreeUtil.getTypeSafe(this.uVGenerator, def, '');
    switch(uVGenerator.toLowerCase()) {
      case 'world' :
        // return THREE.WorldUVGenerator;
        break;
    }
    return undefined;
  }

  private getMaterials():THREE.Material[] {
    const materials: THREE.Material[] = [];
    if (this.materialList !== null && this.materialList.length > 0) {
      this.materialList.forEach(material => {
        materials.push(material.getMaterial())
      });
    }
    if (materials.length === 0) {
      switch(this.type.toLowerCase()) {
        case 'sprite' :
          materials.push(new THREE.SpriteMaterial({
            color: this.getColor(),
            opacity : this.getOpacity(),
            transparent : this.getTransparent(),
						side: THREE.DoubleSide
          }));
        case 'points' :
          materials.push(new THREE.PointsMaterial({
            color: this.getColor(),
            opacity : this.getOpacity(),
            transparent : this.getTransparent(),
						side: THREE.DoubleSide
          }));
          break;
        case 'line' :
          materials.push(new THREE.MeshBasicMaterial( {
            color: this.getColor(),
            opacity : this.getOpacity(),
						side: THREE.DoubleSide
					}));
          break;
        default :
          materials.push(new THREE.MeshPhongMaterial({
            color: this.getColor(0x333333), 
            shininess: this.getShininess(100),
            opacity : this.getOpacity(),
            transparent : this.getTransparent(),
            wireframe : this.getWireframe()
          }));
      }
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
    super.ngOnChanges(changes);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  ngAfterContentInit(): void {
    this.subscribeListQuery(this.materialList, 'materialList', 'material');
    this.subscribeListQuery(this.translationList, 'translationList', 'translation');
    super.ngAfterContentInit();
  }

  synkObject3D(synkTypes: string[]) {
    if (this.meshes !== null) {
      synkTypes.forEach((synkType) => {
        switch (synkType) {
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
    super.synkObject3D(synkTypes);
  }

  private meshes : THREE.Object3D[] = null;

  setParent(parent: THREE.Object3D, isRestore: boolean = false) : boolean {
    if (super.setParent(parent, isRestore)) {
      this.meshes = null;
      this.resetMeshes();
      return true;
    } else {
      return false;
    }
  }

  private svgMesh : THREE.Group = null;

  resetMeshes() {
    if (this.parent !== null && this.svgMesh === null) {
      this.svgMesh = new THREE.Group();
      this.getPaths((result : SvgGeometry[]) => {
        this.meshes = [];
        this.meshPositions = [];
        this.meshRotations = [];
        this.meshScales = [];
        this.meshTranslations = [];
        this.meshMaterials = [];

        const materials = this.getMaterials();
        const materialList : THREE.Material[] = [];
        for(let i = 0 ; i < result.length; i++) {
          materialList.push(materials[i % materials.length]);
        }
        result.forEach((data, idx) => {
          const geometry = data.geometry;
          let mesh : THREE.Object3D = null;
          const meshMaterial : THREE.Material = materialList[idx];
          switch (this.type.toLowerCase()) {
            case 'points':
              mesh = new THREE.Points(geometry, meshMaterial);
              break;
            case 'line':
              const line = new THREE.Line(geometry, meshMaterial);
              line.computeLineDistances();
              line.castShadow = this.castShadow;
              mesh = line;
              break;
            default :
              mesh = new THREE.Mesh(geometry, meshMaterial);
              mesh.castShadow = this.castShadow;
            break;
          }
          this.meshPositions.push(mesh.position);
          this.meshRotations.push(mesh.rotation);
          this.meshScales.push(mesh.scale);
          this.meshTranslations.push(geometry);
          this.meshMaterials.push(meshMaterial);
          this.meshes.push(mesh);
          this.svgMesh.add(mesh);
        })
      });
      this.synkObject3D(['translation', 'position','rotation','scale','material']);
      this.setObject3D(this.svgMesh);
    }
  }

  applyTextAlign(geometry : THREE.BufferGeometry, boundingSphere : THREE.Sphere, def : string = 'left'): THREE.BufferGeometry {
    if (geometry !== null && boundingSphere !== null) {
      switch(this.getTextAlign(def)) {
        case 'left' :
          break;
        case 'center' :
          geometry.translate( - boundingSphere.radius, 0, 0 )
          break;
        case 'right' :
          geometry.translate( boundingSphere.radius * 2, 0, 0 )
          break;
      }
    }
    return geometry;
  }

  private getGeometries(data: SVGResult | THREE.Shape[], boundingSphere : THREE.Sphere) : SvgGeometry[] {
    const geometries: SvgGeometry[] = [];
    const shapes : {
      shape : THREE.Shape[] ,
      userData : any
    } [] = [];
    if (data instanceof Array) {
      shapes.push({
        shape : data,
        userData : null
      });
    } else if (data.paths) {
      data.paths.forEach(path => {
        shapes.push({
          shape : path.toShapes(this.getIsCCW(true), this.getNoHoles(false)),
          userData : path['userData'] ? path['userData'] : null
        })
      })
    }
    shapes.forEach(shape => {
      let geometry: THREE.BufferGeometry = null;
      switch (this.geometryType.toLowerCase()) {
        case 'extrudebuffer':
        case 'extrude':
          geometry = new THREE.ExtrudeGeometry(
            shape.shape,
            {
              curveSegments: this.getCurveSegments(),
              steps: this.getSteps(),
              depth: this.getDepth(),
              bevelEnabled: this.getBevelEnabled(),
              bevelThickness: this.getBevelThickness(),
              bevelSize: this.getBevelSize(),
              bevelOffset: this.getBevelOffset(),
              bevelSegments: this.getBevelSegments(),
              extrudePath: this.getExtrudePath(),
              UVGenerator: this.getUVGenerator()
            }
          );
          break;
        case 'custom':
        case 'geometry':
        case 'buffer':
            const holeShape : THREE.Path[] = [];
            const bufferShapes : THREE.Shape[] = [];
            shape.shape.forEach(sh => {
              bufferShapes.push(sh);
            })
            bufferShapes.forEach(sh => {
              if ( sh.holes && sh.holes.length > 0 ) {
                sh.holes.forEach(hole => {
                  holeShape.push(hole);
                });
              }
            });
            const sumShapes : THREE.Shape[] = shape.shape;
            sumShapes.push.apply( shape.shape, holeShape );
            if (ThreeUtil.isNotNull(this.stroke)) {
              const style = SVGLoader.getStrokeStyle( this.stroke, this.getColor(0x006699).getStyle() );
              sumShapes.forEach(shape => {
                const outlineGeometry = SVGLoader.pointsToStroke( shape.getPoints(), style );
                geometries.push({
                  geometry: this.applyTextAlign(outlineGeometry, boundingSphere),
                  style: null
                });
              });
            } else {
              sumShapes.forEach(shape => {
                let outlineGeometry = new THREE.BufferGeometry();
                outlineGeometry.setFromPoints(shape.getPoints());
                geometries.push({
                  geometry: this.applyTextAlign(outlineGeometry, boundingSphere),
                  style: null
                });
              })
            }
            break;
        case 'shapebuffer':
        case 'shape':
        default:
          geometry = new THREE.ShapeGeometry(
            shape.shape,
            this.getCurveSegments(12),
          );
          break;
      }
      if (geometry !== null) {
        geometries.push({
          geometry: this.applyTextAlign(geometry, boundingSphere),
          style: shape.userData
        });
      }
    });
    return geometries;
  }

  getPaths(onload : (geometry : SvgGeometry[]) => void){
    if (ThreeUtil.isNotNull(this.text) && this.text != '') {
      this.getFont('helvetiker', (font: THREE.Font) => {
        const shapes = font.generateShapes( this.getText('test'), this.getSize(100));
        const geometry = new THREE.ShapeGeometry(
          shapes,
          this.getCurveSegments(12),
        );
        geometry.computeBoundingSphere();
        onload(this.getGeometries(shapes, geometry.boundingSphere));
      });
    } else {
      this.getSVGResult((data : SVGResult) => {
        const shapes : THREE.Shape[] = [];
        data.paths.forEach(path => {
          path.toShapes(this.getIsCCW(true), this.getNoHoles(false)).forEach(shape => {
            shapes.push(shape);
          });
        })
        const geometry = new THREE.ShapeGeometry(
          shapes,
          this.getCurveSegments(12),
        );
        geometry.computeBoundingSphere();
        onload(this.getGeometries(data, null));
      });
    }
  }

  getSVGResult(onload : (data : SVGResult) => void){
    const loader = new SVGLoader();
    if (ThreeUtil.isNotNull(this.url)) {
      loader.load(this.url, (data: SVGResult) => {
        onload(data);
      })
    } else if (ThreeUtil.isNotNull(this.path) && this.path != '') {
      const svgContents : string[] = [];
      svgContents.push('<svg version="1.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="1152px" height="1152px" xml:space="preserve">');
      svgContents.push('<g>');
      svgContents.push('<path d="'+this.path+'"/>');
      svgContents.push('</g>');
      svgContents.push('</svg>');
      onload(loader.parse(svgContents.join('')));
    } else {
      const svgs = this.ele.nativeElement.getElementsByTagName('svg');
      if (svgs.length > 0) {
        onload(loader.parse(svgs[0].innerHTML.trim()));
      }
    }
  }

  getShapes(onload : (data : THREE.Shape[]) => void){
    this.getSVGResult((data : SVGResult) => {
      if (data.paths.length > 0) {
        const shapes : THREE.Shape[] = [];
        data.paths.forEach(path => {
          path.toShapes(this.getIsCCW(true), this.getNoHoles(false)).forEach(shape => {
            shapes.push(shape);
          });
        });
        onload(shapes);
      }
    });
  }

}
