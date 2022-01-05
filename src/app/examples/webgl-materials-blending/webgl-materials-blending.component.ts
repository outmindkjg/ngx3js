import { Component } from '@angular/core';
import { NgxBaseComponent, NgxMeshComponent, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-blending',
	templateUrl: './webgl-materials-blending.component.html',
	styleUrls: ['./webgl-materials-blending.component.scss'],
})
export class WebglMaterialsBlendingComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	ngOnInit() {
		this.meshInfos = [];
		this.addMeshInfo('textures/uv_grid_opengl.jpg', 300);
		this.addMeshInfo('textures/sprite0.jpg', 150);
		this.addMeshInfo('textures/sprite0.png', 0);
		this.addMeshInfo('textures/lensflare/lensflare0.png', -150);
		this.addMeshInfo('textures/lensflare/lensflare0_alpha.png', -300);
	}

	blendings = [
		{ name: 'No', constant: 'No' },
		{ name: 'Normal', constant: 'Normal' },
		{ name: 'Additive', constant: 'Additive' },
		{ name: 'Subtractive', constant: 'Subtractive' },
		{ name: 'Multiply', constant: 'Multiply' },
	];

	addMeshInfo(map: string, y: number) {
		for (let i = 0; i < this.blendings.length; i++) {
			this.meshInfos.push({
				x: (i - this.blendings.length / 2) * 110,
				y: y,
				z: 1,
				map: map,
				blending: this.blendings[i].constant,
				name: this.blendings[i].name,
			});
		}
	}

	meshInfos: {
		x: number;
		y: number;
		z: number;
		map: string;
		blending: string;
		name: string;
	}[] = [];

	labelProgram(ctx: CanvasRenderingContext2D, text: string) {
		ctx.fillStyle = 'rgba( 0, 0, 0, 0.95 )';
		ctx.fillRect(0, 0, 128, 32);
		ctx.fillStyle = 'white';
		ctx.font = '12pt arial bold';
		ctx.fillText(text, 10, 22);
	}

	canvasProgram(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = '#ddd';
		ctx.fillRect(0, 0, 128, 128);
		ctx.fillStyle = '#555';
		ctx.fillRect(0, 0, 64, 64);
		ctx.fillStyle = '#999';
		ctx.fillRect(32, 32, 32, 32);
		ctx.fillStyle = '#555';
		ctx.fillRect(64, 64, 64, 64);
		ctx.fillStyle = '#777';
		ctx.fillRect(96, 96, 32, 32);
	}

	setMesh(mesh: NgxMeshComponent) {
		super.setMesh(mesh);
		this.mapBg = (this.mesh.getObject3d() as any).material.map;
	}

	mapBg: any = null;

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.mapBg !== null && this.mapBg.repeat) {
			const time = timer.elapsedTime * 0.25;
			const ox = (time * -0.01 * this.mapBg.repeat.x) % 1;
			const oy = (time * -0.01 * this.mapBg.repeat.y) % 1;
			this.mapBg.offset.set(ox, oy);
		}
	}
}
