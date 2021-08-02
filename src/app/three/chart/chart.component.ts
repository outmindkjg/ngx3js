import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BaseComponent, GuiControlParam, RendererEvent, RendererTimer, ThreeColor, ThreeUtil, ThreeVector } from '../interface';
import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { MeshComponent } from '../mesh/mesh.component';

/**
 * Color opacity
 */
export interface ColorOpacity {
	color: ThreeColor;
	opacity: number;
}

/**
 * Background border
 */
export interface BackgroundBorder {
	backgroundColor: ColorOpacity;
	borderColor?: ColorOpacity;
	hoverBackgroundColor?: ColorOpacity;
	hoverBorderColor?: ColorOpacity;
}

/**
 * Chart data
 */
export interface ChartData {
	datasets: {
		data: (number | { x: number; y: number; r?: number })[];
		type?: string;
		label?: string;
		backgroundColor?: ThreeColor[] | ThreeColor;
		borderColor?: ThreeColor[] | ThreeColor;
		borderWidth?: number;
		fill?: boolean;
		hoverBackgroundColor?: ThreeColor[] | ThreeColor;
		hoverBorderColor?: ThreeColor[] | ThreeColor;
		hoverBorderDash?: string;
		hoverBorderCapStyle?: string;
		hoverBorderDashOffset?: number;
		hoverBorderJoinStyle?: string;
		hoverBorderWidth?: number;
		pointBackgroundColor?: ThreeColor;
		pointBorderColor?: ThreeColor;
		pointBorderWidth?: number;
		pointHoverBackgroundColor?: ThreeColor;
		pointHoverBorderColor?: ThreeColor;
		pointHoverRadius?: number;
		pointRadius?: number;
		pointStyle?: string;
		hoverOffset?: number;
		tension?: number;
	}[];
	labels?: string[];
	options?: any;
}

/**
 * ChartComponent
 */
@Component({
	selector: 'ngx3js-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.scss'],
})
export class ChartComponent extends BaseComponent<any> implements OnChanges {
	/**
	 * Input  of chart component
	 */
	@Input() guiControl: any = null;

	/**
	 * Input  of chart component
	 */
	@Input() guiParams: GuiControlParam[] = null;

	/**
	 * Input  of chart component
	 */
	@Input() type: string = 'bar';

