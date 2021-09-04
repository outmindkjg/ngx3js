import { Component, forwardRef, Input, OnInit, SimpleChanges } from '@angular/core';
import { AbstractChartComponent, AttributeUpdateInfo } from '../../chart.abstract';
import { AbstractObject3dComponent } from '../../object3d.abstract';
import * as THREE from 'three';
import { RendererTimer, ThreeUtil } from '../../interface';
import { MathUtils } from 'three';


@Component({
  selector: 'ngx3js-chart-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
, providers: [{ provide: AbstractObject3dComponent, useExisting: forwardRef(() => ChartLineComponent) }]
})
export class ChartLineComponent extends AbstractChartComponent implements OnInit {

	@Input() public type: string = '';
	@Input() private data: number[] = [];

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
		super.ngOnInit('chart-line');
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

	private _line: THREE.Object3D = null;
	
	private _material: THREE.Material = null;

	private _geometry: THREE.BufferGeometry = null;

	private _materialBorder: THREE.LineBasicMaterial = null;

	private _geometryBorder: THREE.BufferGeometry = null;
	
	private _materialPoint: THREE.Material = null;

	private _geometryPoint: THREE.BufferGeometry = null;

	private _materialPointBorder: THREE.LineBasicMaterial = null;

	private _geometryPointBorder: THREE.BufferGeometry = null;

