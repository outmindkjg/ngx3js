import { Component } from '@angular/core';
import { NgxBaseComponent, NgxHelperComponent, NgxLightComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-lights-hemisphere',
	templateUrl: './webgl-lights-hemisphere.component.html',
	styleUrls: ['./webgl-lights-hemisphere.component.scss'],
})
export class WebglLightsHemisphereComponent extends NgxBaseComponent<{
	dirLight: boolean;
	hemiLight: boolean;
}> {
	constructor() {
		super(
			{
				dirLight: true,
				hemiLight: true,
			},
			[
				{
					name: 'dirLight',
					title: 'Direction Light',
					type: 'checkbox',
					change: () => {
						if (this.dirLight !== null) {
							this.dirLight.visible = this.controls.dirLight;
						}
						if (this.dirLightHelper !== null) {
							this.dirLightHelper.visible = this.controls.dirLight;
						}
					},
				},
				{
					name: 'hemiLight',
					title: 'Hemisphere Light',
					type: 'checkbox',
					change: () => {
						if (this.hemiLight !== null) {
							this.hemiLight.visible = this.controls.hemiLight;
						}
						if (this.hemiLightHelper !== null) {
							this.hemiLightHelper.visible = this.controls.hemiLight;
						}
					},
				},
			]
		);
	}

	hemiLight: any = null;
	setHemiLight(light: NgxLightComponent) {
		this.hemiLight = light.getObject3d();
	}
	dirLight: any = null;
	setDirLight(light: NgxLightComponent) {
		this.dirLight = light.getObject3d();
	}

	hemiLightHelper: any = null;
	setHemiLightHelper(light: NgxHelperComponent) {
		this.hemiLightHelper = light.getHelper();
	}
	dirLightHelper: any = null;
	setDirLightHelper(light: NgxHelperComponent) {
		this.dirLightHelper = light.getHelper();
	}
}
