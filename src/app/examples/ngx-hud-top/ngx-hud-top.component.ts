import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

@Component({
	selector: 'app-ngx-hud-top',
	templateUrl: './ngx-hud-top.component.html',
	styleUrls: ['./ngx-hud-top.component.scss'],
})
export class NgxHudTopComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
