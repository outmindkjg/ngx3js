import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

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
