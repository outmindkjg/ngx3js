import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webaudio-orientation',
	templateUrl: './webaudio-orientation.component.html',
	styleUrls: ['./webaudio-orientation.component.scss'],
})
export class WebaudioOrientationComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
