import { Component } from '@angular/core';
import { IRendererInfo, NgxBaseComponent, I3JS, Vector2, NgxRendererComponent, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-postprocessing-fxaa',
	templateUrl: './webgl-postprocessing-fxaa.component.html',
	styleUrls: ['./webgl-postprocessing-fxaa.component.scss'],
})
export class WebglPostprocessingFxaaComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	beforeRender : (info: IRendererInfo) => boolean = null;

	setRender(renderer: NgxRendererComponent): void {
		super.setRender(renderer);
		this.subscribeRefer('renderSize',this.renderer.sizeSubscribe().subscribe(size => {
			this.size = size;
		}));
		this.composer1 = new THREE.EffectComposer(renderer.renderer as any);
		const renderInfo = renderer.getRenderInfo();
		const scene = renderInfo.scenes[0];
		const camera = renderInfo.cameras[0];
		const renderPass = new THREE.RenderPass( scene, camera );
		const copyPass = new THREE.ShaderPass( THREE.CopyShader );
		this.composer1.addPass(renderPass)
		this.composer1.addPass(copyPass)
		this.composer2 = new THREE.EffectComposer(renderer.renderer as any);
		const fxaaPass = new THREE.ShaderPass( THREE.FXAAShader );
		const pixelRatio = (renderInfo.renderer as any).getPixelRatio();
		fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( renderInfo.innerWidth * pixelRatio );
		fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( renderInfo.innerHeight * pixelRatio );

		this.composer2.addPass(renderPass)
		this.composer2.addPass(fxaaPass)
	}

	size : Vector2 = new Vector2(1024,1024);
	composer1 : I3JS.EffectComposer = null;
	composer2 : I3JS.EffectComposer = null;
	ngOnInit() {
		
		this.beforeRender = (info: IRendererInfo) => {
			if (this.composer1 !== null && this.composer2 !== null) {
				const renderer : I3JS.WebGLRenderer = info.renderer as any;
				renderer.setScissorTest( true );
				const halfWidth = this.size.x / 2;
				const offsetHeight = this.size.y;
				renderer.setScissor( 0, 0, halfWidth - 1, offsetHeight );
				this.composer1.render();
				renderer.setScissor( halfWidth, 0, halfWidth, offsetHeight );
				this.composer2.render();
				renderer.setScissorTest( false );
				return true;
			} else {
				return false;
			}
		}

		this.meshInfos = [];
		for (let i = 0; i < 100; i++) {
			this.meshInfos.push({
				position: {
					x: Math.random() * 500 - 250,
					y: Math.random() * 500 - 250,
					z: Math.random() * 500 - 250,
				},
				rotation: {
					x: Math.random() * 180,
					y: Math.random() * 180,
					z: Math.random() * 180,
				},
				scale: Math.random() * 2 + 1,
			});
		}
	}
	meshInfos: {
		position: { x: number; y: number; z: number };
		rotation: { x: number; y: number; z: number };
		scale: number;
	}[] = [];
}
