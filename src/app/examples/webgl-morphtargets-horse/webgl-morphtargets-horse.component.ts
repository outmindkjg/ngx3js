import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-morphtargets-horse',
	templateUrl: './webgl-morphtargets-horse.component.html',
	styleUrls: ['./webgl-morphtargets-horse.component.scss'],
})
export class WebglMorphtargetsHorseComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
