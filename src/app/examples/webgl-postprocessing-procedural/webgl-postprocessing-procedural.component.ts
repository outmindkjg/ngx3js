import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-postprocessing-procedural',
	templateUrl: './webgl-postprocessing-procedural.component.html',
	styleUrls: ['./webgl-postprocessing-procedural.component.scss'],
})
export class WebglPostprocessingProceduralComponent extends NgxBaseComponent<{
	procedure: string;
}> {
	constructor() {
		super(
			{
				procedure: 'noiseRandom3D',
			},
			[
				{
					name: 'procedure',
					type: 'select',
					select: ['noiseRandom1D', 'noiseRandom2D', 'noiseRandom3D'],
				},
			]
		);
	}
}
