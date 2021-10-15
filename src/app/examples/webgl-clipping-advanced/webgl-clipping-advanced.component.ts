import { Component } from '@angular/core';
import {
	BaseComponent,
	MaterialComponent,
	PlaneComponent,
	RendererComponent,
	RendererTimer,
	THREE,
} from 'ngx3js';

@Component({
	selector: 'app-webgl-clipping-advanced',
	templateUrl: './webgl-clipping-advanced.component.html',
	styleUrls: ['./webgl-clipping-advanced.component.scss'],
})
export class WebglClippingAdvancedComponent extends BaseComponent<{
	localClipping: {
		enabled: boolean;
		shadow: boolean;
		visualize: boolean;
	};
	globalClipping: {
		enabled: boolean;
	};
}> {
	constructor() {
		super(
			{
				localClipping: {
					enabled: true,
					shadow: true,
					visualize: false,
				},
				globalClipping: {
					enabled: false,
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
								if (this.material !== null) {
									const material = this.material.getMaterial();
									material.clipShadows = this.controls.localClipping.shadow;
								}
							},
						},
						{ name: 'visualize', title: 'Visualize', type: 'checkbox' },
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
					],
					isOpen: true,
				},
			]
		);
	}

	boxes: { x: number; y: number; z: number }[] = [];
	localPlanes: { x: number; y: number; z: number; w: number }[] = [];
	globalPlanes: { x: number; y: number; z: number; w: number }[] = [];
	ngOnInit() {
		this.boxes = [];
		for (let z = -2; z <= 2; ++z) {
			for (let y = -2; y <= 2; ++y) {
				for (let x = -2; x <= 2; ++x) {
					this.boxes.push({ x: x / 5, y: y / 5, z: z / 5 });
				}
			}
		}
		this.localPlanes = [];
		const vertices = [
			new THREE.Vector3(+1, 0, +Math.SQRT1_2),
			new THREE.Vector3(-1, 0, +Math.SQRT1_2),
			new THREE.Vector3(0, +1, -Math.SQRT1_2),
			new THREE.Vector3(0, -1, -Math.SQRT1_2),
		];
		const indices = [0, 1, 2, 0, 2, 3, 0, 3, 1, 1, 3, 2];
		this.localPlanes = this.planesFromMesh(vertices, indices);
		this.globalPlanes = this.cylindricalPlanes(10, 1.5);
	}

	cylindricalPlanes(
		n,
		innerRadius
	): { x: number; y: number; z: number; w: number }[] {
		const result: { x: number; y: number; z: number; w: number }[] = [];
		for (let i = 0; i !== n; ++i) {
			const angle = (i * Math.PI * 2) / n;
			result.push({
				x: Math.cos(angle),
				y: 0,
				z: Math.sin(angle),
				w: innerRadius,
			});
		}
		return result;
	}

	planesFromMesh(
		vertices,
		indices
	): { x: number; y: number; z: number; w: number }[] {
		const n = indices.length / 3;
		const result: { x: number; y: number; z: number; w: number }[] = [];
		for (let i = 0, j = 0; i < n; ++i, j += 3) {
			const a = vertices[indices[j]],
				b = vertices[indices[j + 1]],
				c = vertices[indices[j + 2]];
			const plane = new THREE.Plane().setFromCoplanarPoints(a, b, c);
			result.push({
				x: plane.normal.x,
				y: plane.normal.y,
				z: plane.normal.z,
				w: plane.constant,
			});
		}
		return result;
	}

	globalPlane: PlaneComponent = null;
	setGlobalPlane(globalPlane: PlaneComponent) {
		this.globalPlane = globalPlane;
	}

	localPlane: PlaneComponent[] = [];
	setLocalPlane(localPlane: PlaneComponent) {
		if (this.localPlane.indexOf(localPlane) === -1) {
			this.localPlane.push(localPlane);
		}
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
					timer.elapsedTime * 45,
					timer.elapsedTime * 15
				);
			}
			// this.mesh.setScaleScalar(Math.cos(timer.elapsedTime) * 0.125 + 0.875);
		}
		if (this.localPlane.length > 0) {
			const bouncy = Math.cos(timer.elapsedTime * 0.5) * 0.3 + 0.4;
			this.localPlane.forEach((plane) => {
				plane.setPlane(null, null, null, bouncy);
			});
		}
	}
}
