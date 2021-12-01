import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

@Component({
	selector: 'app-hello-world',
	templateUrl: './hello-world.component.html',
	styleUrls: ['./hello-world.component.scss'],
})
export class HelloWorldComponent extends BaseComponent<{}> {
	constructor() {
		super({}, [], true, false);
	}
}
