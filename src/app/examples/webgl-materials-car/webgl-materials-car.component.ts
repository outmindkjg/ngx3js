import { Component } from '@angular/core';
import {
	NgxBaseComponent,
	NgxHelperComponent,
	NgxMeshComponent, NgxThreeUtil, IRendererTimer
} from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-car',
	templateUrl: './webgl-materials-car.component.html',
	styleUrls: ['./webgl-materials-car.component.scss'],
})
export class WebglMaterialsCarComponent extends NgxBaseComponent<{
	body: string;
	glass: string;
	detail: string;
}> {
	constructor() {
		super(
			{
				body: '#ff0000',
				glass: '#ffffff',
				detail: '#ffffff',
			},
			[
				{ name: 'body', type: 'color' },
				{ name: 'detail', type: 'color' },
				{ name: 'glass', type: 'color' },
			]
		);
	}

	setGridHelp(helper: NgxHelperComponent) {
		this.grid = helper.getHelper();
	}

	setMesh(mesh: NgxMeshComponent) {
		super.setMesh(mesh);
		const carModel = mesh.getObject3d();
		const body = carModel.getObjectByName('body');
		if (NgxThreeUtil.isNotNull(body)) {
			this.wheels = [
				carModel.getObjectByName('wheel_fl'),
				carModel.getObjectByName('wheel_fr'),
				carModel.getObjectByName('wheel_rl'),
				carModel.getObjectByName('wheel_rr'),
			];
		}
	}

	grid: any = null;
	wheels: any[] = null;

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		const time = -timer.elapsedTime;
		if (this.wheels !== null && this.wheels.length > 0) {
			this.wheels.forEach((wheel) => {
				wheel.rotation.x = time * Math.PI;
			});
			if (this.grid !== null) {
				this.grid.position.z = -time % 5;
			}
		}
	}
}
