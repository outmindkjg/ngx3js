import { Component, forwardRef, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { AbstractChartComponent } from '../../chart.abstract';
import { ThreeColor, ThreeUtil } from '../../interface';
import { AbstractObject3dComponent } from '../../object3d.abstract';

@Component({
	selector: 'ngx3js-chart-title',
	templateUrl: './title.component.html',
	styleUrls: ['./title.component.scss'],
	providers: [{ provide: AbstractObject3dComponent, useExisting: forwardRef(() => ChartTitleComponent) }],
})
export class ChartTitleComponent extends AbstractChartComponent implements OnInit {

	@Input() private type: string = '';
	@Input() private message: string = null;
	@Input() private color: ThreeColor = null;
	@Input() private align: string = null;
	@Input() private fontFamily: string = null;

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
		super.ngOnInit('chart-title');
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

	private _title: THREE.Object3D = null;

	private _material: THREE.MeshBasicMaterial = null;

	private _geometry: THREE.PlaneGeometry = null;

	/**
	 * Applys changes3d
	 * @param changes
	 * @returns
	 */
	protected applyChanges3d(changes: string[]) {
		if (this._title !== null) {
			if (ThreeUtil.isIndexOf(changes, ['clearinit'])) {
				this.getTitle();
			}
			if (!ThreeUtil.isOnlyIndexOf(changes, ['opacity','align'], this.CHART_ATTR)) {
				this.needUpdate = true;
				return;
			}
			if (ThreeUtil.isIndexOf(changes, ['init'])) {
				changes = ThreeUtil.pushUniq(changes, ['opacity','align']);
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'options':
						if (ThreeUtil.isNotNull(this.options)) {
							this._material.opacity = ThreeUtil.getTypeSafe(this.options.opacity, 1);
						}
						break;
					case 'align':
						if (ThreeUtil.isNotNull(this.align)) {
							const geometry = this._geometry;
							const width = geometry.parameters.width;
							const height = geometry.parameters.height;
							geometry.center();
							ThreeUtil.getTypeSafe(this.align, 'center')
								.split('-')
								.forEach((align) => {
									switch (align.toLowerCase()) {
										case 'left':
											geometry.translate(width / 2, 0, 0);
											break;
										case 'right':
											geometry.translate(-width / 2, 0, 0);
											break;
										case 'top':
											geometry.translate(0, height / 2, 0);
											break;
										case 'bottom':
											geometry.translate(0, -height / 2, 0);
											break;
									}
								});
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
		if (this._title === null || this._needUpdate) {
			this.needUpdate = false;
			const canvas = document.createElement('canvas');
			const context = canvas.getContext('2d');
			const message = ThreeUtil.getTypeSafe(this.message, 'no title');
			const height = ThreeUtil.getTypeSafe(this.height, 1);
			const font = 'normal 100px ' + ThreeUtil.getTypeSafe(this.fontFamily, 'Arial');
			context.font = font;
			let textWidth = 500;
			const textHeight = 110;
			switch(this.type.toLowerCase()) {
				case 'label' :
					textWidth = ThreeUtil.getTypeSafe(this.width, 1) * textHeight / height;
					break;
				case 'title' :
				case 'subtitle' :
				default :
					const metrics = context.measureText(message);
					textWidth = metrics.width;
					break;
			}
			canvas.width = textWidth;
			canvas.height = textHeight;
			const options = ThreeUtil.getTypeSafe(this.options, {});
			if (ThreeUtil.isNotNull(options.backgroundColor)) {
				context.fillStyle = '#' + ThreeUtil.getColorSafe(options.backgroundColor, '0x000000').getHexString();
				context.fillRect(0, 0, textWidth, textHeight);
			}
			context.font = font;
			context.textBaseline = 'middle';
			context.fillStyle = '#' + ThreeUtil.getColorSafe(this.color, '0xffffff').getHexString();
			switch(this.type.toLowerCase()) {
				case 'label' :
					context.textAlign = 'left';
					context.fillText(message, textHeight * 0.1, textHeight * 0.6);
					break;
				case 'title' :
				case 'subtitle' :
				default :
					context.textAlign = 'center';
					context.fillText(message, textWidth * 0.5, textHeight * 0.6);
					break;
			}
			const texture = new THREE.Texture(canvas);
			texture.needsUpdate = true;
			this._material = new THREE.MeshBasicMaterial({
				color: 0xffffff,
				side: THREE.DoubleSide,
				map: texture,
				opacity: 1,
				transparent: true,
			});
			const width = (height * textWidth) / textHeight;
			this._geometry = new THREE.PlaneGeometry(width, height);
			this._title = new THREE.Mesh(this._geometry, this._material);
			this.setChart(this._title);
		}
		return this._title as T;
	}
}
