import * as THREE from 'three';
import { Curves } from 'three/examples/jsm/curves/CurveExtras';
import { RendererTimer, ThreeUtil } from '../interface';
import * as GSAP from 'gsap';

export interface CurvesParameters {
  radiusInner?: number;
  waveH?: number;
  waveR?: number;
  rateX?: number;
  rateY?: number;
  rateZ?: number;
}

export class CurvesPolygon extends THREE.Curve<THREE.Vector3> {
  private radius: number = 1;
  private radiusInner: number = 0;
  private waveH: number = 0;
  private waveR: number = 0;
  private rateX: number = 1;
  private rateY: number = 0.2;
  private rateZ: number = 1;

  points: THREE.Vector3[] = [];

  constructor(points: THREE.Vector3[] = [], radius: number = 1, options?: CurvesParameters) {
    super();
    this.points = points;
    this.radius = ThreeUtil.isNotNull(radius) ? radius : 1;
    this.radiusInner = ThreeUtil.isNotNull(options.radiusInner) ? options.radiusInner : -0.2;
    this.waveH = ThreeUtil.isNotNull(options.waveH) ? options.waveH : 0;
    this.waveR = ThreeUtil.isNotNull(options.waveR) ? options.waveR : 0;
    this.rateX = ThreeUtil.isNotNull(options.rateX) ? options.rateX : 1;
    this.rateY = ThreeUtil.isNotNull(options.rateY) ? options.rateY : 1;
    this.rateZ = ThreeUtil.isNotNull(options.rateZ) ? options.rateZ : 1;
    this._rateV = new THREE.Vector3(this.rateX, this.rateY, this.rateZ);
  }

  _rateV: THREE.Vector3 = null;
  clearPoints() {
    this.points = [];
  }

  addPoint(p: THREE.Vector3) {
    this.points.push(p);
  }

  getPoint(t: number, optionalTarget: THREE.Vector3) {
    const point = optionalTarget || new THREE.Vector3();
    const len = this.points.length;
    if (len >= 2) {
      const index = len * t;
      const prevIndex = t >= 1 ? len - 1 : Math.floor(index);
      const nextIndex = t >= 1 ? prevIndex : (prevIndex + 1) % len;
      const prevP = this.points[prevIndex].clone();
      const nextP = this.points[nextIndex].clone().sub(prevP);
      const waveT = index - prevIndex;
      const currentP = prevP.clone().addScaledVector(nextP, waveT);
      const waveP = new THREE.Vector3(0, 0, 0);
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
      return point.set(currentP.x, currentP.y, currentP.z).add(waveP.multiply(this._rateV)).multiplyScalar(this.radius);
    } else {
      return point;
    }
  }
}

export class CurvesRegularPolygon extends CurvesPolygon {
  constructor(vertex: number = 3, radius: number = 1, options: CurvesParameters = {}) {
    super([], radius, options);
    this.setVertex(vertex);
  }

  setVertex(vertex: number) {
    this.clearPoints();
    for (let i = 0; i < vertex; i++) {
      const t = (2 * Math.PI * i) / vertex;
      this.addPoint(new THREE.Vector3(Math.sin(t), 0, Math.cos(t)));
    }
  }
}

export class CurvesRegularPolygonTriangle extends CurvesRegularPolygon {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(3, radius, options || {});
  }
}
export class CurvesRegularPolygonSquare extends CurvesRegularPolygon {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(4, radius, options || {});
  }
}
export class CurvesRegularPolygonPentagon extends CurvesRegularPolygon {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(5, radius, options || {});
  }
}
export class CurvesRegularPolygonHexagon extends CurvesRegularPolygon {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(6, radius, options || {});
  }
}
export class CurvesRegularPolygonHeptagon extends CurvesRegularPolygon {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(7, radius, options || {});
  }
}
export class CurvesRegularPolygonOctagon extends CurvesRegularPolygon {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(8, radius, options || {});
  }
}
export class CurvesRegularPolygonNonagon extends CurvesRegularPolygon {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(9, radius, options || {});
  }
}
export class CurvesRegularPolygonDecagon extends CurvesRegularPolygon {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(10, radius, options || {});
  }
}
export class CurvesRegularPolygonUndecagon extends CurvesRegularPolygon {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(11, radius, options || {});
  }
}
export class CurvesRegularPolygonDodecagon extends CurvesRegularPolygon {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(12, radius, options || {});
  }
}

