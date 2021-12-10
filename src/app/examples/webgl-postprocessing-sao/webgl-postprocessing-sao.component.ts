import { Component } from '@angular/core';
import { BaseComponent, PassComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-postprocessing-sao',
	templateUrl: './webgl-postprocessing-sao.component.html',
	styleUrls: ['./webgl-postprocessing-sao.component.scss'],
})
export class WebglPostprocessingSaoComponent extends BaseComponent<{
	output: string;
	saoBias: 0.5;
	saoIntensity: 0.18;
	saoScale: 1;
	saoKernelRadius: 100;
	saoMinResolution: 0;
	saoBlur: true;
	saoBlurRadius: 8;
	saoBlurStdDev: 4;
	saoBlurDepthCutoff: 0.01;
}> {
	constructor() {
		super(
			{
				output: '0',
				saoBias: 0.5,
				saoIntensity: 0.18,
				saoScale: 1,
				saoKernelRadius: 100,
				saoMinResolution: 0,
				saoBlur: true,
				saoBlurRadius: 8,
				saoBlurStdDev: 4,
				saoBlurDepthCutoff: 0.01,
			},
			[
				{
					name: 'output',
					type: 'select',
					select: {
						Beauty: 1,
						'Beauty+SAO': 0,
						SAO: 2,
						Depth: 3,
						Normal: 4,
					},
					change: () => {
						this.changeSaoParam();
					},
				},
				{
					name: 'saoBias',
					type: 'number',
					min: -1,
					max: 1,
					change: () => {
						this.changeSaoParam();
					},
				},
				{
					name: 'saoIntensity',
					type: 'number',
					min: 0,
					max: 1,
					change: () => {
						this.changeSaoParam();
					},
				},
				{
					name: 'saoScale',
					type: 'number',
					min: 0,
					max: 10,
					change: () => {
						this.changeSaoParam();
					},
				},
				{
					name: 'saoKernelRadius',
					type: 'number',
					min: 1,
					max: 100,
					change: () => {
						this.changeSaoParam();
					},
				},
				{
					name: 'saoMinResolution',
					type: 'number',
					min: 0,
					max: 1,
					change: () => {
						this.changeSaoParam();
					},
				},
				{
					name: 'saoBlur',
					type: 'checkbox',
					change: () => {
						this.changeSaoParam();
					},
				},
				{
					name: 'saoBlurRadius',
					type: 'number',
					min: 0,
					max: 200,
					change: () => {
						this.changeSaoParam();
					},
				},
				{
					name: 'saoBlurStdDev',
					type: 'number',
					min: 0.5,
					max: 150,
					change: () => {
						this.changeSaoParam();
					},
				},
				{
					name: 'saoBlurDepthCutoff',
					type: 'number',
					min: 0.0,
					max: 0.1,
					change: () => {
						this.changeSaoParam();
					},
				},
			]
		);
	}

	setSaoPass(pass: PassComponent) {
		this.saoPassParam = (pass.getPass() as any).params;
		this.changeSaoParam();
	}
	saoPassParam: any = null;
	changeSaoParam() {
		if (this.saoPassParam !== null) {
			this.saoPassParam.output = parseInt(this.controls.output);
			this.saoPassParam.saoBias = this.controls.saoBias;
			this.saoPassParam.saoIntensity = this.controls.saoIntensity;
			this.saoPassParam.saoScale = this.controls.saoScale;
			this.saoPassParam.saoKernelRadius = this.controls.saoKernelRadius;
			this.saoPassParam.saoMinResolution = this.controls.saoMinResolution;
			this.saoPassParam.saoBlur = this.controls.saoBlur;
			this.saoPassParam.saoBlurRadius = this.controls.saoBlurRadius;
			this.saoPassParam.saoBlurStdDev = this.controls.saoBlurStdDev;
			this.saoPassParam.saoBlurDepthCutoff = this.controls.saoBlurDepthCutoff;
		}
	}

	ngOnInit() {
		this.meshInfos = [];
		for (let i = 0; i < 120; i++) {
			this.meshInfos.push({
				position: {
					x: Math.random() * 4 - 2,
					y: Math.random() * 4 - 2,
					z: Math.random() * 4 - 2,
				},
				rotation: {
					x: Math.random() * 180,
					y: Math.random() * 180,
					z: Math.random() * 180,
				},
				scale: Math.random() * 0.2 + 0.05,
				color: 'hsl(' + Math.random() + ',1.0,0.3)',
				roughness: 0.5 * Math.random() + 0.25,
				metalness: 0,
			});
		}
	}
	meshInfos: {
		position: { x: number; y: number; z: number };
		rotation: { x: number; y: number; z: number };
		scale: number;
		color: string;
		roughness: number;
		metalness: number;
	}[] = [];
}
