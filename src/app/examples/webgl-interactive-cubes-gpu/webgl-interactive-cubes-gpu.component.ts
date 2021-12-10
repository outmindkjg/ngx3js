import { Component } from '@angular/core';
import { BaseComponent, RendererEvent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-interactive-cubes-gpu',
	templateUrl: './webgl-interactive-cubes-gpu.component.html',
	styleUrls: ['./webgl-interactive-cubes-gpu.component.scss'],
})
export class WebglInteractiveCubesGpuComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	cubeInfos: {
		color: number;
		position: { x: number; y: number; z: number };
		rotation: { x: number; y: number; z: number };
		scale: { x: number; y: number; z: number };
	}[] = [];

	ngOnInit() {
		this.cubeInfos = [];
		for (let i = 0; i < 2000; i++) {
			this.cubeInfos.push({
				color: Math.random() * 0xffffff,
				position: {
					x: Math.random() * 800 - 400,
					y: Math.random() * 800 - 400,
					z: Math.random() * 800 - 400,
				},
				rotation: {
					x: Math.random() * 2 * 180,
					y: Math.random() * 2 * 180,
					z: Math.random() * 2 * 180,
				},
				scale: {
					x: Math.random() + 0.5,
					y: Math.random() + 0.5,
					z: Math.random() + 0.5,
				},
			});
		}
	}

	lastIntersect: any = null;
	onMouseMove(event: RendererEvent) {
		if (this.camera !== null && this.mesh !== null) {
			const mesh = this.mesh.getObject3d();
			const intersect = this.camera.getIntersection(event.mouse, mesh.children);
			if (intersect !== null) {
				if (this.lastIntersect !== intersect.object) {
					if (this.lastIntersect !== null) {
						this.lastIntersect.material.emissive.setHex(
							this.lastIntersect.currentHex
						);
					}
					this.lastIntersect = intersect.object;
					this.lastIntersect.currentHex =
						this.lastIntersect.material.emissive.getHex();
					this.lastIntersect.material.emissive.setHex(0xff0000);
				}
			} else {
				if (this.lastIntersect !== null) {
					this.lastIntersect.material.emissive.setHex(
						this.lastIntersect.currentHex
					);
				}
				this.lastIntersect = null;
			}
		}
	}
}