export class CurvesCircle extends THREE.Curve<THREE.Vector3> {
  private radius: number = 1;
  private radiusInner: number = 0;
  private waveH: number = 0;
  private waveR: number = 0;
  private rateX: number = 1;
  private rateY: number = 0.2;
  private rateZ: number = 1;
  constructor(radius: number = 1, options?: CurvesParameters) {
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
    const radius = this.waveR != 0 && this.radiusInner != 0 ? (Math.sin(t * this.waveR) * this.radiusInner + 1) * this.radius : this.radius;
    const y = this.waveH != 0 ? Math.sin(t * this.waveH) : 0;
    return point.set(Math.sin(t) * this.rateX, y * this.rateY, Math.cos(t) * this.rateZ).multiplyScalar(radius);
  }
}

export class CurvesLine extends THREE.Curve<THREE.Vector3> {
  private radius: number = 1;
  private radiusInner: number = 0;
  private waveH: number = 0;
  private waveR: number = 0;
  private rateX: number = 1;
  private rateY: number = 0.2;
  private rateZ: number = 1;
  constructor(radius: number = 1, options?: CurvesParameters) {
    super();
    options = options || {};
    this.radius = ThreeUtil.isNotNull(radius) ? radius : 1;
    this.radiusInner = ThreeUtil.isNotNull(options.radiusInner) ? options.radiusInner : 0;
    this.waveH = ThreeUtil.isNotNull(options.waveH) ? options.waveH : 0;
    this.waveR = ThreeUtil.isNotNull(options.waveR) ? options.waveR : 0;
    this.rateX = ThreeUtil.isNotNull(options.rateX) ? options.rateX : 1;
    this.rateY = ThreeUtil.isNotNull(options.rateY) ? options.rateY : 1;
    this.rateZ = ThreeUtil.isNotNull(options.rateZ) ? options.rateZ : 1;
  }

  getPoint(t: number, optionalTarget: THREE.Vector3) {
    const point = optionalTarget || new THREE.Vector3();
    const v = Math.max(-1, Math.min(1, t * 2 - 1));
    const y = this.waveH != 0 ? Math.sin(2 * Math.PI * t * this.waveH) : v;
    const radius = this.waveR != 0 && this.radiusInner != 0 ? (Math.sin(2 * Math.PI * t * this.waveR) * this.radiusInner + 1) * this.radius : this.radius;
    return point.set(v * this.rateX, y * this.rateY, v * this.rateZ).multiplyScalar(radius);
  }
}

export class CurvesGsap extends THREE.Curve<THREE.Vector3> {
  private easeFunction: (progress: number) => number;
  private radius: number = 1;
  private rateX: number = 1;
  private rateY: number = 0.2;
  private rateZ: number = 1;
  constructor(easeFunction: (progress: number) => number, radius: number = 1, options?: CurvesParameters) {
    super();
    this.easeFunction = easeFunction || GSAP.Power1.easeIn;
    options = options || {};
    this.radius = ThreeUtil.isNotNull(radius) ? radius : 1;
    this.rateX = ThreeUtil.isNotNull(options.rateX) ? options.rateX : 1;
    this.rateY = ThreeUtil.isNotNull(options.rateY) ? options.rateY : 1;
    this.rateZ = ThreeUtil.isNotNull(options.rateZ) ? options.rateZ : 1;
  }

