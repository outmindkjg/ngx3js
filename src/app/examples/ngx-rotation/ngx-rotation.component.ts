import { Component } from '@angular/core';
import { BaseComponent, RendererTimer } from 'ngx3js';

@Component({
	selector: 'app-ngx-rotation',
	templateUrl: './ngx-rotation.component.html',
	styleUrls: ['./ngx-rotation.component.scss'],
})
export class NgxRotationComponent extends BaseComponent<{
	rotation : {
		x : number;
		y : number;
		z : number;
	}
}> {
	constructor() {
		super(
			{
				rotation : {
					x  : 0,
					y  : 0,
					z  : 0,
				},
		},
			[
				{
					name: 'rotation',
					type: 'folder',
					control: 'rotation',
					children: [
						{ name: 'x', type: 'number', min : -180, max : 180, step : 1 },
						{ name: 'y', type: 'number', min : -180, max : 180, step : 1 },
						{ name: 'z', type: 'number', min : -180, max : 180, step : 1 },
					],
				}			
			],
			true,
			false
		);
	}

}
