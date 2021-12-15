import { Component } from '@angular/core';
import {
	NgxBaseComponent, THREE, NgxMeshComponent,
	NgxRendererComponent,
	IRendererTimer
} from 'ngx3js';

@Component({
	selector: 'app-webgl-lights-physical',
	templateUrl: './webgl-lights-physical.component.html',
	styleUrls: ['./webgl-lights-physical.component.scss'],
})
export class WebglLightsPhysicalComponent extends NgxBaseComponent<{
	shadows: true;
	exposure: 0.68;
	bulbPower: string;
	hemiIrradiance: string;
}> {
	constructor() {
		super(
			{
				shadows: true,
				exposure: 0.68,
				bulbPower: '110000 lm (1000W)',
				hemiIrradiance: '0.0001 lx (Moonless Night)',
			},
			[
				{
					name: 'hemiIrradiance',
					type: 'select',
					select: [
						'0.0001 lx (Moonless Night)',
						'0.002 lx (Night Airglow)',
						'0.5 lx (Full Moon)',
						'3.4 lx (City Twilight)',
						'50 lx (Living Room)',
						'100 lx (Very Overcast)',
						'350 lx (Office Room)',
						'400 lx (Sunrise/Sunset)',
						'1000 lx (Overcast)',
						'18000 lx (Daylight)',
						'50000 lx (Direct Sun)',
					],
				},
				{
					name: 'bulbPower',
					type: 'select',
					select: [
						'110000 lm (1000W)',
						'3500 lm (300W)',
						'1700 lm (100W)',
						'800 lm (60W)',
						'400 lm (40W)',
						'180 lm (25W)',
						'20 lm (4W)',
						'Off',
					],
					change: () => {
						if (this.bulbLight !== null) {
							this.bulbLight.power =
								this.bulbLuminousPowers[this.controls.bulbPower];
						}
					},
				},
				{
					name: 'exposure',
					type: 'number',
					min: 0,
					max: 1,
					change: () => {
						if (this.renderer !== null) {
							(this.renderer.getRenderer() as any).toneMappingExposure =
								Math.pow(this.controls.exposure, 5.0);
							// to allow for very bright scenes.
						}
					},
				},
				{
					name: 'shadows',
					type: 'checkbox',
					change: () => {
						if (this.bulbLight !== null) {
							this.bulbLight.castShadow = this.controls.shadows;
						}
					},
				},
			]
		);
	}

	bulbLuminousPowers = {
		'110000 lm (1000W)': 110000,
		'3500 lm (300W)': 3500,
		'1700 lm (100W)': 1700,
		'800 lm (60W)': 800,
		'400 lm (40W)': 400,
		'180 lm (25W)': 180,
		'20 lm (4W)': 20,
		Off: 0,
	};

	hemiLuminousIrradiances = {
		'0.0001 lx (Moonless Night)': 0.0001,
		'0.002 lx (Night Airglow)': 0.002,
		'0.5 lx (Full Moon)': 0.5,
		'3.4 lx (City Twilight)': 3.4,
		'50 lx (Living Room)': 50,
		'100 lx (Very Overcast)': 100,
		'350 lx (Office Room)': 350,
		'400 lx (Sunrise/Sunset)': 400,
		'1000 lx (Overcast)': 1000,
		'18000 lx (Daylight)': 18000,
		'50000 lx (Direct Sun)': 50000,
	};

	setRender(renderer: NgxRendererComponent) {
		super.setRender(renderer);
		const render = renderer.getRenderer() as any;
		render.physicallyCorrectLights = true;
		render.outputEncoding = THREE.sRGBEncoding;
		render.shadowMap.enabled = true;
		render.toneMapping = THREE.ReinhardToneMapping;
	}

	bulbLight: any = null;

	setBulbLight(light: NgxMeshComponent) {
		this.bulbLight = light.getObject3d();
	}

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.bulbLight !== null) {
			const time = Date.now() * 0.0005;
			this.bulbLight.position.y = Math.cos(time) * 0.75 + 1.25;
		}
	}
}
