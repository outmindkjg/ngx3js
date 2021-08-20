import * as THREE from 'three';
import { ThreeUtil, CurvesParameters } from '../../interface';
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
