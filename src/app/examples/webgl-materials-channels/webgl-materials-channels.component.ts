import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-channels',
	templateUrl: './webgl-materials-channels.component.html',
	styleUrls: ['./webgl-materials-channels.component.scss'],
})
export class WebglMaterialsChannelsComponent extends NgxBaseComponent<{
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
