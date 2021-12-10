import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-mmd-audio',
	templateUrl: './webgl-loader-mmd-audio.component.html',
	styleUrls: ['./webgl-loader-mmd-audio.component.scss'],
})
export class WebglLoaderMmdAudioComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
