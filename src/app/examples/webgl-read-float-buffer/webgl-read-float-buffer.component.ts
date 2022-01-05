import { Component, ElementRef, ViewChild } from '@angular/core';
import {
	I3JS, NgxBaseComponent, NgxMaterialComponent, IRendererInfo,
	IRendererTimer, THREE
} from 'ngx3js';

@Component({
	selector: 'app-webgl-read-float-buffer',
	templateUrl: './webgl-read-float-buffer.component.html',
	styleUrls: ['./webgl-read-float-buffer.component.scss'],
})
export class WebglReadFloatBufferComponent extends NgxBaseComponent<{}> {
	/**
	 * View child of renderer component
	 */
	@ViewChild('rgbInfo') private rgbInfo: ElementRef = null;

	constructor() {
		super({}, [], false, false);
	}

	ngOnInit() {
		this.afterRender = (renderInfo: IRendererInfo) => {
			const read = new Float32Array(4);
			const renderer = renderInfo.renderer as any;
			const rtTexture = this.rtTexture;
			renderer.setRenderTarget(rtTexture);
			renderer.clear();
			const sceneRTT = renderInfo.scenes[0];
			const cameraRTT = renderInfo.cameras[0];
			renderer.render(sceneRTT, cameraRTT);
			renderer.setRenderTarget(null);
			const valueNode = this.rgbInfo.nativeElement;
			const mouse = renderInfo.timer.event.mouse;

			renderer.readRenderTargetPixels(
				rtTexture,
				(rtTexture.width * (1 + mouse.x)) / 2,
				(rtTexture.height * (1 + mouse.y)) / 2,
				1,
				1,
				read
			);
			valueNode.innerHTML =
				'r:' + read[0] + '<br/>g:' + read[1] + '<br/>b:' + read[2];
		};
	}

	rtTexture = new THREE.WebGLRenderTarget(
		window.innerWidth,
		window.innerHeight,
		{
			minFilter: THREE.LinearFilter,
			magFilter: THREE.NearestFilter,
			format: THREE.RGBAFormat,
			type: THREE.FloatType,
		}
	);

	texture: I3JS.DataTexture = new THREE.DataTexture(null, 100, 100);

	afterRender: (renderInfo: IRendererInfo) => void;

	setMaterial(material: NgxMaterialComponent) {
		this.material = material.getMaterial() ;
	}

	material: I3JS.ShaderMaterial = null;
	delta = 0.01;
	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.mesh !== null) {
			const time = timer.elapsedTime * 1.5;
			const mesh = this.mesh.getObject3d();
			mesh.rotation.y = -time;
			if (this.material !== null) {
				if (
					this.material.uniforms['time'].value > 1 ||
					this.material.uniforms['time'].value < 0
				) {
					this.delta *= -1;
				}
				this.material.uniforms['time'].value += this.delta;
			}
		}
	}
}
