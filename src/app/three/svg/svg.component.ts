import { Component, ContentChildren, ElementRef, forwardRef, Input, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { SVGLoader, SVGResult } from 'three/examples/jsm/loaders/SVGLoader';
import { ThreeUtil, ThreeVector } from '../interface';
import { LocalStorageService } from '../local-storage.service';
import { AbstractMaterialComponent } from '../material.abstract';
import { AbstractObject3dComponent } from '../object3d.abstract';
import { TranslationComponent } from '../translation/translation.component';

/**
 * Svg geometry
 */
export interface SvgGeometry {
  geometry: THREE.BufferGeometry;
  style?: {
    fill?: string;
    fillOpacity?: number;
    strokeLineCap?: string;
    strokeLineJoin?: string;
    strokeMiterLimit?: number;
    strokeOpacity?: number;
    strokeWidth?: number;
  };
}

/**
 * SvgComponent
 */
@Component({
  selector: 'ngx3js-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss'],
  providers: [{ provide: AbstractObject3dComponent, useExisting: forwardRef(() => SvgComponent) }],
})
export class SvgComponent extends AbstractObject3dComponent {
  /**
   * Input  of svg component
   *
   * Notice - case insensitive.
   * 
   */
  @Input() public type: string = 'mesh';

  /**
   * Input  of svg component
   *
   * Notice - case insensitive.
   * 
   */
  @Input() public geometryType: string = 'shape';

  /**
   * The name of the object (doesn't need to be unique). Default is an empty string.
   */
  @Input() public name: string = null;

  /**
   * Input  of svg component
   */
  @Input() private url: string = null;

  /**
   * Input  of svg component
   *
   * Notice - case insensitive.
   * 
   */
  @Input() private path: string = null;

  /**
   * Input  of svg component
   */
  @Input() private curveSegments: number = null;

  /**
   * Input  of svg component
   */
  @Input() private depth: number = null;

  /**
   * Input  of svg component
   */
  @Input() private steps: number = null;

  /**
   * Input  of svg component
   */
  @Input() private bevelEnabled: boolean = null;

  /**
   * Input  of svg component
   */
  @Input() private bevelThickness: number = null;

  /**
   * Input  of svg component
   */
  @Input() private bevelSize: number = null;

  /**
   * Input  of svg component
   */
  @Input() private bevelOffset: number = null;

  /**
   * Input  of svg component
   */
  @Input() private bevelSegments: number = null;

  /**
   * Input  of svg component
   */
  @Input() private closed: boolean = null;

  /**
   * Input  of svg component
   */
  @Input() private isCCW: boolean = null;

  /**
   * Input  of svg component
   */
  /**
   * Input  of svg component
   */
  @Input() private noHoles: boolean = null;

  /**
   * Input  of svg component
   */
  @Input() private material: AbstractMaterialComponent = null;

  /**
   * Input  of svg component
   */
  @Input() private translation: TranslationComponent = null;

  /**
   * Input  of svg component
   */
  @Input() private text: string = null;

  /**
   * Input  of svg component
   *
   * Notice - case insensitive.
   * 
   */
  @Input() private textAlign: string = null;

  /**
   * Input  of svg component
   *
   * Notice - case insensitive.
   * 
   */
  @Input() private align: string = null;

  /**
   * Input  of svg component
   */
  @Input() private center: boolean = false;

  /**
   * Input  of svg component
   */
  @Input() private computeVertexNormals: boolean = false;

  /**
   * Input  of svg component
   */
  @Input() private font: string = null;

  /**
   * Input  of svg component
   */
  @Input() private size: number = null;

  /**
   * Input  of svg component
   *
   * Notice - case insensitive.
   * 
   */
  @Input() private weight: string = null;

  /**
   * Input  of svg component
   */
  /**
   * Input  of svg component
   */
  @Input() private color: string | number = null;

  /**
   * Input  of svg component
   */
  /**
   * Input  of svg component
   */
  @Input() private opacity: number = null;

  /**
   * Input  of svg component
   */
  @Input() private transparent: boolean = null;

  /**
   * Input  of svg component
   */
  @Input() private wireframe: boolean = null;

  /**
   * Input  of svg component
   */
  @Input() private shininess: number = null;

  /**
   * Input  of svg component
   */
  @Input() private stroke: number = null;

  /**
   * Input  of svg component
   */
  /**
   * Input  of svg component
   */
  @Input() private extrudePath: ThreeVector[] = null;

