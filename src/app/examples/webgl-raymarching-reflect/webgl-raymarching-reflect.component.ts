import { Component } from '@angular/core';
import {
	BaseComponent,
	MeshComponent,
	RendererComponent,
	RendererTimer,
	THREE,
} from 'ngx3js';

@Component({
	selector: 'app-webgl-raymarching-reflect',
	templateUrl: './webgl-raymarching-reflect.component.html',
	styleUrls: ['./webgl-raymarching-reflect.component.scss'],
})
export class WebglRaymarchingReflectComponent extends BaseComponent<{
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
		);
	}

	setRender(renderer: RendererComponent) {
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

	setDolly(mesh: MeshComponent) {
		this.dolly = mesh.getObject3d();
	}

	dolly: THREE.Object3D = null;

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.dolly !== null) {
			const elapsedTime = timer.elapsedTime;
			this.dolly.position.z = -elapsedTime;
		}
	}
}
