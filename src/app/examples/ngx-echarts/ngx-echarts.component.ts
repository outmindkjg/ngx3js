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
							select: ['PlaneGeometry', 'BoxGeometry', 'SphereGeometry'],
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
							min: 512,
							max: 2048,
							step: 1,
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
	private chart: ECHARTS.ECharts = null;

	public setChart(chart: ECHARTS.ECharts) {
		this.chart = chart;
		console.log(this.chart.getOption());
	}

	private refreshChart() {
		if (this.chart !== null) {
			const option = this.chart.getOption();
			if (option.series.length > 0) {
				option.series.forEach(series => {
					if (series.data && series.data.length > 0 && typeof series.data[0] === 'number') {
						const max = Math.max(...series.data);
						const min = Math.min(...series.data);
						const step = (max - min) * Math.random() * 0.3;
						series.data = ChartUtils.numbers({ count : series.data.length, min : min - step, max : max + step});
					}
				})
				this.option = option;
				this.optionSeqn = NgxThreeUtil.getUUID();
			}
		} 
	}

	private changeExample() {
		if (this.lastLoadedExample !== this.controls.example) {
			this.lastLoadedExample = this.controls.example;
			this.option = {
				url : 'echart/' + this.lastLoadedExample + '.json'
			}
			this.optionSeqn = NgxThreeUtil.getUUID();
			this.getTimeout().then(() => {
				console.log(this.option);
			});
			return;
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

	echarts: any = echarts;

	setScene(scene: NgxSceneComponent): void {
		super.setScene(scene);
		// console.log((scene as any).object3dList);
	}
}
