import { Component } from '@angular/core';
import { BaseComponent, RendererTimer } from 'ngx3js';

@Component({
	selector: 'app-ngx-geometry',
	templateUrl: './ngx-geometry.component.html',
	styleUrls: ['./ngx-geometry.component.scss'],
})
export class NgxGeometryComponent extends BaseComponent<{
	color: number;
}> {
	constructor() {
		super(
			{
				color: 0x999999,
			},
			[{ name: 'color', type: 'color' }]
		, true, false);
	}

	onRender(timer : RendererTimer) {
		super.onRender(timer);
		if (this.meshObject3d !== null) {
			const elapsedTime = timer.elapsedTime;
			this.meshObject3d.rotation.y = elapsedTime / 5;
		}
	}

}
