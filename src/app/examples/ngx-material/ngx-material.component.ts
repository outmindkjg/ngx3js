import { Component } from '@angular/core';
import { BaseComponent, RendererTimer } from 'ngx3js';

@Component({
	selector: 'app-ngx-material',
	templateUrl: './ngx-material.component.html',
	styleUrls: ['./ngx-material.component.scss'],
})
export class NgxMaterialComponent extends BaseComponent<{
	color: number;
}> {
	constructor() {
		super(
			{
				color: 0x999999,
			},
			[{ name: 'color', type: 'color' }]
		);
	}

	onRender(timer : RendererTimer) {
		super.onRender(timer);
		if (this.meshObject3d !== null) {
			const elapsedTime = timer.elapsedTime;
			this.meshObject3d.rotation.y = elapsedTime / 5;
		}
	}

}
