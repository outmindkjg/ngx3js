import { Component } from '@angular/core';
import { NgxBaseComponent, NgxMeshComponent, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-lights-pointlights',
	templateUrl: './webgl-lights-pointlights.component.html',
	styleUrls: ['./webgl-lights-pointlights.component.scss'],
})
export class WebglLightsPointlightsComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	light1: any = null;
	setLight1(mesh: NgxMeshComponent) {
		this.light1 = mesh.getObject3d();
	}

	light2: any = null;
	setLight2(mesh: NgxMeshComponent) {
		this.light2 = mesh.getObject3d();
	}

	light3: any = null;
	setLight3(mesh: NgxMeshComponent) {
		this.light3 = mesh.getObject3d();
	}

	light4: any = null;
	setLight4(mesh: NgxMeshComponent) {
		this.light4 = mesh.getObject3d();
	}

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		const time = timer.elapsedTime;
		if (this.light1 !== null) {
			this.light1.position.x = Math.sin(time * 0.7) * 30;
			this.light1.position.y = Math.cos(time * 0.5) * 40;
			this.light1.position.z = Math.cos(time * 0.3) * 30;
		}
		if (this.light2 !== null) {
			this.light2.position.x = Math.sin(time * 0.3) * 30;
			this.light2.position.y = Math.cos(time * 0.5) * 40;
			this.light2.position.z = Math.cos(time * 0.7) * 30;
		}
		if (this.light3 !== null) {
			this.light3.position.x = Math.sin(time * 0.7) * 30;
			this.light3.position.y = Math.cos(time * 0.3) * 40;
			this.light3.position.z = Math.cos(time * 0.5) * 30;
		}
		if (this.light4 !== null) {
			this.light4.position.x = Math.sin(time * 0.3) * 30;
			this.light4.position.y = Math.cos(time * 0.7) * 40;
			this.light4.position.z = Math.cos(time * 0.5) * 30;
		}
	}
}
