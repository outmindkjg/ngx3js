import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as chartjs from 'chart.js';
import { NgxBaseComponent, NgxSceneComponent } from 'ngx3js';
import { ChartUtils } from '../chart/chart-utils';

@Component({
	selector: 'app-ngx-chartjs',
	templateUrl: './ngx-chartjs.component.html',
	styleUrls: ['./ngx-chartjs.component.scss'],
})
export class NgxChartJsComponent extends NgxBaseComponent<{
	geometry: string;
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
				chartType: 'line',
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
					name: 'chartType',
					type: 'select',
					listen : true,
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
		chartjs.Chart.register(...chartjs.registerables);
		this.chartjs = chartjs.Chart;
		this.subscribeRefer(
			'router',
			this.route.params.subscribe((params) => {
				if (params['type']) {
					switch (params['type']) {
						case 'bar':
						case 'line':
						case 'bubble':
						case 'scatter':
						case 'doughnut':
						case 'pie':
						case 'polarArea':
						case 'radar':
						case 'mixed':
							this.controls.chartType = params['type'];
							this.changeChart();
							break;
					}
				}
			})
		);
		this.changeChart();
		this.changeColor();
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

	chartType: string = null;
	chartData: any = null;
	chartOptions: any = null;
	chartPlugins: any = null;

