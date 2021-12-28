import { Component } from '@angular/core';
import {
	GeometryUtils, I3JS, NgxBaseComponent, NgxTextureComponent, IRendererTimer, THREE
} from 'ngx3js';

@Component({
	selector: 'app-webgl-framebuffer-texture',
	templateUrl: './webgl-framebuffer-texture.component.html',
	styleUrls: ['./webgl-framebuffer-texture.component.scss'],
})
export class WebglFramebufferTextureComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	loadGeometry(geometry: I3JS.BufferGeometry) {
		const points = GeometryUtils.gosper(8);
		const positionAttribute = new THREE.Float32BufferAttribute(points, 3);
		geometry.setAttribute('position', positionAttribute);
		geometry.center();
		const colorAttribute = new THREE.BufferAttribute(
			new Float32Array(positionAttribute.array.length),
			3
		);
		colorAttribute.setUsage(THREE.DynamicDrawUsage);
		geometry.setAttribute('color', colorAttribute);
	}

	ngOnInit() {
		this.dpr = window.devicePixelRatio;
		this.textureSize = 128 * this.dpr;
		this.vector = new THREE.Vector2();
		this.color = new THREE.Color();
	}

	setTexture(texture: NgxTextureComponent) {
		this.texture = texture.getTexture() ;
	}

	texture: I3JS.FramebufferTexture = null;

	offset = 0;
	dpr = 0;

	textureSize = 0;
	vector: I3JS.Vector2 = null;
	color: I3JS.Color = null;

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

	onBeforeRenderOrthographicCamera(timer: IRendererTimer) {
		if (
			this.texture !== null &&
			timer.renderer instanceof THREE.WebGLRenderer
		) {
			this.vector.x = (timer.event.width * this.dpr) / 2 - this.textureSize / 2;
			this.vector.y =
				(timer.event.height * this.dpr) / 2 - this.textureSize / 2;
			(timer.renderer as any).copyFramebufferToTexture(this.vector, this.texture);
			(timer.renderer as any).clearDepth();
		}
	}

	varctor: I3JS.Vector2 = new THREE.Vector2();
	onRender(timer: IRendererTimer) {
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
