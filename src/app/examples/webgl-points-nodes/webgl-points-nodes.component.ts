import { Component } from '@angular/core';
import { BaseComponent, MeshComponent, RendererTimer, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-points-nodes',
	templateUrl: './webgl-points-nodes.component.html',
	styleUrls: ['./webgl-points-nodes.component.scss'],
})
export class WebglPointsNodesComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	SEPARATION = 100;
	AMOUNTX = 50;
	AMOUNTY = 50;

	ngOnInit() {
		const numParticles = this.AMOUNTX * this.AMOUNTY;
		this.positions = [];
		this.scales = [];
		for (let ix = 0; ix < this.AMOUNTX; ix++) {
			for (let iy = 0; iy < this.AMOUNTY; iy++) {
				this.positions.push(
					ix * this.SEPARATION - (this.AMOUNTX * this.SEPARATION) / 2, // x
					0,
					iy * this.SEPARATION - (this.AMOUNTY * this.SEPARATION) / 2
				);
				this.scales.push(1);
			}
		}
	}

	positions: number[] = [];
	scales: number[] = [];

	setMesh(mesh: MeshComponent) {
		super.setMesh(mesh);
		const geometry = (mesh.getObject3d() as THREE.Points).geometry;
		this.position =
			(geometry.getAttribute('position') as THREE.BufferAttribute) || null;
		this.scale =
			(geometry.getAttribute('scale') as THREE.BufferAttribute) || null;
	}

	position: THREE.BufferAttribute = null;
	scale: THREE.BufferAttribute = null;

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.position !== null && this.scale !== null) {
			const positions = this.position.array as any;
			const scales = this.scale.array as any;
			let i = 0,
				j = 0;
			const count = timer.elapsedTime * 5;
			for (let ix = 0; ix < this.AMOUNTX; ix++) {
				for (let iy = 0; iy < this.AMOUNTY; iy++) {
					positions[i + 1] =
						Math.sin((ix + count) * 0.3) * 50 +
						Math.sin((iy + count) * 0.5) * 50;
					scales[j] =
						(Math.sin((ix + count) * 0.3) + 1) * 20 +
						(Math.sin((iy + count) * 0.5) + 1) * 20;
					i += 3;
					j++;
				}
			}
			this.position.needsUpdate = true;
			this.scale.needsUpdate = true;
		}
	}
}