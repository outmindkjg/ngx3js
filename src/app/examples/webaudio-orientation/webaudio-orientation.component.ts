import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webaudio-orientation',
	templateUrl: './webaudio-orientation.component.html',
	styleUrls: ['./webaudio-orientation.component.scss'],
})
export class WebaudioOrientationComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
