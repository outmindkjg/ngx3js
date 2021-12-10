import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-performance-nodes',
	templateUrl: './webgl-performance-nodes.component.html',
	styleUrls: ['./webgl-performance-nodes.component.scss'],
})
export class WebglPerformanceNodesComponent extends BaseComponent<{
	meshStandardMaterial: () => void;
	meshStandardNodeMaterial: () => void;
}> {
	constructor() {
		super(
			{
				meshStandardMaterial: () => {
					this.createScene(70, 'meshStandardMaterial');
				},
				meshStandardNodeMaterial: () => {
					this.createScene(70, 'meshStandardNodeMaterial');
				},
			},
			[
				{
					name: 'meshStandardMaterial',
					type: 'button',
					title: 'StandardMaterial',
				},
				{
					name: 'meshStandardNodeMaterial',
					type: 'button',
					title: 'StandardNodeMaterial',
				},
			]
		);
	}

	ngOnInit() {
		this.createScene(70, 'meshStandardMaterial');
	}

	createScene(count: number = 70, materialType: string = '') {
		this.meshInfos = [];
		for (let i = 0; i < count; i++) {
			this.meshInfos.push({
				position: {
					x: Math.random() * 1000 - 500,
					y: Math.random() * 1000 - 500,
					z: Math.random() * 1000 - 500,
				},
				rotation: {
					x: Math.random() * 2 * 180,
					y: Math.random() * 2 * 180,
					z: Math.random() * 2 * 180,
				},
				scale: Math.random() * 50 + 100,
				color: 0xffffff * Math.random(),
				materialType: materialType,
			});
		}
	}

	meshInfos: {
		position: { x: number; y: number; z: number };
		rotation: { x: number; y: number; z: number };
		scale: number;
		color: number;
		materialType: string;
	}[] = [];
}
