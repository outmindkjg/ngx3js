import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-misc-animation-keys',
	templateUrl: './misc-animation-keys.component.html',
	styleUrls: ['./misc-animation-keys.component.scss'],
})
export class MiscAnimationKeysComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
