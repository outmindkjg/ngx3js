import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as echarts from 'echarts';
import 'echarts-gl';

import { ChartUtils } from '../chart/chart-utils';
import * as ECHARTS from '../chart/echarts/echarts.interface';

import {
	I3JS,
	N3JS,
	NgxBaseComponent,
	NgxRendererComponent,
	NgxSceneComponent,
	NgxThreeUtil,
} from 'ngx3js';

@Component({
	selector: 'app-ngx-echarts',
	templateUrl: './ngx-echarts.component.html',
	styleUrls: ['./ngx-echarts.component.scss'],
})
export class NgxEChartsComponent extends NgxBaseComponent<{
	geometry: string;
	type: number;
	example: string;
	chartType: string;
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
	refresh: () => void;
}> {
	constructor(private route: ActivatedRoute) {
		super(
			{
				geometry: 'BoxGeometry',
				type: 0,
				example: 'line-smooth',
				chartType: 'bar',
				width: 2,
				height: 2,
				canvasSize: 512,
				materialType: 'MeshStandardMaterial',
				materialSide: 'double',
				materialOpacity: 1,
				materialColor: 0xffffff,
				backgroundTransparent: false,
				backgroundColor: 0xffffff,
				backgroundOpacity: 0.1,
				refresh: () => {
					this.changeChart();
				},
			},
			[
				{
					name: 'geometry',
					type: 'select',
					select: ['PlaneGeometry', 'BoxGeometry', 'SphereGeometry'],
				},
				{
					name: 'Chart',
					type: 'folder',
					children: [],
				},
				{
					name: 'chartType',
					type: 'select',
					listen: true,
					select: [
						'bar',
						'line',
						'bubble',
						'scatter',
						'doughnut',
						'pie',
						'polarArea',
						'radar',
						'mixed',
					],
					change: () => {
						this.changeChart();
					},
				},
				{
					name: 'Attribute',
					type: 'folder',
					children: [],
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
				{
					name: 'canvasSize',
					type: 'number',
					min: 512,
					max: 2048,
					step: 1,
				},
				{
					name: 'materialType',
					type: 'select',
					select: [
						'MeshStandardMaterial',
						'MeshPhongMaterial',
						'MeshLambertMaterial',
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
				{
					name: 'backgroundTransparent',
					type: 'checkbox',
					change: () => {
						this.changeColor();
					},
				},
				{
					name: 'backgroundColor',
					type: 'color',
					change: () => {
						this.changeColor();
					},
				},
				{
					name: 'backgroundOpacity',
					type: 'number',
					min: 0,
					max: 1,
					change: () => {
						this.changeColor();
					},
				},
				{
					name: 'refresh',
					type: 'button',
				},
			],
			false,
			false
		);
	}

	ngOnInit(): void {
		this.echarts = echarts;
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
	private chart : ECHARTS.ECharts = null;

	public setChart(chart : ECHARTS.ECharts) {
		this.chart = chart;
		console.log(this.chart.getOption());
	}

	private changeExample() {
		if (this.lastLoadedExample !== this.controls.example) {
			this.lastLoadedExample = this.controls.example;
			this.option = 'echart/' + this.lastLoadedExample + '.json';
			this.getTimeout().then(() => {
				console.log(this.option);
			})
			return ;
			this.jsonFileLoad(
				'echart/' + this.lastLoadedExample + '.json',
				(option: any) => {
					this.option = option;
					switch (this.lastLoadedExample) {
						case 'flowGL-noise':
							this.option.series[1].renderItem = (params, api) => {
								var x = api.value(0),
									y = api.value(1),
									dx = api.value(2),
									dy = api.value(3);
								var start = api.coord([x - dx / 2, y - dy / 2]);
								var end = api.coord([x + dx / 2, y + dy / 2]);
								return {
									type: 'line',
									shape: {
										x1: start[0],
										y1: start[1],
										x2: end[0],
										y2: end[1],
									},
									style: {
										lineWidth: 2,
										stroke: '#fff',
										opacity: 0.2,
									},
								};
							};
							break;
					}
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
	requiredMaps: { [key: string]: any } = {};
	chartType: string = null;
	chartSeries: any[] = [];
	xAxis: any = null;
	yAxis: any = null;
	tooltip: any = null;
	grid: any = null;
	title: any = null;
	legend: any = null;
	radar: any = null;

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
			this.checkAttribute();
			this.jsonFileLoad('echart/index.json', (data: any[]) => {
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

	private setChartOptions(options: any) {
		this.chartSeries = null;
		this.xAxis = null;
		this.yAxis = null;
		this.tooltip = null;
		this.grid = null;
		this.title = null;
		this.legend = null;
		this.radar = null;
		if (options.title) {
			this.title = options.title;
		}
		if (options.xAxis) {
			this.xAxis = options.xAxis;
		}
		if (options.yAxis) {
			this.yAxis = options.yAxis;
		}
		if (options.tooltip) {
			this.tooltip = options.tooltip;
		}
		if (options.grid) {
			this.grid = options.grid;
		}
		if (options.legend) {
			this.legend = options.legend;
		}
		if (options.series) {
			this.chartSeries = options.series;
		}
		if (options.radar) {
			this.radar = options.radar;
		}
	}

	private changeChart() {
		this.requiredMaps = null;
		switch (this.controls.chartType) {
			case 'bar':
				{
					this.setChartOptions({
						tooltip: {
							trigger: 'axis',
							axisPointer: {
								type: 'shadow',
							},
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true,
						},
						xAxis: {
							type: 'category',
							data: ChartUtils.dayofweek(),
							axisTick: {
								alignWithLabel: true,
							},
						},
						yAxis: {
							type: 'value',
						},
						series: [
							{
								type: 'bar',
								barWidth: '60%',
								name: 'Direct',
								data: ChartUtils.numbers({ count: 7, min: 100, max: 250 }),
							},
						],
					});
				}
				break;
			case 'line':
				{
					this.setChartOptions({
						xAxis: {
							type: 'category',
							data: ChartUtils.dayofweek(),
						},
						yAxis: {
							type: 'value',
						},
						series: [
							{
								type: 'line',
								data: ChartUtils.numbers({ count: 7, min: 100, max: 250 }),
								smooth: false,
								areaStyle: null,
							},
						],
					});
				}
				break;
			case 'bubble':
				{
				}
				break;
			case 'scatter':
				{
				}
				break;
			case 'doughnut':
				{
				}
				break;
			case 'pie':
				{
					this.setChartOptions({
						title: {
							text: 'Referer of a Website',
							subtext: 'Fake Data',
							left: 'center',
						},
						tooltip: {
							trigger: 'item',
						},
						legend: {
							orient: 'vertical',
							left: 'left',
						},
						series: [
							{
								name: 'Access From',
								type: 'pie',
								radius: '50%',
								data: [
									{ value: 1048, name: 'Search Engine' },
									{ value: 735, name: 'Direct' },
									{ value: 580, name: 'Email' },
									{ value: 484, name: 'Union Ads' },
									{ value: 300, name: 'Video Ads' },
								],
								emphasis: {
									itemStyle: {
										shadowBlur: 10,
										shadowOffsetX: 0,
										shadowColor: 'rgba(0, 0, 0, 0.5)',
									},
								},
							},
						],
					});
				}
				break;
			case 'polarArea':
				{
					this.setChartOptions({
						title: {
							text: 'Basic Radar Chart',
						},
						legend: {
							data: ['Allocated Budget', 'Actual Spending'],
						},
						radar: {
							// shape: 'circle',
							indicator: [
								{ name: 'Sales', max: 6500 },
								{ name: 'Administration', max: 16000 },
								{ name: 'Information Technology', max: 30000 },
								{ name: 'Customer Support', max: 38000 },
								{ name: 'Development', max: 52000 },
								{ name: 'Marketing', max: 25000 },
							],
						},
						series: [
							{
								name: 'Budget vs spending',
								type: 'radar',
								data: [
									{
										value: [4200, 3000, 20000, 35000, 50000, 18000],
										name: 'Allocated Budget',
									},
									{
										value: [5000, 14000, 28000, 26000, 42000, 21000],
										name: 'Actual Spending',
									},
								],
							},
						],
					});
				}
				break;
			case 'radar':
				{
					this.setChartOptions({
						title: {
							text: 'Basic Radar Chart',
						},
						legend: {
							data: ['Allocated Budget', 'Actual Spending'],
						},
						radar: {
							// shape: 'circle',
							indicator: [
								{ name: 'Sales', max: 6500 },
								{ name: 'Administration', max: 16000 },
								{ name: 'Information Technology', max: 30000 },
								{ name: 'Customer Support', max: 38000 },
								{ name: 'Development', max: 52000 },
								{ name: 'Marketing', max: 25000 },
							],
						},
						series: [
							{
								name: 'Budget vs spending',
								type: 'radar',
								data: [
									{
										value: [4200, 3000, 20000, 35000, 50000, 18000],
										name: 'Allocated Budget',
									},
									{
										value: [5000, 14000, 28000, 26000, 42000, 21000],
										name: 'Actual Spending',
									},
								],
							},
						],
					});
				}
				break;
			case 'mixed':
				{
				}
				break;
		}
		this.checkAttribute();
	}

	private checkAttribute() {
		if (this.renderer !== null) {
			this.clearGui('Attribute');
			const firstChartSeries: any = this.chartSeries[0];
			if (firstChartSeries !== undefined && firstChartSeries !== null) {
				Object.entries(firstChartSeries).forEach(([key, value]) => {
					switch (key) {
						case 'smooth':
							this.addGui(
								{
									name: key,
									value: value,
									type: 'checkbox',
									control: firstChartSeries,
									change: () => {
										this.redrawAttribute(key);
									},
								},
								'Attribute'
							);
							break;
						case 'areaStyle':
							this.addGui(
								{
									name: key,
									value: value,
									type: 'select',
									select: {
										none: null,
										red: { color: '#f00' },
										blue: { color: '#00f' },
									},
									control: firstChartSeries,
									change: () => {
										this.redrawAttribute(key);
									},
								},
								'Attribute'
							);
							break;
						default:
							console.log(key, value);
							break;
					}
				});
			}
		}
	}

	private redrawAttribute(name: string) {
		const firstChartSeries: any = this.chartSeries[0];
		if (
			firstChartSeries !== null &&
			firstChartSeries !== undefined &&
			firstChartSeries[name] !== undefined
		) {
			const value = firstChartSeries[name];
			this.chartSeries.forEach((item) => {
				item[name] = value;
			});
		}
		this.getTimeout().then(() => {
			this.chartSeries = Object.assign([], this.chartSeries);
		});
	}

	echarts: any = echarts;

	setScene(scene: NgxSceneComponent): void {
		super.setScene(scene);
		// console.log((scene as any).object3dList);
	}
}
