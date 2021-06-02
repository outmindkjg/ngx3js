import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { Curves } from 'three/examples/jsm/curves/CurveExtras';
import { ThreeUtil } from '../../interface';
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
  @Input() private scaleX: number = null;
  @Input() private scaleY: number = null;
  @Input() private scaleZ: number = null;
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

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes) {
      this.needUpdate = true;
    }
  }

  private _needUpdate: boolean = true;

  set needUpdate(value: boolean) {
    if (value && this._needUpdate == false) {
      this._needUpdate = true;
      this.getController();
    }
  }

  private _path: THREE.Curve<THREE.Vector3> = null;
  private _curve: THREE.Curve<THREE.Vector3> = null;
  private _lookat: boolean = false;
  private _duration: number = 60;
  private _delta: number = 60;

  getPath(): THREE.Curve<THREE.Vector3> {
    if (this._path === null) {
      this.getController();
    }
    return this._path;
  }

  getController(): this {
    if (this._needUpdate) {
      this._needUpdate = false;
      this._lookat = false;
      this._path = this.getCurve(ThreeUtil.getTypeSafe(this.curve, 'circle'), ThreeUtil.getTypeSafe(this.scale, 1));
      this._curve = new CurvesOptions(
        this._path,
        ThreeUtil.getVector3Safe(this.scaleX, this.scaleY, this.scaleZ),
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
    }
    return this;
  }

  update(elapsedTime: number, parent: THREE.Object3D, events: string[]): boolean {
    if (this._curve !== null) {
      switch (this.type.toLowerCase()) {
        case 'positionlookat' :
        case 'position':
          if (events.indexOf('position') === -1) {
            parent.position.copy(this._curve.getPoint(elapsedTime / this._duration + this._delta));
            events.push('position');
            if (this._lookat) {
              parent.lookAt(this._curve.getPoint(elapsedTime / this._duration + this._delta + 0.01));
              events.push('lookat');
            }
            return true;
          } else {
            return false;
          }
        case 'scale':
          if (events.indexOf('scale') === -1) {
            parent.scale.copy(this._curve.getPoint(elapsedTime / this._duration + this._delta));
            events.push('scale');
            return true;
          } else {
            return false;
          }
        case 'rotation':
          if (events.indexOf('rotation') === -1) {
            const rotation = this._curve.getPoint(elapsedTime / this._duration + this._delta);
            parent.rotation.copy(ThreeUtil.getEulerSafe(rotation.x, rotation.y, rotation.z));
            events.push('rotation');
            return true;
          } else {
            return false;
          }
        case 'lookat':
          if (events.indexOf('lookat') === -1) {
            parent.lookAt(this._curve.getPoint(elapsedTime / this._duration + this._delta));
            events.push('lookat');
            return true;
          } else {
            return false;
          }
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
    const v = t * (this.to - this.from) + this.from;
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
  constructor(private curve: THREE.Curve<THREE.Vector3>, private scale: THREE.Vector3, private rotation: THREE.Euler, private center: THREE.Vector3, private multiply: number, options: string) {
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
  }

  _absX: boolean = false;
  _absY: boolean = false;
  _absZ: boolean = false;
  _repeatType: string = 'repeat';
  getPoint(t: number, optionalTarget: THREE.Vector3): THREE.Vector3 {
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
    optionalTarget = this.curve.getPoint(t, optionalTarget);
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
}
