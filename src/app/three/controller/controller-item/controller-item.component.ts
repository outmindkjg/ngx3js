import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { Vector3 } from 'three';
import { Curves } from 'three/examples/jsm/curves/CurveExtras';
import { RendererTimer, ThreeUtil } from '../../interface';
import { AbstractSubscribeComponent } from '../../subscribe.abstract';

@Component({
  selector: 'three-controller-item',
  templateUrl: './controller-item.component.html',
  styleUrls: ['./controller-item.component.scss'],
})
export class ControllerItemComponent extends AbstractSubscribeComponent implements OnInit {
  @Input() public type: string = 'position';
  @Input() private lookathead: number = null;
  @Input() private curve: string = null;
  @Input() private scale: number = null;
  @Input() private radius: number = null;
  @Input() private radiusInner: number = null;
  @Input() private radiusX: number = null;
  @Input() private radiusY: number = null;
  @Input() private radiusZ: number = null;
  @Input() private rotation: number = null;
  @Input() private rotationX: number = null;
  @Input() private rotationY: number = null;
  @Input() private rotationZ: number = null;
  @Input() private center: number = null;
  @Input() private centerX: number = null;
  @Input() private centerY: number = null;
  @Input() private centerZ: number = null;
  @Input() private duration: number = null;
  @Input() private delta: number = null;
  @Input() private multiply: number = null;
  @Input() private options: string = null;
  @Input() private visible: boolean = null;
  @Input() private color: string | number | THREE.Color = null;
  @Input() private opacity: number = null;
  @Input() private tubularSegments: number = null;
  @Input() private tubeRadius: number = null;
  @Input() private tubeRadiusSegments: number = null;
  @Input() private closed: boolean = null;
  @Input() private material: string = null;
  @Input() private wave: number = 0;
  @Input() private waveR: number = 0;
  @Input() private waveH: number = 0;
  @Input() private rate: number = 1;
  @Input() private rateX: number = null;
  @Input() private rateY: number = null;
  @Input() private rateZ: number = null;
  
