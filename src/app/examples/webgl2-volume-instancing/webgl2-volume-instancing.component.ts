import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl2-volume-instancing',
	templateUrl: './webgl2-volume-instancing.component.html',
	styleUrls: ['./webgl2-volume-instancing.component.scss'],
})
export class Webgl2VolumeInstancingComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	ngOnInit() {}
}
