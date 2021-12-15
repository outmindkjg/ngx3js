import { Component } from '@angular/core';
import { NgxBaseComponent, NgxThreeUtil } from 'ngx3js';

@Component({
	selector: 'app-webgl-panorama-cube',
	templateUrl: './webgl-panorama-cube.component.html',
	styleUrls: ['./webgl-panorama-cube.component.scss'],
})
export class WebglPanoramaCubeComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		const imageObj = new Image();
		let canvas, context;
		imageObj.onload = () => {
			const tileWidth = imageObj.height;
			this.canvasList = [];
			for (let i = 0; i < 6; i++) {
				canvas = document.createElement('canvas');
				context = canvas.getContext('2d');
				canvas.height = tileWidth;
				canvas.width = tileWidth;
				context.drawImage(
					imageObj,
					tileWidth * i,
					0,
					tileWidth,
					tileWidth,
					0,
					0,
					tileWidth,
					tileWidth
				);
				this.canvasList.push(canvas);
			}
		};
		imageObj.src = NgxThreeUtil.getStoreUrl('textures/cube/sun_temple_stripe.jpg');
	}

	canvasList: any[] = [];
}
