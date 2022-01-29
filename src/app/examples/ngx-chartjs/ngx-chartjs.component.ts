import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as chartjs from 'chart.js';
import * as helpers from 'chart.js/helpers';
import 'chartjs-adapter-luxon';
import {
	ChartAction, CHARTJS, ChartUtils, I3JS,
	N3JS,
	NgxBaseComponent,
	NgxRendererComponent,
	NgxSceneComponent,
	NgxThreeUtil
} from 'ngx3js';

@Component({
	selector: 'app-ngx-chartjs',
	templateUrl: './ngx-chartjs.component.html',
	styleUrls: ['./ngx-chartjs.component.scss'],
})
export class NgxChartJsComponent extends NgxBaseComponent<{
	geometry: string;
	autoLookat: boolean;
	type: number;
	example: string;
	width: number;
	height: number;
	canvasSize: number;
	materialType: string;
	materialSide: string;
	materialOpacity: number;
	materialColor: number;
	backgroundTransparent: boolean;
	backgroundColor: number;
	backgroundOpacity: number;
	repeatX: number;
	repeatY: number;
	textureAlign: string;
	offsetX: number;
	offsetY: number;
	wrap: string;
}> {
	constructor(private route: ActivatedRoute) {
		super(
			{
				geometry: 'BoxGeometry',
				autoLookat: false,
				type: 0,
				example: 'bar-vertical',
				width: 2,
				height: 2,
				canvasSize: 512,
				materialType: 'MeshStandardMaterial',
				materialSide: 'double',
				materialOpacity: 1,
				materialColor: 0xffffff,
				backgroundTransparent: false,
				backgroundColor: 0x111111,
				backgroundOpacity: 0.6,
				repeatX: 1,
				repeatY: 1,
				textureAlign: 'none',
				offsetX: 0,
				offsetY: 0,
				wrap: 'ClampToEdgeWrapping',
			},
			[
				{
					name: 'Geometry',
					type: 'folder',
					children: [
						{
							name: 'geometry',
							title: 'type',
							type: 'select',
							select: [
								'PlaneGeometry',
								'BoxGeometry',
								'SphereGeometry',
								'CapsuleGeometry',
								'CylinderGeometry',
							],
							change: () => {
								switch (this.controls.geometry) {
									case 'CapsuleGeometry':
									case 'SphereGeometry':
									case 'CylinderGeometry':
										this.controls.repeatX = 2;
										this.controls.repeatY = 1;
										break;
									default:
										this.controls.repeatX = 1;
										this.controls.repeatY = 1;
										break;
								}
							},
						},
						{
							name: 'autoLookat',
							title: 'Lookat Camera',
							type: 'checkbox',
						},
						{
							name: 'width',
							type: 'number',
							min: 1,
							max: 3,
						},
						{
							name: 'height',
							type: 'number',
							min: 1,
							max: 3,
						},
					],
				},
				{
					name: 'Chart',
					type: 'folder',
					children: [],
				},
				{
					name: 'Chart Size & Color',
					type: 'folder',
					children: [
						{
							name: 'canvasSize',
							title: 'Size',
							type: 'number',
							min: 212,
							max: 1024,
							step: 1,
						},
						{
							name: 'repeatX',
							title: 'repeat-X',
							type: 'number',
							listen: true,
							min: 0.5,
							max: 3,
							step: 0.2,
						},
						{
							name: 'repeatY',
							title: 'repeat-Y',
							type: 'number',
							listen: true,
							min: 0.5,
							max: 3,
							step: 0.2,
						},
						{
							name: 'textureAlign',
							type: 'select',
							select: [
								'none',
								'top-left',
								'top-center',
								'top-right',
								'middle-left',
								'middle-center',
								'middle-right',
								'bottom-left',
								'bottom-center',
								'bottom-right',
							],
							change: () => {
								if (this.renderer && this.renderer.gui) {
									const chartSizeFolder = NgxThreeUtil.getGuiFolder(
										this.renderer.gui,
										'Chart Size & Color'
									);
									if (chartSizeFolder !== null) {
										const offsetX = NgxThreeUtil.getGuiController(
											chartSizeFolder,
											'offsetX'
										);
										const offsetY = NgxThreeUtil.getGuiController(
											chartSizeFolder,
											'offsetY'
										);
										switch (this.controls.textureAlign) {
											case 'none':
												NgxThreeUtil.setGuiEnabled(offsetX, true);
												NgxThreeUtil.setGuiEnabled(offsetY, true);
												break;
											default:
												NgxThreeUtil.setGuiEnabled(offsetX, false);
												NgxThreeUtil.setGuiEnabled(offsetY, false);
												break;
										}
									}
								}
							},
						},
						{
							name: 'offsetX',
							title: 'offset-X',
							type: 'number',
							listen: true,
							min: -1,
							max: 1,
							step: 0.1,
						},
						{
							name: 'offsetY',
							title: 'offset-Y',
							type: 'number',
							listen: true,
							min: -1,
							max: 1,
							step: 0.1,
						},
						{
							name: 'wrap',
							title: 'Wrapping Modes',
							type: 'select',
							select: [
								'RepeatWrapping',
								'ClampToEdgeWrapping',
								'MirroredRepeatWrapping',
							],
						},
						{
							name: 'backgroundTransparent',
							title: 'Transparent',
							type: 'checkbox',
							change: () => {
								this.changeColor();
							},
						},
						{
							name: 'backgroundColor',
							title: 'Background',
							type: 'color',
							change: () => {
								this.changeColor();
							},
						},
						{
							name: 'backgroundOpacity',
							title: 'Opacity',
							type: 'number',
							min: 0,
							max: 1,
							change: () => {
								this.changeColor();
							},
						},
					],
				},
				{
					name: 'Chart Action',
					type: 'folder',
					children: [],
				},
				{
					name: 'Materia',
					type: 'folder',
					children: [
						{
							name: 'materialType',
							type: 'select',
							select: [
								'MeshStandardMaterial',
								'MeshPhongMaterial',
								'MeshLambertMaterial',
								'MeshBasicMaterial',
								'MeshPhysicalMaterial',
								'MeshToonMaterial',
							],
						},
						{
							name: 'materialSide',
							type: 'select',
							select: ['double', 'front', 'back'],
						},
						{
							name: 'materialOpacity',
							type: 'number',
							min: 0,
							max: 1,
						},
						{
							name: 'materialColor',
							type: 'color',
						},
					],
				},
			],
			false,
			false
		);
	}

	ngOnInit(): void {
		chartjs.Chart.register(...chartjs.registerables);
		chartjs.Chart.register(Log2Axis as any, Custom);

		this.chartjs = chartjs.Chart;
		this.helpers = helpers;

		this.subscribeRefer(
			'router',
			this.route.params.subscribe((params) => {
				if (params['type']) {
					this.controls.example = params['type'];
				}
			})
		);
		this.changeColor();
	}

	private changeType() {
		const chartFolder = NgxThreeUtil.getGuiFolder(this.renderer.gui, 'Chart');
		const oldExample = NgxThreeUtil.getGuiController(chartFolder, 'example');
		if (oldExample !== null && oldExample !== undefined) {
			oldExample.destroy();
		}
		const type = this.controls.type;
		const exampleList: { [key: string]: string } = {};
		this.exampleList.forEach((example) => {
			if (example.type === type) {
				exampleList[example.name] = example.url;
			}
		});
		const exampleController = chartFolder.add(
			this.controls,
			'example',
			exampleList
		);
		exampleController.listen(true);
		exampleController.onChange(() => {
			this.changeExample();
		});
		const example = this.controls.example;
		if (!Object.values(exampleList).includes(example)) {
			this.controls.example = Object.values(exampleList)[0];
		}
		this.changeExample();
	}

	public option: CHARTJS.ChartConfiguration = null;
	public optionSeqn: string = null;

	private lastLoadedExample: string = null;
	private chart: CHARTJS.Chart = null;

	private intervalRunTimer: any = null;

	public setChart(chart: CHARTJS.Chart) {
		this.chart = chart;
		if (this.intervalRunTimer !== null) {
			window.clearInterval(this.intervalRunTimer);
			this.intervalRunTimer = null;
		}
		switch (this.lastLoadedExample) {
			case 'gauge-clock':
				break;
		}
		if (this.lastActions !== this.option.actions) {
			this.lastActions = this.option.actions;
			const actionFolder = NgxThreeUtil.getGuiFolder(
				this.renderer.gui,
				'Chart Action'
			);
			NgxThreeUtil.clearGui(actionFolder);
			if (this.lastActions !== null && this.lastActions !== undefined) {
				this.lastActions.forEach((action) => {
					if (
						typeof action.handler === 'function' &&
						typeof action.onclick === 'function'
					) {
						actionFolder.add(action, 'onclick').name(action.name);
					} else if (
						action.handler !== null &&
						typeof action.handler === 'object' &&
						action.property !== null
					) {
						const actionControler = actionFolder
							.add(action.handler, action.property)
							.name(action.name)
							.listen(true);
						if (NgxThreeUtil.isNotNull(action.change)) {
							actionControler.onChange(action.change);
						}
						switch (action.name) {
							case 'initProgress':
							case 'progress':
								actionControler.max(1).min(0);
								break;
						}
					} else {
						console.log(action);
					}
				});
			}
		}
	}

	private lastActions: ChartAction[] = [];

	private changeExample() {
		if (this.lastLoadedExample !== this.controls.example) {
			this.lastLoadedExample = this.controls.example;
			this.chartTypeName = 'No Name';
			this.exampleList.forEach((example) => {
				if (example.url === this.lastLoadedExample) {
					this.chartTypeName = example.name;
				}
			});
			this.jsonFileLoad(
				'chartjs/' + this.lastLoadedExample + '.json',
				(option: any) => {
					switch (this.lastLoadedExample) {
						case 'scales-time-line':
							{
								const labels: any = [];
								option.data.labels.forEach((_, idx) => {
									labels.push(ChartUtils.newDate(idx));
								});
								option.data.labels = labels;
								option.data.datasets[2].data.forEach((data, idx) => {
									switch (idx) {
										case 0:
											data.x = ChartUtils.newDateString(0);
											break;
										case 1:
											data.x = ChartUtils.newDateString(5);
											break;
										case 2:
											data.x = ChartUtils.newDateString(7);
											break;
										case 3:
											data.x = ChartUtils.newDateString(15);
											break;
									}
								});
							}
							break;
						case 'scales-time-max-span':
							option.data.datasets[0].data.forEach((data, idx) => {
								switch (idx) {
									case 0:
										data.x = ChartUtils.newDateString(0);
										break;
									case 1:
										data.x = ChartUtils.newDateString(2);
										break;
									case 2:
										data.x = ChartUtils.newDateString(4);
										break;
									case 3:
										data.x = ChartUtils.newDateString(6);
										break;
								}
							});
							option.data.datasets[1].data.forEach((data, idx) => {
								switch (idx) {
									case 0:
										data.x = ChartUtils.newDate(0);
										break;
									case 1:
										data.x = ChartUtils.newDate(2);
										break;
									case 2:
										data.x = ChartUtils.newDate(5);
										break;
									case 3:
										data.x = ChartUtils.newDate(6);
										break;
								}
							});
							break;
						case 'scales-time-combo':
							{
								const labels: any = [];
								option.data.labels.forEach((_, idx) => {
									labels.push(ChartUtils.newDate(idx));
								});
								option.data.labels = labels;
							}
							break;
						case 'tooltip-position':
							(chartjs.Tooltip.positioners as any).bottom = function (items) {
								const pos = (chartjs.Tooltip.positioners as any).average(
									items,
									null
								);
								if (pos === false) {
									return false;
								}
								const chart = this.chart;
								return {
									x: pos.x,
									y: chart.chartArea.bottom,
									xAlign: 'center',
									yAlign: 'bottom',
								};
							};
							break;
					}
					this.option = option;
					this.optionSeqn = NgxThreeUtil.getUUID();
				}
			);
		}
	}

	private changeColor() {
		if (this.controls.backgroundTransparent) {
			this.canvasBackground = null;
		} else {
			this.canvasBackground = this.controls.backgroundColor;
			this.canvasBackgroundOpacity = this.controls.backgroundOpacity;
		}
	}

	canvasBackground: number = null;
	canvasBackgroundOpacity: number = null;
	chartTypeName: string = null;

	private jsonFileLoad(url: string, callBack: (data: any) => void) {
		const fileLoader: I3JS.FileLoader = NgxThreeUtil.getLoader(
			'fileLoader',
			N3JS.FileLoader
		);
		fileLoader.load(NgxThreeUtil.getStoreUrl(url), (text: string) => {
			try {
				callBack(JSON.parse(text));
			} catch (error) {
				return;
			}
		});
	}

	private exampleList: { url: string; name: string; type: number }[] = [];

	public setRender(renderer: NgxRendererComponent): void {
		super.setRender(renderer);
		this.getTimeout().then(() => {
			this.jsonFileLoad('chartjs/index.json', (data: any[]) => {
				this.exampleList = [];
				const chartFolder = NgxThreeUtil.getGuiFolder(
					this.renderer.gui,
					'Chart'
				);
				const typeSelect: { [key: string]: number } = {};
				const example = this.controls.example;
				data.forEach((section, idx) => {
					typeSelect[section.title] = idx;
					section.children.forEach((child) => {
						this.exampleList.push({
							url: child.url,
							name: child.name,
							type: idx,
						});
						if (example === child.url) {
							this.controls.type = idx;
						}
					});
				});
				const typeController = chartFolder.add(
					this.controls,
					'type',
					typeSelect
				);
				typeController.listen(true);
				typeController.onChange(() => {
					this.changeType();
				});
				this.changeType();
			});
		});
	}

	chartjs: any = chartjs;
	helpers: any = helpers;
	setScene(scene: NgxSceneComponent): void {
		super.setScene(scene);
	}
}

