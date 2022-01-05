import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-misc-controls-deviceorientation',
	templateUrl: './misc-controls-deviceorientation.component.html',
	styleUrls: ['./misc-controls-deviceorientation.component.scss'],
})
export class MiscControlsDeviceorientationComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
