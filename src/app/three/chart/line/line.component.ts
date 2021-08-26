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

	/**
	 * Depth; that is, the length of the edges parallel to the Z axis. Optional; defaults to 1.
	 */
	@Input() protected scaleMin: number = null;

	/**
	 * Depth; that is, the length of the edges parallel to the Z axis. Optional; defaults to 1.
	 */
	@Input() protected scaleMax: number = null;

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
							this._material.opacity = ThreeUtil.getTypeSafe(this.opacity, 1);
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
			this._updateAttributes = [];
			this._line = new THREE.Group();
			const width = ThreeUtil.getTypeSafe(this.width, 1);
			const height = ThreeUtil.getTypeSafe(this.height, 1);
			const depth = ThreeUtil.getTypeSafe(this.depth, 1);
			const depthIdx = ThreeUtil.getTypeSafe(this.depthIdx, 0);
			const depthLength = Math.max(1, ThreeUtil.getTypeSafe(this.depthLength, 1));
			const data : number[] = ThreeUtil.getTypeSafe(this.data, []);
			if (data.length === 0) {
				for(let i = 0 ; i < 10; i++) {
					data.push(Math.random() * 100);
				}
			}
			const baseZ = depth / depthLength * (depthIdx + 0.5) - depth / 2;
			let scaleMax = 100;
			let scaleMin = 0;
			if (ThreeUtil.isNotNull(this.scaleMax)) {
				scaleMax = ThreeUtil.getTypeSafe(this.scaleMax, 100);
			} else if (data.length > 0){
				scaleMax = -Infinity;
				data.forEach(p => {
					scaleMax = Math.max(scaleMax, p);
				});
			}
			if (ThreeUtil.isNotNull(this.scaleMin)) {
				scaleMin = ThreeUtil.getTypeSafe(this.scaleMin, 0);
			} else if (data.length > 0){
				scaleMin = Infinity;
				data.forEach(p => {
					scaleMin = Math.min(scaleMin, p);
				});
			}
			const scaleDist = scaleMax - scaleMin;
			const upPoints: number[] = [];
			const downPoints: number[] = [];
			const downBase = -height / 2;
			data.forEach(p => {
				upPoints.push(((p - scaleMin)/ scaleDist - 0.5) * height / 2);
				downPoints.push(downBase);
			});
			let attributePosition : Float32Array = null;
			let attributeLine : Float32Array = null;
			let attributeIndex : number[] = [];
			let areaUpdateAttributes : AttributeUpdateInfo[] = [];
			let lineUpdateAttributes : AttributeUpdateInfo[] = [];
			const lineStepX = width / upPoints.length;
			const lineBaseX = - width / 2 + lineStepX / 2;
			const lineLen = upPoints.length;
			const middleY = 0;
			switch (this.type.toLowerCase()) {
				case 'line' :
				default:
					attributePosition = new Float32Array(upPoints.length * 2 * 3);
					attributeLine = new Float32Array((upPoints.length - 1) * 2 * 3);
					let areaIdx = 0;
					upPoints.forEach((p,i) => {
						const idx = i * 6;
						const x = i * lineStepX + lineBaseX;
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
						if (i < lineLen -1) {
							attributeLine[idx + 0] = x;
							attributeLine[idx + 1] = middleY;
							attributeLine[idx + 2] = baseZ;
							const nextP = upPoints[i+1];
							const nextX = (i + 1) * lineStepX + lineBaseX;
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
					break;
			}
			this._geometry = new THREE.BufferGeometry();
			this._geometry.setAttribute('position', new THREE.BufferAttribute(attributePosition, 3));
			this._geometry.setIndex(attributeIndex);
			this._geometry.computeVertexNormals();
			this._material = new THREE.MeshPhongMaterial({
				color: ThreeUtil.getColorSafe(this.backgroundColor, 0xff0000),
				opacity: ThreeUtil.getTypeSafe(this.opacity, 1),
				side: this.getSide('double'),
				transparent: true,
			});
			const wallMesh = new THREE.Mesh(this._geometry, this._material);
			wallMesh.name = 'wall';
			wallMesh.receiveShadow = true;
			wallMesh.castShadow = true;
			this._line.add(wallMesh);
			this._updateAttributes.push({
				attribute : this._geometry.getAttribute('position'),
				values : areaUpdateAttributes
			})
			this._geometryBorder = new THREE.BufferGeometry();
			this._geometryBorder.setAttribute('position', new THREE.BufferAttribute(attributeLine, 3));
			this._materialBorder = new THREE.LineBasicMaterial({
				color: ThreeUtil.getColorSafe(this.backgroundColor, 0x00ff00),
				opacity: ThreeUtil.getTypeSafe(this.opacity, 1),
				transparent: true,
			});
			const borderMesh = new THREE.LineSegments(this._geometryBorder, this._materialBorder);
			borderMesh.name = 'border';
			this._line.add(borderMesh);
			this._updateAttributes.push({
				attribute : this._geometryBorder.getAttribute('position'),
				values : lineUpdateAttributes
			})
			switch(this.pointStyle.toLowerCase()) {
				case 'circle' :
				default :
					this._geometryPoint = new THREE.SphereGeometry(
						ThreeUtil.getTypeSafe(this.pointRadius, 0.03)
					);
					this._geometryPointBorder = new THREE.WireframeGeometry(this._geometryPoint);
					break;
			}
			const updatePosition : {
				object3d :THREE.Object3D,
				value : AttributeUpdateInfo
			}[] = [];
			this._materialPoint = new THREE.MeshPhongMaterial({
				color : ThreeUtil.getColorSafe(this.pointBackgroundColor, 0xff00ff)
			})
			this._materialPointBorder = new THREE.LineBasicMaterial({
				color : ThreeUtil.getColorSafe(this.pointBorderColor, 0x000000)
			})

			upPoints.forEach((p,i) => {
				const x = i * lineStepX + lineBaseX;
				const position : THREE.Vector3 = new THREE.Vector3(x,middleY,baseZ);
				const point = new THREE.Mesh(this._geometryPoint ,this._materialPoint);
				point.position.copy(position);
				point.castShadow = true;
				this._line.add(point);
				updatePosition.push({
					object3d : point,
					value : {
						index : 1,
						from : middleY,
						to : p
					}
				})
				const pointBorder = new THREE.LineSegments(this._geometryPointBorder ,this._materialPointBorder);
				pointBorder.position.copy(position);
				pointBorder.castShadow = true;
				this._line.add(pointBorder);
				updatePosition.push({
					object3d : pointBorder,
					value : {
						index : 1,
						from : middleY,
						to : p
					}
				})
			})
			this.setChart(this._line);
			this._updatePosition = updatePosition;

			if (this.controllerList.length === 0) {
				this.update(null, 1, 0.1);
			}
		}
		return this._line as T;
	}

	private _updateAttributes : {
		attribute :THREE.BufferAttribute | THREE.InterleavedBufferAttribute,
		values : AttributeUpdateInfo[]
	}[] = [];

	private _updatePosition : {
		object3d :THREE.Object3D,
		value : AttributeUpdateInfo
	}[] = [];

	public update(_: RendererTimer, elapsedTime : number, delta : number) {
		if (ThreeUtil.isNotNull(this._updateAttributes) || ThreeUtil.isNotNull(this._updatePosition)) {
			if (elapsedTime > 0 && elapsedTime < 1.5 && delta > 0) {
				elapsedTime = Math.min(elapsedTime, 1);
				if (ThreeUtil.isNotNull(this._updateAttributes) && this._updateAttributes.length > 0) {
					this._updateAttributes.forEach(info => {
						const attribute = info.attribute;
						info.values.forEach(data => {
							attribute.setY(data.index, MathUtils.lerp(data.from, data.to, elapsedTime));
						})
						attribute.needsUpdate = true;
					});
				}
				if (ThreeUtil.isNotNull(this._updatePosition) && this._updatePosition.length > 0) {
					this._updatePosition.forEach(info => {
						const object3d = info.object3d;
						const data = info.value;
						object3d.position.setY(MathUtils.lerp(data.from, data.to, elapsedTime));
					});
				}
			}
			if (ThreeUtil.isNotNull(this._updatePosition) && this._updatePosition.length > 0) {
				this._updatePosition.forEach(info => {
					const object3d = info.object3d;
					object3d.rotation.y += delta * 0.5;
					object3d.rotation.x += delta * 0.3;
				});
			}
		}
	}

}
