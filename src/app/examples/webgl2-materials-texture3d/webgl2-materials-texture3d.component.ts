import { Component } from '@angular/core';
import { BaseComponent, I3JS, SharedComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl2-materials-texture3d',
	templateUrl: './webgl2-materials-texture3d.component.html',
	styleUrls: ['./webgl2-materials-texture3d.component.scss'],
})
export class Webgl2MaterialsTexture3dComponent extends BaseComponent<{
	clim1: number;
	clim2: number;
	renderstyle: string;
	isothreshold: number;
	colormap: string;
}> {
	constructor() {
		super(
			{
				clim1: 0,
				clim2: 1,
				renderstyle: 'iso',
				isothreshold: 0.15,
				colormap: 'viridis',
			},
			[
				{
					name: 'clim1',
					type: 'number',
					min: 0,
					max: 1,
					step: 0.01,
					change: () => {
						this.updateUniforms();
					},
				},
				{
					name: 'clim2',
					type: 'number',
					min: 0,
					max: 1,
					step: 0.01,
					change: () => {
						this.updateUniforms();
					},
				},
				{
					name: 'colormap',
					type: 'select',
					select: ['gray', 'viridis'],
					change: () => {
						this.updateUniforms();
					},
				},
				{
					name: 'renderstyle',
					type: 'select',
					select: ['mip', 'iso'],
					change: () => {
						this.updateUniforms();
					},
				},
				{
					name: 'isothreshold',
					type: 'number',
					min: 0,
					max: 1,
					step: 0.01,
					change: () => {
						this.updateUniforms();
					},
				},
			]
		);
	}

	setColorMapTexture(shared: SharedComponent) {
		const textureComponents = shared.getTextureComponents();
		textureComponents.forEach((texture) => {
			switch (texture.name) {
				case 'gray':
					this.grayTexture = texture.getTexture();
					break;
				case 'viridis':
					this.viridisTexture = texture.getTexture();
					break;
			}
		});
	}

	viridisTexture: I3JS.ITexture = null;
	grayTexture: I3JS.ITexture = null;

	updateUniforms() {
		if (this.mesh !== null) {
			const material = (this.mesh.getObject3d() as any).material;
			if (material !== null && material !== undefined) {
				material.uniforms['u_clim'].value.set(
					this.controls.clim1,
					this.controls.clim2
				);
				material.uniforms['u_renderstyle'].value =
					this.controls.renderstyle == 'mip' ? 0 : 1; // 0: MIP, 1: ISO
				material.uniforms['u_renderthreshold'].value =
					this.controls.isothreshold; // For ISO renderstyle
				if (this.grayTexture !== null && this.viridisTexture !== null) {
					switch (this.controls.colormap) {
						case 'gray':
							material.uniforms['u_cmdata'].value = this.grayTexture;
							break;
						case 'viridis':
							material.uniforms['u_cmdata'].value = this.viridisTexture;
							break;
					}
				}
			}
		}
	}
}
