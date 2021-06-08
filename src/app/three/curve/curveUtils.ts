
import * as THREE from 'three';
import { Curves } from 'three/examples/jsm/curves/CurveExtras';
import { RendererTimer, ThreeUtil } from '../interface';

export interface CurvesParameters {
  radiusInner?: number;
  waveH?: number;
  waveR?: number;
  rateX?: number;
  rateY?: number;
  rateZ?: number;
}

export class CurvesPolygon extends THREE.Curve<THREE.Vector3> {

  private radius: number = 1 ;
  private radiusInner: number = 0;
  private waveH: number = 0;
  private waveR: number = 0;
  private rateX: number = 1;
  private rateY: number = 0.2;
  private rateZ: number = 1;

  points : THREE.Vector3[] = [];

  constructor(points : THREE.Vector3[] = [], radius : number = 1, options? : CurvesParameters ) {
    super();
    this.points = points;
    this.radius = ThreeUtil.isNotNull(radius) ? radius : 1;
    this.radiusInner = ThreeUtil.isNotNull(options.radiusInner) ? options.radiusInner : -0.2;
    this.waveH = ThreeUtil.isNotNull(options.waveH) ? options.waveH : 0;
    this.waveR = ThreeUtil.isNotNull(options.waveR) ? options.waveR : 0;
    this.rateX = ThreeUtil.isNotNull(options.rateX) ? options.rateX : 1;
    this.rateY = ThreeUtil.isNotNull(options.rateY) ? options.rateY : 0.2;
    this.rateZ = ThreeUtil.isNotNull(options.rateZ) ? options.rateZ : 1;
    this._rateV = new THREE.Vector3(this.rateX, this.rateY, this.rateZ);
  }

  _rateV : THREE.Vector3 = null;
  clearPoints() {
    this.points = [];
  }

  addPoint(p : THREE.Vector3) {
    this.points.push(p);
  }

  getPoint(t: number, optionalTarget: THREE.Vector3) {
    const point = optionalTarget || new THREE.Vector3();
    if (this.points.length >= 2) {
      const len = this.points.length;
      const index = this.points.length * t;
      const prevIndex = Math.floor(index) % len;
      const nextIndex = (prevIndex + 1) % len;
      const prevP = this.points[prevIndex].clone();
      const nextP = this.points[nextIndex].clone().sub(prevP);
      const waveT = index - prevIndex;
      const currentP = prevP.clone().addScaledVector(nextP, waveT);
      const waveP = new THREE.Vector3();
      if (this.waveH != 0) {
        const waveR = t * 2 * Math.PI;
        waveP.y = Math.sin(waveR * this.waveH);
      }
      if (this.radiusInner != 0 && this.waveR !== 0) {
        const waveR = t * 2 * Math.PI;
        const radiusInner = Math.sin(waveR) * this.radiusInner;
        waveP.x = Math.sin(waveR * len) * radiusInner;
        waveP.z = Math.cos(waveR * len) * radiusInner;
      }
      return point.set(currentP.x,currentP.y,currentP.z).add(waveP.multiply(this._rateV)).multiplyScalar(this.radius);
    } else {
      return point;
    }
  }
}

export class CurvesRegularPolygon extends CurvesPolygon {
  constructor(vertex : number = 3 , radius : number = 1, options : CurvesParameters = {}) {
    super([], radius, options);
    this.setVertex(vertex);
  }

  setVertex(vertex : number) {
    this.clearPoints();
    for(let i = 0 ; i < vertex; i++) {
      const t = 2 * Math.PI * i / vertex;
      this.addPoint(new THREE.Vector3(Math.sin(t), 0, Math.cos(t)));
    }
  }
}

