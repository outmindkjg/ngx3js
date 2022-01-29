import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as echarts from 'echarts';
import 'echarts-gl';

import {
	I3JS,
	N3JS,
	NgxBaseComponent,
	NgxRendererComponent,
	NgxSceneComponent,
	NgxThreeUtil,
	ChartAction, ChartUtils,
	ECHARTS
} from 'ngx3js';

interface SeriesDataTypes {
	count: number;
	min: number;
	max: number;
	decimals: number;
	type: string;
}

@Component({
	selector: 'app-ngx-echarts',
	templateUrl: './ngx-echarts.component.html',
	styleUrls: ['./ngx-echarts.component.scss'],
})
export class NgxEChartsComponent extends NgxBaseComponent<{
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
	textureAlign : string;
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
				example: 'line-gradient',
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
				textureAlign : 'none',
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
							name : 'textureAlign',
							type : 'select',
							select : ['none', 'top-left','top-center','top-right','middle-left','middle-center','middle-right','bottom-left','bottom-center','bottom-right'],
							change : () => {
								if (this.renderer && this.renderer.gui) {
									const chartSizeFolder = NgxThreeUtil.getGuiFolder(this.renderer.gui, 'Chart Size & Color');
									if (chartSizeFolder !== null) {
										const offsetX = NgxThreeUtil.getGuiController(chartSizeFolder, 'offsetX');
										const offsetY = NgxThreeUtil.getGuiController(chartSizeFolder, 'offsetY');
										switch(this.controls.textureAlign) {
											case 'none' :
												NgxThreeUtil.setGuiEnabled(offsetX, true);
												NgxThreeUtil.setGuiEnabled(offsetY, true);
												break;
											default :
												NgxThreeUtil.setGuiEnabled(offsetX, false);
												NgxThreeUtil.setGuiEnabled(offsetY, false);
												break;
										}
									}
								}
							}
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

	private intervalRunTimer: any = null;
	public setChart(chart: ECHARTS.ECharts) {
		this.chart = chart;
		if (this.intervalRunTimer !== null) {
			window.clearInterval(this.intervalRunTimer);
			this.intervalRunTimer = null;
		}
		switch (this.lastLoadedExample) {
			case 'gauge-clock':
				this.intervalRunTimer = window.setInterval(() => {
					var date = new Date();
					var second = date.getSeconds();
					var minute = date.getMinutes() + second / 60;
					var hour = (date.getHours() % 12) + minute / 60;
					this.chart.setOption({
						series: [
							{
								name: 'hour',
								animation: hour !== 0,
								data: [{ value: hour }],
							},
							{
								name: 'minute',
								animation: minute !== 0,
								data: [{ value: minute }],
							},
							{
								animation: second !== 0,
								name: 'second',
								data: [{ value: second }],
							},
						],
					});
				}, 1000);
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
						if (NgxThreeUtil.isNotNull(action.change)) {
							actionControler.onChange(action.change);
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

	private lastActions: ChartAction [] = [];

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
				'echarts/' + this.lastLoadedExample + '.json',
				(option: any) => {
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
			this.jsonFileLoad('echarts/index.json', (data: any[]) => {
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

	echarts: any = echarts;

	setScene(scene: NgxSceneComponent): void {
		super.setScene(scene);
	}
}
