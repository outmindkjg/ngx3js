import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-misc-legacy',
	templateUrl: './misc-legacy.component.html',
	styleUrls: ['./misc-legacy.component.scss'],
})
export class MiscLegacyComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