export class CurvesRegularPolygonTriangle extends CurvesRegularPolygon {
  constructor(radius : number = 1, options? : CurvesParameters ) {
    super(3, radius, options || {});
  }
}
export class CurvesRegularPolygonSquare extends CurvesRegularPolygon {
  constructor(radius : number = 1, options? : CurvesParameters ) {
    super(4, radius, options || {});
  }
}
export class CurvesRegularPolygonPentagon extends CurvesRegularPolygon {
  constructor(radius : number = 1, options? : CurvesParameters ) {
    super(5, radius, options || {});
  }
}
export class CurvesRegularPolygonHexagon extends CurvesRegularPolygon {
  constructor(radius : number = 1, options? : CurvesParameters ) {
    super(6, radius, options || {});
  }
}
export class CurvesRegularPolygonHeptagon extends CurvesRegularPolygon {
  constructor(radius : number = 1, options? : CurvesParameters ) {
    super(7, radius, options || {});
  }
}
export class CurvesRegularPolygonOctagon extends CurvesRegularPolygon {
  constructor(radius : number = 1, options? : CurvesParameters ) {
    super(8, radius, options || {});
  }
}
export class CurvesRegularPolygonNonagon extends CurvesRegularPolygon {
  constructor(radius : number = 1, options? : CurvesParameters ) {
    super(9, radius, options || {});
  }
}
export class CurvesRegularPolygonDecagon extends CurvesRegularPolygon {
  constructor(radius : number = 1, options? : CurvesParameters ) {
    super(10, radius, options || {});
  }
}
export class CurvesRegularPolygonUndecagon extends CurvesRegularPolygon {
  constructor(radius : number = 1, options? : CurvesParameters ) {
    super(11, radius, options || {});
  }
}
export class CurvesRegularPolygonDodecagon extends CurvesRegularPolygon {
  constructor(radius : number = 1, options? : CurvesParameters ) {
    super(12, radius, options || {});
  }
}


export class CurvesCircle extends THREE.Curve<THREE.Vector3> {
  private radius: number = 1 ;
  private radiusInner: number = 0;
  private waveH: number = 0;
  private waveR: number = 0;
  private rateX: number = 1;
  private rateY: number = 0.2;
  private rateZ: number = 1;
  constructor(radius : number = 1, options? : CurvesParameters ) {
    super();
    options = options || {};
    this.radius = ThreeUtil.isNotNull(radius) ? radius : 1;
    this.radiusInner = ThreeUtil.isNotNull(options.radiusInner) ? options.radiusInner : -0.2;
    this.waveH = ThreeUtil.isNotNull(options.waveH) ? options.waveH : 0;
    this.waveR = ThreeUtil.isNotNull(options.waveR) ? options.waveR : 0;
    this.rateX = ThreeUtil.isNotNull(options.rateX) ? options.rateX : 1;
    this.rateY = ThreeUtil.isNotNull(options.rateY) ? options.rateY : 0.2;
    this.rateZ = ThreeUtil.isNotNull(options.rateZ) ? options.rateZ : 1;
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
  private radius: number = 1 ;
  private radiusInner: number = 0;
  private waveH: number = 0;
  private waveR: number = 0;
  private rateX: number = 1;
  private rateY: number = 0.2;
  private rateZ: number = 1;
  constructor(radius : number = 1, options? : CurvesParameters ) {
    super();
    options = options || {};
    this.radius = ThreeUtil.isNotNull(radius) ? radius : 1;
    this.radiusInner = ThreeUtil.isNotNull(options.radiusInner) ? options.radiusInner : 0;
    this.waveH = ThreeUtil.isNotNull(options.waveH) ? options.waveH : 0;
    this.waveR = ThreeUtil.isNotNull(options.waveR) ? options.waveR : 0;
    this.rateX = ThreeUtil.isNotNull(options.rateX) ? options.rateX : 1;
    this.rateY = ThreeUtil.isNotNull(options.rateY) ? options.rateY : 0.2;
    this.rateZ = ThreeUtil.isNotNull(options.rateZ) ? options.rateZ : 1;
  }

  getPoint(t: number, optionalTarget: THREE.Vector3) {
    const point = optionalTarget || new THREE.Vector3();
    const v = (t % 1) * 2 - 1;
    const y = this.waveH != 0  ? Math.sin(2 * Math.PI * t * this.waveH) : 0;
    const radius = this.waveR != 0 && this.radiusInner != 0 ? (Math.sin(2 * Math.PI * t * this.waveR) * this.radiusInner + 1 ) * this.radius : this.radius;
    return point.set(v * this.rateX, y * this.rateY, v * this.rateZ).multiplyScalar(radius);
  }
}

export interface CurveClass {
  new (scale? : number, options?:any): THREE.Curve<THREE.Vector3>
}
export const CurveConf : {
  [key : string] : CurveClass
} = {
  grannyknot : Curves.GrannyKnot,
  heartcurve : Curves.HeartCurve,
  vivianicurve :Curves.VivianiCurve,
  knotcurve : Curves.KnotCurve,
  helixcurve : Curves.HelixCurve,
  trefoilknot : Curves.TrefoilKnot,
  torusknot : Curves.TorusKnot,
  cinquefoilknot : Curves.CinquefoilKnot,
  trefoilpolynomialknot : Curves.TrefoilPolynomialKnot,
  decoratedtorusknot4b : Curves.DecoratedTorusKnot4b,
  decoratedtorusknot4a : Curves.DecoratedTorusKnot4a,
  figureeightpolynomialknot :Curves.FigureEightPolynomialKnot,
  decoratedtorusknot5a : Curves.DecoratedTorusKnot5a,
  decoratedtorusknot5c : Curves.DecoratedTorusKnot5c,
  circle : CurvesCircle,
  line : CurvesLine,
  triangle : CurvesRegularPolygonTriangle,
  square : CurvesRegularPolygonSquare,
  pentagon : CurvesRegularPolygonPentagon,
  hexagon : CurvesRegularPolygonHexagon,
  heptagon : CurvesRegularPolygonHeptagon,
  octagon : CurvesRegularPolygonOctagon,
  nonagon : CurvesRegularPolygonNonagon,
  decagon : CurvesRegularPolygonDecagon,
  undecagon : CurvesRegularPolygonUndecagon,
  dodecagon : CurvesRegularPolygonDodecagon,
}

export  class CurveUtils {
  static addCurve(key : string , curve : CurveClass) {
    CurveConf[key.toLowerCase()] = curve;   
  }

