import { Component } from '@angular/core';
import { NgxBaseComponent, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-video-kinect',
	templateUrl: './webgl-video-kinect.component.html',
	styleUrls: ['./webgl-video-kinect.component.scss'],
})
export class WebglVideoKinectComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		const width = 640,
			height = 480;
		this.vertices = [];
		for (let i = 0, j = 0, l = width * height * 3; i < l; i += 3, j++) {
			this.vertices.push(j % width);
			this.vertices.push(Math.floor(j / width));
			this.vertices.push(0);
		}
	}

	vertices: number[] = [];

	uniforms = {
		map: { type: 'video', value: 'textures/kinect.mp4', options: 'nearest' },
	};

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
	}
}
