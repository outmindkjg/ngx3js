import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webaudio-sandbox',
	templateUrl: './webaudio-sandbox.component.html',
	styleUrls: ['./webaudio-sandbox.component.scss'],
})
export class WebaudioSandboxComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