  static getCurveClass(key : string) :CurveClass {
    if (ThreeUtil.isNotNull(CurveConf[key.toLowerCase()])) {
      return CurveConf[key.toLowerCase()];
    } else {
      console.error('known shader :' + key);
      return CurvesLine;
    }
  }

  static getCurve(key : string, scale? : number, options? : any) :THREE.Curve<THREE.Vector3> {
    return new (this.getCurveClass(key))(scale, options);
  }

  static getCurveNormal(key : string | THREE.Curve<THREE.Vector3> , normalOption? : CurvesNormalParameters, option? : any) :CurvesNormal {
    if (key instanceof THREE.Curve) {
      return new CurvesNormal(key, normalOption);
    } else {
      return new CurvesNormal(this.getCurve(key,option), normalOption);
    }
  }
}


export interface CurvesNormalParameters {
  scale?: THREE.Vector3, 
  rotation?: THREE.Euler, 
  center?: THREE.Vector3, 
  multiply?: number, 
  options?: string
}


export class CurvesNormal extends THREE.Curve<THREE.Vector3> {
  private scale: THREE.Vector3 = null;
  private rotation: THREE.Euler = null;
  private center: THREE.Vector3 = null;
  private multiply: number = null;
  constructor(curve: THREE.Curve<THREE.Vector3>, parameters : CurvesNormalParameters) {
    super();
    parameters = parameters || {}
    if (ThreeUtil.isNotNull(parameters.rotation)) {
      this.rotation = parameters.rotation;
    }
    if (ThreeUtil.isNotNull(parameters.scale)) {
      this.scale = parameters.scale;
    }
    if (ThreeUtil.isNotNull(parameters.center)) {
      this.center = parameters.center;
    }
    if (ThreeUtil.isNotNull(parameters.multiply)) {
      this.multiply = parameters.multiply;
    }
    if (ThreeUtil.isNull(this.multiply) || this.multiply === 1) {
      this.multiply = null;
    }
    this.setOptions(parameters.options);
    this.setCurve(curve);
  }

  curve: THREE.Curve<THREE.Vector3> = null;

  setOptions(options : string) {
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
  }

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
