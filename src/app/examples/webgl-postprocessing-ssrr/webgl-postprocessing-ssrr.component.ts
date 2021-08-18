import { Component } from '@angular/core';
import { Mesh } from 'three';
import { SSRrPass } from 'three/examples/jsm/postprocessing/SSRrPass';
import { BaseComponent, MeshComponent, PassComponent, RendererEvent } from '../../three';

@Component({
	selector: 'app-webgl-postprocessing-ssrr',
	templateUrl: './webgl-postprocessing-ssrr.component.html',
	styleUrls: ['./webgl-postprocessing-ssrr.component.scss'],
})
export class WebglPostprocessingSsrrComponent extends BaseComponent<{
	enableSSRr: boolean;
	autoRotate: boolean;
	ior: number;
	fillHole: boolean;
	settings: {
		specular: boolean;
		metalness: number;
		roughness: number;
		output: string;
		surfDist: number;
		maxDistance: number;
		infiniteThick: boolean;
	};
}> {
	constructor() {
		super(
			{
				enableSSRr: true,
				autoRotate: true,
				ior: 1.1,
				fillHole: true,
				settings: {
					specular: true,
					metalness: 0,
					roughness: 0.2,
					output: 'Default',
					surfDist: 0.0015,
					maxDistance: 50,
					infiniteThick: false,
				},
			},
			[
				{ name: 'enableSSRr', title: 'Enable SSRr', type: 'checkbox' },
				{
					name: 'ior',
					title: 'IOR',
					type: 'number',
					min: 1,
					max: 1.5,
					step: 0.0001,
					change: () => {
						this.updatePass();
					},
				},
				{
					name: 'fillHole',
					title: 'fillHole',
					type: 'checkbox',
					change: () => {
						this.updatePass();
					},
				},
				{
					name: 'autoRotate',
					title: 'autoRotate',
					type: 'checkbox',
					change: () => {
						this.updatePass();
					},
				},
				{
					name: 'more settings',
					type: 'folder',
					control: 'settings',
					isOpen: true,
					children: [
						{
							name: 'specular',
							type: 'checkbox',
							change: () => {
								this.updatePass();
							},
						},
						{
							name: 'metalness',
							type: 'number',
							min: 0,
							max: 1,
							step: 0.01,
							change: () => {
								this.updatePass();
							},
						},
						{
							name: 'roughness',
							type: 'number',
							min: 0,
							max: 1,
							step: 0.01,
							change: () => {
								this.updatePass();
							},
						},
						{
							name: 'output',
							type: 'select',
							select: ['Default', 'SSRr', 'Beauty', 'Depth', 'DepthSelects', 'NormalSelects', 'Refractive', 'Specular'],
							change: () => {
								this.updatePass();
							},
						},
						{
							name: 'surfDist',
							type: 'number',
							min: 0,
							max: 0.005,
							step: 0.0001,
							change: () => {
								this.updatePass();
							},
						},
						{
							name: 'maxDistance',
							type: 'number',
							min: 0,
							max: 100,
							step: 0.001,
							change: () => {
								this.updatePass();
							},
						},
						{
							name: 'infiniteThick',
							type: 'checkbox',
							change: () => {
								this.updatePass();
							},
						},
					],
				},
			]
		);
	}

	setSSRrPass(pass: PassComponent) {
		this.pass = pass.getPass();
		this.updatePass();
		setTimeout(() => {
			if (this.meshObject3d !== null) {
				const bunny = this.meshObject3d.getObjectByName('bunny') as Mesh;
				const box = this.meshObject3d.getObjectByName('box') as Mesh;
				if (bunny !== null) {
					this.selected.push(bunny);
				}
				if (box !== null) {
					this.selected.push(box);
				}
        console.log(this.pass['selects']);
			}
		}, 3000);
	}

	updatePass() {
		if (this.pass !== null) {
			this.pass.ior = this.controls.ior;
			this.pass.fillHole = this.controls.fillHole;
			this.pass.specular = this.controls.settings.specular;
			this.pass.specularMaterial.metalness = this.controls.settings.metalness;
			this.pass.specularMaterial.roughness = this.controls.settings.roughness;
			this.pass.maxDistance = this.controls.settings.maxDistance;
			this.pass.infiniteThick = this.controls.settings.infiniteThick;
			switch (this.controls.settings.output.toLowerCase()) {
				case 'default':
					this.pass.output = 0;
					break;
				case 'ssrr':
					this.pass.output = 1;
					break;
				case 'beauty':
					this.pass.output = 3;
					break;
				case 'depth':
					this.pass.output = 4;
					break;
				case 'depthselects':
					this.pass.output = 9;
					break;
				case 'normalselects':
					this.pass.output = 5;
					break;
				case 'refractive':
					this.pass.output = 7;
					break;
				case 'specular':
					this.pass.output = 8;
					break;
			}
			console.log(this.pass['selects']);
		}
	}

	pass: SSRrPass = null;

	selected: Mesh[] = [];

	setMesh(mesh: MeshComponent) {
		super.setMesh(mesh);
	}

	onPointerDown(event: RendererEvent) {
		if (this.pass !== null && this.camera !== null) {
			switch (event.type) {
				case 'pointerdown':
					const intersection = this.camera.getIntersection(event.mouse, this.meshChildren);
					if (intersection !== null && intersection.object !== null) {
						const mesh = intersection.object;
						if (mesh instanceof Mesh) {
							const index = this.selected.indexOf(mesh);
							if (index >= 0) {
								this.selected.splice(index, 1);
							} else {
								this.selected.push(mesh);
							}
						}
					}

					break;
				default:
					console.log(event.type);
					break;
			}
		}
	}
}