	/**
	 * Applys changes3d
	 * @param changes
	 * @returns
	 */
	protected applyChanges3d(changes: string[]) {
		if (this._line !== null) {
			if (ThreeUtil.isIndexOf(changes, ['clearinit'])) {
				this.getLine();
			}
			if (!ThreeUtil.isOnlyIndexOf(changes, ['options'], this.CHART_ATTR)) {
				this.needUpdate = true;
				return;
			}
			if (ThreeUtil.isIndexOf(changes, ['init'])) {
				changes = ThreeUtil.pushUniq(changes, ['options']);
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'options':
						if (ThreeUtil.isNotNull(this.options)) {
							this._material.opacity = ThreeUtil.getTypeSafe(this.options.opacity, 1);
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
		return this.getLine();
	}


	/**
	 * Gets Chart
	 * @template T
	 * @returns object3d
	 */
	public getLine<T extends THREE.Object3D>(): T {
		if (this._line === null || this._needUpdate) {
			this.needUpdate = false;
			this.clearChart();
			this._line = new THREE.Group();
			const data : number[] = ThreeUtil.getTypeSafe(this.data, []);
			this.getTestData(data);
			const baseZ = this.getDepthCenter();
			const [scaleMin, scaleMax] = this.getScaleMinMax(data);
			const upPoints: number[] = [];
			const downPoints: number[] = [];
			const downBase = - ThreeUtil.getTypeSafe(this.height, 1) / 2;
			data.forEach(p => {
				upPoints.push(this.getHeightCenter(scaleMin, scaleMax, p));
				downPoints.push(downBase);
			});
			let attributePosition : Float32Array = null;
			let attributeLine : Float32Array = null;
			let attributeIndex : number[] = [];
			let areaUpdateAttributes : AttributeUpdateInfo[] = [];
			let lineUpdateAttributes : AttributeUpdateInfo[] = [];
			const middleY = 0;
			let areaIdx = 0;
			let side : string = 'double';
			switch (this.type.toLowerCase()) {
				case 'linedepth' :
					attributePosition = new Float32Array(upPoints.length * 2 * 3 * 2);
					attributeLine = new Float32Array((upPoints.length - 1) * 2 * 3 * 2);
					const lineDepthSizeHalf = this.getDepthSize() / 2;
					upPoints.forEach((p,i) => {
						const idx = i * 12;
						const x = this.getWidthCenter(i);
						attributePosition[idx + 0] = x;
						attributePosition[idx + 1] = middleY;
						attributePosition[idx + 2] = baseZ + lineDepthSizeHalf;
						attributePosition[idx + 3] = x;
						attributePosition[idx + 4] = downPoints[i];
						attributePosition[idx + 5] = baseZ + lineDepthSizeHalf;
						areaUpdateAttributes.push({
							index : areaIdx,
							from : middleY,
							to : p
						})
						attributePosition[idx + 6] = x;
						attributePosition[idx + 7] = middleY;
						attributePosition[idx + 8] = baseZ - lineDepthSizeHalf;
						attributePosition[idx + 9] = x;
						attributePosition[idx + 10] = downPoints[i];
						attributePosition[idx + 11] = baseZ - lineDepthSizeHalf;
						areaUpdateAttributes.push({
							index : areaIdx + 2,
							from : middleY,
							to : p
						})
						
						if (i < this.widthLength -1) {
							const nextP = upPoints[i+1];
							const nextX = this.getWidthCenter(i + 1);
							attributeLine[idx + 0] = x;
							attributeLine[idx + 1] = middleY;
							attributeLine[idx + 2] = baseZ + lineDepthSizeHalf;
							attributeLine[idx + 3] = nextX;
							attributeLine[idx + 4] = middleY;
							attributeLine[idx + 5] = baseZ + lineDepthSizeHalf;
							lineUpdateAttributes.push({
								index : areaIdx,
								from : middleY,
								to : p
							});
							lineUpdateAttributes.push({
								index : areaIdx + 1,
								from : middleY,
								to : nextP
							});
							attributeLine[idx + 6] = x;
							attributeLine[idx + 7] = middleY;
							attributeLine[idx + 8] = baseZ - lineDepthSizeHalf;
							attributeLine[idx + 9] = nextX;
							attributeLine[idx + 10] = middleY;
							attributeLine[idx + 11] = baseZ - lineDepthSizeHalf;
							lineUpdateAttributes.push({
								index : areaIdx +2 ,
								from : middleY,
								to : p
							});
							lineUpdateAttributes.push({
								index : areaIdx + 3,
								from : middleY,
								to : nextP
							});

						}
						areaIdx += 4;
					});
					attributeIndex.push(0,2,1);
					attributeIndex.push(2,3,1);
					for(let i = 0 ; i < upPoints.length - 1; i++) {
						const indexIdx = i * 4;
						attributeIndex.push(indexIdx,indexIdx+1,indexIdx+4);
						attributeIndex.push(indexIdx+1,indexIdx+5,indexIdx+4);
						attributeIndex.push(indexIdx + 2,indexIdx+6,indexIdx+3);
						attributeIndex.push(indexIdx+6,indexIdx+7,indexIdx+3);
						attributeIndex.push(indexIdx,indexIdx+4, indexIdx+2);
						attributeIndex.push(indexIdx+4,indexIdx+6,indexIdx+2);
					}
					const ldEnd = (upPoints.length - 1) * 4;
					attributeIndex.push(ldEnd + 0, ldEnd + 1, ldEnd+ 2);
					attributeIndex.push(ldEnd + 2, ldEnd + 1, ldEnd + 3);
					attributeIndex.push(1,3,ldEnd + 1);
					attributeIndex.push(3, ldEnd + 3, ldEnd + 1);
					side = 'front';
					break;
				case 'line' :
				default:
					attributePosition = new Float32Array(upPoints.length * 2 * 3);
					attributeLine = new Float32Array((upPoints.length - 1) * 2 * 3);
					upPoints.forEach((p,i) => {
						const idx = i * 6;
						const x = this.getWidthCenter(i);
						attributePosition[idx + 0] = x;
						attributePosition[idx + 1] = middleY;
						attributePosition[idx + 2] = baseZ;
						attributePosition[idx + 3] = x;
						attributePosition[idx + 4] = downPoints[i];
						attributePosition[idx + 5] = baseZ;
						areaUpdateAttributes.push({
							index : areaIdx,
							from : middleY,
							to : p
						})
						if (i < this.widthLength -1) {
							attributeLine[idx + 0] = x;
							attributeLine[idx + 1] = middleY;
							attributeLine[idx + 2] = baseZ;
							const nextP = upPoints[i+1];
							const nextX = this.getWidthCenter(i + 1);
							attributeLine[idx + 3] = nextX;
							attributeLine[idx + 4] = middleY;
							attributeLine[idx + 5] = baseZ;
							lineUpdateAttributes.push({
								index : areaIdx,
								from : middleY,
								to : p
							});
							lineUpdateAttributes.push({
								index : areaIdx + 1,
								from : middleY,
								to : nextP
							});
						}
						areaIdx += 2;
					});
					for(let i = 0 ; i < upPoints.length - 1; i++) {
						const indexIdx = i * 2;
						attributeIndex.push(indexIdx,indexIdx+1,indexIdx+2);
						attributeIndex.push(indexIdx+1,indexIdx+3,indexIdx+2);
					}
					side = 'double';
					break;
			}
			this._geometry = new THREE.BufferGeometry();
			this._geometry.setAttribute('position', new THREE.BufferAttribute(attributePosition, 3));
			this._geometry.setIndex(attributeIndex);
			this._geometry.computeVertexNormals();
			const options = ThreeUtil.getTypeSafe(this.options, {});
			this._material = new THREE.MeshPhongMaterial({
				color: ThreeUtil.getColorSafe(options.backgroundColor, 0xff0000),
				opacity: ThreeUtil.getTypeSafe(options.opacity, 1),
				side: this.getSide(side),
				transparent: true,
			});
			const wallMesh = new THREE.Mesh(this._geometry, this._material);
			wallMesh.name = 'wall';
			wallMesh.receiveShadow = true;
			wallMesh.castShadow = true;
			this._line.add(wallMesh);
			this.addUpdateAttributes(this._geometry, areaUpdateAttributes);
			this._geometryBorder = new THREE.BufferGeometry();
			this._geometryBorder.setAttribute('position', new THREE.BufferAttribute(attributeLine, 3));
			this._materialBorder = new THREE.LineBasicMaterial({
				color: ThreeUtil.getColorSafe(options.borderColor, 0x00ff00),
				transparent: true,
			});
			const borderMesh = new THREE.LineSegments(this._geometryBorder, this._materialBorder);
			borderMesh.name = 'border';
			this._line.add(borderMesh);
			this.addUpdateAttributes(this._geometryBorder, lineUpdateAttributes);
			let pointerInfo = this.getPointShape();
			let pointer : THREE.Object3D = pointerInfo.mesh;
			this._geometryPoint = pointerInfo.geometry;
			this._materialPoint = pointerInfo.material;
			this._geometryPointBorder = pointerInfo.geometryBorder;
			this._materialPointBorder = pointerInfo.materialBorder;
			this.addPointer(upPoints, pointer, this._line, middleY, baseZ);
			this.setChart(this._line);
		}
		return this._line as T;
	}

}