  getPoint(t: number, optionalTarget: THREE.Vector3) {
    const point = optionalTarget || new THREE.Vector3();
    const v = Math.max(-1, Math.min(1, t * 2 - 1));
    let y = this.easeFunction(t) * 2 - 1;
    return point.set(v * this.rateX, y * this.rateY, y * this.rateZ).multiplyScalar(this.radius);
  }
}

export class CurvesGsapLinearEaseIn extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Linear.easeIn, radius, options);
  }
}

export class CurvesGsapLinearEaseInOut extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Linear.easeInOut, radius, options);
  }
}

export class CurvesGsapLinearEaseOut extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Linear.easeOut, radius, options);
  }
}

export class CurvesGsapLinearEaseNone extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Linear.easeNone, radius, options);
  }
}

export class CurvesGsapQuadEaseIn extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Quad.easeIn, radius, options);
  }
}

export class CurvesGsapQuadEaseInOut extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Quad.easeInOut, radius, options);
  }
}

export class CurvesGsapQuadEaseOut extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Quad.easeOut, radius, options);
  }
}

export class CurvesGsapCubicEaseIn extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Cubic.easeIn, radius, options);
  }
}

export class CurvesGsapCubicEaseInOut extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Cubic.easeInOut, radius, options);
  }
}

export class CurvesGsapCubicEaseOut extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Cubic.easeOut, radius, options);
  }
}

export class CurvesGsapQuartEaseIn extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Quart.easeIn, radius, options);
  }
}

export class CurvesGsapQuartEaseInOut extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Quart.easeInOut, radius, options);
  }
}

export class CurvesGsapQuartEaseOut extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Quart.easeOut, radius, options);
  }
}

export class CurvesGsapQuintEaseIn extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Quint.easeIn, radius, options);
  }
}

export class CurvesGsapQuintEaseInOut extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Quint.easeInOut, radius, options);
  }
}

export class CurvesGsapQuintEaseOut extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Quint.easeOut, radius, options);
  }
}

export class CurvesGsapStrongEaseIn extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Strong.easeIn, radius, options);
  }
}

export class CurvesGsapStrongEaseInOut extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Strong.easeInOut, radius, options);
  }
}

export class CurvesGsapStrongEaseOut extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Strong.easeOut, radius, options);
  }
}

export class CurvesGsapPower1EaseIn extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Power1.easeIn, radius, options);
  }
}
export class CurvesGsapPower1EaseInOut extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Power1.easeInOut, radius, options);
  }
}
export class CurvesGsapPower1EaseOut extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Power1.easeOut, radius, options);
  }
}
export class CurvesGsapPower2EaseIn extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Power2.easeIn, radius, options);
  }
}
export class CurvesGsapPower2EaseInOut extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Power2.easeInOut, radius, options);
  }
}
export class CurvesGsapPower2EaseOut extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Power2.easeOut, radius, options);
  }
}
export class CurvesGsapPower3EaseIn extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Power3.easeIn, radius, options);
  }
}
export class CurvesGsapPower3EaseInOut extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Power3.easeInOut, radius, options);
  }
}
export class CurvesGsapPower3EaseOut extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Power3.easeOut, radius, options);
  }
}
export class CurvesGsapPower4EaseIn extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Power4.easeIn, radius, options);
  }
}
export class CurvesGsapPower4EaseInOut extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Power4.easeInOut, radius, options);
  }
}
export class CurvesGsapPower4EaseOut extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Power4.easeOut, radius, options);
  }
}
export class CurvesGsapBackEaseIn extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Back.easeIn, radius, options);
  }
}
export class CurvesGsapBackEaseInOut extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Back.easeInOut, radius, options);
  }
}
export class CurvesGsapBackEaseOut extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Back.easeOut, radius, options);
  }
}
export class CurvesGsapElasticEaseIn extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Elastic.easeIn, radius, options);
  }
}
export class CurvesGsapElasticEaseInOut extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Elastic.easeInOut, radius, options);
  }
}
export class CurvesGsapElasticEaseOut extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Elastic.easeOut, radius, options);
  }
}
export class CurvesGsapBounceEaseIn extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Bounce.easeIn, radius, options);
  }
}
export class CurvesGsapBounceEaseInOut extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Bounce.easeInOut, radius, options);
  }
}
export class CurvesGsapBounceEaseOut extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Bounce.easeOut, radius, options);
  }
}
export class CurvesGsapCircEaseIn extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Circ.easeIn, radius, options);
  }
}
export class CurvesGsapCircEaseInOut extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Circ.easeInOut, radius, options);
  }
}
export class CurvesGsapCircEaseOut extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Circ.easeOut, radius, options);
  }
}
export class CurvesGsapExpoEaseIn extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Expo.easeIn, radius, options);
  }
}
export class CurvesGsapExpoEaseInOut extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Expo.easeInOut, radius, options);
  }
}
export class CurvesGsapExpoEaseOut extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Expo.easeOut, radius, options);
  }
}
export class CurvesGsapSineEaseIn extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Sine.easeIn, radius, options);
  }
}
export class CurvesGsapSineEaseInOut extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Sine.easeInOut, radius, options);
  }
}
export class CurvesGsapSineEaseOut extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Sine.easeOut, radius, options);
  }
}
export class CurvesGsapPower0EaseNone extends CurvesGsap {
  constructor(radius: number = 1, options?: CurvesParameters) {
    super(GSAP.Power0.easeNone, radius, options);
  }
}

