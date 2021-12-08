import { Component } from '@angular/core';
import { BaseComponent, MeshComponent, RendererTimer } from 'ngx3js';
import * as THREE from 'three';

@Component({
	selector: 'app-css2d-label',
	templateUrl: './css2d-label.component.html',
	styleUrls: ['./css2d-label.component.scss'],
})
export class Css2dLabelComponent extends BaseComponent<{}> {
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
	setMoon(mesh: MeshComponent) {
		this.moon = mesh.getObject3d();
	}

	/**
	 * Moon  of css2d label component
	 */
	moon: THREE.Object3D = null;

	/**
	 * Determines whether render on
	 * @param timer
	 */
	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.moon !== null) {
			const elapsed = timer.elapsedTime;
			this.moon.position.set(Math.sin(elapsed) * 5, 0, Math.cos(elapsed) * 5);
		}
	}
}
