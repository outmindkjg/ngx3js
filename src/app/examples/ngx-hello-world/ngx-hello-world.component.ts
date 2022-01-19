import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-ngx-hello-world',
	templateUrl: './ngx-hello-world.component.html',
	styleUrls: ['./ngx-hello-world.component.scss'],
})
export class NgxHelloWorldComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], true, false);
	}
}
