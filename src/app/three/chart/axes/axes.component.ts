import { Component, forwardRef, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { AbstractChartComponent } from '../../chart.abstract';
import { ThreeColor, ThreeUtil } from '../../interface';
import { AbstractObject3dComponent } from '../../object3d.abstract';

@Component({
	selector: 'ngx3js-chart-axes',
	templateUrl: './axes.component.html',
	styleUrls: ['./axes.component.scss'],
	providers: [{ provide: AbstractObject3dComponent, useExisting: forwardRef(() => ChartAxesComponent) }],
})
export class ChartAxesComponent extends AbstractChartComponent implements OnInit {
	@Input() private type: string = '';
	/**
	 * Radius of the circle/cone/dodecahedron/sphere..., default = 1.
	 */
	@Input() private radius: number = null;

	/**
	 * Number of segmented faces around the circumference of the cone/cylinder/torus/tube. Default is 8
	 */
	@Input() private radiusSegments: number = null;

	@Input() private gridColor: ThreeColor = null;
	@Input() private xGridColor: ThreeColor = null;
	@Input() private yGridColor: ThreeColor = null;
	@Input() private xGridStep: number[] | number = null;
	@Input() private yGridStep: number[] | number = null;

	/**
	 * Defines which side of faces will be rendered - front, back or both.
	 * Default is [page:Materials THREE.FrontSide].
	 * Other options are [page:Materials THREE.BackSide] and [page:Materials THREE.DoubleSide].
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.Side
	 * @see THREE.FrontSide - FrontSide , Front
	 * @see THREE.BackSide - BackSide , Back
	 * @see THREE.DoubleSide - DoubleSide , Double
	 */
	@Input() protected side: string = null;

	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the
	 * default change detector has checked the directive's
	 * data-bound properties for the first time,
	 * and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('chart-axes');
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
		if (changes && this.chart) {
			this.addChanges(changes);
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

	private _axes: THREE.Object3D = null;

	private _materialWall: THREE.MeshBasicMaterial = null;

	private _geometryWall: THREE.PlaneGeometry | THREE.CircleGeometry = null;

	private _materialWallBorder: THREE.LineBasicMaterial = null;

	private _geometryWallBorder: THREE.BufferGeometry = null;

	private _materialGridX: THREE.LineBasicMaterial = null;

	private _geometryGridX: THREE.BufferGeometry = null;

	private _materialGridY: THREE.LineBasicMaterial = null;

	private _geometryGridY: THREE.BufferGeometry = null;

	/**
	 * Applys changes3d
	 * @param changes
	 * @returns
	 */
	protected applyChanges3d(changes: string[]) {
		if (this._axes !== null) {
			if (ThreeUtil.isIndexOf(changes, ['clearinit'])) {
				this.getTitle();
			}
			if (!ThreeUtil.isOnlyIndexOf(changes, ['opacity'], this.CHART_ATTR)) {
				this.needUpdate = true;
				return;
			}
			if (ThreeUtil.isIndexOf(changes, ['init'])) {
				changes = ThreeUtil.pushUniq(changes, ['opacity']);
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'opacity':
						if (ThreeUtil.isNotNull(this.opacity)) {
							this._materialWall.opacity = ThreeUtil.getTypeSafe(this.opacity, 1);
						}
						break;
				}
			});
			super.applyChanges3d(changes);
		}
	}

	/**
	 * Gets Chart
	 * @template T
	 * @returns object3d
	 */
	public getChart<T extends THREE.Object3D>(): T {
		return this.getTitle();
	}

	/**
	 * Gets Chart
	 * @template T
	 * @returns object3d
	 */
	public getTitle<T extends THREE.Object3D>(): T {
		if (this._axes === null || this._needUpdate) {
			this.needUpdate = false;
			this._axes = new THREE.Group();
			const width = ThreeUtil.getTypeSafe(this.width, 1);
			const height = ThreeUtil.getTypeSafe(this.height, 1);
			const depth = ThreeUtil.getTypeSafe(this.depth, 1);
			const radiusSegments = ThreeUtil.getTypeSafe(this.radiusSegments, 32);
			const radius = ThreeUtil.getTypeSafe(this.radius, Math.min(width, height) / 2);
			const borderIndex: number[] = [];
			switch (this.type.toLowerCase()) {
				case 'radar':
					this._geometryWall = new THREE.CircleGeometry(radius, radiusSegments);
					this._geometryWall.translate(0, 0, -depth / 2);
					for (let i = 1; i < radiusSegments + 1; i++) {
						borderIndex.push(i);
					}
					break;
				case 'front':
					borderIndex.push(0, 1, 3, 2);
					this._geometryWall = new THREE.PlaneGeometry(width, height);
					this._geometryWall.rotateY(Math.PI);
					this._geometryWall.translate(0, 0, depth / 2);
					break;
				case 'back':
				case 'z':
					borderIndex.push(0, 1, 3, 2);
					this._geometryWall = new THREE.PlaneGeometry(width, height);
					this._geometryWall.translate(0, 0, -depth / 2);
					break;
				case 'right':
					borderIndex.push(0, 1, 3, 2);
					this._geometryWall = new THREE.PlaneGeometry(depth, height);
					this._geometryWall.rotateY(-Math.PI / 2);
					this._geometryWall.translate(width / 2, 0, 0);
					break;
				case 'left':
				case 'y':
					borderIndex.push(0, 1, 3, 2);
					this._geometryWall = new THREE.PlaneGeometry(depth, height);
					this._geometryWall.rotateY(Math.PI / 2);
					this._geometryWall.translate(-width / 2, 0, 0);
					break;
				case 'top':
					borderIndex.push(0, 1, 3, 2);
					this._geometryWall = new THREE.PlaneGeometry(width, depth);
					this._geometryWall.rotateX(Math.PI / 2);
					this._geometryWall.translate(0, height / 2, 0);
					break;
				case 'bottom':
				case 'x':
				default:
					borderIndex.push(0, 1, 3, 2);
					this._geometryWall = new THREE.PlaneGeometry(width, depth);
					this._geometryWall.rotateX(-Math.PI / 2);
					this._geometryWall.translate(0, -height / 2, 0);
					break;
			}
			this._materialWall = new THREE.MeshPhongMaterial({
				color: ThreeUtil.getColorSafe(this.backgroundColor, 0xd0d0d0),
				opacity: ThreeUtil.getTypeSafe(this.opacity, 1),
				side: this.getSide(this.side,'front'),
				transparent: true,
			});
			const wallMesh = new THREE.Mesh(this._geometryWall, this._materialWall);
			wallMesh.name = 'wall';
			wallMesh.receiveShadow = true;
			this._axes.add(wallMesh);
			this._geometryWallBorder = new THREE.BufferGeometry();
			const attributePosition = this._geometryWall.getAttribute('position');
			const attributeBorder = new Float32Array(borderIndex.length * 2 * 3);
			for (let i = 0; i < borderIndex.length; i++) {
				const startIdx = borderIndex[i];
				const endIdx = borderIndex[(i + 1) % borderIndex.length];
				const x1 = attributePosition.getX(startIdx);
				const y1 = attributePosition.getY(startIdx);
				const z1 = attributePosition.getZ(startIdx);
				const x2 = attributePosition.getX(endIdx);
				const y2 = attributePosition.getY(endIdx);
				const z2 = attributePosition.getZ(endIdx);
				const seqn = i * 6;
				attributeBorder[seqn + 0] = x1;
				attributeBorder[seqn + 1] = y1;
				attributeBorder[seqn + 2] = z1;
				attributeBorder[seqn + 3] = x2;
				attributeBorder[seqn + 4] = y2;
				attributeBorder[seqn + 5] = z2;
			}
			this._geometryWallBorder.setAttribute('position', new THREE.BufferAttribute(attributeBorder, 3));
			this._materialWallBorder = new THREE.LineBasicMaterial({
				color: ThreeUtil.getColorSafe(this.borderColor, 0x909090),
				linewidth: 1,
				opacity: ThreeUtil.getTypeSafe(this.opacity, 1),
			});
			const borderMesh = new THREE.LineSegments(this._geometryWallBorder, this._materialWallBorder);
			borderMesh.name = 'border';
			this._axes.add(borderMesh);
			if (ThreeUtil.isNotNull(this.xGridStep)) {
				const xGridStep = ThreeUtil.getTypeSafe(this.xGridStep, 5);
				const xGridSteps = Array.isArray(xGridStep) ? xGridStep : this.getGridStep(xGridStep, this.type);
				this._geometryGridX = new THREE.BufferGeometry();
				let gridLine: Float32Array = null;
				switch (this.type.toLowerCase()) {
					case 'radar':
						gridLine = new Float32Array(xGridSteps.length * 6);
						const radarZ = - depth / 2 * 0.99;
						xGridSteps.forEach((grid, i) => {
							const idx = i * 6;
							const x = Math.sin(Math.PI * 2 * grid) * radius;
							const y = Math.cos(Math.PI * 2 * grid) * radius;
							gridLine[idx + 0] = x;
							gridLine[idx + 1] = y;
							gridLine[idx + 2] = radarZ;
							gridLine[idx + 3] = 0;
							gridLine[idx + 4] = 0;
							gridLine[idx + 5] = radarZ;
						});
						break;
					case 'front':
						gridLine = this.getGridLine(0, height / 2, (depth / 2) * 0.99, 0, -height / 2, (depth / 2) * 0.99, 'x', width, xGridSteps);
						break;
					case 'back':
					case 'z':
						gridLine = this.getGridLine(0, height / 2, (-depth / 2) * 0.99, 0, -height / 2, (-depth / 2) * 0.99, 'x', width, xGridSteps);
						break;
					case 'right':
						gridLine = this.getGridLine((width / 2) * 0.99, height / 2, 0, (width / 2) * 0.99, -height / 2, 0, 'z', depth, xGridSteps);
						break;
					case 'left':
					case 'y':
						gridLine = this.getGridLine((-width / 2) * 0.99, height / 2, 0, (-width / 2) * 0.99, -height / 2, 0, 'z', depth, xGridSteps);
						break;
					case 'top':
						gridLine = this.getGridLine(0, (height / 2) * 0.99, depth / 2, 0, (height / 2) * 0.99, -depth / 2, 'x', width, xGridSteps);
						break;
					case 'bottom':
					case 'x':
					default:
						gridLine = this.getGridLine(0, (-height / 2) * 0.99, depth / 2, 0, (-height / 2) * 0.99, -depth / 2, 'x', width, xGridSteps);
						break;
				}
				this._geometryGridX.setAttribute('position', new THREE.BufferAttribute(gridLine, 3));
				this._materialGridX = new THREE.LineBasicMaterial({
					color: ThreeUtil.getColorSafe(this.xGridColor, this.gridColor, 0xf0f0f0),
					linewidth: 1,
				});
				const gridXMesh = new THREE.LineSegments(this._geometryGridX, this._materialGridX);
				gridXMesh.name = 'gridx';
				this._axes.add(gridXMesh);
			}
			if (ThreeUtil.isNotNull(this.yGridStep)) {
				const yGridStep = ThreeUtil.getTypeSafe(this.yGridStep, 5);
				const yGridSteps = Array.isArray(yGridStep) ? yGridStep : this.getGridStep(yGridStep, this.type);
				this._geometryGridY = new THREE.BufferGeometry();
				let gridLine: Float32Array = null;
				switch (this.type.toLowerCase()) {
					case 'radar':
						const radarSize = attributeBorder.length;
						const radarZ = - depth / 2 * 0.99;
						gridLine = new Float32Array(radarSize * yGridSteps.length);
						yGridSteps.forEach((grid, i) => {
							const step = i * radarSize;
							for(let l = 0 ; l < attributeBorder.length ; l += 3) {
								const idx = step + l;
								gridLine[idx + 0 ] = attributeBorder[l + 0] * grid;
								gridLine[idx + 1 ] = attributeBorder[l + 1] * grid;
								gridLine[idx + 2 ] = radarZ;
							}
						});
						break;
					case 'front':
						gridLine = this.getGridLine(width / 2, 0, (depth / 2) * 0.99, -width / 2, 0, (depth / 2) * 0.99, 'y', height, yGridSteps);
						break;
					case 'back':
					case 'z':
						gridLine = this.getGridLine(width / 2, 0, (-depth / 2) * 0.99, -width / 2, 0, (-depth / 2) * 0.99, 'y', height, yGridSteps);
						break;
					case 'right':
						gridLine = this.getGridLine(
							(width / 2) * 0.99, 0, depth /2, 
							(width / 2) * 0.99, 0, -depth / 2, 
							'y', height, yGridSteps);
						break;
					case 'left':
					case 'y':
						gridLine = this.getGridLine(
							(-width / 2) * 0.99, 0, depth /2, 
							(-width / 2) * 0.99, 0, -depth / 2, 
							'y', height, yGridSteps);
						break;
					case 'top':
						gridLine = this.getGridLine(-width/2, (height / 2) * 0.99, 0, width/2, (height / 2) * 0.99, 0, 'z', depth, yGridSteps);
						break;
					case 'bottom':
					case 'x':
					default:
						gridLine = this.getGridLine(-width/2, (-height / 2) * 0.99, 0, width/2, (-height / 2) * 0.99, 0, 'z', depth, yGridSteps);
						break;
				}
				this._geometryGridY.setAttribute('position', new THREE.BufferAttribute(gridLine, 3));
				this._materialGridY = new THREE.LineDashedMaterial({
					color: ThreeUtil.getColorSafe(this.yGridColor, this.gridColor, 0xf0f0f0),
					linewidth: 1,
				});
				const gridYMesh = new THREE.LineSegments(this._geometryGridY, this._materialGridY);
				gridYMesh.name = 'gridy';
				this._axes.add(gridYMesh);
			}
			this.setChart(this._axes);
		}
		return this._axes as T;
	}

	private getGridStep(division: number, type : string): number[] {
		const steps: number[] = [];
		switch(type.toLowerCase()) {
			case 'radar' :
				for (let i = 1; i <= division; i++) {
					steps.push(i / division);
				}
				break;
			default :
				for (let i = 1; i <= division; i++) {
					steps.push(i / (division + 1));
				}
				break;
		}
		return steps;
	}

	private getGridLine(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, type: string, size: number, gridSteps: number[]): Float32Array {
		const attributeGrid = new Float32Array(gridSteps.length * 2 * 3);
		for (let i = 0; i < gridSteps.length; i++) {
			const idx = i * 6;
			const stepValue = (gridSteps[i] - 0.5) * size;
			attributeGrid[idx + 0] = x1;
			attributeGrid[idx + 1] = y1;
			attributeGrid[idx + 2] = z1;
			attributeGrid[idx + 3] = x2;
			attributeGrid[idx + 4] = y2;
			attributeGrid[idx + 5] = z2;

			switch (type) {
				case 'x':
					attributeGrid[idx + 0] = x1 + stepValue;
					attributeGrid[idx + 3] = x2 + stepValue;
					break;
				case 'y':
					attributeGrid[idx + 1] = y1 + stepValue;
					attributeGrid[idx + 4] = y2 + stepValue;
					break;
				case 'z':
					attributeGrid[idx + 2] = z1 + stepValue;
					attributeGrid[idx + 5] = z2 + stepValue;
					break;
			}
		}
		return attributeGrid;
	}
}
