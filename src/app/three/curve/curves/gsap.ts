import * as GSAP from 'gsap';
import * as THREE from 'three';
import { ThreeUtil, CurvesParameters } from '../../interface';

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
