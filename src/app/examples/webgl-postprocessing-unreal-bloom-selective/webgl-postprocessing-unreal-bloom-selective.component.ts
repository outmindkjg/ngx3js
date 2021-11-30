import { Component } from '@angular/core';
import { BaseComponent, EffectComponent, PassComponent, RendererEvent, RendererInfo, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-postprocessing-unreal-bloom-selective',
	templateUrl: './webgl-postprocessing-unreal-bloom-selective.component.html',
	styleUrls: ['./webgl-postprocessing-unreal-bloom-selective.component.scss'],
})
export class WebglPostprocessingUnrealBloomSelectiveComponent extends BaseComponent<{
	exposure: number;
	bloomStrength: number;
	bloomThreshold: number;
	bloomRadius: number;
	scene: string;
}> {
	constructor() {
		super(
			{
				exposure: 1,
				bloomStrength: 5,
				bloomThreshold: 0,
				bloomRadius: 0,
				scene: 'Scene with Glow',
			},
			[
				{
					name: 'scene',
					type: 'select',
					select: ['Scene with Glow', 'Glow only', 'Scene only'],
					change : () => {
						if (this.bloomEffect !== null) {
							switch ( this.controls.scene ) 	{
								case 'Scene with Glow':
									this.bloomEffect.renderToScreen = false;
									break;
								case 'Glow only':
									this.bloomEffect.renderToScreen = true;
									break;
								case 'Scene only':
									// nothing to do
									break;
			
							}
						}
					}
				},
				{ name: 'exposure', type: 'number', min: 0.1, max: 2 , change : () => {
					if (this.renderer !== null) {
						const renderer = this.renderer.getRenderer() as THREE.WebGL1Renderer;
						renderer.toneMappingExposure = Math.pow( this.controls.exposure, 4.0 );
					}
				}},
				{ name: 'bloomThreshold', type: 'number', min: 0.0, max: 1.0, change : () => {
					if (this.bloomPass !== null) {
						this.bloomPass.threshold = this.controls.bloomThreshold;
					}
				} },
				{ name: 'bloomStrength', type: 'number', min: 0.0, max: 10.0, change : () => {
					if (this.bloomPass !== null) {
						this.bloomPass.strength = this.controls.bloomStrength;
					}
				}  },
				{ name: 'bloomRadius', type: 'number', min: 0.0, max: 1.0, step: 0.01 , change : () => {
					if (this.bloomPass !== null) {
						this.bloomPass.radius = this.controls.bloomRadius;
					}
				} },
			]
		);
	}

	ngOnInit() {
		this.meshInfos = [];
		for (let i = 0; i < 50; i++) {
			this.meshInfos.push({
				color:
					'hsl(' + Math.random() + ',0.7,' + (Math.random() * 0.2 + 0.05) + ')',
				x: Math.random() * 10 - 5,
				y: Math.random() * 10 - 5,
				z: Math.random() * 10 - 5,
				multiply: Math.random() * 4.0 + 2.0,
				scale: Math.random() * Math.random() + 0.5,
				layer: Math.random() < 0.25 ? [1] : null,
			});
		}
		this.bloomLayer = new THREE.Layers();
		this.bloomLayer.set(1);
	}

	meshInfos: {
		color: string;
		x: number;
		y: number;
		z: number;
		multiply: number;
		scale: number;
		layer?: number[];
	}[] = [];

	onPointerDown(event: RendererEvent) {
		if (this.camera !== null) {
			const intersect = this.camera.getIntersection(
				event.mouse,
				this.meshChildren
			);
			if (intersect !== null && intersect.object !== null) {
				intersect.object.layers.toggle(1);
			}
		}
	}

	setBloomPass(pass : PassComponent) {
		this.bloomPass = pass.getPass();
		this.bloomPass.threshold = this.controls.bloomThreshold;
		this.bloomPass.strength = this.controls.bloomStrength;
		this.bloomPass.radius = this.controls.bloomRadius;
	}

	bloomPass : any = null;
	bloomLayer : THREE.Layers = null;
	darkMaterial = new THREE.MeshBasicMaterial( { color: "black" } );
	beforeRender = (renderInfo : RendererInfo) : boolean => {
		if (this.finalEffect !== null && this.bloomEffect !== null && this.sceneObject3d !== null) {
			switch(this.controls.scene) {
				case 'Scene with Glow' :
					const darkMaterial = this.darkMaterial;
					const materials : {[ key : string] : any } = {}
					this.sceneObject3d.traverse( ( obj: any ) => {
						if ( obj.isMesh && this.bloomLayer.test( obj.layers ) === false ) {
							materials[ obj.uuid ] = obj.material;
							obj.material = darkMaterial;
						}
					} );
					this.bloomEffect.render();
					this.sceneObject3d.traverse( ( obj: any ) => {
						if ( materials[ obj.uuid ] ) {
							obj.material = materials[ obj.uuid ];
						}
					});
					this.finalEffect.render();
					break;
				case 'Glow only' :
					if (this.camera !== null) {
						const camera : any = this.camera.getCamera();
						camera.layers.set( 1 );
						this.bloomEffect.render();
						camera.layers.set( 0 );
					}
					break;
				case 'Scene only' :
					if (this.camera !== null && this.scene !== null) {
						const camera : any = this.camera.getCamera();
						renderInfo.renderer.render( this.sceneObject3d, camera );
					}
					break;
				default :
			}
			return true;
		} else {
			return false;
		}
	}

	finalEffect : any = null;
	bloomEffect : any = null;
	
	setFinalEffect(composer : EffectComponent) {
		this.finalEffect = composer.getEffect();
	}

	setBloomEffect(composer : EffectComponent) {
		this.bloomEffect = composer.getEffect();
	}

}
