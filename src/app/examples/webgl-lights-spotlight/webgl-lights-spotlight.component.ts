import { Component } from '@angular/core';
import {
	NgxBaseComponent,
	NgxHelperComponent,
	NgxLightComponent,
	IRendererTimer
} from 'ngx3js';

@Component({
	selector: 'app-webgl-lights-spotlight',
	templateUrl: './webgl-lights-spotlight.component.html',
	styleUrls: ['./webgl-lights-spotlight.component.scss'],
})
export class WebglLightsSpotlightComponent extends NgxBaseComponent<{
	lightColor: number;
	intensity: number;
	distance: number;
	angle: number;
	penumbra: number;
	decay: number;
	focus: number;
}> {
	constructor() {
		super(
			{
				lightColor: 0xffffff,
				intensity: 1,
				distance: 200,
				angle: 45,
				penumbra: 0.1,
				decay: 2,
				focus: 1,
			},
			[
				{
					name: 'lightColor',
					title: 'Light Color',
					type: 'color',
					change: () => {
						if (this.spotLight !== null) {
							this.spotLight.color.setHex(this.controls.lightColor);
							this.updateLight();
						}
					},
				},
				{
					name: 'intensity',
					title: 'intensity',
					type: 'number',
					min: 0,
					max: 2,
					change: () => {
						if (this.spotLight !== null) {
							this.spotLight.intensity = this.controls.intensity;
							this.updateLight();
						}
					},
				},
				{
					name: 'distance',
					title: 'distance',
					type: 'number',
					min: 50,
					max: 200,
					change: () => {
						if (this.spotLight !== null) {
							this.spotLight.distance = this.controls.distance;
							this.updateLight();
						}
					},
				},
				{
					name: 'angle',
					title: 'angle',
					type: 'number',
					min: 0,
					max: 60,
					change: () => {
						if (this.spotLight !== null) {
							this.spotLight.angle = (this.controls.angle / 180) * Math.PI;
							this.updateLight();
						}
					},
				},
				{
					name: 'penumbra',
					title: 'penumbra',
					type: 'number',
					min: 0,
					max: 1,
					change: () => {
						if (this.spotLight !== null) {
							this.spotLight.penumbra = this.controls.penumbra;
							this.updateLight();
						}
					},
				},
			]
		);
	}

	lightHelper: any = null;
	setLightHelper(helper: NgxHelperComponent) {
		this.lightHelper = helper.getHelper();
	}

	shadowCameraHelper: any = null;
	setShadowCameraHelper(helper: NgxHelperComponent) {
		this.shadowCameraHelper = helper.getHelper();
	}

	spotLight: any = null;
	spotLightObj3d: NgxLightComponent = null;
	setSpotLight(light: NgxLightComponent) {
		this.spotLightObj3d = light;
		this.spotLight = light.getObject3d();
		this.updateLight();
	}

	updateLight() {
		if (this.lightHelper !== null) {
			this.lightHelper.update();
		}
		if (this.shadowCameraHelper !== null) {
			this.shadowCameraHelper.update();
		}
	}

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
	}
}