  private getCurve(curve: string): THREE.Curve<THREE.Vector3> {
    switch (curve.toLowerCase()) {
      case 'grannyknot':
        return new Curves.GrannyKnot();
      case 'heartcurve':
        return new Curves.HeartCurve(1);
      case 'vivianicurve':
        return new Curves.VivianiCurve(1);
      case 'knotcurve':
        return new Curves.KnotCurve();
      case 'helixcurve':
        return new Curves.HelixCurve();
      case 'trefoilknot':
        return new Curves.TrefoilKnot(1);
      case 'torusknot':
        return new Curves.TorusKnot(1);
      case 'cinquefoilknot':
        return new Curves.CinquefoilKnot(1);
      case 'trefoilpolynomialknot':
        return new Curves.TrefoilPolynomialKnot(1);
      case 'decoratedtorusknot4b':
        return new Curves.DecoratedTorusKnot4b(1);
      case 'decoratedtorusknot4a':
        return new Curves.DecoratedTorusKnot4a(1);
      case 'figureeightpolynomialknot':
        return new Curves.FigureEightPolynomialKnot(1);
      case 'decoratedtorusknot5a':
        return new Curves.DecoratedTorusKnot5a(1);
      case 'decoratedtorusknot5c':
        return new Curves.DecoratedTorusKnot5c(1);
      case 'circlewave':
      case 'circle':
        return new CurvesCircle(1, 
          ThreeUtil.getTypeSafe(this.radiusInner,0),
          ThreeUtil.getTypeSafe(this.waveH,this.wave,0),
          ThreeUtil.getTypeSafe(this.waveR,this.wave,0),
          ThreeUtil.getTypeSafe(this.rateX,this.rate, 1),
          ThreeUtil.getTypeSafe(this.rateY,this.rate, 1),
          ThreeUtil.getTypeSafe(this.rateZ,this.rate, 1),
        );
      case 'line' :
        return new CurvesLine(1,
          ThreeUtil.getTypeSafe(this.radiusInner,0),
          ThreeUtil.getTypeSafe(this.waveH,this.wave,0),
          ThreeUtil.getTypeSafe(this.waveR,this.wave,0),
          ThreeUtil.getTypeSafe(this.rateX,this.rate, 1),
          ThreeUtil.getTypeSafe(this.rateY,this.rate, 1),
          ThreeUtil.getTypeSafe(this.rateZ,this.rate, 1),
        );
      default:
        break;
    }
    return new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
  }

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit('controllerItem');
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this._curve) {
      this.addChanges(changes);
    }
  }

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }

  private _helper: THREE.Object3D = null;
  private _helperPoint: THREE.Object3D = null;
  private _curve: CurvesOptions = null;
  private _lookat: boolean = false;
  private _duration: number = 60;
  private _delta: number = 60;
  private _parent: THREE.Object3D;
  private _lookathead: number = 0.05;
  getController(parent : THREE.Object3D): this {
    if (this._needUpdate) {
      this._needUpdate = false;
      this._lookat = false;
      if (this._helper !== null && this._helper.parent === null) {
        this._helper.parent.remove(this._helper);
      }
      if (this._helperPoint !== null && this._helperPoint.parent === null) {
        this._helperPoint.parent.remove(this._helperPoint);
      }
      this._helper = null;
      this._helperPoint = null;
      const curve = this.getCurve(ThreeUtil.getTypeSafe(this.curve, 'circle'));
      let scale : THREE.Vector3 = ThreeUtil.getVector3Safe(
          ThreeUtil.getTypeSafe(this.radiusX, this.radius, 1),
          ThreeUtil.getTypeSafe(this.radiusY, this.radius, 1),
          ThreeUtil.getTypeSafe(this.radiusZ, this.radius, 1)
      );
      let rotation : THREE.Euler = ThreeUtil.getEulerSafe(
        ThreeUtil.getTypeSafe(this.rotationX, this.rotation, 0),
        ThreeUtil.getTypeSafe(this.rotationY, this.rotation, 0),
        ThreeUtil.getTypeSafe(this.rotationZ, this.rotation, 0)
      );
      let center : THREE.Vector3 = ThreeUtil.getVector3Safe(
        ThreeUtil.getTypeSafe(this.centerX, this.center, 0),
        ThreeUtil.getTypeSafe(this.centerY, this.center, 0),
        ThreeUtil.getTypeSafe(this.centerZ, this.center, 0)
      );
      this._lookathead = Math.min(1,Math.max(0.001,ThreeUtil.getTypeSafe(this.lookathead, 0.05)));
      this._curve = new CurvesOptions(
        curve,
        scale,
        rotation,
        center,
        ThreeUtil.getTypeSafe(this.multiply, 1),
        this.options
      );
      this._duration = ThreeUtil.getTypeSafe(this.duration, 60);
      this._delta = ThreeUtil.getTypeSafe(this.delta, 0);
      switch(this.type.toLowerCase()) {
        case 'position' :
          this._curve.referCenter = parent.position;
          this._lookat = false;
          break;
        case 'positionlookat' :
          this._curve.referCenter = parent.position;
          this._lookat = true;
          break;
      }
      if (this.visible) {
        this._helper = new THREE.Mesh(
          new THREE.TubeGeometry(this._curve, ThreeUtil.getTypeSafe(this.tubularSegments, 64), ThreeUtil.getTypeSafe(this.tubeRadius, 0.01), ThreeUtil.getTypeSafe(this.tubeRadiusSegments, 8), ThreeUtil.getTypeSafe(this.closed, false)),
          new THREE.MeshBasicMaterial({
            color: ThreeUtil.getColorSafe(this.color, 0xff0000),
            opacity: ThreeUtil.getTypeSafe(this.opacity, 0.2),
            depthTest: true,
            transparent : true,
            side: THREE.DoubleSide,
          })
        );
        this._helperPoint = new THREE.Mesh(
          new THREE.SphereGeometry(ThreeUtil.getTypeSafe(this.tubeRadius, 0.01) * 10, ThreeUtil.getTypeSafe(this.tubeRadiusSegments, 8), ThreeUtil.getTypeSafe(this.tubeRadiusSegments, 4)),
          new THREE.MeshBasicMaterial({
            color: ThreeUtil.getColorSafe(this.color, 0x0000ff),
            opacity: ThreeUtil.getTypeSafe(this.opacity, 0.7),
            depthTest: true,
            transparent : true,
            side: THREE.DoubleSide,
          })
        );
        this._helperPoint.visible = false;
        switch(this.type.toLowerCase()) {
          case 'position' :
            this._helper.scale.set(1,1,1);
            this._helperPoint.visible = false;
          case 'positionlookat' :
            this._helper.scale.set(1,1,1);
            this._helperPoint.visible = true;
            break;
          default :
            this._helper.scale.set(1,1,1).multiplyScalar(ThreeUtil.getTypeSafe(this.scale,1));
            this._helperPoint.scale.set(1,1,1).multiplyScalar(ThreeUtil.getTypeSafe(this.scale,1));
            this._helperPoint.visible = true;
            break;
        }
      }
    }
    if (this._parent !== parent && parent !== null) {
      this._parent = parent;
      if (this._parent !== null) {
        if (this._helper !== null) {
          if (this._helper.parent !== this._parent.children[0]) {
            this._parent.children[0].add(this._helper); 
          }
        }
        if (this._helperPoint !== null) {
          if (this._helperPoint.parent !== this._parent) {
            this._parent.add(this._helperPoint); 
          }
        }
      }
    }

    return this;
  }

  private _lastLookAt : THREE.Vector3 = null;

  updateHelperPoint(itemTimer: RendererTimer, scale : number = null) {
    if (this._helperPoint !== null) {
      this._curve.getPointV3(itemTimer, this._helperPoint.position);
      switch (this.type.toLowerCase()) {
        case 'positionlookat' :
        case 'position':
            break;
        default :
          this._helperPoint.position.multiplyScalar(ThreeUtil.getTypeSafe(this.scale,1));
          if (scale !== null) {
            this._helperPoint.scale.set(scale, scale, scale);
          }
          break;
      }
    } 
  }
  update(timer: RendererTimer, parent: THREE.Object3D, events: string[]): boolean {
    if (this._curve !== null) {
      const itemTimer : RendererTimer = {
        elapsedTime : timer.elapsedTime / this._duration + this._delta,
        delta : timer.delta
      };
      switch (this.type.toLowerCase()) {
        case 'positionlookat' :
        case 'position':
          if (events.indexOf('position') === -1) {
            this._curve.getPointV3(itemTimer, parent.position);
            events.push('position');
            if (this._lookat) {
              itemTimer.elapsedTime += this._lookathead;
              itemTimer.delta += this._lookathead;
              if (this._lastLookAt === null) {
                this._lastLookAt = this._curve.getPointV3(itemTimer, new THREE.Vector3());
              } else {
                this._curve.getPointV3(itemTimer, this._lastLookAt);
                parent.lookAt(this._lastLookAt);
              }
              this.updateHelperPoint(itemTimer);
              events.push('lookat');
            }
            return true;
          } else {
            return false;
          }
        case 'scale':
          if (events.indexOf('scale') === -1) {
            this._curve.getPointV3(itemTimer, parent.scale);
            this.updateHelperPoint(itemTimer);
            events.push('scale');
            return true;
          } else {
            return false;
          }
        case 'rotation':
          if (events.indexOf('rotation') === -1) {
            this._curve.getPointEuler(itemTimer, parent.rotation);
            this.updateHelperPoint(itemTimer);
            events.push('rotation');
            return true;
          } else {
            return false;
          }
        case 'lookat':
          if (events.indexOf('lookat') === -1) {
            if (this._lastLookAt === null) {
              this._lastLookAt = this._curve.getPointV3(itemTimer, new THREE.Vector3());
            } else {
              this._curve.getPointV3(itemTimer, this._lastLookAt);
              parent.lookAt(this._lastLookAt);
            }
            this.updateHelperPoint(itemTimer);
            events.push('lookat');
            return true;
          } else {
            return false;
          }
        case 'material':
          if (parent instanceof THREE.Mesh && ThreeUtil.isNotNull(this.material)) {
            const materials = parent.material;
            if (materials !== null) {
              let material : THREE.Material = null;
              if (!Array.isArray(materials)) {
                material = materials;
              } else {
                material = materials[0];
              }
              let scale : number = 1;
              if (ThreeUtil.isNotNull(material) && ThreeUtil.isNotNull(material[this.material])) {
                const oldValue = material[this.material];
                if (oldValue instanceof THREE.Color) {
                  this._curve.getPointColor(itemTimer, oldValue);
                } else if (oldValue instanceof THREE.Vector2) {
                  this._curve.getPointV2(itemTimer, oldValue);
                } else if (oldValue instanceof THREE.Vector3) {
                  this._curve.getPointV3(itemTimer, oldValue);
                } else if (typeof oldValue === 'number') {
                  switch(this.material.toLowerCase()) {
                    case 'opacity' :
                      material.opacity = this._curve.getPointFloat(itemTimer, 0, 1);
                      scale = material.opacity * 3;
                      break;
                    default :
                      material[this.material] = this._curve.getPointFloat(itemTimer);
                      break;
                  }
                }
                this.updateHelperPoint(itemTimer, scale);
              }
            }
          }
          break;
      }
    }
    return false;
  }
}

