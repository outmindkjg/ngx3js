import * as GSAP from 'gsap';
import * as THREE from 'three';
import { Curves } from 'three/examples/jsm/curves/CurveExtras';
import { RendererTimer, ThreeUtil } from '../interface';

/**
 * Curves parameters
 */
export interface CurvesParameters {
	radiusInner?: number;
	waveH?: number;
	waveR?: number;
	rateX?: number;
	rateY?: number;
	rateZ?: number;
}

/**
 * Curves polygon
 */
export class CurvesPolygon extends THREE.Curve<THREE.Vector3> {
	/**
	 * Radius  of curves polygon
	 */
	private radius: number = 1;

	/**
	 * Radius inner of curves polygon
	 */
	private radiusInner: number = 0;

	/**
	 * Wave h of curves polygon
	 */
	private waveH: number = 0;

	/**
	 * Wave r of curves polygon
	 */
	private waveR: number = 0;

	/**
	 * Rate x of curves polygon
	 */
	private rateX: number = 1;

	/**
	 * Rate y of curves polygon
	 */
	private rateY: number = 0.2;

	/**
	 * Rate z of curves polygon
	 */
	private rateZ: number = 1;

	/**
	 * Points  of curves polygon
	 */
	public points: THREE.Vector3[] = [];

	/**
	 * Creates an instance of curves polygon.
	 * @param [points]
	 * @param [radius]
	 * @param [options]
	 */
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

	/**
	 * Rate v of curves polygon
	 */
	private _rateV: THREE.Vector3 = null;

	/**
	 * Clears points
	 */
	public clearPoints() {
		this.points = [];
	}

	/**
	 * Adds point
	 * @param p
	 */
	public addPoint(p: THREE.Vector3) {
		this.points.push(p);
	}

	/**
	 * Gets point
	 * @param t
	 * @param optionalTarget
	 * @returns
	 */
	public getPoint(t: number, optionalTarget: THREE.Vector3) {
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

/**
 * Curves regular polygon
 */
export class CurvesRegularPolygon extends CurvesPolygon {
	/**
	 * Creates an instance of curves regular polygon.
	 * @param [vertex]
	 * @param [radius]
	 * @param [options]
	 */
	constructor(vertex: number = 3, radius: number = 1, options: CurvesParameters = {}) {
		super([], radius, options);
		this.setVertex(vertex);
	}

	/**
	 * Sets vertex
	 * @param vertex
	 */
	public setVertex(vertex: number) {
		this.clearPoints();
		for (let i = 0; i < vertex; i++) {
			const t = (2 * Math.PI * i) / vertex;
			this.addPoint(new THREE.Vector3(Math.sin(t), 0, Math.cos(t)));
		}
	}
}

/**
 * Curves regular polygon triangle
 */
export class CurvesRegularPolygonTriangle extends CurvesRegularPolygon {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(3, radius, options || {});
	}
}

/**
 * Curves regular polygon square
 */
export class CurvesRegularPolygonSquare extends CurvesRegularPolygon {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(4, radius, options || {});
	}
}

/**
 * Curves regular polygon pentagon
 */
export class CurvesRegularPolygonPentagon extends CurvesRegularPolygon {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(5, radius, options || {});
	}
}

/**
 * Curves regular polygon hexagon
 */
export class CurvesRegularPolygonHexagon extends CurvesRegularPolygon {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(6, radius, options || {});
	}
}

/**
 * Curves regular polygon heptagon
 */
export class CurvesRegularPolygonHeptagon extends CurvesRegularPolygon {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(7, radius, options || {});
	}
}

/**
 * Curves regular polygon octagon
 */
export class CurvesRegularPolygonOctagon extends CurvesRegularPolygon {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(8, radius, options || {});
	}
}

/**
 * Curves regular polygon nonagon
 */
export class CurvesRegularPolygonNonagon extends CurvesRegularPolygon {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(9, radius, options || {});
	}
}

/**
 * Curves regular polygon decagon
 */
export class CurvesRegularPolygonDecagon extends CurvesRegularPolygon {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(10, radius, options || {});
	}
}

/**
 * Curves regular polygon undecagon
 */
export class CurvesRegularPolygonUndecagon extends CurvesRegularPolygon {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(11, radius, options || {});
	}
}

/**
 * Curves regular polygon dodecagon
 */
export class CurvesRegularPolygonDodecagon extends CurvesRegularPolygon {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(12, radius, options || {});
	}
}

/**
 * Curves circle
 */
export class CurvesCircle extends THREE.Curve<THREE.Vector3> {
	/**
	 * Radius  of curves circle
	 */
	private radius: number = 1;

