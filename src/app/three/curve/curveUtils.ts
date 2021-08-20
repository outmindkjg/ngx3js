import * as THREE from 'three';
import { Curves } from 'three/examples/jsm/curves/CurveExtras';
import { RendererTimer, ThreeUtil } from '../interface';
import { CurvesCircle } from './curves/circle';
import * as GSAP from './curves/gsap';
import { CurvesLine } from './curves/line';
import * as POLYGON from './curves/polygon';
import { CurvesRollerCoaster } from './curves/rollercoaster';

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
	trianglecurve: POLYGON.CurvesRegularPolygonTriangle,
	triangle: 'trianglecurve',
	squarecurve: POLYGON.CurvesRegularPolygonSquare,
	square: 'squarecurve',
	pentagoncurve: POLYGON.CurvesRegularPolygonPentagon,
	pentagon: 'pentagoncurve',
	hexagoncurve: POLYGON.CurvesRegularPolygonHexagon,
	hexagon: 'hexagoncurve',
	heptagoncurve: POLYGON.CurvesRegularPolygonHeptagon,
	heptagon: 'heptagoncurve',
	octagoncurve: POLYGON.CurvesRegularPolygonOctagon,
	octagon: 'octagoncurve',
	nonagoncurve: POLYGON.CurvesRegularPolygonNonagon,
	nonagon: 'nonagoncurve',
	decagoncurve: POLYGON.CurvesRegularPolygonDecagon,
	decagon: 'decagoncurve',
	undecagoncurve: POLYGON.CurvesRegularPolygonUndecagon,
	undecagon: 'undecagoncurve',
	dodecagoncurve: POLYGON.CurvesRegularPolygonDodecagon,
	dodecagon: 'dodecagoncurve',
	linearincurve: GSAP.CurvesGsapLinearEaseIn,
	linearin: 'linearincurve',
	linearinoutcurve: GSAP.CurvesGsapLinearEaseInOut,
	linearinout: 'linearinoutcurve',
	linearoutcurve: GSAP.CurvesGsapLinearEaseOut,
	linearout: 'linearoutcurve',
	lineareasenonecurve: GSAP.CurvesGsapLinearEaseNone,
	lineareasenone: 'lineareasenonecurve',
	quadincurve: GSAP.CurvesGsapQuadEaseIn,
	quadin: 'quadincurve',
	quadinoutcurve: GSAP.CurvesGsapQuadEaseInOut,
	quadinout: 'quadinoutcurve',
	quadoutcurve: GSAP.CurvesGsapQuadEaseOut,
	quadout: 'quadoutcurve',
	cubicincurve: GSAP.CurvesGsapCubicEaseIn,
	cubicin: 'cubicincurve',
	cubicinoutcurve: GSAP.CurvesGsapCubicEaseInOut,
	cubicinout: 'cubicinoutcurve',
	cubicoutcurve: GSAP.CurvesGsapCubicEaseOut,
	cubicout: 'cubicoutcurve',
	quartincurve: GSAP.CurvesGsapQuartEaseIn,
	quartin: 'quartincurve',
	quartinoutcurve: GSAP.CurvesGsapQuartEaseInOut,
	quartinout: 'quartinoutcurve',
	quartoutcurve: GSAP.CurvesGsapQuartEaseOut,
	quartout: 'quartoutcurve',
	quintincurve: GSAP.CurvesGsapQuintEaseIn,
	quintin: 'quintincurve',
	quintinoutcurve: GSAP.CurvesGsapQuintEaseInOut,
	quintinout: 'quintinoutcurve',
	quintoutcurve: GSAP.CurvesGsapQuintEaseOut,
	quintout: 'quintoutcurve',
	strongincurve: GSAP.CurvesGsapStrongEaseIn,
	strongin: 'strongincurve',
	stronginoutcurve: GSAP.CurvesGsapStrongEaseInOut,
	stronginout: 'stronginoutcurve',
	strongoutcurve: GSAP.CurvesGsapStrongEaseOut,
	strongout: 'strongoutcurve',
	power1incurve: GSAP.CurvesGsapPower1EaseIn,
	power1in: 'power1incurve',
	power1inoutcurve: GSAP.CurvesGsapPower1EaseInOut,
	power1inout: 'power1inoutcurve',
	power1outcurve: GSAP.CurvesGsapPower1EaseOut,
	power1out: 'power1outcurve',
	power2incurve: GSAP.CurvesGsapPower2EaseIn,
	power2in: 'power2incurve',
	power2inoutcurve: GSAP.CurvesGsapPower2EaseInOut,
	power2inout: 'power2inoutcurve',
	power2outcurve: GSAP.CurvesGsapPower2EaseOut,
	power2out: 'power2outcurve',
	power3incurve: GSAP.CurvesGsapPower3EaseIn,
	power3in: 'power3incurve',
	power3inoutcurve: GSAP.CurvesGsapPower3EaseInOut,
	power3inout: 'power3inoutcurve',
	power3outcurve: GSAP.CurvesGsapPower3EaseOut,
	power3out: 'power3outcurve',
	power4incurve: GSAP.CurvesGsapPower4EaseIn,
	power4in: 'power4incurve',
	power4inoutcurve: GSAP.CurvesGsapPower4EaseInOut,
	power4inout: 'power4inoutcurve',
	power4outcurve: GSAP.CurvesGsapPower4EaseOut,
	power4out: 'power4outcurve',
	backincurve: GSAP.CurvesGsapBackEaseIn,
	backin: 'backincurve',
	backinoutcurve: GSAP.CurvesGsapBackEaseInOut,
	backinout: 'backinoutcurve',
	backoutcurve: GSAP.CurvesGsapBackEaseOut,
	backout: 'backoutcurve',
	elasticincurve: GSAP.CurvesGsapElasticEaseIn,
	elasticin: 'elasticincurve',
	elasticinoutcurve: GSAP.CurvesGsapElasticEaseInOut,
	elasticinout: 'elasticinoutcurve',
	elasticoutcurve: GSAP.CurvesGsapElasticEaseOut,
	elasticout: 'elasticoutcurve',
	bounceincurve: GSAP.CurvesGsapBounceEaseIn,
	bouncein: 'bounceincurve',
	bounceinoutcurve: GSAP.CurvesGsapBounceEaseInOut,
	bounceinout: 'bounceinoutcurve',
	bounceoutcurve: GSAP.CurvesGsapBounceEaseOut,
	bounceout: 'bounceoutcurve',
	circincurve: GSAP.CurvesGsapCircEaseIn,
	circin: 'circincurve',
	circinoutcurve: GSAP.CurvesGsapCircEaseInOut,
	circinout: 'circinoutcurve',
	circoutcurve: GSAP.CurvesGsapCircEaseOut,
	circout: 'circoutcurve',
	expoincurve: GSAP.CurvesGsapExpoEaseIn,
	expoin: 'expoincurve',
	expoinoutcurve: GSAP.CurvesGsapExpoEaseInOut,
	expoinout: 'expoinoutcurve',
	expooutcurve: GSAP.CurvesGsapExpoEaseOut,
	expoout: 'expooutcurve',
	sineincurve: GSAP.CurvesGsapSineEaseIn,
	sinein: 'sineincurve',
	sineinoutcurve: GSAP.CurvesGsapSineEaseInOut,
	sineinout: 'sineinoutcurve',
	sineoutcurve: GSAP.CurvesGsapSineEaseOut,
	sineout: 'sineoutcurve',
	power0nonecurve: GSAP.CurvesGsapPower0EaseNone,
	power0none: 'power0nonecurve',
	rollercoastercurve: CurvesRollerCoaster,
	rollercoaster: 'rollercoastercurve',
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
