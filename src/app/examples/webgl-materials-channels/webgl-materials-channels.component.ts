import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-channels',
	templateUrl: './webgl-materials-channels.component.html',
	styleUrls: ['./webgl-materials-channels.component.scss'],
})
export class WebglMaterialsChannelsComponent extends BaseComponent<{
	material: string;
	camera: string;
	side: string;
}> {
	constructor() {
		super(
			{
				material: 'normal',
				camera: 'perspective',
				side: 'double',
			},
			[
				{
					name: 'material',
					type: 'select',
					select: ['standard', 'normal', 'depthBasic', 'depthRGBA'],
				},
				{ name: 'camera', type: 'select', select: ['perspective', 'ortho'] },
				{ name: 'side', type: 'select', select: ['front', 'back', 'double'] },
			]
		);
	}
}
