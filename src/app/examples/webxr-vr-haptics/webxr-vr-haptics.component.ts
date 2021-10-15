import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webxr-vr-haptics',
	templateUrl: './webxr-vr-haptics.component.html',
	styleUrls: ['./webxr-vr-haptics.component.scss'],
})
export class WebxrVrHapticsComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		this.boxInfos = [];
		const w = 0.1;
		const h = 0.1;
		const minH = 1;
		for (let i = 0; i < 10; i++) {
			this.boxInfos.push({
				position: { x: (i - 5) * (w + 0.05), y: 0, z: 0 },
				size: { width: w, height: h * i + minH, depth: w },
				color: 'rgb(' + ((i + 1) / 10) * 255 + ',25,25)',
			});
		}
	}
	boxInfos: {
		position: { x: number; y: number; z: number };
		size: { width: number; height: number; depth: number };
		color: string;
	}[] = [];
}
