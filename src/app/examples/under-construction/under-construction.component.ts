import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-under-construction',
	templateUrl: './under-construction.component.html',
	styleUrls: ['./under-construction.component.scss'],
})
export class UnderConstructionComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
