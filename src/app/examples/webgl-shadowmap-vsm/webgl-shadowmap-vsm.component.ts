import { Component } from '@angular/core';
import { BaseComponent, LightComponent, RendererTimer, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-shadowmap-vsm',
	templateUrl: './webgl-shadowmap-vsm.component.html',
	styleUrls: ['./webgl-shadowmap-vsm.component.scss'],
})
export class WebglShadowmapVsmComponent extends BaseComponent<{
	spotlight: number;
	directional: number;
}> {
	constructor() {
		super(
			{
				spotlight: 4,
				directional: 4,
			},
			[
				{
					name: 'spotlight',
					title: 'Spotlight Radius',
					type: 'number',
					min: 1,
					max: 8,
					finishChange: () => {
						if (this.spotLight !== null) {
							this.spotLight.shadow.radius = this.controls.spotlight;
							this.spotLight.shadow.needsUpdate = true;
						}
					},
				},
				{
					name: 'directional',
					title: 'Directional light Radius',
					type: 'number',
					min: 1,
					max: 8,
					finishChange: () => {
						if (this.dirLight !== null) {
							this.dirLight.shadow.radius = this.controls.directional;
							this.dirLight.shadow.needsUpdate = true;
						}
					},
				},
			]
		);
	}

	setSpotLight(light: LightComponent) {
		this.spotLight = light.getObject3d() as THREE.SpotLight;
	}

	spotLight: THREE.SpotLight = null;

	setDirLight(light: LightComponent) {
		this.dirLight = light.getObject3d() as THREE.DirectionalLight;
	}

	dirLight: THREE.DirectionalLight = null;

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.mesh !== null) {
			const delta = timer.delta;
			const torusKnot = this.mesh.getObject3d();
			torusKnot.rotation.x += 0.25 * delta;
			torusKnot.rotation.y += 2 * delta;
			torusKnot.rotation.z += 1 * delta;
			if (this.dirLight !== null) {
				this.dirLight.parent.rotation.y += 0.7 * delta;
				this.dirLight.position.z = 17 + Math.sin(timer.elapsedTime * 0.001) * 5;
			}
		}
	}
}
