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
  @Input() private curve: string = null;
  @Input() private scale: number = null;
  @Input() private radius: number = null;
  @Input() private radiusX: number = null;
  @Input() private radiusY: number = null;
  @Input() private radiusZ: number = null;
  @Input() private rotationX: number = null;
  @Input() private rotationY: number = null;
  @Input() private rotationZ: number = null;
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
  @Input() private useEvent: boolean = false;
  @Input() private eventSeqn: number = 1000;
  @Input() private tubularSegments: number = null;
  @Input() private tubeRadius: number = null;
  @Input() private tubeRadiusSegments: number = null;
  @Input() private closed: boolean = null;
  @Input() private material: string = null;
  
  private getCurve(curve: string, scale: number): THREE.Curve<THREE.Vector3> {
    switch (curve.toLowerCase()) {
      case 'grannyknot':
        return new Curves.GrannyKnot();
      case 'heartcurve':
        return new Curves.HeartCurve(scale);
      case 'vivianicurve':
        return new Curves.VivianiCurve(scale);
      case 'knotcurve':
        return new Curves.KnotCurve();
      case 'helixcurve':
        return new Curves.HelixCurve();
      case 'trefoilknot':
        return new Curves.TrefoilKnot(scale);
      case 'torusknot':
        return new Curves.TorusKnot(scale);
      case 'cinquefoilknot':
        return new Curves.CinquefoilKnot(scale);
      case 'trefoilpolynomialknot':
        return new Curves.TrefoilPolynomialKnot(scale);
      case 'decoratedtorusknot4b':
        return new Curves.DecoratedTorusKnot4b(scale);
      case 'decoratedtorusknot4a':
        return new Curves.DecoratedTorusKnot4a(scale);
      case 'figureeightpolynomialknot':
        return new Curves.FigureEightPolynomialKnot(scale);
      case 'decoratedtorusknot5a':
        return new Curves.DecoratedTorusKnot5a(scale);
      case 'decoratedtorusknot5c':
        return new Curves.DecoratedTorusKnot5c(scale);
      case 'circle':
        return new CurvesCircle(scale);
      case 'circlewave':
        return new CurvesCircleWave(scale);
      case 'line' :
        return new CurvesLine(scale);
      default:
        break;
    }
    return new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
  }

  setControlParams(params : { [key : string] : any } ) {
    Object.entries(params).forEach(([key, value]) => {
      if (this[key] !== undefined) {
        this[key] = value;
      }
    });
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
  private _curve: CurvesOptions = null;
  private _lookat: boolean = false;
  private _duration: number = 60;
  private _delta: number = 60;
  private _parent: THREE.Object3D;
  getController(parent : THREE.Object3D): this {
    if (this._needUpdate) {
      this._needUpdate = false;
      this._lookat = false;
      if (this._helper !== null && this._helper.parent === null) {
        this._helper.parent.remove(this._helper);
      }
      this._helper = null;
      const curve = this.getCurve(ThreeUtil.getTypeSafe(this.curve, 'circle'), ThreeUtil.getTypeSafe(this.scale, 1));
      let scale : THREE.Vector3 = null;
      if (ThreeUtil.isNotNull(this.radiusX) && ThreeUtil.isNotNull(this.radiusY) && ThreeUtil.isNotNull(this.radiusZ)) {
        scale = ThreeUtil.getVector3Safe(this.radiusX, this.radiusY, this.radiusZ);
      } if (ThreeUtil.isNotNull(this.radius)) {
        scale = ThreeUtil.getVector3Safe(this.radius, this.radius, this.radius);
      }
      this._curve = new CurvesOptions(
        curve,
        scale,
        ThreeUtil.getEulerSafe(this.rotationX, this.rotationY, this.rotationZ),
        ThreeUtil.getVector3Safe(this.centerX, this.centerY, this.centerZ),
        ThreeUtil.getTypeSafe(this.multiply, 1),
        this.options
      );
      this._duration = ThreeUtil.getTypeSafe(this.duration, 60);
      this._delta = ThreeUtil.getTypeSafe(this.delta, 0);
      switch(this.type.toLowerCase()) {
        case 'positionlookat' :
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
            side: THREE.DoubleSide,
          })
        );
      }
    }
    if (this._parent !== parent && parent !== null) {
      this._parent = parent;
      if (this._helper !== null) {
        if (this._parent.parent !== null) {
          if (this._helper.parent !== this._parent.parent) {
            this._parent.parent.add(this._helper); 
          }
        } else if (this._helper.parent !== this._parent) {
          this._parent.add(this._helper); 
        }
      }
    }

    return this;
  }

  private _lastLookAt : THREE.Vector3 = null;
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
              itemTimer.elapsedTime += 0.05;
              itemTimer.delta += 0.05;
              if (this._lastLookAt === null) {
                this._lastLookAt = this._curve.getPointV3(itemTimer, new THREE.Vector3());
              } else {
                this._curve.getPointV3(itemTimer, this._lastLookAt);
                parent.lookAt(this._lastLookAt);
              }
              events.push('lookat');
            }
            return true;
          } else {
            return false;
          }
        case 'scale':
          if (events.indexOf('scale') === -1) {
            this._curve.getPointV3(itemTimer, parent.scale);
            events.push('scale');
            return true;
          } else {
            return false;
          }
        case 'rotation':
          if (events.indexOf('rotation') === -1) {
            this._curve.getPointEuler(itemTimer, parent.rotation);
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
                      break;
                    default :
                      material[this.material] = this._curve.getPointFloat(itemTimer);
                      break;
                  }
                }
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
  constructor(private radius: number, private rateX: number = 1, private rateZ: number = 1) {
    super();
  }

  getPoint(t: number, optionalTarget: THREE.Vector3) {
    const point = optionalTarget || new THREE.Vector3();
    t = 2 * Math.PI * t;
    return point.set(Math.sin(t) * this.rateX, 0, Math.cos(t) * this.rateZ).multiplyScalar(this.radius);
  }
}

