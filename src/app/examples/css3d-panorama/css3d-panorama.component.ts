import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-css3d-panorama',
	templateUrl: './css3d-panorama.component.html',
	styleUrls: ['./css3d-panorama.component.scss'],
})
export class Css3dPanoramaComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		this.sides = [
			{
				url: 'textures/cube/Bridge2/posx.jpg',
				position: { x: -512, y: 0, z: 0 },
				rotation: { x: 0, y: 90, z: 0 },
			},
			{
				url: 'textures/cube/Bridge2/negx.jpg',
				position: { x: 512, y: 0, z: 0 },
				rotation: { x: 0, y: -90, z: 0 },
			},
			{
				url: 'textures/cube/Bridge2/posy.jpg',
				position: { x: 0, y: 512, z: 0 },
				rotation: { x: 90, y: 0, z: 180 },
			},
			{
				url: 'textures/cube/Bridge2/negy.jpg',
				position: { x: 0, y: -512, z: 0 },
				rotation: { x: -90, y: 0, z: 180 },
			},
			{
				url: 'textures/cube/Bridge2/posz.jpg',
				position: { x: 0, y: 0, z: 512 },
				rotation: { x: 0, y: 180, z: 0 },
			},
			{
				url: 'textures/cube/Bridge2/negz.jpg',
				position: { x: 0, y: 0, z: -512 },
				rotation: { x: 0, y: 0, z: 0 },
			},
		];
	}

	sides: {
		url: string;
		position: { x: number; y: number; z: number };
		rotation: { x: number; y: number; z: number };
	}[] = [];
}
