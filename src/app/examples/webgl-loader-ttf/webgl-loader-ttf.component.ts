import { Component } from '@angular/core';
import { NgxBaseComponent, IRendererEvent } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-ttf',
	templateUrl: './webgl-loader-ttf.component.html',
	styleUrls: ['./webgl-loader-ttf.component.scss'],
})
export class WebglLoaderTtfComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	setKeyDown(event: IRendererEvent) {
		switch (event.type) {
			case 'keydown':
				{
					const keyCode = event.event.keyCode;
					if (keyCode === 8) {
						event.event.preventDefault();
						this.text = this.text.substring(0, this.text.length - 1);
					}
				}
				break;
			case 'keypress':
				{
					const keyCode = event.event.which;
					if (keyCode === 8) {
						event.event.preventDefault();
					} else {
						const ch = String.fromCharCode(keyCode);
						this.text += ch;
					}
				}
				break;
		}
	}

	text = 'three.js';
}
