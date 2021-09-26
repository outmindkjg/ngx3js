import { Component } from '@angular/core';
import { BaseComponent, TextureComponent, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-texture-rotation',
	templateUrl: './webgl-materials-texture-rotation.component.html',
	styleUrls: ['./webgl-materials-texture-rotation.component.scss'],
})
export class WebglMaterialsTextureRotationComponent extends BaseComponent<{
	test: boolean;
	offsetX: number;
	offsetY: number;
	repeatX: number;
	repeatY: number;
	rotation: number; // positive is counter-clockwise
	centerX: number;
	centerY: number;
}> {
	constructor() {
		super(
			{
				test: false,
				offsetX: 0,
				offsetY: 0,
				repeatX: 0.25,
				repeatY: 0.25,
				rotation: 22.5, // positive is counter-clockwise
				centerX: 0.5,
				centerY: 0.5,
			},
			[
				{ name: 'test', title : 'change Material', type: 'checkbox' },
				{
					name: 'offsetX',
					title: 'offset.x',
					type: 'number',
					min: 0.0,
					max: 1.0,
					change: () => {
						this.updateUvTransform();
					},
				},
				{
					name: 'offsetY',
					title: 'offset.y',
					type: 'number',
					min: 0.0,
					max: 1.0,
					change: () => {
						this.updateUvTransform();
					},
				},
				{
					name: 'repeatX',
					title: 'repeat.x',
					type: 'number',
					min: 0.25,
					max: 2.0,
					change: () => {
						this.updateUvTransform();
					},
				},
				{
					name: 'repeatY',
					title: 'repeat.y',
					type: 'number',
					min: 0.25,
					max: 2.0,
					change: () => {
						this.updateUvTransform();
					},
				},
				{
					name: 'rotation',
					title: 'rotation',
					type: 'number',
					min: -180,
					max: 180,
					change: () => {
						this.updateUvTransform();
					},
				},
				{
					name: 'centerX',
					title: 'center.x',
					type: 'number',
					min: 0.0,
					max: 1.0,
					change: () => {
						this.updateUvTransform();
					},
				},
				{
					name: 'centerY',
					title: 'center.y',
					type: 'number',
					min: 0.0,
					max: 1.0,
					change: () => {
						this.updateUvTransform();
					},
				},
			]
		);
	}

	updateUvTransform() {}

	setTexture(texture: TextureComponent) {
		this.texture = texture.getTexture();
	}

	texture: THREE.Texture = null;
}
