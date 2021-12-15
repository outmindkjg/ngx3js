import { Component } from '@angular/core';
import { NgxBaseComponent, NgxLightComponent, NgxMeshComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-lightprobe',
	templateUrl: './webgl-lightprobe.component.html',
	styleUrls: ['./webgl-lightprobe.component.scss'],
})
export class WebglLightprobeComponent extends NgxBaseComponent<{
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

	setlightProbe(lightProbe: NgxLightComponent) {
		this.lightProbe = lightProbe.getObject3d();
	}

	setLight(light: NgxLightComponent) {
		this.directionalLight = light.getObject3d();
	}

	setMesh(mesh: NgxMeshComponent) {
		super.setMesh(mesh);
		this.meshMaterial = (this.mesh.getRealMesh() as any).material;
	}
}
