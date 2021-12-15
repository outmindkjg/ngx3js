import { Component } from '@angular/core';
import { NgxBaseComponent, NgxRendererComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-texture-anisotropy',
	templateUrl: './webgl-materials-texture-anisotropy.component.html',
	styleUrls: ['./webgl-materials-texture-anisotropy.component.scss'],
})
export class WebglMaterialsTextureAnisotropyComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	setRender(render: NgxRendererComponent) {
		super.setRender(render);
		setTimeout(() => {
			this.anisotropy = (
				render.getRenderer() as any 
			).capabilities.getMaxAnisotropy();
		}, 1000);
	}
	anisotropy: number = 1;
}