export interface CurveClass {
  new (scale?: number, options?: any): THREE.Curve<THREE.Vector3>;
}
export const CurveConf: {
  [key: string]: CurveClass | string;
} = {
  grannyknotcurve: Curves.GrannyKnot,
  grannyknot: 'grannyknotcurve',
  heartcurve: Curves.HeartCurve,
  heart: 'heartcurve',
  vivianicurve: Curves.VivianiCurve,
  viviani: 'vivianicurve',
  knotcurve: Curves.KnotCurve,
  knot: 'knotcurve',
  helixcurve: Curves.HelixCurve,
  helix: 'helixcurve',
  trefoilknotcurve: Curves.TrefoilKnot,
  trefoilknot: 'trefoilknotcurve',
  torusknotcurve: Curves.TorusKnot,
  torusknot: 'torusknotcurve',
  cinquefoilknotcurve: Curves.CinquefoilKnot,
  cinquefoilknot: 'cinquefoilknotcurve',
  trefoilpolynomialknotcurve: Curves.TrefoilPolynomialKnot,
  trefoilpolynomialknot: 'trefoilpolynomialknotcurve',
  decoratedtorusknot4bcurve: Curves.DecoratedTorusKnot4b,
  decoratedtorusknot4b: 'decoratedtorusknot4bcurve',
  decoratedtorusknot4acurve: Curves.DecoratedTorusKnot4a,
  decoratedtorusknot4a: 'decoratedtorusknot4acurve',
  figureeightpolynomialknotcurve: Curves.FigureEightPolynomialKnot,
  figureeightpolynomialknot: 'figureeightpolynomialknotcurve',
  decoratedtorusknot5acurve: Curves.DecoratedTorusKnot5a,
  decoratedtorusknot5a: 'decoratedtorusknot5acurve',
  decoratedtorusknot5ccurve: Curves.DecoratedTorusKnot5c,
  decoratedtorusknot5c: 'decoratedtorusknot5ccurve',
  circlecurve: CurvesCircle,
  circle: 'circlecurve',
  linecurve: CurvesLine,
  line: 'linecurve',
  trianglecurve: CurvesRegularPolygonTriangle,
  triangle: 'trianglecurve',
  squarecurve: CurvesRegularPolygonSquare,
  square: 'squarecurve',
  pentagoncurve: CurvesRegularPolygonPentagon,
  pentagon: 'pentagoncurve',
  hexagoncurve: CurvesRegularPolygonHexagon,
  hexagon: 'hexagoncurve',
  heptagoncurve: CurvesRegularPolygonHeptagon,
  heptagon: 'heptagoncurve',
  octagoncurve: CurvesRegularPolygonOctagon,
  octagon: 'octagoncurve',
  nonagoncurve: CurvesRegularPolygonNonagon,
  nonagon: 'nonagoncurve',
  decagoncurve: CurvesRegularPolygonDecagon,
  decagon: 'decagoncurve',
  undecagoncurve: CurvesRegularPolygonUndecagon,
  undecagon: 'undecagoncurve',
  dodecagoncurve: CurvesRegularPolygonDodecagon,
  dodecagon: 'dodecagoncurve',
  linearincurve: CurvesGsapLinearEaseIn,
  linearin: 'linearincurve',
  linearinoutcurve: CurvesGsapLinearEaseInOut,
  linearinout: 'linearinoutcurve',
  linearoutcurve: CurvesGsapLinearEaseOut,
  linearout: 'linearoutcurve',
  lineareasenonecurve: CurvesGsapLinearEaseNone,
  lineareasenone: 'lineareasenonecurve',
  quadincurve: CurvesGsapQuadEaseIn,
  quadin: 'quadincurve',
  quadinoutcurve: CurvesGsapQuadEaseInOut,
  quadinout: 'quadinoutcurve',
  quadoutcurve: CurvesGsapQuadEaseOut,
  quadout: 'quadoutcurve',
  cubicincurve: CurvesGsapCubicEaseIn,
  cubicin: 'cubicincurve',
  cubicinoutcurve: CurvesGsapCubicEaseInOut,
  cubicinout: 'cubicinoutcurve',
  cubicoutcurve: CurvesGsapCubicEaseOut,
  cubicout: 'cubicoutcurve',
  quartincurve: CurvesGsapQuartEaseIn,
  quartin: 'quartincurve',
  quartinoutcurve: CurvesGsapQuartEaseInOut,
  quartinout: 'quartinoutcurve',
  quartoutcurve: CurvesGsapQuartEaseOut,
  quartout: 'quartoutcurve',
  quintincurve: CurvesGsapQuintEaseIn,
  quintin: 'quintincurve',
  quintinoutcurve: CurvesGsapQuintEaseInOut,
  quintinout: 'quintinoutcurve',
  quintoutcurve: CurvesGsapQuintEaseOut,
  quintout: 'quintoutcurve',
  strongincurve: CurvesGsapStrongEaseIn,
  strongin: 'strongincurve',
  stronginoutcurve: CurvesGsapStrongEaseInOut,
  stronginout: 'stronginoutcurve',
  strongoutcurve: CurvesGsapStrongEaseOut,
  strongout: 'strongoutcurve',
  power1incurve: CurvesGsapPower1EaseIn,
  power1in: 'power1incurve',
  power1inoutcurve: CurvesGsapPower1EaseInOut,
  power1inout: 'power1inoutcurve',
  power1outcurve: CurvesGsapPower1EaseOut,
  power1out: 'power1outcurve',
  power2incurve: CurvesGsapPower2EaseIn,
  power2in: 'power2incurve',
  power2inoutcurve: CurvesGsapPower2EaseInOut,
  power2inout: 'power2inoutcurve',
  power2outcurve: CurvesGsapPower2EaseOut,
  power2out: 'power2outcurve',
  power3incurve: CurvesGsapPower3EaseIn,
  power3in: 'power3incurve',
  power3inoutcurve: CurvesGsapPower3EaseInOut,
  power3inout: 'power3inoutcurve',
  power3outcurve: CurvesGsapPower3EaseOut,
  power3out: 'power3outcurve',
  power4incurve: CurvesGsapPower4EaseIn,
  power4in: 'power4incurve',
  power4inoutcurve: CurvesGsapPower4EaseInOut,
  power4inout: 'power4inoutcurve',
  power4outcurve: CurvesGsapPower4EaseOut,
  power4out: 'power4outcurve',
  backincurve: CurvesGsapBackEaseIn,
  backin: 'backincurve',
  backinoutcurve: CurvesGsapBackEaseInOut,
  backinout: 'backinoutcurve',
  backoutcurve: CurvesGsapBackEaseOut,
  backout: 'backoutcurve',
  elasticincurve: CurvesGsapElasticEaseIn,
  elasticin: 'elasticincurve',
  elasticinoutcurve: CurvesGsapElasticEaseInOut,
  elasticinout: 'elasticinoutcurve',
  elasticoutcurve: CurvesGsapElasticEaseOut,
  elasticout: 'elasticoutcurve',
  bounceincurve: CurvesGsapBounceEaseIn,
  bouncein: 'bounceincurve',
  bounceinoutcurve: CurvesGsapBounceEaseInOut,
  bounceinout: 'bounceinoutcurve',
  bounceoutcurve: CurvesGsapBounceEaseOut,
  bounceout: 'bounceoutcurve',
  circincurve: CurvesGsapCircEaseIn,
  circin: 'circincurve',
  circinoutcurve: CurvesGsapCircEaseInOut,
  circinout: 'circinoutcurve',
  circoutcurve: CurvesGsapCircEaseOut,
  circout: 'circoutcurve',
  expoincurve: CurvesGsapExpoEaseIn,
  expoin: 'expoincurve',
  expoinoutcurve: CurvesGsapExpoEaseInOut,
  expoinout: 'expoinoutcurve',
  expooutcurve: CurvesGsapExpoEaseOut,
  expoout: 'expooutcurve',
  sineincurve: CurvesGsapSineEaseIn,
  sinein: 'sineincurve',
  sineinoutcurve: CurvesGsapSineEaseInOut,
  sineinout: 'sineinoutcurve',
  sineoutcurve: CurvesGsapSineEaseOut,
  sineout: 'sineoutcurve',
  power0nonecurve: CurvesGsapPower0EaseNone,
  power0none: 'power0nonecurve',
};

