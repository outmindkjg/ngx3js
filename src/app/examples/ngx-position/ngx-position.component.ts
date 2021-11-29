import { Component } from '@angular/core';
import { BaseComponent, RendererTimer } from 'ngx3js';

@Component({
	selector: 'app-ngx-position',
	templateUrl: './ngx-position.component.html',
	styleUrls: ['./ngx-position.component.scss'],
})
export class NgxPositionComponent extends BaseComponent<{
	position : {
		x : number;
		y : number;
		z : number;
	}
}> {
	constructor() {
		super(
			{
				position : {
					x  : 0,
					y  : 0,
					z  : 0,
				},
		},
			[
				{
					name: 'position',
					type: 'folder',
					control: 'position',
					children: [
						{ name: 'x', type: 'number', min : -2, max : 2, step : 0.1 },
						{ name: 'y', type: 'number', min : -2, max : 2, step : 0.1 },
						{ name: 'z', type: 'number', min : -2, max : 2, step : 0.1 },
					],
				}			
			],
			true,
			false
		);
	}

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.meshObject3d !== null) {
			const elapsedTime = timer.elapsedTime;
			this.meshObject3d.rotation.y = elapsedTime / 5;
		}
	}
}
