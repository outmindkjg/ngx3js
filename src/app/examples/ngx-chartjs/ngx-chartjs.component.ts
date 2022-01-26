import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as chartjs from 'chart.js';
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

interface SeriesDataTypes {
	count: number;
	min: number;
	max: number;
	decimals: number;
	type: string;
}

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
	wrap: string;
	randomData: () => void;
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
				wrap: 'ClampToEdgeWrapping',
				randomData: () => {
					this.refreshChart();
				},
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
							step: 0.5,
						},
						{
							name: 'repeatY',
							title: 'repeat-Y',
							type: 'number',
							listen: true,
							min: 0.5,
							max: 3,
							step: 0.5,
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
					name: 'Chart Attribute',
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
				{
					name: 'randomData',
					title: 'Data Randomize',
					type: 'button',
				},
			],
			false,
			false
		);
	}

	ngOnInit(): void {
		chartjs.Chart.register(...chartjs.registerables);
		this.chartjs = chartjs.Chart;
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
	}

	private refreshChart() {
		if (this.chart !== null) {
			const option = this.chart.config;
			if (NgxThreeUtil.isNotNull(option.data?.datasets)) {
				if (Array.isArray(option.data?.datasets)) {
					this.seriesDataTypes.forEach((dataType, idx) => {
						option.data.datasets[idx].data = this.getRandomSeriesData(
							dataType,
							option.data.datasets[idx].data
						);
					});
				}
				this.option = Object.assign({}, this.option);
				this.option.data.datasets = option.data.datasets;
			}
		}
	}

	private getRandomSeriesData(
		dataType: SeriesDataTypes,
		oldData: any[]
	): any[] {
		switch (dataType.type) {
			case 'number':
				oldData = ChartUtils.numbers(dataType);
				break;
			case 'value':
				const valueList = ChartUtils.numbers(dataType);
				oldData.forEach((obj, idx) => {
					obj.value = valueList[idx];
				});
				break;
			case 'xy':
				const valueListX = ChartUtils.numbers(dataType);
				const valueListY = ChartUtils.numbers(dataType);
				oldData.forEach((obj, idx) => {
					obj.x = valueListX[idx];
					obj.y = valueListY[idx];
				});
				break;
			case 'array':
				{
					const valuePairList: number[][] = [];
					for (let i = 0; i < oldData[0].length; i++) {
						if (typeof oldData[0][i] === 'number') {
							valuePairList.push(ChartUtils.numbers(dataType));
						} else {
							break;
						}
					}
					valuePairList[0].forEach((_, idx) => {
						const data: number[] = oldData[idx];
						valuePairList.forEach((value, seq) => {
							data[seq] = value[idx];
						});
					});
				}
				break;
			case 'valuearray':
				{
					const valuePairList: number[][] = [];
					for (let i = 0; i < oldData[0]['value'].length; i++) {
						if (typeof oldData[0]['value'][i] === 'number') {
							valuePairList.push(ChartUtils.numbers(dataType));
						} else {
							break;
						}
					}
					if (valuePairList.length > 0) {
						valuePairList[0].forEach((_, idx) => {
							const data: number[] = oldData[idx]['value'] || [];
							valuePairList.forEach((value, seq) => {
								data[seq] = value[idx];
							});
						});
					}
				}
				break;
		}
		return oldData;
	}

	private seriesDataTypes: SeriesDataTypes[] = [];

	private getSeriesDataTypes(data: any[]): SeriesDataTypes {
		const seriesDataTypes = {
			count: data.length,
			min: 0,
			max: 0,
			decimals: 2,
			type: 'none',
		};
		if (data.length > 0) {
			const firstData = data[0];
			if (typeof firstData === 'number') {
				seriesDataTypes.max = Math.max(...data);
				seriesDataTypes.min = Math.min(...data);
				seriesDataTypes.type = 'number';
			} else if (NgxThreeUtil.isNotNull(firstData.value)) {
				if (typeof firstData.value === 'number') {
					const valueList: number[] = [];
					data.forEach((obj) => {
						valueList.push(obj.value);
					});
					seriesDataTypes.max = Math.max(...valueList);
					seriesDataTypes.min = Math.min(...valueList);
					seriesDataTypes.type = 'value';
				} else if (
					Array.isArray(firstData.value) &&
					typeof firstData.value[0] === 'number'
				) {
					const valueList: number[] = [];
					data.forEach((obj) => {
						valueList.push(...obj.value);
					});
					seriesDataTypes.max = Math.max(...valueList);
					seriesDataTypes.min = Math.min(...valueList);
					seriesDataTypes.type = 'valuearray';
				}
			} else if (
				NgxThreeUtil.isNotNull(firstData.x) &&
				NgxThreeUtil.isNotNull(firstData.y)
			) {
				const valueList: number[] = [];
				data.forEach((obj) => {
					valueList.push(obj.x, obj.y);
				});
				seriesDataTypes.max = Math.max(...valueList);
				seriesDataTypes.min = Math.min(...valueList);
				seriesDataTypes.type = 'xy';
			} else if (Array.isArray(firstData) && typeof firstData[0] === 'number') {
				const valueList: number[] = [];
				data.forEach((obj) => {
					obj.forEach((value) => {
						if (typeof value === 'number') {
							valueList.push(value);
						}
					});
				});
				seriesDataTypes.max = Math.max(...valueList);
				seriesDataTypes.min = Math.min(...valueList);
				seriesDataTypes.type = 'array';
			}
		}
		if (seriesDataTypes.max > 0 && seriesDataTypes.max <= seriesDataTypes.min) {
			seriesDataTypes.min = seriesDataTypes.max * 0.2;
		}
		return seriesDataTypes;
	}

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
				case 'bar-border-radius ':
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
				case 'other-polar-area ':
				case 'other-polar-area-center-labels ':
				case 'other-radar ':
				case 'other-radar-skip-points ':
				case 'other-combo-bar-line ':
				case 'other-stacked-bar-line ':
				case 'area-line-boundaries ':
				case 'area-line-datasets ':
				case 'area-line-drawtime ':
				case 'area-line-stacked ':
				case 'area-radar ':
				case 'scales-linear-min-max ':
				case 'scales-linear-min-max-suggested ':
				case 'scales-linear-step-size ':
				case 'scales-log ':
				case 'scales-time-line ':
				case 'scales-time-max-span ':
				case 'scales-time-combo ':
				case 'scales-stacked ':
				case 'scales-grid-options ':
				case 'scales-ticks-options ':
				case 'scales-titles-options ':
				case 'scales-center-options ':
				case 'legend-position ':
				case 'legend-title ':
				case 'legend-point-style ':
				case 'legend-events ':
				case 'legend-html ':
				case 'title-alignment ':
				case 'title-subtitle ':
				case 'tooltip-position ':
				case 'tooltip-interactions ':
				case 'tooltip-point-style ':
				case 'tooltip-content ':
				case 'tooltip-html ':
				case 'scriptable-bar ':
				case 'scriptable-bubble ':
				case 'scriptable-pie ':
				case 'scriptable-line ':
				case 'scriptable-polar ':
				case 'scriptable-radar ':
				case 'animations-delay ':
				case 'animations-drop ':
				case 'animations-loop ':
				case 'animations-progressive-line ':
				case 'animations-progressive-line-easing ':
				case 'advanced-data-decimation ':
				case 'advanced-progress-bar ':
				case 'advanced-radial-gradient ':
				case 'advanced-linear-gradient ':
				case 'advanced-programmatic-events ':
				case 'advanced-derived-axis-type ':
				case 'advanced-derived-chart-type ':
					this.jsonFileLoad(
						'chartjs/' + this.lastLoadedExample + '.json',
						(option: any) => {
							this.option = option;
							this.optionSeqn = NgxThreeUtil.getUUID();
							this.seriesDataTypes = [];
							if (NgxThreeUtil.isNotNull(option.data?.datasets)) {
								if (Array.isArray(option.data.datasets)) {
									option.data.datasets.forEach((datasets) => {
										if (Array.isArray(datasets.data)) {
											this.seriesDataTypes.push(
												this.getSeriesDataTypes(datasets.data)
											);
										}
									});
								} else if (Array.isArray(option.data?.datasets?.data)) {
									this.seriesDataTypes.push(
										this.getSeriesDataTypes(option.datasets.data)
									);
								}
							}
							const guiController = NgxThreeUtil.getGuiController(
								this.renderer.gui,
								'randomData'
							);
							if (guiController) {
								let hasRandom: boolean = false;
								this.seriesDataTypes.forEach((type) => {
									if (type.type !== 'none') {
										hasRandom = true;
									}
								});
								NgxThreeUtil.setGuiEnabled(guiController, hasRandom);
							}
						}
					);
					break;
				default:
					console.log(this.lastLoadedExample + '.json');
					const Utils = ChartUtils;
					const Chart = chartjs.Chart;

					const DATA_COUNT = 5;
					const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};
					
					const labels = Utils.months({count: 7});
					const data = {
					  labels: ['Overall Yay', 'Overall Nay', 'Group A Yay', 'Group A Nay', 'Group B Yay', 'Group B Nay', 'Group C Yay', 'Group C Nay'],
					  datasets: [
						{
						  backgroundColor: ['#AAA', '#777'],
						  data: [21, 79]
						},
						{
						  backgroundColor: ['hsl(0, 100%, 60%)', 'hsl(0, 100%, 35%)'],
						  data: [33, 67]
						},
						{
						  backgroundColor: ['hsl(100, 100%, 60%)', 'hsl(100, 100%, 35%)'],
						  data: [20, 80]
						},
						{
						  backgroundColor: ['hsl(180, 100%, 60%)', 'hsl(180, 100%, 35%)'],
						  data: [10, 90]
						}
					  ]
					};
					const config = {
						type: 'pie',
						data: data,
						options: {
						  responsive: true,
						  plugins: {
							legend: {
							  labels: {
								generateLabels: function(chart) {
								  // Get the default label list
								  const original = Chart.overrides.pie.plugins.legend.labels.generateLabels;
								  const labelsOriginal = original.call(this, chart);
					  
								  // Build an array of colors used in the datasets of the chart
								  let datasetColors = chart.data.datasets.map(function(e) {
									return e.backgroundColor;
								  });
								  datasetColors = datasetColors.flat();
					  
								  // Modify the color and hide state of each label
								  labelsOriginal.forEach(label => {
									// There are twice as many labels as there are datasets. This converts the label index into the corresponding dataset index
									label.datasetIndex = (label.index - label.index % 2) / 2;
					  
									// The hidden state must match the dataset's hidden state
									label.hidden = !chart.isDatasetVisible(label.datasetIndex);
					  
									// Change the color to match the dataset
									label.fillStyle = datasetColors[label.index];
								  });
					  
								  return labelsOriginal;
								}
							  },
							  onClick: function(mouseEvent, legendItem, legend) {
								// toggle the visibility of the dataset from what it currently is
								legend.chart.getDatasetMeta(
								  legendItem.datasetIndex
								).hidden = legend.chart.isDatasetVisible(legendItem.datasetIndex);
								legend.chart.update();
							  }
							},
							tooltip: {
							  callbacks: {
								label: function(context) {
								  const labelIndex = (context.datasetIndex * 2) + context.dataIndex;
								  return context.chart.data.labels[labelIndex] + ': ' + context.formattedValue;
								}
							  }
							}
						  }
						},
					  };

					this.option = config;

					function replacer(key, value) {
						if (typeof value === 'function') {
							return value.toString();
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

	setScene(scene: NgxSceneComponent): void {
		super.setScene(scene);
	}
}
