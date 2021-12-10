import { Component } from '@angular/core';
import { BaseComponent, THREE, RendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-instancing-performance',
	templateUrl: './webgl-instancing-performance.component.html',
	styleUrls: ['./webgl-instancing-performance.component.scss'],
})
export class WebglInstancingPerformanceComponent extends BaseComponent<{
	amount: number;
	count: number;
	method: string;
}> {
	constructor() {
		super(
			{
				amount: 10,
				count: 1000,
				method: 'INSTANCED',
			},
			[
				{
					name: 'method',
					type: 'select',
					select: ['INSTANCED', 'MERGED', 'NAIVE'],
				},
				{ name: 'count', type: 'number', min: 10, max: 1000, step: 1 },
			]
		);
	}

	ngOnInit() {
		this.randomizeMatrix = (matrix) => {
			const position = new THREE.Vector3();
			const rotation = new THREE.Euler();
			const quaternion = new THREE.Quaternion();
			const scale = new THREE.Vector3();
			position.x = Math.random() * 40 - 20;
			position.y = Math.random() * 40 - 20;
			position.z = Math.random() * 40 - 20;
			rotation.x = Math.random() * 2 * Math.PI;
			rotation.y = Math.random() * 2 * Math.PI;
			rotation.z = Math.random() * 2 * Math.PI;
			quaternion.setFromEuler(rotation);
			scale.x = scale.y = scale.z = Math.random() * 1;
			matrix.compose(position, quaternion, scale);
		};
	}
	randomizeMatrix = null;

	onRender(timer: RendererTimer) {
		super.onRender(timer);
	}
}
