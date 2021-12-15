import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webaudio-visualizer',
	templateUrl: './webaudio-visualizer.component.html',
	styleUrls: ['./webaudio-visualizer.component.scss'],
})
export class WebaudioVisualizerComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