export class CurveUtils {
  static addCurve(key: string, curve: CurveClass, alias?: string[]) {
    key = key.toLowerCase();
    if (ThreeUtil.isNotNull(alias)) {
      alias.forEach((aliasKey) => {
        if (aliasKey !== null && aliasKey.length > 3) {
          CurveConf[aliasKey.toLowerCase()] = key;
        }
      });
    }
    CurveConf[key] = curve;
  }

  static getCurveClass(key: string): CurveClass {
    key = key.toLowerCase();
    if (ThreeUtil.isNotNull(CurveConf[key])) {
      const curve = CurveConf[key.toLowerCase()];
      if (typeof curve === 'string') {
        return this.getCurveClass(curve);
      } else {
        return curve;
      }
    } else {
      console.error('unknown curve :' + key);
      return CurvesLine;
    }
  }

  static getCurve(key: string, scale?: number, options?: any): THREE.Curve<THREE.Vector3> {
    return new (this.getCurveClass(key))(scale, options);
  }

  static getCurveNormal(key: string | THREE.Curve<THREE.Vector3>, normalOption?: CurvesNormalParameters, option?: any): CurvesNormal {
    if (key instanceof THREE.Curve) {
      return new CurvesNormal(key, normalOption);
    } else {
      return new CurvesNormal(this.getCurve(key, option), normalOption);
    }
  }
}

