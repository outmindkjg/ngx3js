import { AfterContentInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { RendererTimer, ThreeColor, ThreeUtil } from './interface';
import { AbstractObject3dComponent } from './object3d.abstract';
import * as THREE from 'three';
import { Mesh } from 'three';
import { OutlineGeometry } from './geometry/geometry.outline';
import { StarGeometry } from './geometry/geometry.star';

export interface AttributeUpdateInfo {
	index: number;
	from: number;
	to: number;
}

/**
 * AbstractChartComponent
 */
@Component({
	template: '',
})
export abstract class AbstractChartComponent extends AbstractObject3dComponent implements OnInit, OnChanges, AfterContentInit, OnDestroy {
	/**
	 * Width; that is, the length of the edges parallel to the X axis. Optional; defaults to 1.
	 */
	@Input() protected width: number = null;

	/**
	 * Height; that is, the length of the edges parallel to the Y axis. Optional; defaults to 1.
	 */
	@Input() protected height: number = null;

	/**
	 * Depth; that is, the length of the edges parallel to the Z axis. Optional; defaults to 1.
	 */
	@Input() protected depth: number = null;

	/**
	 * Depth; that is, the length of the edges parallel to the Z axis. Optional; defaults to 1.
	 */
	@Input() protected depthIdx: number = 0;

	/**
	 * Depth; that is, the length of the edges parallel to the Z axis. Optional; defaults to 1.
	 */
	@Input() protected depthLength: number = 1;

	@Input() protected backgroundColor: ThreeColor = null;

	@Input() protected opacity: number = null;

	@Input() protected borderColor: ThreeColor = null;

	@Input() protected borderDash: number[] = null;

	@Input() protected borderWidth: number = null;

	@Input() protected fill: boolean = null;

	@Input() protected hoverBackgroundColor: ThreeColor = null;

	@Input() protected hoverOpacity: number = null;

	@Input() protected hoverBorderColor: ThreeColor = null;

	@Input() protected hoverBorderWidth: number = null;

	@Input() protected label: string = null;

	@Input() protected showLine: boolean = null;

	@Input() protected pointBackgroundColor: ThreeColor = null;

	@Input() protected pointOpacity: number = null;

	@Input() protected pointBorderColor: ThreeColor = null;

	@Input() protected pointBorderWidth: number = null;

	@Input() protected pointHoverBackgroundColor: ThreeColor = null;

	@Input() protected pointHoverBorderColor: ThreeColor = null;

	@Input() protected pointHoverBorderWidth: number = null;

	@Input() protected pointHoverRadius: number = null;

	@Input() protected pointStyle: string = 'circle';

	@Input() protected pointRadius: number = null;

	@Input() protected pointRotation: number = null;

	/**
	 * Object3 d attr of abstract object3d component
	 */
	protected CHART_ATTR: string[] = [];

	/**
	 * Creates an instance of abstract object3d component.
	 */
	constructor() {
		super();
		this.CHART_ATTR.push(...this.OBJECT3D_ATTR);
	}

	/**
	 * A callback method that is invoked immediately after the
	 * default change detector has checked the directive's
	 * data-bound properties for the first time,
	 * and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 *
	 * @param subscribeType
	 */
	ngOnInit(subscribeType?: string): void {
		super.ngOnInit(subscribeType || 'chart');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately
	 * before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		super.ngOnDestroy();
	}

	/**
	 * A callback method that is invoked immediately after the
	 * default change detector has checked data-bound properties
	 * if at least one has changed, and before the view and content
	 * children are checked.
	 *
	 * @param changes The changed properties.
	 */
	ngOnChanges(changes: SimpleChanges): void {
		super.ngOnChanges(changes);
		if (changes && this.object3d !== null) {
		}
	}

	/**
	 * A callback method that is invoked immediately after
	 * Angular has completed initialization of all of the directive's
	 * content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit(): void {
		super.ngAfterContentInit();
	}

	/**
	 * Gets side
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.Side
	 * @see THREE.FrontSide - FrontSide , Front
	 * @see THREE.BackSide - BackSide , Back
	 * @see THREE.DoubleSide - DoubleSide , Double
	 *
	 * @param [def]
	 * @returns side
	 */
	protected getSide(value: string, def?: string): THREE.Side {
		const side = ThreeUtil.getTypeSafe(value, def);
		switch (side.toLowerCase()) {
			case 'backside':
			case 'back':
				return THREE.BackSide;
			case 'doubleside':
			case 'double':
				return THREE.DoubleSide;
			case 'frontside':
			case 'front':
			default:
				return THREE.FrontSide;
		}
	}

	/**
	 * Sets parent
	 * @param parent
	 * @returns true if parent
	 */
	public setParent(parent: THREE.Object3D): boolean {
		if (super.setParent(parent)) {
			this.getChart();
			return true;
		}
		return false;
	}

	protected chart: THREE.Object3D = null;

	protected setObject3d(object: THREE.Object3D) {
		this.setChart(object);
	}

	protected setChart(object: THREE.Object3D) {
		this.chart = object;
		super.setObject3d(object);
	}

	/**
	 * Gets object3d
	 * @template T
	 * @returns object3d
	 */
	public getObject3d<T extends THREE.Object3D>(): T {
		return this.getChart();
	}

	/**
	 * Gets Chart
	 * @template T
	 * @returns object3d
	 */
	public getChart<T extends THREE.Object3D>(): T {
		return this.chart as T;
	}

	/**
	 * Applys changes3d
	 * @param changes
	 * @returns
	 */
	protected applyChanges3d(changes: string[]) {
		if (this.chart !== null) {
			if (ThreeUtil.isIndexOf(changes, ['clearinit'])) {
				return;
			}
			if (ThreeUtil.isIndexOf(changes, ['init'])) {
				changes = ThreeUtil.pushUniq(changes, []);
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
				}
			});
			super.applyChanges3d(changes);
		}
	}

	protected getMeshAndBorder(
		type: string,
		width: number,
		height: number,
		depth: number,
		backgroundColor: ThreeColor,
		borderColor: ThreeColor
	): { mesh: THREE.Mesh; geometry: THREE.BufferGeometry; material: THREE.Material; geometryBorder: THREE.BufferGeometry; materialBorder: THREE.LineDashedMaterial } {
		const material = new THREE.MeshPhongMaterial({
			color: ThreeUtil.getColorSafe(backgroundColor, 0xff0000),
			opacity: ThreeUtil.getTypeSafe(this.opacity, 1),
			transparent: true,
		});
		let geometry: THREE.BufferGeometry = null;
		switch (type.toLowerCase()) {
			case 'plane':
				geometry = new THREE.PlaneGeometry(width, height, depth, depth);
				break;
			case 'star':
				geometry = new StarGeometry(depth, depth * 0.5, 5);
				break;
			case 'sphere':
				geometry = new THREE.SphereGeometry(depth, 10, 5);
				break;
			case 'box':
				geometry = new THREE.BoxGeometry(depth, depth, depth);
				break;
			default:
				geometry = new THREE.CircleGeometry(depth, width, 0, Math.PI * 1.3);
				break;
		}
		const mesh: THREE.Mesh = new THREE.Mesh(geometry, material);
		mesh.castShadow = true;
		const geometryBorder = new OutlineGeometry(geometry, 1.2);
		const materialBorder = new THREE.LineDashedMaterial({
			color: ThreeUtil.getColorSafe(borderColor, this.borderColor, 0x000000),
			linewidth: 3,
			linecap: 'round',
			linejoin: 'round',
			dashSize: 3,
			gapSize: 1,
			scale: 500,
		});
		let border: THREE.LineSegments = new THREE.LineSegments(geometryBorder, materialBorder);
		border.computeLineDistances();
		mesh.add(border);
		return { mesh: mesh, geometry: geometry, material: material, geometryBorder: geometryBorder, materialBorder: materialBorder };
	}

	public update(rendererTimer: RendererTimer, elapsedTime: number, delta: number) {}
}
