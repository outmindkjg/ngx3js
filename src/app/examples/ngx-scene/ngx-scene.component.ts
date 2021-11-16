import { Component } from '@angular/core';
import { BaseComponent, ControlComponent, RendererTimer } from 'ngx3js';

@Component({
	selector: 'app-ngx-scene',
	templateUrl: './ngx-scene.component.html',
	styleUrls: ['./ngx-scene.component.scss'],
})
export class NgxSceneComponent extends BaseComponent<{
	background: {
		type: string;
		color: string;
		image: string;
	};
	environment: {
		enabled: boolean;
		image: string;
		roughness: number;
		metalness: number;
	};
	fog: {
		enabled: boolean;
		type: string;
		color: string;
		near: number;
		far: number;
		density: number;
	};
}> {
	constructor() {
		super(
			{
				background: {
					type: 'image',
					color: '0x000000',
					image: 'SwedishRoyalCastle',
				},
				environment: {
					enabled: true,
					image: 'SwedishRoyalCastle',
					roughness: 0.2,
					metalness: 1,
				},
				fog: {
					enabled: true,
					type: 'fog',
					color: '0xffffff',
					near: 0.1,
					far: 70,
					density: 0.0025,
				},
			},
			[
				{
					name: 'background',
					type: 'folder',
					control: 'background',
					children: [
						{ name: 'type', type: 'select', select: ['color', 'image'] },
						{ name: 'color', type: 'color' },
						{
							name: 'image',
							type: 'select',
							select: [
								'pisaHDR',
								'pisa',
								'Park3Med',
								'Bridge2',
								'SwedishRoyalCastle',
							],
							change: () => {
								this.chageBackground('background');
							},
						},
					],
				},
				{
					name: 'environment',
					type: 'folder',
					control: 'environment',
					children: [
						{ name: 'enabled', type: 'checkbox' },
						{
							name: 'image',
							type: 'select',
							select: [
								'pisaHDR',
								'pisa',
								'Park3Med',
								'Bridge2',
								'SwedishRoyalCastle',
							],
							change: () => {
								this.chageBackground('environment');
							},
						},
						{ name: 'roughness', type: 'number', min: 0, max: 1, step: 0.1 },
						{ name: 'metalness', type: 'number', min: 0, max: 1, step: 0.1 },
					],
				},
				{
					name: 'fog',
					type: 'folder',
					control: 'fog',
					children: [
						{ name: 'enabled', type: 'checkbox' },
						{ name: 'type', type: 'select', select: ['fog', 'FogExp2'] },
						{ name: 'color', type: 'color' },
						{ name: 'near', type: 'number', min: 0, max: 10, step: 0.1 },
						{ name: 'far', type: 'number', min: 0, max: 100, step: 0.1 },
						{
							name: 'density',
							type: 'number',
							min: 0,
							max: 0.004,
							step: 0.0001,
						},
					],
				},
			],
			true,
			false
		);
	}

	ngOnInit() {
		this.chageBackground('background');
		this.chageBackground('environment');
	}

	chageBackground(type: string) {
		let backgroundTexture = null;
		switch (this.controls.background.image) {
			case 'pisaHDR':
				backgroundTexture = {
					image: 'textures/cube/pisaHDR/',
					cubeImage: ['', 'hdr'],
					loaderType: 'HDRCubeTexture',
					magFilter: 'LinearFilter',
					cubeType: 'cubemap',
				};
				break;
			case 'pisa':
				backgroundTexture = {
					image: 'textures/cube/pisa/',
					cubeImage: [
						'px.png',
						'nx.png',
						'py.png',
						'ny.png',
						'pz.png',
						'nz.png',
					],
				};
				break;
			case 'Park3Med':
				backgroundTexture = {
					image: 'textures/cube/Park3Med/',
					cubeImage: [
						'px.jpg',
						'nx.jpg',
						'py.jpg',
						'ny.jpg',
						'pz.jpg',
						'nz.jpg',
					],
					mapping: 'CubeRefraction',
				};
				break;
			case 'Bridge2':
				backgroundTexture = {
					image: 'textures/cube/Bridge2/',
					cubeImage: [
						'posx.jpg',
						'negx.jpg',
						'posy.jpg',
						'negy.jpg',
						'posz.jpg',
						'negz.jpg',
					],
				};
				break;
			case 'SwedishRoyalCastle':
				backgroundTexture = {
					image: 'textures/cube/SwedishRoyalCastle/',
					cubeImage: ['', 'jpg'],
				};
				break;
		}
		if (backgroundTexture !== null) {
			switch (type) {
				case 'background':
					this.backgroundTexture = backgroundTexture;
					break;
				case 'environment':
					this.environmentTexture = backgroundTexture;
					break;
			}
		}
	}

	backgroundTexture: {
		image: string;
		cubeImage: string[];
		loaderType?: string;
		magFilter?: string;
		cubeType?: string;
		mapping?: string;
	};

	environmentTexture: {
		image: string;
		cubeImage: string[];
		loaderType?: string;
		magFilter?: string;
		cubeType?: string;
		mapping?: string;
	};

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.meshObject3d !== null) {
			const elapsedTime = timer.elapsedTime;
			this.meshObject3d.rotation.y = elapsedTime / 5;
		}
	}
}