export class CurvesCircle extends THREE.Curve<THREE.Vector3> {
  constructor(private radius: number = 1 , private radiusInner: number = 0 , private waveH: number = 0, private waveR: number = 0, private rateX: number = 1, private rateY: number = 0.2, private rateZ: number = 1) {
    super();
  }

  getPoint(t: number, optionalTarget: THREE.Vector3) {
    const point = optionalTarget || new THREE.Vector3();
    t = 2 * Math.PI * t;
    const radius = this.waveR != 0 && this.radiusInner != 0 ? (Math.sin(t * this.waveR) * this.radiusInner + 1 ) * this.radius : this.radius;
    const y = this.waveH != 0  ? Math.sin(t * this.waveH) : 0;
    return point.set(Math.sin(t) * this.rateX, y * this.rateY , Math.cos(t) * this.rateZ).multiplyScalar(radius);
  }
}


export class CurvesLine extends THREE.Curve<THREE.Vector3> {
  constructor(private radius: number = 1 , private radiusInner: number = 0 , private waveH: number = 0, private waveR: number = 0, private rateX: number = 1, private rateY: number = 0.2, private rateZ: number = 1) {
    super();
  }

  getPoint(t: number, optionalTarget: THREE.Vector3) {
    const point = optionalTarget || new THREE.Vector3();
    const v = (t % 1) * 2 - 1;
    const y = this.waveH != 0  ? Math.sin(2 * Math.PI * t * this.waveH) : 0;
    const radius = this.waveR != 0 && this.radiusInner != 0 ? (Math.sin(2 * Math.PI * t * this.waveR) * this.radiusInner + 1 ) * this.radius : this.radius;
    return point.set(v * this.rateX, y * this.rateY, v * this.rateZ).multiplyScalar(radius);
  }
}

