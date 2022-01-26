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
							],
							change: () => {
								switch (this.controls.geometry) {
									case 'CapsuleGeometry':
									case 'SphereGeometry':
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

					const DATA_COUNT = 7;
					const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

					const labels = Utils.months({ count: 7 });
					const data = {
						labels: labels,
						datasets: [
							{
								label: 'Dataset 1',
								data: Utils.numbers(NUMBER_CFG),
								borderColor: Utils.CHART_COLORS.red,
								backgroundColor: Utils.transparentize(
									Utils.CHART_COLORS.red,
									0.5
								),
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

					this.option = {
						type: 'bar',
						data: data,
						options: {
							indexAxis: 'y',
							// Elements options apply to all of the options unless overridden in a dataset
							// In this case, we are setting the border of each horizontal bar to be 2px wide
							elements: {
								bar: {
									borderWidth: 2,
								},
							},
							responsive: true,
							plugins: {
								legend: {
									position: 'right',
								},
								title: {
									display: true,
									text: 'Chart.js Horizontal Bar Chart',
								},
							},
						},
					};

					console.log(JSON.stringify(this.option, null, 2));

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