  /**
   * Input  of svg component
   *
   * Notice - case insensitive.
   * 
   */
  @Input() private extrudePathType: string = null;

  /**
   * Input  of svg component
   */
  @Input() private curvePath: ThreeVector[] = null;

  /**
   * Input  of svg component
   *
   * Notice - case insensitive.
   * 
   */
  @Input() private curvePathType: string = null;

  /**
   * Input  of svg component
   *
   * Notice - case insensitive.
   * 
   */
  @Input() private curveType: string = null;

  /**
   * Input  of svg component
   */
  @Input() private tension: number = null;

  /**
   * Input  of svg component
   *
   * Notice - case insensitive.
   * 
   */
  @Input() private uVGenerator: string = null;

  /**
   * Content children of svg component
   */
  @ContentChildren(TranslationComponent, { descendants: false }) private translationList: QueryList<TranslationComponent>;

  /**
   * Mesh positions of svg component
   */
  private meshPositions: THREE.Vector3[] = [];

  /**
   * Mesh rotations of svg component
   */
  private meshRotations: THREE.Euler[] = [];

  /**
   * Mesh scales of svg component
   */
  private meshScales: THREE.Vector3[] = [];

  /**
   * Mesh translations of svg component
   */
  private meshTranslations: THREE.BufferGeometry[] = [];

  /**
   * Mesh materials of svg component
   */
  private meshMaterials: THREE.Material[] = [];

  /**
   * Creates an instance of svg component.
   * @param ele
   * @param localStorageService
   */
  constructor(private ele: ElementRef, private localStorageService: LocalStorageService) {
    super();
  }

  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked the directive's
   * data-bound properties for the first time,
   * and before any of the view or content children have been checked.
   * It is invoked only once when the directive is instantiated.
   */
  ngOnInit(): void {
    super.ngOnInit('svg');
  }

