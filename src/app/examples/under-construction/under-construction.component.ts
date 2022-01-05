import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-under-construction',
	templateUrl: './under-construction.component.html',
	styleUrls: ['./under-construction.component.scss'],
})
export class UnderConstructionComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