	/**
	 * Radius inner of curves circle
	 */
	private radiusInner: number = 0;

	/**
	 * Wave h of curves circle
	 */
	private waveH: number = 0;

	/**
	 * Wave r of curves circle
	 */
	private waveR: number = 0;

	/**
	 * Rate x of curves circle
	 */
	private rateX: number = 1;

	/**
	 * Rate y of curves circle
	 */
	private rateY: number = 0.2;

	/**
	 * Rate z of curves circle
	 */
	private rateZ: number = 1;

	/**
	 * Creates an instance of curves circle.
	 * @param [radius]
	 * @param [options]
	 */
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

	/**
	 * Gets point
	 * @param t
	 * @param optionalTarget
	 * @returns
	 */
	public getPoint(t: number, optionalTarget: THREE.Vector3) {
		const point = optionalTarget || new THREE.Vector3();
		t = 2 * Math.PI * t;
		const radius = this.waveR != 0 && this.radiusInner != 0 ? (Math.sin(t * this.waveR) * this.radiusInner + 1) * this.radius : this.radius;
		const y = this.waveH != 0 ? Math.sin(t * this.waveH) : 0;
		return point.set(Math.sin(t) * this.rateX, y * this.rateY, Math.cos(t) * this.rateZ).multiplyScalar(radius);
	}
}

/**
 * Curves line
 */
export class CurvesLine extends THREE.Curve<THREE.Vector3> {
	/**
	 * Radius  of curves line
	 */
	private radius: number = 1;

	/**
	 * Radius inner of curves line
	 */
	private radiusInner: number = 0;

	/**
	 * Wave h of curves line
	 */
	private waveH: number = 0;

	/**
	 * Wave r of curves line
	 */
	private waveR: number = 0;

	/**
	 * Rate x of curves line
	 */
	private rateX: number = 1;

	/**
	 * Rate y of curves line
	 */
	private rateY: number = 0.2;

	/**
	 * Rate z of curves line
	 */
	private rateZ: number = 1;

	/**
	 * Creates an instance of curves line.
	 * @param [radius]
	 * @param [options]
	 */
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

	/**
	 * Gets point
	 * @param t
	 * @param optionalTarget
	 * @returns
	 */
	public getPoint(t: number, optionalTarget: THREE.Vector3) {
		const point = optionalTarget || new THREE.Vector3();
		const v = Math.max(-1, Math.min(1, t * 2 - 1));
		const y = this.waveH != 0 ? Math.sin(2 * Math.PI * t * this.waveH) : v;
		const radius = this.waveR != 0 && this.radiusInner != 0 ? (Math.sin(2 * Math.PI * t * this.waveR) * this.radiusInner + 1) * this.radius : this.radius;
		return point.set(v * this.rateX, y * this.rateY, v * this.rateZ).multiplyScalar(radius);
	}
}

/**
 * Curves gsap
 */
export class CurvesGsap extends THREE.Curve<THREE.Vector3> {
	/**
	 * Ease function of curves gsap
	 */
	private easeFunction: (progress: number) => number;

	/**
	 * Radius  of curves gsap
	 */
	private radius: number = 1;

	/**
	 * Rate x of curves gsap
	 */
	private rateX: number = 1;

	/**
	 * Rate y of curves gsap
	 */
	private rateY: number = 0.2;

	/**
	 * Rate z of curves gsap
	 */
	private rateZ: number = 1;

	/**
	 * Creates an instance of curves gsap.
	 * @param easeFunction
	 * @param [radius]
	 * @param [options]
	 */
	constructor(easeFunction: (progress: number) => number, radius: number = 1, options?: CurvesParameters) {
		super();
		this.easeFunction = easeFunction || GSAP.Power1.easeIn;
		options = options || {};
		this.radius = ThreeUtil.isNotNull(radius) ? radius : 1;
		this.rateX = ThreeUtil.isNotNull(options.rateX) ? options.rateX : 1;
		this.rateY = ThreeUtil.isNotNull(options.rateY) ? options.rateY : 1;
		this.rateZ = ThreeUtil.isNotNull(options.rateZ) ? options.rateZ : 1;
	}

	/**
	 * Gets point
	 * @param t
	 * @param optionalTarget
	 * @returns
	 */
	public getPoint(t: number, optionalTarget: THREE.Vector3) {
		const point = optionalTarget || new THREE.Vector3();
		const v = Math.max(-1, Math.min(1, t * 2 - 1));
		let y = this.easeFunction(t) * 2 - 1;
		return point.set(v * this.rateX, y * this.rateY, y * this.rateZ).multiplyScalar(this.radius);
	}
}

/**
 * Curves gsap linear ease in
 */
