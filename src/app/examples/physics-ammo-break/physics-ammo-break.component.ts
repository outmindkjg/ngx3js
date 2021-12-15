import { Component } from '@angular/core';
import { NgxBaseComponent, IRendererEvent } from 'ngx3js';

@Component({
	selector: 'app-physics-ammo-break',
	templateUrl: './physics-ammo-break.component.html',
	styleUrls: ['./physics-ammo-break.component.scss'],
})
export class PhysicsAmmoBreakComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		this.stoneInfos = [];
		const numStones = 8;
		for (let i = 0; i < numStones; i++) {
			this.stoneInfos.push({ x: 0, y: 2, z: 15 * (0.5 - i / (numStones + 1)) });
		}
		const mountainHalfExtents = { x: 4, y: 5, z: 4 };
		this.mountainPoints = [];
		this.mountainPoints.push({
			x: mountainHalfExtents.x,
			y: -mountainHalfExtents.y,
			z: mountainHalfExtents.z,
		});
		this.mountainPoints.push({
			x: -mountainHalfExtents.x,
			y: -mountainHalfExtents.y,
			z: mountainHalfExtents.z,
		});
		this.mountainPoints.push({
			x: mountainHalfExtents.x,
			y: -mountainHalfExtents.y,
			z: -mountainHalfExtents.z,
		});
		this.mountainPoints.push({
			x: -mountainHalfExtents.x,
			y: -mountainHalfExtents.y,
			z: -mountainHalfExtents.z,
		});
		this.mountainPoints.push({ x: 0, y: mountainHalfExtents.y, z: 0 });
	}

	stoneInfos: { x: number; y: number; z: number }[] = [];
	mountainPoints: { x: number; y: number; z: number }[] = [];
	ballInfos: {
		x: number;
		y: number;
		z: number;
		vx: number;
		vy: number;
		vz: number;
	}[] = [];

	onMouseClick(event: IRendererEvent) {
		switch (event.type) {
			case 'pointerdown':
				if (this.camera !== null) {
					const raycaster = this.camera.getRaycaster(event.mouse);
					if (this.ballInfos.length > 10) {
						this.ballInfos.shift();
					}
					this.ballInfos.push({
						x: raycaster.ray.direction.x + raycaster.ray.origin.x,
						y: raycaster.ray.direction.y + raycaster.ray.origin.y,
						z: raycaster.ray.direction.z + raycaster.ray.origin.z,
						vx: raycaster.ray.direction.x * 24,
						vy: raycaster.ray.direction.y * 24,
						vz: raycaster.ray.direction.z * 24,
					});
				}
				break;
		}
	}
}
