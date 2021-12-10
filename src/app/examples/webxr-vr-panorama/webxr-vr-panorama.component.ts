import { Component } from '@angular/core';
import { BaseComponent, N3js, ThreeUtil } from 'ngx3js';

@Component({
	selector: 'app-webxr-vr-panorama',
	templateUrl: './webxr-vr-panorama.component.html',
	styleUrls: ['./webxr-vr-panorama.component.scss'],
})
export class WebxrVrPanoramaComponent extends BaseComponent<{
	left: boolean;
	right: boolean;
}> {
	constructor() {
		super(
			{
				left: true,
				right: false,
			},
			[
				{
					name: 'left',
					type: 'checkbox',
					change: () => {
						this.checkLayers();
					},
				},
				{
					name: 'right',
					type: 'checkbox',
					change: () => {
						this.checkLayers();
					},
				},
			]
		);
	}

	layers: number[] = [1];

	checkLayers() {
		this.layers = [];
		if (this.controls.left) {
			this.layers.push(1);
		}
		if (this.controls.right) {
			this.layers.push(2);
		}
	}

	ngOnInit() {
		const loader = N3js.getImageLoader();
		const atlasImgUrl = ThreeUtil.getStoreUrl(
			'textures/cube/sun_temple_stripe_stereo.jpg'
		);
		loader.load(atlasImgUrl, (imageObj) => {
			this.canvasLeftInfos = [];
			this.canvasRightInfos = [];
			let canvas, context;
			const tileWidth = imageObj.height;
			for (let i = 0; i < 12; i++) {
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
				if (i >= 6) {
					this.canvasRightInfos.push(canvas);
				} else {
					this.canvasLeftInfos.push(canvas);
				}
			}
		});
	}

	canvasLeftInfos: HTMLCanvasElement[] = null;
	canvasRightInfos: HTMLCanvasElement[] = null;
}