export interface CurvesNormalParameters {
  scale?: THREE.Vector3;
  rotation?: THREE.Euler;
  center?: THREE.Vector3;
  multiply?: number;
  options?: string;
}

export class CurvesNormal extends THREE.Curve<THREE.Vector3> {
  private scale: THREE.Vector3 = null;
  private rotation: THREE.Euler = null;
  private center: THREE.Vector3 = null;
  private multiply: number = null;
  constructor(curve: THREE.Curve<THREE.Vector3>, parameters: CurvesNormalParameters) {
    super();
    parameters = parameters || {};
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

  setOptions(options: string) {
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
          case 'once':
            this._repeatType = 'once';
            break;
          case 'repeat':
            this._repeatType = 'repeat';
            break;
          case 'yoyo':
            this._repeatType = 'yoyo';
            break;
        }
      });
    }
  }

  setCurve(curve: THREE.Curve<THREE.Vector3>) {
    let minX = +Infinity;
    let minY = +Infinity;
    let minZ = +Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    let maxZ = -Infinity;
    for (let i = 0; i <= 1; i += 0.02) {
      const v = curve.getPoint(i);
      minX = Math.min(minX, v.x);
      minY = Math.min(minY, v.y);
      minZ = Math.min(minZ, v.z);
      maxX = Math.max(maxX, v.x);
      maxY = Math.max(maxY, v.y);
      maxZ = Math.max(maxZ, v.z);
    }
    this.curve = curve;
    this._center = new THREE.Vector3(minX + maxX, minY + maxY, minZ + maxZ).multiplyScalar(0.5);
    const maxL = Math.max(maxX - minX, maxY - minY, maxZ - minZ);
    this._scale = new THREE.Vector3(1, 1, 1);
    if (maxL > 2.5) {
      this._scale.multiplyScalar(2 / maxL);
    }
  }
  private _center: THREE.Vector3 = null;
  private _scale: THREE.Vector3 = null;
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

  private getElapsedTime(timer: RendererTimer): number {
    let t: number = timer.elapsedTime;
    switch (this._repeatType.toLowerCase()) {
      case 'yoyo':
        t = t % 2;
        if (t > 1) {
          t = 2 - t;
        }
        break;
      case 'once':
        t = Math.max(0, Math.min(1, t));
        break;
      default:
        t = t % 1;
        break;
    }
    return t;
  }

  private _lastV3: THREE.Vector3 = null;
  public referCenter: THREE.Vector3 = null;

  getPointV3(timer: RendererTimer, p: THREE.Vector3): THREE.Vector3 {
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

  private _lastV2: THREE.Vector2 = null;
  getPointV2(timer: RendererTimer, p: THREE.Vector2): THREE.Vector2 {
    const cp = this.getPoint(this.getElapsedTime(timer));
    if (this._lastV2 === null) {
      this._lastV2 = new THREE.Vector2(cp.x, cp.y);
    } else {
      this._lastV2.set(cp.x, cp.y);
    }
    p.copy(this._lastV2);
    return this._lastV2;
  }

  private _lastEuler: THREE.Euler = null;
  getPointEuler(timer: RendererTimer, p: THREE.Euler): THREE.Euler {
    const cp = this.getPoint(this.getElapsedTime(timer));
    if (this._lastEuler == null) {
      this._lastEuler = new THREE.Euler(cp.x, cp.y, cp.z);
    } else {
      this._lastEuler.set(cp.x, cp.y, cp.z);
    }
    p.copy(this._lastEuler);
    return this._lastEuler;
  }

  private _lastColor: THREE.Color = null;

  getPointColor(timer: RendererTimer, p: THREE.Color): THREE.Color {
    const cp = this.getPoint(this.getElapsedTime(timer));
    cp.clampScalar(0, 1);
    if (this._lastColor == null) {
      this._lastColor = new THREE.Color(cp.x, cp.y, cp.z);
    } else {
      this._lastColor.setRGB(cp.x, cp.y, cp.z);
    }
    p.copy(this._lastColor);
    return this._lastColor;
  }

  private _lastFloat: THREE.Vector3 = null;

  getPointFloat(timer: RendererTimer, min: number = 0, max: number = 1): number {
    if (this._lastFloat === null) {
      this._lastFloat = new THREE.Vector3();
    }
    this.getPointV3(timer, this._lastFloat);
    const length = Math.max(0, Math.min(1, (this._lastFloat.y + 1) / 2));
    return min + (max - min) * length;
  }
}