export class CurvesGsapLinearEaseIn extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Linear.easeIn, radius, options);
	}
}

/**
 * Curves gsap linear ease in out
 */
export class CurvesGsapLinearEaseInOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Linear.easeInOut, radius, options);
	}
}

/**
 * Curves gsap linear ease out
 */
export class CurvesGsapLinearEaseOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Linear.easeOut, radius, options);
	}
}

/**
 * Curves gsap linear ease none
 */
export class CurvesGsapLinearEaseNone extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Linear.easeNone, radius, options);
	}
}

/**
 * Curves gsap quad ease in
 */
export class CurvesGsapQuadEaseIn extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Quad.easeIn, radius, options);
	}
}

/**
 * Curves gsap quad ease in out
 */
export class CurvesGsapQuadEaseInOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Quad.easeInOut, radius, options);
	}
}

/**
 * Curves gsap quad ease out
 */
export class CurvesGsapQuadEaseOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Quad.easeOut, radius, options);
	}
}

/**
 * Curves gsap cubic ease in
 */
export class CurvesGsapCubicEaseIn extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Cubic.easeIn, radius, options);
	}
}

/**
 * Curves gsap cubic ease in out
 */
export class CurvesGsapCubicEaseInOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Cubic.easeInOut, radius, options);
	}
}

/**
 * Curves gsap cubic ease out
 */
export class CurvesGsapCubicEaseOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Cubic.easeOut, radius, options);
	}
}

/**
 * Curves gsap quart ease in
 */
export class CurvesGsapQuartEaseIn extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Quart.easeIn, radius, options);
	}
}

/**
 * Curves gsap quart ease in out
 */
export class CurvesGsapQuartEaseInOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Quart.easeInOut, radius, options);
	}
}

/**
 * Curves gsap quart ease out
 */
export class CurvesGsapQuartEaseOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Quart.easeOut, radius, options);
	}
}

/**
 * Curves gsap quint ease in
 */
export class CurvesGsapQuintEaseIn extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Quint.easeIn, radius, options);
	}
}

/**
 * Curves gsap quint ease in out
 */
export class CurvesGsapQuintEaseInOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Quint.easeInOut, radius, options);
	}
}

/**
 * Curves gsap quint ease out
 */
export class CurvesGsapQuintEaseOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Quint.easeOut, radius, options);
	}
}

/**
 * Curves gsap strong ease in
 */
export class CurvesGsapStrongEaseIn extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Strong.easeIn, radius, options);
	}
}

/**
 * Curves gsap strong ease in out
 */
export class CurvesGsapStrongEaseInOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Strong.easeInOut, radius, options);
	}
}

/**
 * Curves gsap strong ease out
 */
export class CurvesGsapStrongEaseOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Strong.easeOut, radius, options);
	}
}

/**
 * Curves gsap power1 ease in
 */
export class CurvesGsapPower1EaseIn extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Power1.easeIn, radius, options);
	}
}

/**
 * Curves gsap power1 ease in out
 */
export class CurvesGsapPower1EaseInOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Power1.easeInOut, radius, options);
	}
}

/**
 * Curves gsap power1 ease out
 */
export class CurvesGsapPower1EaseOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Power1.easeOut, radius, options);
	}
}

/**
 * Curves gsap power2 ease in
 */
export class CurvesGsapPower2EaseIn extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Power2.easeIn, radius, options);
	}
}

/**
 * Curves gsap power2 ease in out
 */
export class CurvesGsapPower2EaseInOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Power2.easeInOut, radius, options);
	}
}

/**
 * Curves gsap power2 ease out
 */
export class CurvesGsapPower2EaseOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Power2.easeOut, radius, options);
	}
}

/**
 * Curves gsap power3 ease in
 */
export class CurvesGsapPower3EaseIn extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Power3.easeIn, radius, options);
	}
}

/**
 * Curves gsap power3 ease in out
 */
export class CurvesGsapPower3EaseInOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Power3.easeInOut, radius, options);
	}
}

/**
 * Curves gsap power3 ease out
 */
export class CurvesGsapPower3EaseOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Power3.easeOut, radius, options);
	}
}

/**
 * Curves gsap power4 ease in
 */
export class CurvesGsapPower4EaseIn extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Power4.easeIn, radius, options);
	}
}

/**
 * Curves gsap power4 ease in out
 */
export class CurvesGsapPower4EaseInOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Power4.easeInOut, radius, options);
	}
}

/**
 * Curves gsap power4 ease out
 */
export class CurvesGsapPower4EaseOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Power4.easeOut, radius, options);
	}
}

