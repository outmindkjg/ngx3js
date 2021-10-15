import { Component } from '@angular/core';
import { BaseComponent, GeometryComponent, RendererTimer, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-video',
	templateUrl: './webgl-materials-video.component.html',
	styleUrls: ['./webgl-materials-video.component.scss'],
})
export class WebglMaterialsVideoComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		const xgrid = 20;
		const ygrid = 10;
		const ux = 1 / xgrid;
		const uy = 1 / ygrid;
		const xsize = 480 / xgrid;
		const ysize = 204 / ygrid;
		this.boxInfos = [];
		for (let i = 0; i < xgrid; i++) {
			for (let j = 0; j < ygrid; j++) {
				const hue = i / xgrid;
				const saturation = 1 - j / ygrid;
				const color = new THREE.Color();
				color.setHSL(hue, saturation, 0.5);
				this.boxInfos.push({
					hue: hue,
					saturation: saturation,
					dx: 0.001 * (0.5 - Math.random()),
					dy: 0.001 * (0.5 - Math.random()),
					ux: ux,
					uy: uy,
					x: (i - xgrid / 2) * xsize,
					y: (j - ygrid / 2) * ysize,
					z: 0,
					ox: i,
					oy: j,
					xsize: xsize,
					ysize: ysize,
					zsize: xsize,
					color: color.getHex(),
				});
			}
		}
	}

	setGeometry(
		geometry: GeometryComponent,
		unitx: number,
		unity: number,
		offsetx: number,
		offsety: number
	) {
		const box = geometry.getGeometry();
		const uvs = box.attributes.uv.array as any;
		for (let i = 0; i < uvs.length; i += 2) {
			uvs[i] = (uvs[i] + offsetx) * unitx;
			uvs[i + 1] = (uvs[i + 1] + offsety) * unity;
		}
	}

	boxInfos: {
		hue: number;
		saturation: number;
		dx: number;
		dy: number;
		ux: number;
		uy: number;
		x: number;
		y: number;
		z: number;
		ox: number;
		oy: number;
		xsize: number;
		ysize: number;
		zsize: number;
		color: number;
	}[] = [];

	counter: number = 1;

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.meshChildren !== null) {
			const time = timer.elapsedTime * 0.5;
			this.meshChildren.forEach((child) => {
				const material = child['material'] as any;
				const h = ((360 * (material.userData.hue + time)) % 360) / 360;
				material.color.setHSL(h, material.userData.saturation, 0.5);
			});
			if (this.counter % 1000 > 200) {
				this.meshChildren.forEach((child) => {
					const dx = child.userData.dx;
					const dy = child.userData.dy;
					child.rotation.x += 10 * dx;
					child.rotation.y += 10 * dy;
					child.position.x -= 150 * dx;
					child.position.y += 150 * dy;
					child.position.z += 300 * dx;
				});
			}
			if (this.counter % 1000 === 0) {
				this.meshChildren.forEach((child) => {
					child.userData.dx *= -1;
					child.userData.dy *= -1;
				});
			}
			this.counter++;
		}
	}
}
