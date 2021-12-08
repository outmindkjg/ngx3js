import { Component } from '@angular/core';
import {
	BaseComponent,
	MaterialComponent,
	PlaneComponent,
	RendererComponent,
	RendererTimer,
} from 'ngx3js';
import * as THREE from 'three';

@Component({
	selector: 'app-webgl-clipping',
	templateUrl: './webgl-clipping.component.html',
	styleUrls: ['./webgl-clipping.component.scss'],
})
export class WebglClippingComponent extends BaseComponent<{
	localClipping: {
		enabled: boolean;
		shadow: boolean;
		plane: number;
	};
	globalClipping: {
		enabled: boolean;
		plane: number;
	};
}> {
	constructor() {
		super(
			{
				localClipping: {
					enabled: true,
					shadow: true,
					plane: 0,
				},
				globalClipping: {
					enabled: false,
					plane: 0.1,
				},
			},
			[
				{
					name: 'Local Clipping',
					type: 'folder',
					control: 'localClipping',
					children: [
						{
							name: 'enabled',
							title: 'Enabled',
							type: 'checkbox',
							change: () => {
								if (this.renderer !== null) {
									const renderer =
										this.renderer.getRenderer() as THREE.WebGLRenderer;
									renderer.localClippingEnabled =
										this.controls.localClipping.enabled;
								}
							},
						},
						{
							name: 'shadow',
							title: 'Shadow',
							type: 'checkbox',
							change: () => {
								if (this.mesh !== null) {
									const mesh = this.mesh.getObject3d() as THREE.Mesh;
									const material = mesh.material as THREE.Material;
									material.clipShadows = this.controls.localClipping.shadow;
								}
							},
						},
						{
							name: 'plane',
							title: 'Plane',
							type: 'number',
							min: -0.5,
							max: 0.5,
							change: () => {
								if (this.localPlane !== null) {
									this.localPlane.setPlane(
										null,
										null,
										null,
										this.controls.localClipping.plane
									);
								}
							},
						},
					],
					isOpen: true,
				},
				{
					name: 'Global Clipping',
					type: 'folder',
					control: 'globalClipping',
					children: [
						{
							name: 'enabled',
							title: 'Enabled',
							type: 'checkbox',
							change: () => {},
						},
						{
							name: 'plane',
							title: 'Plane',
							type: 'number',
							min: -0.4,
							max: 3,
							change: () => {
								if (this.globalPlane !== null) {
									this.globalPlane.setPlane(
										null,
										null,
										null,
										this.controls.globalClipping.plane
									);
								}
							},
						},
					],
					isOpen: true,
				},
			]
		);
	}

	globalPlane: PlaneComponent = null;
	setGlobalPlane(globalPlane: PlaneComponent) {
		this.globalPlane = globalPlane;
	}

	localPlane: PlaneComponent = null;
	setLocalPlane(localPlane: PlaneComponent) {
		this.localPlane = localPlane;
	}

	renderer: RendererComponent = null;
	setRenderer(renderer: RendererComponent) {
		this.renderer = renderer;
	}

	material: MaterialComponent = null;
	setMaterial(material: MaterialComponent) {
		this.material = material;
	}

	onRender(timer: RendererTimer) {
		super.onRender(timer);

		if (this.mesh !== null) {
			if (!this.controls.meshRotate.autoRotate) {
				this.mesh.setRotation(
					null,
					timer.elapsedTime * 90,
					timer.elapsedTime * 36
				);
			}
			this.mesh.setScaleScalar(Math.cos(timer.elapsedTime) * 0.125 + 0.875);
		}
	}
}
