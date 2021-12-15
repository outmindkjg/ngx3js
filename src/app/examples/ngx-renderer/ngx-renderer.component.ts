import { Component } from '@angular/core';
import { NgxBaseComponent, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-ngx-renderer',
	templateUrl: './ngx-renderer.component.html',
	styleUrls: ['./ngx-renderer.component.scss'],
})
export class NgxRendererComponent extends NgxBaseComponent<{
	controler: {
		type: string;
		enablePan: boolean;
		enableDamping: boolean;
		minDistance: number;
		maxDistance: number;
	};
	renderer: {
		statsMode: number;
		antialias: boolean;
		shadowMapEnabled: boolean;
		shadowMapType: string;
		clearColor: string;
		clearAlpha: number;
		alpha: boolean;
		toneMapping: string;
		toneMappingExposure: number;
	};
}> {
	constructor() {
		super(
			{
				renderer: {
					statsMode: 0,
					antialias: true,
					shadowMapEnabled: true,
					shadowMapType: 'PCFSoftShadowMap',
					clearColor: '0x000000',
					clearAlpha: 1,
					alpha: false,
					toneMapping: 'NoToneMapping',
					toneMappingExposure: 1,
				},
				controler: {
					type: 'OrbitControls',
					enablePan: true,
					enableDamping: true,
					minDistance: 10,
					maxDistance: 500,
				},
			},
			[
				{
					name: 'renderer',
					type: 'folder',
					control: 'renderer',
					children: [
						{ name: 'antialias', type: 'checkbox' },
						{ name: 'shadowMapEnabled', type: 'checkbox' },
						{ name: 'clearColor', type: 'color' },
						{ name: 'clearAlpha', type: 'number', min: 0, max: 1, step: 0.1 },
						{ name: 'alpha', type: 'checkbox' },
						{ name: 'statsMode', type: 'select', select: [0, 1, 2] },
						{
							name: 'shadowMapType',
							type: 'select',
							select: [
								'BasicShadowMap',
								'PCFShadowMap',
								'PCFSoftShadowMap',
								'VSMShadowMap',
							],
						},
						{
							name: 'toneMapping',
							type: 'select',
							select: [
								'ToneMapping',
								'LinearToneMapping',
								'ReinhardToneMapping',
								'CineonToneMapping',
								'ACESFilmicToneMapping',
								'NoToneMapping',
							],
						},
						{
							name: 'toneMappingExposure',
							type: 'number',
							min: 0,
							max: 1,
							step: 0.1,
						},
					],
				},
				{
					name: 'controler',
					type: 'folder',
					control: 'controler',
					children: [
						{
							name: 'type',
							type: 'select',
							select: [
								'FlyControls',
								'FirstPersonControls',
								'DeviceOrientationControls',
								'ArcballControls',
								'PlaneControls',
								'OrbitControls',
							],
						},
						{ name: 'enablePan', type: 'checkbox' },
						{ name: 'enableDamping', type: 'checkbox' },
						{ name: 'minDistance', type: 'number', min: 0, max: 30, step: 0.1 },
						{
							name: 'maxDistance',
							type: 'number',
							min: 20,
							max: 300,
							step: 0.1,
						},
					],
				},
			],

			true,
			false
		);
	}

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.meshObject3d !== null) {
			const elapsedTime = timer.elapsedTime;
			this.meshObject3d.rotation.y = elapsedTime / 5;
			this.meshChildren.forEach((child) => {
				child.rotation.x = elapsedTime / 2;
				child.rotation.y = elapsedTime / 4;
			});
		}
	}
}
