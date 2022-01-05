import { Component } from '@angular/core';
import {
	I3JS, NgxBaseComponent, NgxMeshComponent,
	NgxRendererComponent,
	IRendererTimer
} from 'ngx3js';

@Component({
	selector: 'app-webgl-raymarching-reflect',
	templateUrl: './webgl-raymarching-reflect.component.html',
	styleUrls: ['./webgl-raymarching-reflect.component.scss'],
})
export class WebglRaymarchingReflectComponent extends NgxBaseComponent<{
	saveImage: () => void;
	resolution: string;
}> {
	constructor() {
		super(
			{
				saveImage: () => {
					if (this.renderer !== null) {
						this.renderer.getCanvasJson((json) => {}, {
							width: 200,
							height: 200,
							name: 'auto',
						});
					}
				},
				resolution: '512',
			},
			[
				{ name: 'saveImage', title: 'Save Image', type: 'button' },
				{
					name: 'resolution',
					title: 'Resolution',
					type: 'select',
					select: ['256', '512', '800', 'full'],
					change: () => {
						this.changeSize();
					},
				},
			]
			,false , false);
	}

	setRender(renderer: NgxRendererComponent) {
		super.setRender(renderer);
		this.changeSize();
	}

	changeSize() {
		if (this.renderer !== null) {
			if (this.controls.resolution !== 'full') {
				const resolution = parseInt(this.controls.resolution);
				this.renderer.resizeCanvas(resolution, resolution);
			} else {
				this.renderer.resizeCanvas(0, 0);
			}
		}
	}

	setDolly(mesh: NgxMeshComponent) {
		this.dolly = mesh.getObject3d();
	}

	dolly: I3JS.Object3D = null;

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.dolly !== null) {
			const elapsedTime = timer.elapsedTime;
			this.dolly.position.z = -elapsedTime;
		}
	}
}
