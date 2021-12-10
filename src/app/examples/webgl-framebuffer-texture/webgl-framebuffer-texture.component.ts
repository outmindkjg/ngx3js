import { Component } from '@angular/core';
import {
	BaseComponent,
	GeometryUtils, I3JS, N3js, RendererTimer,
	TextureComponent
} from 'ngx3js';

@Component({
	selector: 'app-webgl-framebuffer-texture',
	templateUrl: './webgl-framebuffer-texture.component.html',
	styleUrls: ['./webgl-framebuffer-texture.component.scss'],
})
export class WebglFramebufferTextureComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	loadGeometry(geometry: I3JS.IBufferGeometry) {
		const points = GeometryUtils.gosper(8);
		const positionAttribute = N3js.getFloat32BufferAttribute(points, 3);
		geometry.setAttribute('position', positionAttribute);
		geometry.center();
		const colorAttribute = N3js.getBufferAttribute(
			new Float32Array(positionAttribute.array.length),
			3
		);
		colorAttribute.setUsage(I3JS.DynamicDrawUsage);
		geometry.setAttribute('color', colorAttribute);
	}

	ngOnInit() {
		this.dpr = window.devicePixelRatio;
		this.textureSize = 128 * this.dpr;
		this.vector = N3js.getVector2();
		this.color = N3js.getColor();
		this.spriteData = new Uint8Array(this.textureSize * this.textureSize * 3);
	}

	setTexture(texture: TextureComponent) {
		this.texture = texture.getTexture() ;
	}

	texture: I3JS.IDataTexture = null;

	spriteData: Uint8Array = null;

	offset = 0;
	dpr = 0;

	textureSize = 0;
	vector: I3JS.IVector2 = null;
	color: I3JS.IColor = null;

	updateColors(colorAttribute) {
		const l = colorAttribute.count;
		for (let i = 0; i < l; i++) {
			const h = ((this.offset + i) % l) / l;
			this.color.setHSL(h, 1, 0.5);
			colorAttribute.setX(i, this.color.r);
			colorAttribute.setY(i, this.color.g);
			colorAttribute.setZ(i, this.color.b);
		}
		colorAttribute.needsUpdate = true;
		this.offset -= 25;
	}

	onBeforeRenderOrthographicCamera(timer: RendererTimer) {
		if (
			this.texture !== null &&
			timer.renderer instanceof N3js.WebGLRenderer
		) {
			this.vector.x = (timer.event.width * this.dpr) / 2 - this.textureSize / 2;
			this.vector.y =
				(timer.event.height * this.dpr) / 2 - this.textureSize / 2;
			(timer.renderer as any).copyFramebufferToTexture(this.vector, this.texture);
			(timer.renderer as any).clearDepth();
		}
	}

	varctor: I3JS.IVector2 = N3js.getVector2();
	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.mesh !== null) {
			const mesh = this.mesh.getObject3d() as any;
			if (mesh.geometry) {
				const geometry = mesh.geometry;
				const colorAttribute = geometry.getAttribute('color');
				this.updateColors(colorAttribute);
			}
		}
	}
}
