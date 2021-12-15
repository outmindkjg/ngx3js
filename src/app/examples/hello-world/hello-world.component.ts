import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-hello-world',
	templateUrl: './hello-world.component.html',
	styleUrls: ['./hello-world.component.scss'],
})
export class HelloWorldComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], true, false);
	}
}
