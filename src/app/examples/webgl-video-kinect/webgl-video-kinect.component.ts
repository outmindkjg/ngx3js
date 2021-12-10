import { Component } from '@angular/core';
import { BaseComponent, RendererTimer  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-video-kinect',
	templateUrl: './webgl-video-kinect.component.html',
	styleUrls: ['./webgl-video-kinect.component.scss'],
})
export class WebglVideoKinectComponent extends BaseComponent<{}> {
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

	onRender(timer: RendererTimer) {
		super.onRender(timer);
	}
}
