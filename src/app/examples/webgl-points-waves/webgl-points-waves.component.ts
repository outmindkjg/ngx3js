import { Component } from '@angular/core';
import { BaseComponent, I3JS, MeshComponent, RendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-points-waves',
	templateUrl: './webgl-points-waves.component.html',
	styleUrls: ['./webgl-points-waves.component.scss'],
})
export class WebglPointsWavesComponent extends BaseComponent<{}> {
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
		const geometry = (mesh.getObject3d() as any).geometry;
		this.position =
			(geometry.getAttribute('position') ) || null;
		this.scale =
			(geometry.getAttribute('scale') ) || null;
	}

	position: I3JS.IBufferAttribute = null;
	scale: I3JS.IBufferAttribute = null;

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
