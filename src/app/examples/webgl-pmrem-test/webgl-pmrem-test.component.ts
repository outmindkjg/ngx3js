import { Component } from '@angular/core';
import { I3JS, NgxBaseComponent, NgxLightComponent, IRendererEvent, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-pmrem-test',
	templateUrl: './webgl-pmrem-test.component.html',
	styleUrls: ['./webgl-pmrem-test.component.scss'],
})
export class WebglPmremTestComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	ngOnInit() {
		this.meshInfos = [];
		for (let x = 0; x <= 10; x++) {
			for (let y = 0; y <= 2; y++) {
				this.meshInfos.push({
					roughness: x / 10,
					metalness: y < 1 ? 1 : 0,
					color: y < 2 ? 0xffffff : 0x000000,
					x: x - 5,
					y: 1 - y,
				});
			}
		}
	}

	meshInfos: {
		color: number;
		roughness: number;
		metalness: number;
		x: number;
		y: number;
	}[] = [];

	setLight(light: NgxLightComponent) {
		this.directionalLight = light.getLight() ;
	}

	directionalLight: I3JS.DirectionalLight = null;

	mouseEvent(event: IRendererEvent) {
		if (this.meshObject3d !== null && this.directionalLight !== null) {
			switch (event.type) {
				case 'mouseover':
					this.meshObject3d.traverse((child : any) => {
						if (child instanceof THREE.Mesh) {
							(child.material as any).envMapIntensity = 1;
						}
					});
					this.directionalLight.intensity = 0;
					break;
				case 'mouseout':
					this.meshObject3d.traverse((child : any) => {
						if (child instanceof THREE.Mesh) {
							(child.material as any).envMapIntensity = 0;
						}
					});
					this.directionalLight.intensity = 1;
					break;
			}
		}
	}
}
