import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

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
}
