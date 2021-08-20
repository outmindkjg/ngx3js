import * as THREE from 'three';
import { ThreeUtil, CurvesParameters } from '../../interface';

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
