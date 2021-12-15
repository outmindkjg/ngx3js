import { Component } from '@angular/core';
import { NgxBaseComponent, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-shaders-fresnel',
	templateUrl: './webgl-materials-shaders-fresnel.component.html',
	styleUrls: ['./webgl-materials-shaders-fresnel.component.scss'],
})
export class WebglMaterialsShadersFresnelComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		this.meshIninfos = [];
		for (let i = 0; i < 500; i++) {
			this.meshIninfos.push({
				x: Math.random() * 10000 - 5000,
				y: Math.random() * 10000 - 5000,
				z: Math.random() * 10000 - 5000,
				scale: Math.random() * 3 + 1,
			});
		}
	}

	meshIninfos: {
		x: number;
		y: number;
		z: number;
		scale: number;
	}[] = [];

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.meshChildren !== null) {
			const time = timer.elapsedTime * 0.1;
			this.meshChildren.forEach((child, i) => {
				child.position.x = 5000 * Math.cos(time + i);
				child.position.y = 5000 * Math.sin(time + i * 1.1);
			});
		}
	}
}
