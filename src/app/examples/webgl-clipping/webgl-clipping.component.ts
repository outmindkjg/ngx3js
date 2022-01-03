import { Component } from '@angular/core';
import {
	NgxBaseComponent,
	NgxMaterialComponent,
	NgxPlaneComponent,
	NgxRendererComponent,
	IRendererTimer,
} from 'ngx3js';

@Component({
	selector: 'app-webgl-clipping',
	templateUrl: './webgl-clipping.component.html',
	styleUrls: ['./webgl-clipping.component.scss'],
})
export class WebglClippingComponent extends NgxBaseComponent<{
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
									const renderer = this.renderer.getRenderer() as any;
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
									const mesh = this.mesh.getObject3d() as any;
									const material = mesh.material;
									material.clipShadows = this.controls.localClipping.shadow;
								}
							},
						},
						{
							name: 'plane',
							title: 'Plane',
							type: 'number',
							min: -0.5,
							max: 3,
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
			],
			false,
			false
		);
	}

	globalPlane: NgxPlaneComponent = null;
	setGlobalPlane(globalPlane: NgxPlaneComponent) {
		this.globalPlane = globalPlane;
	}

	localPlane: NgxPlaneComponent = null;
	setLocalPlane(localPlane: NgxPlaneComponent) {
		this.localPlane = localPlane;
	}

	renderer: NgxRendererComponent = null;
	setRenderer(renderer: NgxRendererComponent) {
		this.renderer = renderer;
	}

	material: NgxMaterialComponent = null;
	setMaterial(material: NgxMaterialComponent) {
		this.material = material;
	}

	onRender(timer: IRendererTimer) {
		super.onRender(timer);

		if (this.mesh !== null) {
			this.mesh.setRotation(
				null,
				timer.elapsedTime * 90,
				timer.elapsedTime * 36
			);
			this.mesh.setScaleScalar(Math.cos(timer.elapsedTime) * 0.125 + 0.875);
		}
	}
}
