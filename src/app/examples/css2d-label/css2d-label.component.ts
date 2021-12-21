import { Component } from '@angular/core';
import { I3JS, IRendererTimer, NgxBaseComponent, NgxMeshComponent } from 'ngx3js';

@Component({
	selector: 'app-css2d-label',
	templateUrl: './css2d-label.component.html',
	styleUrls: ['./css2d-label.component.scss'],
})
export class Css2dLabelComponent extends NgxBaseComponent<{}> {
	/**
	 * Creates an instance of css2d label component.
	 *
	 */
	constructor() {
		super({}, []);
	}

	/**
	 * Sets moon
	 *
	 * @param mesh
	 */
	setMoon(mesh: NgxMeshComponent) {
		this.moon = mesh.getObject3d();
	}

	/**
	 * Moon  of css2d label component
	 */
	moon: I3JS.Object3D = null;

	/**
	 * Determines whether render on
	 * @param timer
	 */
	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.moon !== null) {
			const elapsed = timer.elapsedTime;
			this.moon.position.set(Math.sin(elapsed) * 5, 0, Math.cos(elapsed) * 5);
		}
	}
}