	private changeChart() {
		switch (this.controls.chartType) {
			case 'bar':
				{
					this.chartType = this.controls.chartType;
					const NUMBER_CFG = { count: 7, min: -100, max: 100 };
					const labels = ChartUtils.months({ count: 7 });
					this.chartData = {
						labels: labels,
						datasets: [
							{
								label: 'Dataset 1',
								data: ChartUtils.numbers(NUMBER_CFG),
								borderColor: ChartUtils.CHART_COLORS.red,
								backgroundColor: ChartUtils.transparentize(ChartUtils.CHART_COLORS.red, 0.5),
							},
							{
								label: 'Dataset 2',
								data: ChartUtils.numbers(NUMBER_CFG),
								borderColor: ChartUtils.CHART_COLORS.blue,
								backgroundColor: ChartUtils.transparentize(ChartUtils.CHART_COLORS.blue, 0.5),
							},
						],
					};
					this.chartOptions = {
						responsive: true,
						plugins: {
							legend: {
								position: 'top',
							},
							title: {
								display: true,
								text: 'Chart.js Bar Chart',
							},
						},
					};
				}
				break;
			case 'line':
				{
					this.chartType = this.controls.chartType;
					const labels = ChartUtils.months({ count: 7 });
					this.chartData = {
						labels: labels,
						datasets: [
							{
								label: 'My First Dataset',
								data: ChartUtils.numbers({ count: 7, min: 50, max: 100 }),
								fill: false,
								borderColor: 'rgb(75, 192, 192)',
								tension: 0.1,
							},
						],
					};
				}
				break;
			case 'bubble':
				{
					this.chartType = this.controls.chartType;
					this.chartData = {
						datasets: [
							{
								label: 'First Dataset',
								data: ChartUtils.bubbles({
									count: 20,
									min: -10,
									max: 10,
									rmin: 5,
									rmax: 15,
								}),
								backgroundColor: 'rgb(255, 99, 132)',
							},
						],
					};
					this.chartOptions = {};
				}
				break;
			case 'scatter':
				{
					this.chartType = this.controls.chartType;
					this.chartData = {
						datasets: [
							{
								label: 'Scatter Dataset',
								data: ChartUtils.points({ count: 20, min: -10, max: 10 }),
								backgroundColor: 'rgb(255, 99, 132)',
							},
						],
					};
					this.chartOptions = {
						scales: {
							x: {
								type: 'linear',
								position: 'bottom',
							},
						},
					};
				}
				break;
			case 'doughnut':
				{
					this.chartType = this.controls.chartType;
					this.chartData = {
						labels: ['Red', 'Blue', 'Yellow'],
						datasets: [
							{
								label: 'My First Dataset',
								data: ChartUtils.numbers({ count: 3, min: 50, max: 100 }),
								backgroundColor: [
									'rgb(255, 99, 132)',
									'rgb(54, 162, 235)',
									'rgb(255, 205, 86)',
								],
								hoverOffset: 4,
							},
						],
					};
				}
				break;
			case 'pie':
				{
					this.chartType = this.controls.chartType;
					this.chartData = {
						labels: ['Red', 'Blue', 'Yellow'],
						datasets: [
							{
								label: 'My First Dataset',
								data: ChartUtils.numbers({ count: 3, min: 30, max: 100 }),
								backgroundColor: [
									'rgb(255, 99, 132)',
									'rgb(54, 162, 235)',
									'rgb(255, 205, 86)',
								],
								hoverOffset: 4,
							},
						],
					};
				}
				break;
			case 'polarArea':
				{
					this.chartType = this.controls.chartType;
					this.chartData = {
						labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
						datasets: [
							{
								label: 'My First Dataset',
								data: ChartUtils.numbers({ count: 5, min: 50, max: 100 }),
								backgroundColor: [
									'rgb(255, 99, 132)',
									'rgb(75, 192, 192)',
									'rgb(255, 205, 86)',
									'rgb(201, 203, 207)',
									'rgb(54, 162, 235)',
								],
							},
						],
					};
					this.chartOptions = {};
				}
				break;
			case 'radar':
				{
					this.chartType = this.controls.chartType;
					const NUMBER_CFG = { count: 7, min: 30, max: 100 };
					this.chartData = {
						labels: [
							'Eating',
							'Drinking',
							'Sleeping',
							'Designing',
							'Coding',
							'Cycling',
							'Running',
						],
						datasets: [
							{
								label: 'My First Dataset',
								data: ChartUtils.numbers(NUMBER_CFG),
								fill: true,
								backgroundColor: 'rgba(255, 99, 132, 0.2)',
								borderColor: 'rgb(255, 99, 132)',
								pointBackgroundColor: 'rgb(255, 99, 132)',
								pointBorderColor: '#fff',
								pointHoverBackgroundColor: '#fff',
								pointHoverBorderColor: 'rgb(255, 99, 132)',
							},
							{
								label: 'My Second Dataset',
								data: ChartUtils.numbers(NUMBER_CFG),
								fill: true,
								backgroundColor: 'rgba(54, 162, 235, 0.2)',
								borderColor: 'rgb(54, 162, 235)',
								pointBackgroundColor: 'rgb(54, 162, 235)',
								pointBorderColor: '#fff',
								pointHoverBackgroundColor: '#fff',
								pointHoverBorderColor: 'rgb(54, 162, 235)',
							},
						],
					};
					this.chartOptions = {
						elements: {
							line: {
								borderWidth: 3,
							},
						},
					};
				}
				break;
			case 'mixed':
				{
					this.chartType = 'scatter';
					const NUMBER_CFG = { count: 7, min: 30, max: 100 };
					this.chartData = {
						labels: [
							'Eating',
							'Drinking',
							'Sleeping',
							'Designing',
							'Coding',
							'Cycling',
							'Running',
						],
						datasets: [
							{
								type: 'bar',
								label: 'Bar Dataset',
								data: ChartUtils.numbers(NUMBER_CFG),
								borderColor: 'rgb(255, 99, 132)',
								backgroundColor: 'rgba(255, 99, 132, 0.2)',
							},
							{
								type: 'line',
								label: 'Line Dataset',
								data: ChartUtils.numbers(NUMBER_CFG),
								fill: false,
								borderColor: 'rgb(54, 162, 235)',
							},
						],
					};
					this.chartOptions = {
						scales: {
							y: {
								beginAtZero: true,
							},
						},
					};
				}
				break;
		}
	}

	chartjs: any = chartjs.Chart;

	setScene(scene: NgxSceneComponent): void {
		super.setScene(scene);
		// console.log((scene as any).object3dList);
	}
}
