import { Component } from '@angular/core';
import {
	BaseComponent,
	MeshComponent,
	PassComponent,
	RendererEvent,
	SceneComponent,
	SSRPass,
	THREE,
} from 'ngx3js';

@Component({
	selector: 'app-webgl-postprocessing-ssr',
	templateUrl: './webgl-postprocessing-ssr.component.html',
	styleUrls: ['./webgl-postprocessing-ssr.component.scss'],
})
export class WebglPostprocessingSsrComponent extends BaseComponent<{
	enableSSR: boolean;
	autoRotate: boolean;
	otherMeshes: boolean;
	groundReflector: boolean;
	thickness: number;
	infiniteThick: boolean;
	settings: {
		fresnel: boolean;
		distanceAttenuation: boolean;
		otherMeshes: boolean;
		maxDistance: number;
		bouncing: boolean;
		output: string;
		opacity: number;
		blur: boolean;
	};
}> {
	constructor() {
		super(
			{
				enableSSR: true,
				autoRotate: true,
				otherMeshes: true,
				groundReflector: true,
				thickness: 0.018,
				infiniteThick: false,
				settings: {
					fresnel: true,
					distanceAttenuation: true,
					otherMeshes: true,
					maxDistance: 0.1,
					bouncing: false,
					output: 'Default',
					opacity: 1,
					blur: true,
				},
			},
			[
				{ name: 'enableSSR', title: 'Enable SSR', type: 'checkbox' },
				{
					name: 'groundReflector',
					type: 'checkbox',
					change: () => {
						this.updatePass();
					},
				},
				{
					name: 'thickness',
					type: 'number',
					min: 0,
					max: 0.1,
					step: 0.0001,
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
				{
					name: 'autoRotate',
					title: 'autoRotate',
					type: 'checkbox',
				},
				{
					name: 'more settings',
					type: 'folder',
					control: 'settings',
					isOpen: true,
					children: [
						{
							name: 'fresnel',
							type: 'checkbox',
							change: () => {
								this.updatePass();
							},
						},
						{
							name: 'distanceAttenuation',
							type: 'checkbox',
							change: () => {
								this.updatePass();
							},
						},
						{
							name: 'maxDistance',
							type: 'number',
							min: 0,
							max: 0.5,
							step: 0.001,
							change: () => {
								this.updatePass();
							},
						},
						{
							name: 'otherMeshes',
							type: 'checkbox',
							change: () => {
								this.updatePass();
							},
						},
						{
							name: 'bouncing',
							type: 'checkbox',
							change: () => {
								this.updatePass();
							},
						},
						{
							name: 'output',
							type: 'select',
							select: [
								'Default',
								'SSR Only',
								'Beauty',
								'Depth',
								'Normal',
								'Metalness',
							],
							change: () => {
								this.updatePass();
							},
						},
					],
				},
			]
		);
	}

	selectableMesh: THREE.Mesh[] = [];
	setSSRrPass(pass: PassComponent) {
		this.pass = pass.getPass();
		this.updatePass();
		setTimeout(() => {
			if (this.sceneChildren !== null) {
				this.selectableMesh = [];
				const selectName = ['bunny', 'box', 'sphere', 'cone'];
				this.sceneChildren.forEach((child) => {
					if (child instanceof THREE.Mesh) {
						const name = child.name;
						if (selectName.indexOf(name) > -1) {
							this.selectableMesh.push(child);
							switch (name) {
								case 'bunny':
								case 'box':
									this.selected.push(child);
									break;
							}
						}
					}
				});
			}
		}, 1000);
	}

	groundReflector: any = null;
	updatePass() {
		if (this.pass !== null) {
			if (this.controls.groundReflector) {
				if (this.groundReflector !== null) {
					this.pass.groundReflector = this.groundReflector;
				}
				this.pass.selects = this.selected;
			} else {
				if (this.pass.groundReflector !== null) {
					this.groundReflector = this.pass.groundReflector;
					this.pass.groundReflector = null;
				}
				this.pass.selects = null;
			}
			this.pass.thickness = this.controls.thickness;
			this.pass['infiniteThick'] = this.controls.infiniteThick;
			this.pass['fresnel'] = this.controls.settings.fresnel;
			this.pass['distanceAttenuation'] =
				this.controls.settings.distanceAttenuation;
			this.pass.maxDistance = this.controls.settings.maxDistance;
			this.pass['bouncing'] = this.controls.settings.bouncing;
			if (this.groundReflector !== null) {
				this.groundReflector.fresnel = this.controls.settings.fresnel;
				this.groundReflector.distanceAttenuation =
					this.controls.settings.distanceAttenuation;
				this.groundReflector.maxDistance = this.controls.settings.maxDistance;
			}
			switch (this.controls.settings.output.toLowerCase()) {
				case 'default':
					this.pass.output = 0;
					break;
				case 'ssr only':
					this.pass.output = 1;
					break;
				case 'beauty':
					this.pass.output = 3;
					break;
				case 'depth':
					this.pass.output = 4;
					break;
				case 'normal':
					this.pass.output = 5;
					break;
				case 'metalness':
					this.pass.output = 7;
					break;
			}
		}
	}

	setScene(scene: SceneComponent) {
		super.setScene(scene);
	}

	pass: SSRPass = null;

	selected: THREE.Mesh[] = [];

	setMesh(mesh: MeshComponent) {
		super.setMesh(mesh);
	}

	onPointerDown(event: RendererEvent) {
		if (this.pass !== null && this.camera !== null) {
			switch (event.type) {
				case 'pointerdown':
					const intersection = this.camera.getIntersection(
						event.mouse,
						this.selectableMesh
					);
					if (intersection !== null && intersection.object !== null) {
						const mesh = intersection.object;
						if (mesh instanceof THREE.Mesh) {
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
					break;
			}
		}
	}
}
