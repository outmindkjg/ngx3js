import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webaudio-sandbox',
	templateUrl: './webaudio-sandbox.component.html',
	styleUrls: ['./webaudio-sandbox.component.scss'],
})
export class WebaudioSandboxComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
