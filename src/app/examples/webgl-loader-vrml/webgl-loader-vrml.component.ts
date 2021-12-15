import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-vrml',
	templateUrl: './webgl-loader-vrml.component.html',
	styleUrls: ['./webgl-loader-vrml.component.scss'],
})
export class WebglLoaderVrmlComponent extends NgxBaseComponent<{
	asset: string;
}> {
	constructor() {
		super(
			{
				asset: 'models/vrml/house.wrl',
			},
			[
				{
					name: 'asset',
					type: 'select',
					select: {
						creaseAngle: 'models/vrml/creaseAngle.wrl',
						crystal: 'models/vrml/crystal.wrl',
						house: 'models/vrml/house.wrl',
						elevationGrid1: 'models/vrml/elevationGrid1.wrl',
						elevationGrid2: 'models/vrml/elevationGrid2.wrl',
						extrusion1: 'models/vrml/extrusion1.wrl',
						extrusion2: 'models/vrml/extrusion2.wrl',
						extrusion3: 'models/vrml/extrusion3.wrl',
						lines: 'models/vrml/lines.wrl',
						meshWithLines: 'models/vrml/meshWithLines.wrl',
						meshWithTexture: 'models/vrml/meshWithTexture.wrl',
						pixelTexture: 'models/vrml/pixelTexture.wrl',
						points: 'models/vrml/points.wrl',
					},
				},
			]
		);
	}
}