	/**
	 * Input  of chart component
	 */
	@Input() data: ChartData = {
		labels: ['Data1', 'Data2', 'Data3', 'Data4', 'Data5', 'Data6', 'Data7'],
		datasets: [
			{
				type: 'bar',
				label: 'My First Dataset',
				data: [65, 59, 80, 81, 56, 55, 40],
				backgroundColor: ['rgba(255, 99, 132, 0.4)', 'rgba(255, 159, 64, 0.9)', 'rgba(255, 205, 86, 0.9)', 'rgba(75, 192, 192, 0.9)', 'rgba(54, 162, 235, 0.9)', 'rgba(153, 102, 255, 0.9)', 'rgba(201, 203, 207, 0.9)'],
				borderColor: ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)'],
				hoverBackgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 205, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(153, 102, 255, 1)', 'rgba(201, 203, 207, 1)'],
				hoverBorderColor: ['rgb(255, 0, 0)', 'rgb(255, 255, 64)', 'rgb(255, 255, 86)', 'rgb(75, 192, 192)', 'rgb(54, 255, 235)', 'rgb(153, 102, 255)', 'rgb(201, 255, 207)'],
				borderWidth: 1,
			},
			{
				type: 'line',
				label: 'My First Dataset',
				data: [65, 59, 80, 81, 56, 55, 40],
				backgroundColor: ['rgba(255, 99, 132, 0.4)', 'rgba(255, 159, 64, 0.9)', 'rgba(255, 205, 86, 0.9)', 'rgba(75, 192, 192, 0.9)', 'rgba(54, 162, 235, 0.9)', 'rgba(153, 102, 255, 0.9)', 'rgba(201, 203, 207, 0.9)'],
				borderColor: ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)'],
				hoverBackgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 205, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(153, 102, 255, 1)', 'rgba(201, 203, 207, 1)'],
				hoverBorderColor: ['rgb(255, 0, 0)', 'rgb(255, 255, 64)', 'rgb(255, 255, 86)', 'rgb(75, 192, 192)', 'rgb(54, 255, 235)', 'rgb(153, 102, 255)', 'rgb(201, 255, 207)'],
				borderWidth: 1,
			},
			{
				type: 'line',
				label: 'My First Dataset',
				data: [65, 59, 80, 81, 56, 55, 40, 56, 55, 40],
				backgroundColor: ['rgba(255, 99, 132, 0.4)', 'rgba(255, 159, 64, 0.9)', 'rgba(255, 205, 86, 0.9)', 'rgba(75, 192, 192, 0.9)', 'rgba(54, 162, 235, 0.9)', 'rgba(153, 102, 255, 0.9)', 'rgba(201, 203, 207, 0.9)'],
				borderColor: ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)'],
				hoverBackgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 205, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(153, 102, 255, 1)', 'rgba(201, 203, 207, 1)'],
				hoverBorderColor: ['rgb(255, 0, 0)', 'rgb(255, 255, 64)', 'rgb(255, 255, 86)', 'rgb(75, 192, 192)', 'rgb(54, 255, 235)', 'rgb(153, 102, 255)', 'rgb(201, 255, 207)'],
				borderWidth: 1,
			},
		],
	};

	/**
	 * Input  of chart component
	 */
	@Input() options: any = null;

	/**
	 * Input  of chart component
	 */
	@Input() width: number = 1000;

	/**
	 * Input  of chart component
	 */
	@Input() height: number = 700;

	/**
	 * Input  of chart component
	 */
	@Input() depth: number = 200;

	/**
	 * Input  of chart component
	 */
	@Input() padding: number = 0.5;

	/**
	 * Creates an instance of chart component.
	 */
	constructor() {
		super({}, []);
	}

	/**
	 * on init
	 */
	ngOnInit() {}

	/**
	 * A callback method that is invoked immediately after the
	 * default change detector has checked data-bound properties
	 * if at least one has changed, and before the view and content
	 * children are checked.
	 *
	 * @param changes The changed properties.
	 */
	ngOnChanges(changes: SimpleChanges): void {}

	/**
	 * A callback method that is invoked immediately after
	 * Angular has completed initialization of a component's view.
	 * It is invoked only once when the view is instantiated.
	 */
	ngAfterViewInit() {
		window.setTimeout(() => {
			this.drawChart();
		}, 100);
	}

	/**
	 * Gets color opacity
	 * @param color
	 * @param [def]
	 * @returns color opacity
	 */
	private getColorOpacity(color: ThreeColor, def?: ThreeColor): ColorOpacity {
		color = ThreeUtil.getTypeSafe(color, def);
		if (typeof color === 'string' && color.indexOf('rgba') === 0) {
			let [_, val1, val2, val3, alpha] = (color + ',,,,')
				.replace('(', ',')
				.replace(')', ',')
				.replace(':', ',')
				.replace(/[^A-Za-z\-0-9\.,]/g, '')
				.split(',');
			let opacity = parseFloat(alpha);
			return { color: 'rgb(' + val1 + ',' + val2 + ',' + val3 + ')', opacity: opacity };
		} else if (typeof color === 'string' && color.indexOf('transparent') === 0) {
			return { color: 0xffffff, opacity: 0 };
		} else {
			return { color: color, opacity: 1 };
		}
	}

	/**
	 * Colors  of chart component
	 */
	private COLORS: string[] = ['#4dc9f6', '#f67019', '#f53794', '#537bc4', '#acc236', '#166a8f', '#00a950', '#58595b', '#8549ba'];

	/**
	 * Gets color opacity list
	 * @param colors
	 * @param idxLen
	 * @returns color opacity list
	 */
	private getColorOpacityList(colors: ThreeColor | ThreeColor[], idxLen: number): ColorOpacity[] {
		const colorList: ColorOpacity[] = [];
		if (ThreeUtil.isNotNull(colors)) {
			if (Array.isArray(colors)) {
				colors.forEach((color) => {
					colorList.push(this.getColorOpacity(color));
				});
			} else {
				colorList.push(this.getColorOpacity(colors));
			}
		}
		if (colorList.length === 0) {
			for (let i = 0; i < idxLen; i++) {
				colorList.push({
					color: this.COLORS[i % this.COLORS.length],
					opacity: 1,
				});
			}
		}
		const currLen = colorList.length;
		for (let i = currLen; i < idxLen; i++) {
			colorList.push(colorList[i % currLen]);
		}
		return colorList;
	}

	/**
	 * Draws chart
	 */
	private drawChart() {
		let minValue = Infinity;
		let maxValue = -Infinity;
		let barChartZIdx = 0;
		let barChartXMax = 0;
		let lineChartZIdx = 0;
		let lineChartXMax = 0;
		this.barChart = null;
		this.lineChart = null;
		this.data.datasets.forEach((data) => {
			const tmpValue : number[] = [];
			data.data.forEach((value) => {
				if (typeof value === 'number') {
					value = Math.min(100, Math.max(30, Math.random() * 100));
					tmpValue.push(value);
					minValue = Math.min(minValue, value);
					maxValue = Math.max(maxValue, value);
				}
			});
			data.data = tmpValue;
			const type = ThreeUtil.getTypeSafe(data.type, this.type, 'bar');
			switch (type.toLowerCase()) {
				case 'bar':
					barChartXMax = Math.max(barChartXMax, data.data.length);
					barChartZIdx++;
					break;
				case 'line':
					lineChartXMax = Math.max(lineChartXMax, data.data.length);
					lineChartZIdx++;
					break;
			}
		});
		const chartXMax = Math.max(barChartXMax, lineChartXMax);
		const chartZMax = Math.max(barChartZIdx, lineChartZIdx);
		if (maxValue <= 10) {
			maxValue = 10;
		} else if (maxValue <= 50) {
			maxValue = 50;
		} else if (maxValue <= 100) {
			maxValue = 100;
		} else if (maxValue <= 200) {
			maxValue = 200;
		} else if (maxValue <= 500) {
			maxValue = 500;
		} else if (maxValue <= 1000) {
			maxValue = 1000;
		}
		if (minValue <= 10) {
			minValue = 0;
		} else if (minValue <= 50) {
			minValue = 10;
		} else if (minValue <= 100) {
			minValue = 50;
		} else if (minValue <= 200) {
			minValue = 100;
		} else if (minValue <= 500) {
			minValue = 200;
		} else if (minValue <= 1000) {
			minValue = 500;
		}
		this.chartZero = new THREE.Vector3(0, minValue, 0);
		this.chartScale = new THREE.Vector3(this.width / chartXMax, this.height / Math.max(1,(maxValue - minValue)) , this.depth / chartZMax );
		const chartPadding = this.getLocalPosition(1,0,1);
		this.chartPosition = new THREE.Vector3( - this.width / 2 - chartPadding.x /2 , - this.height / 2, - this.depth / 2 + chartPadding.z /2);
		const xLabelList: string[] = [];
		this.data.labels.forEach((label) => {
			xLabelList.push(label);
		});
		if (barChartZIdx > 0) {
			this.barChart = [];
			const position = this.getLocalPosition(1, maxValue, 1);
			this.barGeometryInfo = {
				width: position.x * this.padding,
				height: position.y,
				depth: position.z * this.padding,
			};
		}
		if (lineChartZIdx > 0) {
			this.lineChart = [];
			this.lineCurvePath = [];
			const position = this.getLocalPosition(1, maxValue, 1);
			const radius = Math.min(position.x, position.y, position.z);
			this.lineGeometryInfo = {
				radius: radius / 5 * this.padding
			};
		}
		let barChartCurrIdx = 0;
		let lineChartCurrIdx = 0;
		this.data.datasets.forEach((data, idx) => {
			const type = ThreeUtil.getTypeSafe(data.type, this.type, 'bar');
			switch (type.toLowerCase()) {
				case 'bar':
					{
						const backgroundColor: ColorOpacity[] = this.getColorOpacityList(data.backgroundColor, barChartXMax);
						const borderColor: ColorOpacity[] = this.getColorOpacityList(data.borderColor || data.backgroundColor, barChartXMax);
						const hoverBackgroundColor: ColorOpacity[] = this.getColorOpacityList(data.hoverBackgroundColor || data.backgroundColor, barChartXMax);
						const hoverBorderColor: ColorOpacity[] = this.getColorOpacityList(data.hoverBorderColor || data.borderColor || data.backgroundColor, barChartXMax);
						const barColorInfo: BackgroundBorder[] = [];
						const borderWidth = ThreeUtil.getTypeSafe(data.borderWidth, 1);
						backgroundColor.forEach((colorInfo, idx) => {
							barColorInfo.push({
								backgroundColor: colorInfo,
								borderColor: borderColor[idx],
								hoverBackgroundColor: hoverBackgroundColor[idx],
								hoverBorderColor: hoverBorderColor[idx],
							});
						});
						data.data.forEach((value, idx) => {
							const x = barChartXMax - idx;
							const y = typeof value === 'number' ? value : 0;
							const z = barChartCurrIdx;
							const position = this.getLocalPosition(x, y, z);
							const colorInfo = barColorInfo[idx % barColorInfo.length];
							const tooltipPosition: THREE.Vector3 = this.getGlobalPosition(position);
							this.barChart.push({
								position: { x: position.x, y: 0, z: position.z },
								scale: { x: 1, y: 0, z: 1 },
								userData: { type: 'bar', scaleY: position.y / this.height, colorInfo: colorInfo, toolTipText: this.getTooltipText(xLabelList[idx], value), tooltipPosition: tooltipPosition },
								color: colorInfo.backgroundColor,
								borderWidth: borderWidth / 300,
								borderColor: colorInfo.borderColor,
							});
						});
						barChartCurrIdx++;
					}
					break;
				case 'line':
					{
						const backgroundColor: ColorOpacity[] = this.getColorOpacityList(data.backgroundColor, barChartXMax);
						const borderColor: ColorOpacity[] = this.getColorOpacityList(data.borderColor || data.backgroundColor, barChartXMax);
						const hoverBackgroundColor: ColorOpacity[] = this.getColorOpacityList(data.hoverBackgroundColor || data.backgroundColor, barChartXMax);
						const hoverBorderColor: ColorOpacity[] = this.getColorOpacityList(data.hoverBorderColor || data.borderColor || data.backgroundColor, barChartXMax);
						const lineColorInfo: BackgroundBorder[] = [];
						const borderWidth = ThreeUtil.getTypeSafe(data.borderWidth, 1);
						backgroundColor.forEach((colorInfo, idx) => {
							lineColorInfo.push({
								backgroundColor: colorInfo,
								borderColor: borderColor[idx],
								hoverBackgroundColor: hoverBackgroundColor[idx],
								hoverBorderColor: hoverBorderColor[idx],
							});
						});
						const lineCurvePath = [];

						data.data.forEach((value, idx) => {
							const x = lineChartXMax - idx;
							const y = typeof value === 'number' ? value : 0;
							const z = lineChartCurrIdx;
							const position = this.getLocalPosition(x, y, z);
							const colorInfo = lineColorInfo[idx % lineColorInfo.length];
							const tooltipPosition: THREE.Vector3 = this.getGlobalPosition(position);
							lineCurvePath.push(position);
							this.lineChart.push({
								position: { x: position.x, y: 0, z: position.z },
								scale: { x: 1, y: 1, z: 1 },
								userData: { type: 'line', posY: position.y , colorInfo: colorInfo, toolTipText: this.getTooltipText(xLabelList[idx], value), tooltipPosition: tooltipPosition },
								color: colorInfo.backgroundColor,
								borderWidth: borderWidth / 300,
								borderColor: colorInfo.borderColor,
							});
						});
						this.lineCurvePath.push(lineCurvePath);
						lineChartCurrIdx++;
					}
					break;
			}
		});
		this.axisX = { x: 0, y: -this.height / 2, z: 0 };
		this.axisY = { x: this.width / 2, y: 0, z: 0 };
		this.axisZ = { x: 0, y: 0, z: this.depth / 2 };
		this.grideInfo = {
			color1: 0xff0000,
			color2: 0xffffff,
			offset: 2,
			widthSegments: 20,
			heightSegments: 20,
		};
		this.yLabel = [];
		const labelStep = (maxValue - minValue) / 10;
		for (let i = minValue; i < maxValue; i += labelStep) {
			const position = this.getGlobalPosition(this.getLocalPosition(0, i, 0));
			this.yLabel.push({
				position: { x: this.width / 2, y: position.y, z: 0 },
				text: i.toFixed(2),
			});
		}
		this.xLabel = [];
		this.data.labels.forEach((label, idx) => {
			const position = this.getGlobalPosition(this.getLocalPosition(idx + 1, minValue ,  chartZMax - 0.5 ));
			this.xLabel.push({
				position: { x: position.x - this.axisX.x, y: position.y - this.axisX.y, z: position.z  - this.axisX.z},
				text: label,
			});
		});
		this.elapsedTime = 0;
	}

	/**
	 * Gets tooltip text
	 * @param label
	 * @param value
	 * @returns tooltip text
	 */
	private getTooltipText(label: string, value: any): string {
		if (typeof value === 'number') {
			return '<span>' + label + '</span> : ' + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		} else {
			return '<span>' + label + '</span> : ' + value;
		}
	}

	/**
	 * Gets tooltip text
	 * @param label
	 * @param value
	 * @returns tooltip text
	 */
	private getGlobalPosition(p: THREE.Vector3): THREE.Vector3 {
		return p.clone().add(this.chartPosition);
	}

	/**
	 * Gets tooltip text
	 * @param label
	 * @param value
	 * @returns tooltip text
	 */
	private getLocalPosition(x: number, y: number, z: number): THREE.Vector3 {
		return new THREE.Vector3(x, y, z).sub(this.chartZero).multiply(this.chartScale);
	}

	/**
	 * Axis x of chart component
	 */
	public chartScale: THREE.Vector3 = new THREE.Vector3(1,1,1);

	/**
	 * Axis x of chart component
	 */
	public chartZero: THREE.Vector3 = new THREE.Vector3(0,0,0);

	/**
	 * Axis x of chart component
	 */
	 public chartPosition: THREE.Vector3 = new THREE.Vector3(0,0,0);

	/**
	 * Axis x of chart component
	 */
	public axisX: ThreeVector = null;

	/**
	 * Axis y of chart component
	 */
	public axisY: ThreeVector = null;

	/**
	 * Axis z of chart component
	 */
	public axisZ: ThreeVector = null;

	/**
	 * Gride info of chart component
	 */
	public grideInfo: {
		color1: ThreeColor;
		color2: ThreeColor;
		offset: number;
		widthSegments: number;
		heightSegments: number;
	} = null;

	/**
	 * Bar chart of chart component
	 */
	public barChart: {
		position: ThreeVector;
		scale: ThreeVector;
		userData: any;
		color: ColorOpacity;
		borderWidth: number;
		borderColor: ColorOpacity;
	}[] = null;

	public lineChart: {
		position: ThreeVector;
		scale: ThreeVector;
		userData: any;
		color: ColorOpacity;
		borderWidth: number;
		borderColor: ColorOpacity;
	}[] = null;

	/**
	 * Bar geometry info of chart component
	 */
	public barGeometryInfo: { width: number; height: number; depth: number; } = {
		width: 100,
		height: 100,
		depth: 100,
	};

	/**
	 * Bar geometry info of chart component
	 */
	public lineGeometryInfo: { radius: number;} = {
		radius: 100,
	};

	/**
	 * Line curve path of chart component
	 */
	public lineCurvePath : ThreeVector[][] = [];

	/**
	 * Y label of chart component
	 */
	public yLabel: { position: ThreeVector; text: string }[] = null;

	/**
	 * X label of chart component
	 */
	public xLabel: { position: ThreeVector; text: string }[] = null;

	/**
	 * Elapsed time of chart component
	 */
	private elapsedTime: number = null;

	/**
	 * Tooltip  of chart component
	 */
	tooltip: CSS2DObject = null;

	/**
	 * Tooltip position of chart component
	 */
	tooltipPosition: THREE.Vector3 = null;

	/**
	 * Sets tool tip
	 * @param mesh
	 */
	public setToolTip(mesh: MeshComponent) {
		this.tooltip = mesh.getMesh();
	}

	/**
	 * Last intersect of chart component
	 */
	lastIntersect: THREE.Mesh = null;

	/**
	 * Determines whether mouse move on
	 * @param event
	 */
	public onMouseMove(event: RendererEvent) {
		if (this.camera !== null && this.mesh !== null && this.meshObject3d !== null) {
			const intersect = this.camera.getIntersection(event.mouse, this.meshObject3d, true);
			if (intersect !== null && intersect.object !== null) {
				if (this.lastIntersect !== intersect.object && ThreeUtil.isNotNull(intersect.object.userData.type)) {
					if (this.lastIntersect !== null) {
						this.setMaterialColor(this.lastIntersect, false);
						this.lastIntersect = null;
					}
					this.lastIntersect = intersect.object as THREE.Mesh;
					this.setMaterialColor(this.lastIntersect, true);
				}
			} else if (this.lastIntersect !== null) {
				this.setMaterialColor(this.lastIntersect, false);
				this.lastIntersect = null;
			}
		}
	}

	/**
	 * Sets material color
	 * @param mesh
	 * @param isHover
	 * @returns material color
	 */
	private setMaterialColor(mesh: THREE.Mesh, isHover: boolean): void {
		const material: THREE.MeshLambertMaterial = mesh.material as THREE.MeshLambertMaterial;
		const colorInfo: BackgroundBorder = mesh.userData.colorInfo;
		if (ThreeUtil.isNull(colorInfo)) {
			return;
		}
		const backgroundColor: ColorOpacity = isHover ? colorInfo.hoverBackgroundColor : colorInfo.backgroundColor;
		if (ThreeUtil.isNotNull(material) && ThreeUtil.isNotNull(backgroundColor)) {
			material.color = ThreeUtil.getColorSafe(backgroundColor.color);
			material.opacity = ThreeUtil.getTypeSafe(backgroundColor.opacity, 1);
			const borderColor: ColorOpacity = isHover ? colorInfo.hoverBorderColor : colorInfo.borderColor;
			if (ThreeUtil.isNotNull(borderColor) && mesh.children.length > 0) {
				const child = mesh.children[0];
				if (child instanceof THREE.LineSegments) {
					const childMaterial: THREE.LineBasicMaterial = child.material as THREE.LineBasicMaterial;
					childMaterial.color = ThreeUtil.getColorSafe(borderColor.color);
					childMaterial.opacity = ThreeUtil.getTypeSafe(borderColor.opacity, 1);
				}
			}
			if (this.tooltip !== null) {
				if (isHover) {
					this.tooltip.visible = true;
					this.tooltip.element.innerHTML = mesh.userData.toolTipText;
					this.tooltipPosition = mesh.userData.tooltipPosition;
				} else {
					this.tooltipPosition = null;
					this.tooltip.visible = false;
				}
			}
		}
	}

	/**
	 * Determines whether render on
	 * @param timer
	 */
	public onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.elapsedTime !== null && this.elapsedTime < 1) {
			this.elapsedTime = Math.min(1, this.elapsedTime + timer.delta / 10);
			this.meshObject3d.traverse((child) => {
				if (child.userData.type !== undefined) {
					switch (child.userData.type) {
						case 'bar':
							{
								const childScaleY = child.scale.y;
								const targetScaleY = child.userData.scaleY;
								child.scale.y = (targetScaleY - childScaleY) * this.elapsedTime + childScaleY;
							}
							break;
						case 'line':
							{
								const childPositionY = child.position.y;
								const targetPositionY = child.userData.posY;
								child.position.y = (targetPositionY - childPositionY) * this.elapsedTime + childPositionY;
							}
							break;
					}
				}
			});
		}
		if (this.tooltip !== null && this.tooltipPosition !== null) {
			this.tooltip.position.lerp(this.tooltipPosition, timer.delta * 3);
		}
	}
}
