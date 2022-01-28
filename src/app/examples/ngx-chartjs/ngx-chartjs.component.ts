import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as chartjs from 'chart.js';
import * as helpers from 'chart.js/helpers';
import 'chartjs-adapter-luxon';
import {
	I3JS,
	N3JS,
	NgxBaseComponent,
	NgxRendererComponent,
	NgxSceneComponent,
	NgxThreeUtil,
} from 'ngx3js';
import { ChartUtils } from '../chart/chart-utils';
import * as CHARTJS from '../chart/chartjs/chartjs.interface';

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
				example: 'pie-simple',
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

	public option: any = null;
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
					if (typeof action.handler === 'function' && typeof action.onclick === 'function') {
						actionFolder.add(action, 'onclick').name(action.name);
					} else if (action.handler !== null && typeof action.handler === 'object' && action.property !== null) {
						const actionControler = actionFolder.add(action.handler, action.property).name(action.name).listen(true);
						if (NgxThreeUtil.isNotNull(action.onchange)) {
							actionControler.onChange(action.onchange);
						}
						switch(action.name) {
							case "initProgress" :
							case "progress" :
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

	private lastActions: {
		name: string;
		handler: string | Function;
		onclick: () => void;
		onchange: () => void;
		property: string;
	}[] = [];

	private changeExample() {
		if (this.lastLoadedExample !== this.controls.example) {
			this.lastLoadedExample = this.controls.example;
			this.chartTypeName = 'No Name';
			this.exampleList.forEach((example) => {
				if (example.url === this.lastLoadedExample) {
					this.chartTypeName = example.name;
				}
			});
			switch (this.lastLoadedExample) {
				case 'bar-vertical':
				case 'bar-horizontal':
				case 'bar-stacked':
				case 'bar-stacked-groups':
				case 'bar-floating':
				case 'bar-border-radius':
				case 'line-line':
				case 'line-multi-axis':
				case 'line-stepped':
				case 'line-interpolation':
				case 'line-styling':
				case 'line-segments':
				case 'other-bubble':
				case 'other-scatter':
				case 'other-scatter-multi-axis':
				case 'other-doughnut':
				case 'other-pie':
				case 'other-multi-series-pie':
				case 'other-polar-area':
				case 'other-polar-area-center-labels':
				case 'other-radar':
				case 'other-radar-skip-points':
				case 'other-combo-bar-line':
				case 'other-stacked-bar-line':
				case 'area-line-boundaries':
				case 'area-line-datasets':
				case 'area-line-drawtime':
				case 'area-line-stacked':
				case 'area-radar':
				case 'scales-linear-min-max':
				case 'scales-linear-min-max-suggested':
				case 'scales-linear-step-size':
				case 'scales-log':
				case 'scales-time-line':
				case 'scales-time-max-span':
				case 'scales-time-combo':
				case 'scales-stacked':
				case 'scales-grid-options':
				case 'scales-ticks-options':
				case 'scales-titles-options':
				case 'scales-center-options':
				case 'legend-position':
				case 'legend-title':
				case 'legend-point-style':
				case 'legend-events':
				case 'legend-html':
				case 'title-alignment':
				case 'title-subtitle':
				case 'tooltip-position':
				case 'tooltip-interactions':
				case 'tooltip-point-style':
				case 'tooltip-content':
				case 'tooltip-html':
				case 'scriptable-bar':
				case 'scriptable-bubble':
				case 'scriptable-pie':
				case 'scriptable-line':
				case 'scriptable-polar':
				case 'scriptable-radar':
				case 'animations-delay':
				case 'animations-drop':
				case 'animations-loop':
				case 'animations-progressive-line':
				case 'animations-progressive-line-easing':
				case 'advanced-data-decimation':
				case 'advanced-progress-bar':
				case 'advanced-radial-gradient':
				case 'advanced-linear-gradient':
				case 'advanced-programmatic-events':
				case 'advanced-derived-axis-type':
				case 'advanced-derived-chart-type':
				case 'plugins-chart-area-border':
				case 'plugins-quadrants':
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
									(chartjs.Tooltip.positioners as any).bottom = function (
										items
									) {
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
					break;
				default:
					console.log(this.lastLoadedExample + '.json');
					const Utils = ChartUtils;
					const Chart = chartjs.Chart;

					const DATA_COUNT = 7;
					const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

					const labels = Utils.months({ count: 7 });
					const data = {
						labels: labels,
						datasets: [
							{
								label: 'Dataset 1',
								animations: {
									y: {
										duration: 2000,
										delay: 500,
									},
								},
								data: Utils.numbers(NUMBER_CFG),
								borderColor: Utils.CHART_COLORS.red,
								backgroundColor: Utils.transparentize(
									Utils.CHART_COLORS.red,
									0.5
								),
								fill: 1,
								tension: 0.5,
							},
							{
								label: 'Dataset 2',
								data: Utils.numbers(NUMBER_CFG),
								borderColor: Utils.CHART_COLORS.blue,
								backgroundColor: Utils.transparentize(
									Utils.CHART_COLORS.blue,
									0.5
								),
							},
						],
					};

					const config = {
						type: 'line',
						data: data,
						options: {
							animations: {
								y: {
									easing: 'easeInOutElastic',
									from: (ctx) => {
										if (ctx.type === 'data') {
											if (ctx.mode === 'default' && !ctx.dropped) {
												ctx.dropped = true;
												return 0;
											}
										}
									},
								},
							},
						},
					};

					const actions = [
						{
							name: 'Randomize',
							handler(chart) {
								chart.data.datasets.forEach((dataset) => {
									dataset.data = Utils.numbers({
										count: chart.data.labels.length,
										min: -100,
										max: 100,
									});
								});
								chart.update();
							},
						},
						{
							name: 'Add Dataset',
							handler(chart) {
								const data = chart.data;
								const dsColor = Utils.namedColor(chart.data.datasets.length);
								const newDataset = {
									label: 'Dataset ' + (data.datasets.length + 1),
									backgroundColor: Utils.transparentize(dsColor, 0.5),
									borderColor: dsColor,
									data: Utils.numbers({
										count: data.labels.length,
										min: -100,
										max: 100,
									}),
								};
								chart.data.datasets.push(newDataset);
								chart.update();
							},
						},
						{
							name: 'Add Data',
							handler(chart) {
								const data = chart.data;
								if (data.datasets.length > 0) {
									data.labels = Utils.months({ count: data.labels.length + 1 });

									for (let index = 0; index < data.datasets.length; ++index) {
										data.datasets[index].data.push(Utils.rand(-100, 100));
									}

									chart.update();
								}
							},
						},
						{
							name: 'Remove Dataset',
							handler(chart) {
								chart.data.datasets.pop();
								chart.update();
							},
						},
						{
							name: 'Remove Data',
							handler(chart) {
								chart.data.labels.splice(-1, 1); // remove the label first

								chart.data.datasets.forEach((dataset) => {
									dataset.data.pop();
								});

								chart.update();
							},
						},
					];

					this.option = config;
					this.option.actions = actions;

					function replacer(key, value) {
						if (typeof value === 'function') {
							return value
								.toString()
								.split('\n')
								.map((line) => line.trim())
								.join(' ');
						}
						return value;
					}

					console.log(JSON.stringify(this.option, replacer, 2));

					break;
			}
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
	_startValue : number;
	_valueRange : number;
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
	  const {min, max} = this.getMinMax(true);
	  this.min = isFinite(min) ? Math.max(0, min) : null;
	  this.max = isFinite(max) ? Math.max(0, max) : null;
	}
  
	buildTicks() {
	  const ticks = [];
  
	  let power = Math.floor(Math.log2(this.min || 1));
	  let maxPower = Math.ceil(Math.log2(this.max || 2));
	  while (power <= maxPower) {
		ticks.push({value: Math.pow(2, power)});
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
  
	  return this.getPixelForDecimal(value === this.min ? 0
		: (Math.log2(value) - this._startValue) / this._valueRange);
	}
  
	getValueForPixel(pixel) {
	  const decimal = this.getDecimalForPixel(pixel);
	  return Math.pow(2, this._startValue + decimal * this._valueRange);
	}
  }
  
  
  class Custom extends chartjs.BubbleController {
	static id = 'derivedBubble';
	options : any= {
	  boxStrokeStyle: 'red'
	};
	draw() {
	  // Call bubble controller method to draw all the points
	  super.draw();
  
	  // Now we can do some custom drawing for this dataset.
	  // Here we'll draw a box around the first point in each dataset,
	  // using `boxStrokeStyle` dataset option for color
	  var meta = this.getMeta();
	  var pt0 = meta.data[0];
	  let {x , y } = pt0.getProps(['x', 'y']);
	  let {radius} = pt0.options;
  
	  var ctx = this.chart.ctx;
	  ctx.save();
	  ctx.strokeStyle = this.options.boxStrokeStyle;
	  ctx.lineWidth = 1;
	  ctx.strokeRect((x as any) - (radius as any), (y as any) - (radius as any), 2 * (radius as any), 2 * (radius as any));
	  ctx.restore();
	}
  }
  