import { Component } from '@angular/core';
import { BaseComponent, MeshComponent, LightComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-lightprobe',
	templateUrl: './webgl-lightprobe.component.html',
	styleUrls: ['./webgl-lightprobe.component.scss'],
})
export class WebglLightprobeComponent extends BaseComponent<{
	lightProbeIntensity: number;
	directionalLightIntensity: number;
	envMapIntensity: number;
}> {
	constructor() {
		super(
			{
				lightProbeIntensity: 1.0,
				directionalLightIntensity: 0.2,
				envMapIntensity: 1,
			},
			[
				{
					name: 'lightProbeIntensity',
					title: 'light probe',
					type: 'number',
					min: 0,
					max: 1,
					step: 0.02,
					change: () => {
						if (this.lightProbe !== null) {
							this.lightProbe.intensity = this.controls.lightProbeIntensity;
						}
					},
				},
				{
					name: 'directionalLightIntensity',
					title: 'directional light',
					type: 'number',
					min: 0,
					max: 1,
					step: 0.02,
					change: () => {
						if (this.directionalLight !== null) {
							this.directionalLight.intensity =
								this.controls.directionalLightIntensity;
						}
					},
				},
				{
					name: 'envMapIntensity',
					title: 'envMap',
					type: 'number',
					min: 0,
					max: 1,
					step: 0.02,
					change: () => {
						if (this.meshMaterial !== null) {
							this.meshMaterial.envMapIntensity = this.controls.envMapIntensity;
						}
					},
				},
			]
		);
	}
	lightProbe: any;
	directionalLight: any;
	meshMaterial: any;

	setlightProbe(lightProbe: LightComponent) {
		this.lightProbe = lightProbe.getObject3d();
	}

	setLight(light: LightComponent) {
		this.directionalLight = light.getObject3d();
	}

	setMesh(mesh: MeshComponent) {
		super.setMesh(mesh);
		this.meshMaterial = this.mesh.getRealMesh().material;
	}
}
