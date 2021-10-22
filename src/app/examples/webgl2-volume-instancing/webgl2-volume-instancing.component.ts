import { Component } from '@angular/core';
import { BaseComponent, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl2-volume-instancing',
	templateUrl: './webgl2-volume-instancing.component.html',
	styleUrls: ['./webgl2-volume-instancing.component.scss'],
})
export class Webgl2VolumeInstancingComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
	}
}