export class CurvesLine extends THREE.Curve<THREE.Vector3> {
  constructor(private radius : number = 1 , private from: number = -1, private to: number = 1) {
    super();
  }

  getPoint(t: number, optionalTarget: THREE.Vector3) {
    const point = optionalTarget || new THREE.Vector3();
    const v = (t % 1) * (this.to - this.from) + this.from;
    return point.set(v, v, v).multiplyScalar(this.radius);
  }
}

export class CurvesCircleWave extends THREE.Curve<THREE.Vector3> {
  constructor(private radius: number, private wave: number = 5, private rateX: number = 1, private rateY: number = 0.2, private rateZ: number = 1) {
    super();
  }

  getPoint(t: number, optionalTarget: THREE.Vector3) {
    const point = optionalTarget || new THREE.Vector3();
    t = 2 * Math.PI * t;
    return point.set(Math.sin(t) * this.rateX, Math.sin(t * this.wave) * this.rateY, Math.cos(t) * this.rateZ).multiplyScalar(this.radius);
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
    for(let i = 0 ; i <= 10; i += 0.1) {
      const v = curve.getPoint(i);
      minX = Math.min(minX, v.x);
      minY = Math.min(minY, v.y);
      minZ = Math.min(minZ, v.z);
      maxX = Math.max(maxX, v.x);
      maxY = Math.max(maxY, v.y);
      maxZ = Math.max(maxZ, v.z);
    }
    this.curve = curve;
    const minP = new THREE.Vector3(minX, minY, minZ);
    const maxP = new THREE.Vector3(maxX, maxY, maxZ);
    this._center = maxP.clone().add(minP).multiplyScalar(0.5);
    const dist = maxP.distanceTo(minP);
    if (dist > 0) {
      this._scale = 2 / dist;
    } else {
      this._scale = 1;
    }
  }
  private _center : THREE.Vector3 = null;
  private _scale : number = 1;
  private _absX: boolean = false;
  private _absY: boolean = false;
  private _absZ: boolean = false;
  private _repeatType: string = 'repeat';

  getPoint(t: number, optionalTarget?: THREE.Vector3): THREE.Vector3 {
    optionalTarget = this.curve.getPoint(t, optionalTarget);
    optionalTarget.sub(this._center);
    if (this._scale !== 1) {
      optionalTarget.multiplyScalar(this._scale);
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
  getPointV3(timer : RendererTimer, p : THREE.Vector3): THREE.Vector3 {
    const cp = this.getPoint(this.getElapsedTime(timer));
    if (this._lastV3 === null) {
      this._lastV3 = new THREE.Vector3(cp.x, cp.y, cp.z);
    } else {
      this._lastV3.copy(cp);
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