  /**
   * A callback method that performs custom clean-up, invoked immediately
   * before a directive, pipe, or service instance is destroyed.
   */
  ngOnDestroy() {
    super.ngOnDestroy();
  }

  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked data-bound properties
   * if at least one has changed, and before the view and content
   * children are checked.
   *
   * @param changes The changed properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.meshes) {
      this.addChanges(changes);
      // this.resetMeshes(); todo
    }
  }

  /**
   * A callback method that is invoked immediately after
   * Angular has completed initialization of all of the directive's
   * content.
   * It is invoked only once when the directive is instantiated.
   */
  ngAfterContentInit(): void {
    this.subscribeListQueryChange(this.translationList, 'translationList', 'translation');
    super.ngAfterContentInit();
  }

  /**
   * Gets curve segments
   * @param [def]
   * @returns curve segments
   */
  private getCurveSegments(def?: number): number {
    return ThreeUtil.getTypeSafe(this.curveSegments, def);
  }

  /**
   * Gets depth
   * @param [def]
   * @returns depth
   */
  private getDepth(def?: number): number {
    return ThreeUtil.getTypeSafe(this.depth, def);
  }

  /**
   * Gets steps
   * @param [def]
   * @returns steps
   */
  private getSteps(def?: number): number {
    return ThreeUtil.getTypeSafe(this.steps, def);
  }

  /**
   * Gets bevel enabled
   * @param [def]
   * @returns true if bevel enabled
   */
  private getBevelEnabled(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.bevelEnabled, def);
  }

  /**
   * Gets bevel thickness
   * @param [def]
   * @returns bevel thickness
   */
  private getBevelThickness(def?: number): number {
    return ThreeUtil.getTypeSafe(this.bevelThickness, def);
  }

  /**
   * Gets bevel size
   * @param [def]
   * @returns bevel size
   */
  private getBevelSize(def?: number): number {
    return ThreeUtil.getTypeSafe(this.bevelSize, def);
  }

  /**
   * Gets bevel offset
   * @param [def]
   * @returns bevel offset
   */
  private getBevelOffset(def?: number): number {
    return ThreeUtil.getTypeSafe(this.bevelOffset, def);
  }

  /**
   * Gets bevel segments
   * @param [def]
   * @returns bevel segments
   */
  private getBevelSegments(def?: number): number {
    return ThreeUtil.getTypeSafe(this.bevelSegments, def);
  }

  /**
   * Gets is ccw
   * @param [def]
   * @returns true if is ccw
   */
  private getIsCCW(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.isCCW, def);
  }

  /**
   * Gets no holes
   * @param [def]
   * @returns true if no holes
   */
  private getNoHoles(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.noHoles, def);
  }

  /**
   * Gets text
   * @param [def]
   * @returns text
   */
  private getText(def?: string): string {
    return ThreeUtil.getTypeSafe(this.text, def);
  }

  /**
   * Gets text align
   * @param [def]
   * @returns text align
   */
  private getTextAlign(def?: string): string {
    return ThreeUtil.getTypeSafe(this.textAlign, this.align, def);
  }

  /**
   * Gets font
   * @param [def]
   * @param [callBack]
   */
  private getFont(def?: string, callBack?: (font: THREE.Font) => void) {
    const font = ThreeUtil.getTypeSafe(this.font, def, 'helvetiker');
    const weight = ThreeUtil.getTypeSafe(this.weight, '');
    this.localStorageService.getFont(callBack, font, weight);
  }

  /**
   * Gets size
   * @param [def]
   * @returns size
   */
  private getSize(def?: number): number {
    return ThreeUtil.getTypeSafe(this.size, def);
  }

  /**
   * Gets closed
   * @param [def]
   * @returns true if closed
   */
  private getClosed(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.closed, def);
  }

  /**
   * Gets shininess
   * @param [def]
   * @returns shininess
   */
  private getShininess(def?: number): number {
    return ThreeUtil.getTypeSafe(this.shininess, def);
  }

  /**
   * Gets color
   * @param [def]
   * @returns color
   */
  private getColor(def?: string | number): THREE.Color {
    return ThreeUtil.getColorSafe(this.color, def);
  }

  /**
   * Gets opacity
   * @param [def]
   * @returns opacity
   */
  private getOpacity(def?: number): number {
    return ThreeUtil.getTypeSafe(this.opacity, def);
  }

  /**
   * Gets transparent
   * @param [def]
   * @returns true if transparent
   */
  private getTransparent(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.transparent, def);
  }

  /**
   * Gets wireframe
   * @param [def]
   * @returns true if wireframe
   */
  private getWireframe(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.wireframe, def);
  }

  /**
   * Gets extrude path
   * @returns extrude path
   */
  private getExtrudePath(): THREE.Curve<THREE.Vector3> {
    if (ThreeUtil.isNotNull(this.extrudePath) || ThreeUtil.isNotNull(this.curvePath)) {
      const vectors: THREE.Vector3[] = [];
      if (ThreeUtil.isNotNull(this.extrudePath)) {
        this.extrudePath.forEach((p) => {
          vectors.push(new THREE.Vector3(p.x, p.y, p.z));
        });
      }
      if (ThreeUtil.isNotNull(this.curvePath)) {
        this.curvePath.forEach((p) => {
          vectors.push(new THREE.Vector3(p.x, p.y, p.z));
        });
      }
      switch (ThreeUtil.getTypeSafe(this.extrudePathType, this.curvePathType, 'catmullromcurve3').toLowerCase()) {
        case 'catmullromcurve3':
        default:
          return new THREE.CatmullRomCurve3(vectors, this.getClosed(false), ThreeUtil.getTypeSafe(this.curveType, 'catmullrom'), ThreeUtil.getTypeSafe(this.tension, 0.5));
      }
    }
    return undefined;
  }

  /**
   * Gets uvgenerator
   * @param [def]
   * @returns uvgenerator
   */
  private getUVGenerator(def?: string): THREE.UVGenerator {
    const uVGenerator = ThreeUtil.getTypeSafe(this.uVGenerator, def, '');
    switch (uVGenerator.toLowerCase()) {
      case 'world':
        // return THREE.WorldUVGenerator;
        break;
    }
    return undefined;
  }

  /**
   * Gets materials
   * @returns materials
   */
  private getMaterials(): THREE.Material[] {
    const materials: THREE.Material[] = [];
    if (this.materialList !== null && this.materialList.length > 0) {
      this.materialList.forEach((material) => {
        materials.push(material.getMaterial());
      });
    }
    if (materials.length === 0) {
      switch (this.type.toLowerCase()) {
        case 'sprite':
          materials.push(
            new THREE.SpriteMaterial({
              color: this.getColor(),
              opacity: this.getOpacity(),
              transparent: this.getTransparent(),
              side: THREE.DoubleSide,
            })
          );
        case 'points':
          materials.push(
            new THREE.PointsMaterial({
              color: this.getColor(),
              opacity: this.getOpacity(),
              transparent: this.getTransparent(),
              side: THREE.DoubleSide,
            })
          );
          break;
        case 'line':
          materials.push(
            new THREE.MeshBasicMaterial({
              color: this.getColor(),
              opacity: this.getOpacity(),
              side: THREE.DoubleSide,
            })
          );
          break;
        default:
          materials.push(
            new THREE.MeshPhongMaterial({
              color: this.getColor(0x333333),
              shininess: this.getShininess(100),
              opacity: this.getOpacity(),
              transparent: this.getTransparent(),
              wireframe: this.getWireframe(),
            })
          );
      }
    }
    return materials;
  }

  /**
   * Applys changes
   * @param changes
   */
  public applyChanges(changes: string[]) {
    if (this.meshes !== null) {
      if (ThreeUtil.isIndexOf(changes, 'init')) {
        changes = ThreeUtil.pushUniq(changes, ['translation', 'material']);
      }
      changes.forEach((change) => {
        switch (change) {
          case 'material':
            const mainMaterials = this.meshMaterials;
            if (this.material !== null && this.material.visible) {
              const materialClone = this.material.getMaterial();
              mainMaterials.forEach((material) => {
                if (material !== materialClone) {
                  material.copy(materialClone);
                }
              });
            } else {
              this.materialList.forEach((material, idx) => {
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
              this.meshTranslations.forEach((translation) => {
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
      });
    }
    super.applyChanges(changes);
  }

  /**
   * Meshes  of svg component
   */
  private meshes: THREE.Object3D[] = null;

  /**
   * Sets parent
   * @param parent
   * @returns true if parent
   */
  public setParent(parent: THREE.Object3D): boolean {
    if (super.setParent(parent)) {
      this.meshes = null;
      this.resetMeshes();
      return true;
    } else {
      return false;
    }
  }

  /**
   * Svg mesh of svg component
   */
  private svgMesh: THREE.Group = null;

  /**
   * Resets meshes
   */
  public resetMeshes() {
    if (this.parent !== null && (this.svgMesh === null || this._needUpdate)) {
      this.needUpdate = false;
      this.svgMesh = new THREE.Group();
      this.getPaths((result: SvgGeometry[]) => {
        this.meshes = [];
        this.meshPositions = [];
        this.meshRotations = [];
        this.meshScales = [];
        this.meshTranslations = [];
        this.meshMaterials = [];
        const materials = this.getMaterials();
        const materialList: THREE.Material[] = [];
        for (let i = 0; i < result.length; i++) {
          materialList.push(materials[i % materials.length]);
        }
        result.forEach((data, idx) => {
          const geometry = data.geometry;
          let mesh: THREE.Object3D = null;
          const meshMaterial: THREE.Material = materialList[idx];
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
            default:
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
        });
      });
      this.setObject3d(this.svgMesh);
    }
  }

  /**
   * Applys text align
   * @param geometry
   * @param boundingSphere
   * @param [def]
   * @returns text align
   */
  public applyTextAlign(geometry: THREE.BufferGeometry, boundingSphere: THREE.Sphere, def: string = 'left'): THREE.BufferGeometry {
    if (geometry !== null && boundingSphere !== null) {
      switch (this.getTextAlign(def)) {
        case 'left':
          break;
        case 'center':
          geometry.translate(-boundingSphere.radius, 0, 0);
          break;
        case 'right':
          geometry.translate(boundingSphere.radius * 2, 0, 0);
          break;
      }
    }
    return geometry;
  }

  /**
   * Gets geometries
   * @param data
   * @param boundingSphere
   * @returns geometries
   */
  private getGeometries(data: SVGResult | THREE.Shape[], boundingSphere: THREE.Sphere): SvgGeometry[] {
    const geometries: SvgGeometry[] = [];
    const shapes: {
      shape: THREE.Shape[];
      userData: any;
    }[] = [];
    if (data instanceof Array) {
      shapes.push({
        shape: data,
        userData: null,
      });
    } else if (data.paths) {
      data.paths.forEach((path) => {
        shapes.push({
          shape: path.toShapes(this.getIsCCW(true), this.getNoHoles(false)),
          userData: path['userData'] ? path['userData'] : null,
        });
      });
    }
    shapes.forEach((shape) => {
      let geometry: THREE.BufferGeometry = null;
      switch (this.geometryType.toLowerCase()) {
        case 'extrudebuffer':
        case 'extrude':
          geometry = new THREE.ExtrudeGeometry(shape.shape, {
            curveSegments: this.getCurveSegments(),
            steps: this.getSteps(),
            depth: this.getDepth(),
            bevelEnabled: this.getBevelEnabled(),
            bevelThickness: this.getBevelThickness(),
            bevelSize: this.getBevelSize(),
            bevelOffset: this.getBevelOffset(),
            bevelSegments: this.getBevelSegments(),
            extrudePath: this.getExtrudePath(),
            UVGenerator: this.getUVGenerator(),
          });
          break;
        case 'custom':
        case 'geometry':
        case 'buffer':
          const holeShape: THREE.Path[] = [];
          const bufferShapes: THREE.Shape[] = [];
          shape.shape.forEach((sh) => {
            bufferShapes.push(sh);
          });
          bufferShapes.forEach((sh) => {
            if (sh.holes && sh.holes.length > 0) {
              sh.holes.forEach((hole) => {
                holeShape.push(hole);
              });
            }
          });
          const sumShapes: THREE.Shape[] = shape.shape;
          sumShapes.push.apply(shape.shape, holeShape);
          if (ThreeUtil.isNotNull(this.stroke)) {
            const style = SVGLoader.getStrokeStyle(this.stroke, this.getColor(0x006699).getStyle());
            sumShapes.forEach((shape) => {
              const outlineGeometry = SVGLoader.pointsToStroke(shape.getPoints(), style);
              geometries.push({
                geometry: this.applyTextAlign(outlineGeometry, boundingSphere),
                style: null,
              });
            });
          } else {
            sumShapes.forEach((shape) => {
              let outlineGeometry = new THREE.BufferGeometry();
              outlineGeometry.setFromPoints(shape.getPoints());
              geometries.push({
                geometry: this.applyTextAlign(outlineGeometry, boundingSphere),
                style: null,
              });
            });
          }
          break;
        case 'shapebuffer':
        case 'shape':
        default:
          geometry = new THREE.ShapeGeometry(shape.shape, this.getCurveSegments(12));
          break;
      }
      if (geometry !== null) {
        geometries.push({
          geometry: this.applyTextAlign(geometry, boundingSphere),
          style: shape.userData,
        });
      }
    });
    return geometries;
  }

  /**
   * Gets paths
   * @param onload
   */
  public getPaths(onload: (geometry: SvgGeometry[]) => void) {
    if (ThreeUtil.isNotNull(this.text) && this.text != '') {
      this.getFont('helvetiker', (font: THREE.Font) => {
        const shapes = font.generateShapes(this.getText('test'), this.getSize(100));
        const geometry = new THREE.ShapeGeometry(shapes, this.getCurveSegments(12));
        geometry.computeBoundingSphere();
        onload(this.getGeometries(shapes, geometry.boundingSphere));
      });
    } else {
      this.getSVGResult((data: SVGResult) => {
        const shapes: THREE.Shape[] = [];
        data.paths.forEach((path) => {
          path.toShapes(this.getIsCCW(true), this.getNoHoles(false)).forEach((shape) => {
            shapes.push(shape);
          });
        });
        const geometry = new THREE.ShapeGeometry(shapes, this.getCurveSegments(12));
        geometry.computeBoundingSphere();
        onload(this.getGeometries(data, null));
      });
    }
  }

  /**
   * Gets svgresult
   * @param onload
   */
  public getSVGResult(onload: (data: SVGResult) => void) {
    const loader = new SVGLoader();
    if (ThreeUtil.isNotNull(this.url)) {
      loader.load(this.url, (data: SVGResult) => {
        onload(data);
      });
    } else if (ThreeUtil.isNotNull(this.path) && this.path != '') {
      const svgContents: string[] = [];
      svgContents.push('<svg version="1.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="1152px" height="1152px" xml:space="preserve">');
      svgContents.push('<g>');
      svgContents.push('<path d="' + this.path + '"/>');
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

  /**
   * Gets shapes
   * @param onload
   */
  public getShapes(onload: (data: THREE.Shape[]) => void) {
    this.getSVGResult((data: SVGResult) => {
      if (data.paths.length > 0) {
        const shapes: THREE.Shape[] = [];
        data.paths.forEach((path) => {
          path.toShapes(this.getIsCCW(true), this.getNoHoles(false)).forEach((shape) => {
            shapes.push(shape);
          });
        });
        onload(shapes);
      }
    });
  }
}
