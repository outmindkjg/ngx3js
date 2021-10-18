import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

@Component({
	selector: 'app-ngx-material',
	templateUrl: './ngx-material.component.html',
	styleUrls: ['./ngx-material.component.scss'],
})
export class NgxMaterialComponent extends BaseComponent<{
	depthRate: number;
}> {
	constructor() {
		super(
			{
				depthRate: 0.5,
			},
			[{ name: 'depthRate', type: 'number', min: 0, max: 1.5 }]
		);
	}
}
