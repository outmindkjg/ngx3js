import { Component } from '@angular/core';
import {
	I3JS,
	NgxBaseComponent,
	NgxRendererComponent,
	NgxSceneComponent,
	NgxThreeUtil,
	THREE,
} from 'ngx3js';

@Component({
	selector: 'app-webgl-lightprobe-cubecamera',
	templateUrl: './webgl-lightprobe-cubecamera.component.html',
	styleUrls: ['./webgl-lightprobe-cubecamera.component.scss'],
})
export class WebglLightprobeCubecameraComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
	private cubeTexture: I3JS.CubeTexture = null;
	ngOnInit(): void {
		const cubeLoader: I3JS.CubeTextureLoader = NgxThreeUtil.getLoader(
			'',
			THREE.CubeTextureLoader
		);
		this.cubeTexture = cubeLoader.load(
			this.genCubeUrls('textures/cube/pisa/', '.png'),
			(cubeTexture) => {
				cubeTexture.encoding = THREE.sRGBEncoding;
			}
		);
		this.cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256);
		this.cubeCamera = new THREE.CubeCamera(1, 1000, this.cubeRenderTarget);
		this.lightProbe = new THREE.LightProbe();
	}

	genCubeUrls(prefix, postfix) {
		return [
			NgxThreeUtil.getStoreUrl(prefix + 'px' + postfix),
			NgxThreeUtil.getStoreUrl(prefix + 'nx' + postfix),
			NgxThreeUtil.getStoreUrl(prefix + 'py' + postfix),
			NgxThreeUtil.getStoreUrl(prefix + 'ny' + postfix),
			NgxThreeUtil.getStoreUrl(prefix + 'pz' + postfix),
			NgxThreeUtil.getStoreUrl(prefix + 'nz' + postfix),
		];
	}

	setRender(renderer: NgxRendererComponent): void {
		super.setRender(renderer);
		if (this.lightProbe) {
			this.getTimeout(500).then(() => {
				this.cubeCamera.update(
					this.renderer.renderer as any,
					this.sceneObject3d
				);
				this.lightProbe.copy(
					THREE.LightProbeGenerator.fromCubeRenderTarget(
						this.renderer.renderer as any,
						this.cubeRenderTarget
					)
				);
				this.sceneObject3d.add(this.lightProbe);
				this.sceneObject3d.add(new THREE.LightProbeHelper(this.lightProbe, 5));
			});
		}
	}

	setScene(scene: NgxSceneComponent): void {
		super.setScene(scene);
		this.sceneObject3d.background = this.cubeTexture;
	}

	cubeRenderTarget: I3JS.WebGLCubeRenderTarget = null;
	cubeCamera: I3JS.CubeCamera = null;
	lightProbe: I3JS.LightProbe = null;
}