class Log2Axis extends chartjs.Scale {
	static id = 'log2';
	static defaults = {};
	_startValue: number;
	_valueRange: number;
	constructor(cfg) {
		super(cfg);
		this._startValue = undefined;
		this._valueRange = 0;
	}

	parse(raw, index) {
		const value = chartjs.LinearScale.prototype.parse.apply(this, [raw, index]);
		return isFinite(value) && value > 0 ? value : null;
	}

	determineDataLimits() {
		const { min, max } = this.getMinMax(true);
		this.min = isFinite(min) ? Math.max(0, min) : null;
		this.max = isFinite(max) ? Math.max(0, max) : null;
	}

	buildTicks() {
		const ticks = [];

		let power = Math.floor(Math.log2(this.min || 1));
		let maxPower = Math.ceil(Math.log2(this.max || 2));
		while (power <= maxPower) {
			ticks.push({ value: Math.pow(2, power) });
			power += 1;
		}

		this.min = ticks[0].value;
		this.max = ticks[ticks.length - 1].value;
		return ticks;
	}

	/**
	 * @protected
	 */
	configure() {
		const start = this.min;

		super.configure();

		this._startValue = Math.log2(start);
		this._valueRange = Math.log2(this.max) - Math.log2(start);
	}

	getPixelForValue(value) {
		if (value === undefined || value === 0) {
			value = this.min;
		}

		return this.getPixelForDecimal(
			value === this.min
				? 0
				: (Math.log2(value) - this._startValue) / this._valueRange
		);
	}

	getValueForPixel(pixel) {
		const decimal = this.getDecimalForPixel(pixel);
		return Math.pow(2, this._startValue + decimal * this._valueRange);
	}
}

class Custom extends chartjs.BubbleController {
	static id = 'derivedBubble';
	options: any = {
		boxStrokeStyle: 'red',
	};
	draw() {
		// Call bubble controller method to draw all the points
		super.draw();

		// Now we can do some custom drawing for this dataset.
		// Here we'll draw a box around the first point in each dataset,
		// using `boxStrokeStyle` dataset option for color
		var meta = this.getMeta();
		var pt0 = meta.data[0];
		let { x, y } = pt0.getProps(['x', 'y']);
		let { radius } = pt0.options;

		var ctx = this.chart.ctx;
		ctx.save();
		ctx.strokeStyle = this.options.boxStrokeStyle;
		ctx.lineWidth = 1;
		ctx.strokeRect(
			(x as any) - (radius as any),
			(y as any) - (radius as any),
			2 * (radius as any),
			2 * (radius as any)
		);
		ctx.restore();
	}
}
