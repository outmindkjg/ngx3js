import { Component } from '@angular/core';
import { I3JS, NgxBaseComponent, NgxLightComponent, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-shadowmap-vsm',
	templateUrl: './webgl-shadowmap-vsm.component.html',
	styleUrls: ['./webgl-shadowmap-vsm.component.scss'],
})
export class WebglShadowmapVsmComponent extends NgxBaseComponent<{
	spotlightRadius: number;
	spotlightSamples: number;
	dirlightRadius: number;
	dirlightSamples: number;
}> {
	constructor() {
		super(
			{
				spotlightRadius: 4,
				spotlightSamples: 8,
				dirlightRadius: 4,
				dirlightSamples: 8,
			},
			[
				{
					name: 'Spotlight',
					type: 'folder',
					isOpen: true,
					children: [
						{
							name: 'spotlightRadius',
							title: 'radius',
							type: 'number',
							min: 0,
							max: 25,
							finishChange: () => {
								if (this.spotLight !== null) {
									this.spotLight.shadow.radius = this.controls.spotlightRadius;
								}
							},
						},
						{
							name: 'spotlightSamples',
							title: 'samples',
							type: 'number',
							min: 1,
							max: 25,
							step: 1,
							finishChange: () => {
								if (this.spotLight !== null) {
									this.spotLight.shadow.blurSamples =
										this.controls.spotlightSamples;
								}
							},
						},
					],
				},
				{
					name: 'Directional Light',
					type: 'folder',
					isOpen: true,
					children: [
						{
							name: 'dirlightRadius',
							title: 'radius',
							type: 'number',
							min: 0,
							max: 25,
							finishChange: () => {
								if (this.dirLight !== null) {
									this.dirLight.shadow.radius = this.controls.dirlightRadius;
								}
							},
						},
						{
							name: 'dirlightSamples',
							title: 'samples',
							type: 'number',
							min: 1,
							max: 25,
							step: 1,
							finishChange: () => {
								if (this.dirLight !== null) {
									this.dirLight.shadow.blurSamples =
										this.controls.dirlightSamples;
								}
							},
						},
					],
				},
			]
			,false , false);
	}

	setSpotLight(light: NgxLightComponent) {
		this.spotLight = light.getObject3d() ;
	}

	spotLight: I3JS.SpotLight = null;

	setDirLight(light: NgxLightComponent) {
		this.dirLight = light.getObject3d() ;
	}

	dirLight: I3JS.DirectionalLight = null;

	onRender(timer: IRendererTimer) {
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