export class CurvesOptions extends THREE.Curve<THREE.Vector3> {
  constructor(curve: THREE.Curve<THREE.Vector3>, private scale: THREE.Vector3, private rotation: THREE.Euler, private center: THREE.Vector3, private multiply: number, options: string) {
    super();
    if (ThreeUtil.isNotNull(options)) {
      options.split(',').forEach((option) => {
        switch (option.toLowerCase()) {
          case 'absx':
            this._absX = true;
            break;
          case 'absy':
            this._absY = true;
            break;
          case 'absz':
            this._absZ = true;
            break;
          case 'yoyo':
            this._repeatType = 'yoyo';
            break;
        }
      });
    }
    if (ThreeUtil.isNull(this.rotation)) {
      this.rotation = null;
    }
    if (ThreeUtil.isNull(this.scale)) {
      this.scale = null;
    }
    if (ThreeUtil.isNull(this.center)) {
      this.center = null;
    }
    if (ThreeUtil.isNull(this.multiply) || this.multiply === 1) {
      this.multiply = null;
    }
    this.setCurve(curve);
  }

  curve: THREE.Curve<THREE.Vector3> = null;

  setCurve(curve : THREE.Curve<THREE.Vector3>) {
		let minX = + Infinity;
		let minY = + Infinity;
		let minZ = + Infinity;
		let maxX = - Infinity;
		let maxY = - Infinity;
		let maxZ = - Infinity;
    let sumX = 0;
		let sumY = 0;
		let sumZ = 0;
    for(let i = 0 ; i <= 1; i += 0.02) {
      const v = curve.getPoint(i);
      minX = Math.min(minX, v.x);
      minY = Math.min(minY, v.y);
      minZ = Math.min(minZ, v.z);
      maxX = Math.max(maxX, v.x);
      maxY = Math.max(maxY, v.y);
      maxZ = Math.max(maxZ, v.z);
      sumX += v.x;
      sumY += v.y;
      sumZ += v.z;
    }
    this.curve = curve;
    this._center = new THREE.Vector3(sumX,sumY,sumZ).multiplyScalar(0.02);
    const maxL = Math.max(maxX - minX, maxY - minY, maxZ - minZ);
    this._scale = new THREE.Vector3(1,1,1);
    if (maxL > 2) {
      this._scale.multiplyScalar(2 / maxL);
    }
  }
  private _center : THREE.Vector3 = null;
  private _scale : THREE.Vector3 = null;
  private _absX: boolean = false;
  private _absY: boolean = false;
  private _absZ: boolean = false;
  private _repeatType: string = 'repeat';

