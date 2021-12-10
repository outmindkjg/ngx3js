import { Component } from '@angular/core';
import { BaseComponent, I3JS, N3js, ThreeUtil } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-wireframe',
	templateUrl: './webgl-materials-wireframe.component.html',
	styleUrls: ['./webgl-materials-wireframe.component.scss'],
})
export class WebglMaterialsWireframeComponent extends BaseComponent<{
	widthFactor: number;
}> {
	constructor() {
		super(
			{
				widthFactor: 1,
			},
			[{ name: 'widthFactor', type: 'number', min: 0.4, max: 4 }]
		);
	}

	setGeometry(geometry: I3JS.IBufferGeometry) {
		if (ThreeUtil.isNotNull(geometry.attributes.position)) {
			geometry.deleteAttribute('normal');
			geometry.deleteAttribute('uv');
			const vectors = [
				N3js.getVector3(1, 0, 0),
				N3js.getVector3(0, 1, 0),
				N3js.getVector3(0, 0, 1),
			];

			const position = geometry.attributes.position;
			const centers = new Float32Array(position.count * 3);
			for (let i = 0, l = position.count; i < l; i++) {
				vectors[i % 3].toArray(centers, i * 3);
			}
			geometry.setAttribute('center', N3js.getBufferAttribute(centers, 3));
		}
	}
}
