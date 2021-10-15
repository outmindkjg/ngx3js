import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

@Component({
	selector: 'app-misc-animation-keys',
	templateUrl: './misc-animation-keys.component.html',
	styleUrls: ['./misc-animation-keys.component.scss'],
})
export class MiscAnimationKeysComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
