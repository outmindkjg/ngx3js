import { Component } from '@angular/core';
import { NgxBaseComponent, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-ngx-light',
	templateUrl: './ngx-light.component.html',
	styleUrls: ['./ngx-light.component.scss'],
})
export class NgxLightComponent extends NgxBaseComponent<{
	showHelper: boolean;
	ambientLight: {
		enable: boolean;
		color: string;
		intensity: number;
	};
	directionalLight: {
		enable: boolean;
		color: string;
		intensity: number;
		castShadow: boolean;
		position: {
			x: number;
			y: number;
			z: number;
		};
	};
	spotLight: {
		enable: boolean;
		color: string;
		intensity: number;
		distance: number;
		angle: number;
		penumbra: number;
		decay: number;
		castShadow: boolean;
		position: {
			x: number;
			y: number;
			z: number;
		};
	};
	hemisphereLight: {
		enable: boolean;
		skyColor: string;
		groundColor: string;
		intensity: number;
		position: {
			x: number;
			y: number;
			z: number;
		};
	};
	rectAreaLight: {
		enable: boolean;
		color: string;
		intensity: number;
		width: number;
		height: number;
		position: {
			x: number;
			y: number;
			z: number;
		};
	};
	lightTarget: {
		x: number;
		y: number;
		z: number;
	};
}> {
	constructor() {
		super(
			{
				showHelper: false,
				ambientLight: {
					enable: true,
					color: '0x121212',
					intensity: 0.2,
				},
				directionalLight: {
					enable: true,
					color: '0xffffff',
					intensity: 0.8,
					castShadow: true,
					position: {
						x: -3,
						y: 10,
						z: 10,
					},
				},
				spotLight: {
					enable: true,
					color: '0xffffff',
					intensity: 0.4,
					distance: 0,
					angle: 20,
					penumbra: 0,
					decay: 1,
					castShadow: true,
					position: {
						x: 3,
						y: 5,
						z: 5,
					},
				},
				hemisphereLight: {
					enable: true,
					skyColor: '0xffffff',
					groundColor: '0x444444',
					intensity: 0.1,
					position: {
						x: 0,
						y: 20,
						z: 0,
					},
				},
				rectAreaLight: {
					enable: true,
					color: '0xff0000',
					intensity: 1.3,
					width: 5,
					height: 3,
					position: {
						x: 2,
						y: 1,
						z: 2,
					},
				},
				lightTarget: {
					x: 0,
					y: 0,
					z: 0,
				},
			},
			[
				{ name: 'showHelper', type: 'checkbox' },
				{
					name: 'ambientLight',
					type: 'folder',
					control: 'ambientLight',
					children: [
						{ name: 'enable', type: 'checkbox' },
						{ name: 'color', type: 'color' },
						{ name: 'intensity', type: 'number', min: 0, max: 1.5, step: 0.01 },
					],
				},
				{
					name: 'directionalLight',
					type: 'folder',
					control: 'directionalLight',
					children: [
						{ name: 'enable', type: 'checkbox' },
						{ name: 'color', type: 'color' },
						{ name: 'castShadow', type: 'checkbox' },
						{ name: 'intensity', type: 'number', min: 0, max: 1.5, step: 0.01 },
						{
							name: 'position',
							type: 'folder',
							control: 'position',
							children: [
								{ name: 'x', type: 'number', min: -30, max: 30, step: 0.1 },
								{ name: 'y', type: 'number', min: -30, max: 30, step: 0.1 },
								{ name: 'z', type: 'number', min: -30, max: 30, step: 0.1 },
							],
						},
					],
				},
				{
					name: 'spotLight',
					type: 'folder',
					control: 'spotLight',
					children: [
						{ name: 'enable', type: 'checkbox' },
						{ name: 'color', type: 'color' },
						{ name: 'castShadow', type: 'checkbox' },
						{ name: 'intensity', type: 'number', min: 0, max: 1.5, step: 0.01 },
						{ name: 'distance', type: 'number', min: 0, max: 100, step: 0.01 },
						{ name: 'angle', type: 'number', min: 0, max: 50, step: 0.01 },
						{ name: 'penumbra', type: 'number', min: 0, max: 10, step: 0.01 },
						{ name: 'decay', type: 'number', min: 0, max: 10, step: 0.01 },
						{
							name: 'position',
							type: 'folder',
							control: 'position',
							children: [
								{ name: 'x', type: 'number', min: -30, max: 30, step: 0.1 },
								{ name: 'y', type: 'number', min: -30, max: 30, step: 0.1 },
								{ name: 'z', type: 'number', min: -30, max: 30, step: 0.1 },
							],
						},
					],
				},
				{
					name: 'hemisphereLight',
					type: 'folder',
					control: 'hemisphereLight',
					children: [
						{ name: 'enable', type: 'checkbox' },
						{ name: 'skyColor', type: 'color' },
						{ name: 'groundColor', type: 'color' },
						{ name: 'intensity', type: 'number', min: 0, max: 1.5, step: 0.01 },
						{
							name: 'position',
							type: 'folder',
							control: 'position',
							children: [
								{ name: 'x', type: 'number', min: -30, max: 30, step: 0.1 },
								{ name: 'y', type: 'number', min: -30, max: 30, step: 0.1 },
								{ name: 'z', type: 'number', min: -30, max: 30, step: 0.1 },
							],
						},
					],
				},
				{
					name: 'rectAreaLight',
					type: 'folder',
					control: 'rectAreaLight',
					children: [
						{ name: 'enable', type: 'checkbox' },
						{ name: 'color', type: 'color' },
						{ name: 'intensity', type: 'number', min: 0, max: 1.5, step: 0.01 },
						{ name: 'width', type: 'number', min: 0, max: 10, step: 0.01 },
						{ name: 'height', type: 'number', min: 0, max: 10, step: 0.01 },
						{
							name: 'position',
							type: 'folder',
							control: 'position',
							children: [
								{ name: 'x', type: 'number', min: -30, max: 30, step: 0.1 },
								{ name: 'y', type: 'number', min: -30, max: 30, step: 0.1 },
								{ name: 'z', type: 'number', min: -30, max: 30, step: 0.1 },
							],
						},
					],
				},
				{
					name: 'lightTarget',
					type: 'folder',
					control: 'lightTarget',
					children: [
						{ name: 'x', type: 'number', min: -30, max: 30, step: 0.1 },
						{ name: 'y', type: 'number', min: -30, max: 30, step: 0.1 },
						{ name: 'z', type: 'number', min: -30, max: 30, step: 0.1 },
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
			this.meshObject3d.rotation.x = elapsedTime / 10;
		}
	}
}
