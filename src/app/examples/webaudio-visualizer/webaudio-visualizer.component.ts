import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webaudio-visualizer',
	templateUrl: './webaudio-visualizer.component.html',
	styleUrls: ['./webaudio-visualizer.component.scss'],
})
export class WebaudioVisualizerComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