/**
 * Curves gsap back ease in
 */
export class CurvesGsapBackEaseIn extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Back.easeIn, radius, options);
	}
}

/**
 * Curves gsap back ease in out
 */
export class CurvesGsapBackEaseInOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Back.easeInOut, radius, options);
	}
}

/**
 * Curves gsap back ease out
 */
export class CurvesGsapBackEaseOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Back.easeOut, radius, options);
	}
}

/**
 * Curves gsap elastic ease in
 */
export class CurvesGsapElasticEaseIn extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Elastic.easeIn, radius, options);
	}
}

/**
 * Curves gsap elastic ease in out
 */
export class CurvesGsapElasticEaseInOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Elastic.easeInOut, radius, options);
	}
}

/**
 * Curves gsap elastic ease out
 */
export class CurvesGsapElasticEaseOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Elastic.easeOut, radius, options);
	}
}

/**
 * Curves gsap bounce ease in
 */
export class CurvesGsapBounceEaseIn extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Bounce.easeIn, radius, options);
	}
}

/**
 * Curves gsap bounce ease in out
 */
export class CurvesGsapBounceEaseInOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Bounce.easeInOut, radius, options);
	}
}

/**
 * Curves gsap bounce ease out
 */
export class CurvesGsapBounceEaseOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Bounce.easeOut, radius, options);
	}
}

/**
 * Curves gsap circ ease in
 */
export class CurvesGsapCircEaseIn extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Circ.easeIn, radius, options);
	}
}

/**
 * Curves gsap circ ease in out
 */
export class CurvesGsapCircEaseInOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Circ.easeInOut, radius, options);
	}
}

/**
 * Curves gsap circ ease out
 */
export class CurvesGsapCircEaseOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Circ.easeOut, radius, options);
	}
}

/**
 * Curves gsap expo ease in
 */
export class CurvesGsapExpoEaseIn extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Expo.easeIn, radius, options);
	}
}

/**
 * Curves gsap expo ease in out
 */
export class CurvesGsapExpoEaseInOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Expo.easeInOut, radius, options);
	}
}

/**
 * Curves gsap expo ease out
 */
export class CurvesGsapExpoEaseOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Expo.easeOut, radius, options);
	}
}

/**
 * Curves gsap sine ease in
 */
export class CurvesGsapSineEaseIn extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Sine.easeIn, radius, options);
	}
}

/**
 * Curves gsap sine ease in out
 */
export class CurvesGsapSineEaseInOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Sine.easeInOut, radius, options);
	}
}

/**
 * Curves gsap sine ease out
 */
export class CurvesGsapSineEaseOut extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Sine.easeOut, radius, options);
	}
}

/**
 * Curves gsap power0 ease none
 */
export class CurvesGsapPower0EaseNone extends CurvesGsap {
	constructor(radius: number = 1, options?: CurvesParameters) {
		super(GSAP.Power0.easeNone, radius, options);
	}
}

/**
 * Curve class
 */
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

/**
 * Curve utils
 */
