import { Component } from '@angular/core';
import { NgxBaseComponent, IRendererTimer, NgxRendererComponent } from 'ngx3js';

@Component({
	selector: 'app-webxr-vr-sandbox',
	templateUrl: './webxr-vr-sandbox.component.html',
	styleUrls: ['./webxr-vr-sandbox.component.scss'],
})
export class WebxrVrSandboxComponent extends NgxBaseComponent<{
	radius: number;
	tube: number;
	tubularSegments: number;
	radialSegments: number;
	p: number;
	q: number;
	thickness: number;
}> {
	constructor() {
		super(
			{
				radius: 0.5,
				tube: 0.2,
				radialSegments: 150,
				tubularSegments: 20,
				p: 2,
				q: 3,
				thickness: 0.5,
			},
			[
				{ name: 'radius', type: 'number', min: 0.0, max: 1.0 },
				{ name: 'tube', type: 'number', min: 0.0, max: 1.0 },
				{ name: 'radialSegments', type: 'number', min: 10, max: 150, step: 1 },
				{ name: 'tubularSegments', type: 'number', min: 2, max: 20, step: 1 },
				{ name: 'p', type: 'number', min: 1, max: 10, step: 1 },
				{ name: 'q', type: 'number', min: 0, max: 10, step: 1 },
				{ name: 'thickness', type: 'number', min: 0, max: 1, step: 0.01 },
			]
			,false , false);
	}

	domElement : HTMLElement = null;

	setRender(render : NgxRendererComponent) {
		super.setRender(render);
		this.getTimeout().then(() => {
			this.domElement = render.gui.domElement;
		});
	}

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.meshObject3d !== null) {
			const time = timer.elapsedTime * 0.2;
			const torus = this.meshObject3d.getObjectByName('torus');
			torus.rotation.x = time * 2;
			torus.rotation.y = time * 5;
		}
	}
}
