import * as THREE from 'three';
import { ThreeUtil, CurvesParameters } from '../../interface';


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