export class CurveUtils {
	/**
	 * Adds curve
	 * @param key
	 * @param curve
	 * @param [alias]
	 */
	public static addCurve(key: string, curve: CurveClass, alias?: string[]) {
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

	/**
	 * Gets curve class
	 * @param key
	 * @returns curve class
	 */
	public static getCurveClass(key: string): CurveClass {
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

	/**
	 * Gets curve
	 * @param key
	 * @param [scale]
	 * @param [options]
	 * @returns curve
	 */
	public static getCurve(key: string, scale?: number, options?: any): THREE.Curve<THREE.Vector3> {
		const curve = this.getCurveClass(key);
		return new curve(scale, options);
	}

	/**
	 * Gets curve normal
	 * @param key
	 * @param [normalOption]
	 * @param [option]
	 * @returns curve normal
	 */
	public static getCurveNormal(key: string | THREE.Curve<THREE.Vector3>, normalOption?: CurvesNormalParameters, option?: any): CurvesNormal {
		if (key instanceof THREE.Curve) {
			return new CurvesNormal(key, normalOption);
		} else {
			return new CurvesNormal(this.getCurve(key, option), normalOption);
		}
	}
}

/**
 * Curves normal parameters
 */
export interface CurvesNormalParameters {
	scale?: THREE.Vector3;
	rotation?: THREE.Euler;
	center?: THREE.Vector3;
	multiply?: number;
	options?: string;
}

/**
 * Curves normal
 */
export class CurvesNormal extends THREE.Curve<THREE.Vector3> {
	/**
	 * Scale  of curves normal
	 */
	private scale: THREE.Vector3 = null;

	/**
	 * Rotation  of curves normal
	 */
	private rotation: THREE.Euler = null;

	/**
	 * Center  of curves normal
	 */
	private center: THREE.Vector3 = null;

	/**
	 * Multiply  of curves normal
	 */
	private multiply: number = null;

	/**
	 * Creates an instance of curves normal.
	 * @param curve
	 * @param parameters
	 */
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

	/**
	 * Curve  of curves normal
	 */
	public curve: THREE.Curve<THREE.Vector3> = null;

	/**
	 * Sets options
	 * @param options
	 */
	public setOptions(options: string) {
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

	/**
	 * Sets curve
	 * @param curve
	 */
	public setCurve(curve: THREE.Curve<THREE.Vector3>) {
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

	/**
	 * Center  of curves normal
	 */
	private _center: THREE.Vector3 = null;

	/**
	 * Scale  of curves normal
	 */
	private _scale: THREE.Vector3 = null;

	/**
	 * Abs x of curves normal
	 */
	private _absX: boolean = false;

	/**
	 * Abs y of curves normal
	 */
	private _absY: boolean = false;

	/**
	 * Abs z of curves normal
	 */
	private _absZ: boolean = false;

	/**
	 * Repeat type of curves normal
	 */
	private _repeatType: string = 'repeat';

	/**
	 * Gets point
	 * @param t
	 * @param [optionalTarget]
	 * @returns point
	 */
	public getPoint(t: number, optionalTarget?: THREE.Vector3): THREE.Vector3 {
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
		if (this.multiply !== null) {
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

	/**
	 * Gets elapsed time
	 * @param timer
	 * @returns elapsed time
	 */
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

	/**
	 * Last v3 of curves normal
	 */
	private _lastV3: THREE.Vector3 = null;

	/**
	 * Refer center of curves normal
	 */
	public referCenter: THREE.Vector3 = null;

	/**
	 * Gets point v3
	 * @param timer
	 * @param p
	 * @returns point v3
	 */
	public getPointV3(timer: RendererTimer, p: THREE.Vector3): THREE.Vector3 {
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

	/**
	 * Last v2 of curves normal
	 */
	private _lastV2: THREE.Vector2 = null;

	/**
	 * Gets point v2
	 * @param timer
	 * @param p
	 * @returns point v2
	 */
	public getPointV2(timer: RendererTimer, p: THREE.Vector2): THREE.Vector2 {
		const cp = this.getPoint(this.getElapsedTime(timer));
		if (this._lastV2 === null) {
			this._lastV2 = new THREE.Vector2(cp.x, cp.y);
		} else {
			this._lastV2.set(cp.x, cp.y);
		}
		p.copy(this._lastV2);
		return this._lastV2;
	}

	/**
	 * Last euler of curves normal
	 */
	private _lastEuler: THREE.Euler = null;

	/**
	 * Gets point euler
	 * @param timer
	 * @param p
	 * @returns point euler
	 */
	public getPointEuler(timer: RendererTimer, p: THREE.Euler): THREE.Euler {
		const cp = this.getPoint(this.getElapsedTime(timer));
		if (this._lastEuler === null) {
			this._lastEuler = new THREE.Euler(cp.x, cp.y, cp.z);
		} else {
			this._lastEuler.set(cp.x, cp.y, cp.z);
		}
		p.copy(this._lastEuler);
		return this._lastEuler;
	}

	/**
	 * Last color of curves normal
	 */
	private _lastColor: THREE.Color = null;

	/**
	 * Gets point color
	 * @param timer
	 * @param p
	 * @returns point color
	 */
	public getPointColor(timer: RendererTimer, p: THREE.Color): THREE.Color {
		const cp = this.getPoint(this.getElapsedTime(timer));
		cp.clampScalar(0, 1);
		if (this._lastColor === null) {
			this._lastColor = new THREE.Color(cp.x, cp.y, cp.z);
		} else {
			this._lastColor.setRGB(cp.x, cp.y, cp.z);
		}
		p.copy(this._lastColor);
		return this._lastColor;
	}

	/**
	 * Last float of curves normal
	 */
	private _lastFloat: THREE.Vector3 = null;

	/**
	 * Gets point float
	 * @param timer
	 * @param [min]
	 * @param [max]
	 * @returns point float
	 */
	public getPointFloat(timer: RendererTimer, min: number = 0, max: number = 1): number {
		if (this._lastFloat === null) {
			this._lastFloat = new THREE.Vector3();
		}
		this.getPointV3(timer, this._lastFloat);
		const length = Math.max(0, Math.min(1, (this._lastFloat.y + 1) / 2));
		return min + (max - min) * length;
	}
}