  getPoint(t: number, optionalTarget?: THREE.Vector3): THREE.Vector3 {
    optionalTarget = this.curve.getPoint(t, optionalTarget);
    optionalTarget.sub(this._center);
    if (this._scale !== null) {
      optionalTarget.multiply(this._scale);
    }
    if (this.rotation !== null) {
      optionalTarget.applyEuler(this.rotation);
    }
    if (this.scale !== null) {
      optionalTarget.multiply(this.scale);
    }
    if (this.multiply != null) {
      optionalTarget.multiplyScalar(this.multiply);
    }
    if (this._absX) {
      optionalTarget.x = Math.abs(optionalTarget.x);
    }
    if (this._absY) {
      optionalTarget.y = Math.abs(optionalTarget.y);
    }
    if (this._absZ) {
      optionalTarget.z = Math.abs(optionalTarget.z);
    }
    if (ThreeUtil.isNotNull(this.center)) {
      optionalTarget.add(this.center);
    }
    return optionalTarget;
  }

  private getElapsedTime(timer : RendererTimer): number {
    let t: number = timer.elapsedTime;
    switch (this._repeatType.toLowerCase()) {
      case 'yoyo':
        t = t % 2;
        if (t > 1) {
          t = 2 - t;
        }
        break;
      default:
        t = t % 1;
        break;
    }
    return t;
  }

  private _lastV3 : THREE.Vector3 = null;
  public referCenter : THREE.Vector3 = null;

  getPointV3(timer : RendererTimer, p : THREE.Vector3): THREE.Vector3 {
    const cp = this.getPoint(this.getElapsedTime(timer));
    if (this._lastV3 === null) {
      this._lastV3 = new THREE.Vector3(cp.x, cp.y, cp.z);
    } else {
      this._lastV3.copy(cp);
    }
    if (this.referCenter !== null) {
      this._lastV3.add(this.referCenter);
    }
    p.copy(this._lastV3);
    return this._lastV3;
  }

  private _lastV2 : THREE.Vector2 = null;
  getPointV2(timer : RendererTimer, p : THREE.Vector2): THREE.Vector2 {
    const cp = this.getPoint(this.getElapsedTime(timer));
    if (this._lastV2 === null) {
      this._lastV2 = new THREE.Vector2(cp.x, cp.y);
    } else {
      this._lastV2.set(cp.x, cp.y);
    }
    p.copy(this._lastV2);
    return this._lastV2;
  }

  private _lastEuler : THREE.Euler = null;
  getPointEuler(timer : RendererTimer, p : THREE.Euler): THREE.Euler {
    const cp = this.getPoint(this.getElapsedTime(timer));
    if (this._lastEuler == null) {
      this._lastEuler = new THREE.Euler(cp.x, cp.y, cp.z);
    } else {
      this._lastEuler.set(cp.x, cp.y, cp.z);
    }
    p.copy(this._lastEuler);
    return this._lastEuler;
  }

  private _lastColor : THREE.Color = null;

  getPointColor(timer : RendererTimer, p : THREE.Color): THREE.Color {
    const cp = this.getPoint(this.getElapsedTime(timer));
    cp.clampScalar(0,1);
    if (this._lastColor == null) {
      this._lastColor = new THREE.Color(cp.x, cp.y, cp.z);
    } else {
      this._lastColor.setRGB(cp.x, cp.y, cp.z);
    }
    p.copy(this._lastColor);
    return this._lastColor;
  }

  private _lastFloat : THREE.Vector3 = null;

  getPointFloat(timer : RendererTimer, min : number = 0, max : number = 1): number {
    if (this._lastFloat === null) {
      this._lastFloat = new THREE.Vector3();
    }
    this.getPointV3(timer, this._lastFloat);
    return Math.min(max, Math.max(min, this._lastFloat.length()));
  }

}
