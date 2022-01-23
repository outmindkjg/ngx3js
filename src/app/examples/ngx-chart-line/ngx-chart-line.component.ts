import { Component } from '@angular/core';
import { NgxBaseComponent, NgxSceneComponent } from 'ngx3js';
import * as chartjs from 'chart.js';
import {
  DatasetComponent,
  TooltipComponent,
  VisualMapComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { Bar3DChart } from 'echarts-gl/charts';
import { Grid3DComponent } from 'echarts-gl/components';

// this.echarts.registerMap('world', world);

chartjs.Chart.register(...chartjs.registerables)

@Component({
	selector: 'app-ngx-chart-line',
	templateUrl: './ngx-chart-line.component.html',
	styleUrls: ['./ngx-chart-line.component.scss'],
})
export class NgxChartLineComponent extends NgxBaseComponent<{
	pointStyle: string;
}> {
	constructor() {
		super(
			{
				pointStyle: 'ring',
			},
			[
				{
					name: 'pointStyle',
					type: 'select',
					select: ['circle', 'sphere', 'plane', 'box', 'star', 'ring'],
				},
			]
			,false , false);
	}

	chartjs : any = chartjs.Chart;

	setScene(scene: NgxSceneComponent): void {
		super.setScene(scene);
		// console.log((scene as any).object3dList);
	}
}
