import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-depth-texture',
	templateUrl: './webgl-depth-texture.component.html',
	styleUrls: ['./webgl-depth-texture.component.scss'],
})
export class WebglDepthTextureComponent extends BaseComponent<{
	format: string;
	type: string;
}> {
	constructor() {
		super(
			{
				format: 'Depth',
				type: 'UnsignedShort',
			},
			[
				{ name: 'format', type: 'select', select: ['Depth', 'DepthStencil'] },
				{
					name: 'type',
					type: 'select',
					select: ['UnsignedShort', 'UnsignedInt', 'UnsignedInt248'],
				},
			]
		);
	}

	models: {
		position: { x: number; y: number; z: number };
		rotation: { x: number; y: number; z: number };
	}[] = [];
	ngOnInit() {
		const count = 50;
		const scale = 5;
		this.models = [];
		for (let i = 0; i < count; i++) {
			const r = Math.random() * 2.0 * Math.PI;
			const z = Math.random() * 2.0 - 1.0;
			const zScale = Math.sqrt(1.0 - z * z) * scale;
			this.models.push({
				position: {
					x: Math.cos(r) * zScale,
					y: Math.cos(r) * zScale,
					z: z * scale,
				},
				rotation: {
					x: (Math.random() / Math.PI) * 180,
					y: (Math.random() / Math.PI) * 180,
					z: (Math.random() / Math.PI) * 180,
				},
			});
		}
	}
}
