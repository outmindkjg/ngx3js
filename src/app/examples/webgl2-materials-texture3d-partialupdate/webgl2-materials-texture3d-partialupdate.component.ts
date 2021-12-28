import { Component } from '@angular/core';
import { I3JS, NgxBaseComponent, NgxSharedComponent, IRendererTimer, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl2-materials-texture3d-partialupdate',
	templateUrl: './webgl2-materials-texture3d-partialupdate.component.html',
	styleUrls: ['./webgl2-materials-texture3d-partialupdate.component.scss'],
})
export class Webgl2MaterialsTexture3dPartialupdateComponent extends NgxBaseComponent<{
	threshold: number;
	opacity: number;
	range: number;
	steps: number;
}> {
	constructor() {
		super(
			{
				threshold: 0.25,
				opacity: 0.25,
				range: 0.1,
				steps: 100,
			},
			[
				{
					name: 'threshold',
					type: 'number',
					min: 0,
					max: 1,
					step: 0.01,
					change: () => {
						this.updateUniforms();
					},
				},
				{
					name: 'opacity',
					type: 'number',
					min: 0,
					max: 1,
					step: 0.01,
					change: () => {
						this.updateUniforms();
					},
				},
				{
					name: 'range',
					type: 'number',
					min: 0,
					max: 1,
					step: 0.01,
					change: () => {
						this.updateUniforms();
					},
				},
				{
					name: 'steps',
					type: 'number',
					min: 0,
					max: 200,
					step: 1,
					change: () => {
						this.updateUniforms();
					},
				},
			]
		);
	}

	ngOnInit() {
		this.textureInfos = [];
		for (let x = 0; x < 4; x++) {
			for (let y = 0; y < 4; y++) {
				for (let z = 0; z < 4; z++) {
					this.textureInfos.push({
						scale: (Math.random() + 0.5) * 0.5,
						x: x,
						y: y,
						z: z,
					});
				}
			}
		}
	}

	setShared(shared: NgxSharedComponent) {
		const textureList = shared.getTextureComponents();
		this.texture3dList = [];
		textureList.forEach((texture) => {
			this.texture3dList.push(texture.getTexture());
		});
	}

	textureInfos: { scale: number; x: number; y: number; z: number }[] = [];
	texture3dList: I3JS.DataTexture3D[] = [];
	addedCnt: number = 0;
	updateUniforms() {
		const uniforms = this.getUniforms();
		if (uniforms !== null) {
			uniforms.threshold.value = this.controls.threshold;
			uniforms.opacity.value = this.controls.opacity;
			uniforms.range.value = this.controls.range;
			uniforms.steps.value = this.controls.steps;
		}
	}

	getUniforms(): { [uniform: string]: I3JS.IUniform } {
		if (this.meshObject3d !== null) {
			const rawShaderMaterial = (this.meshObject3d as any).material;
			return rawShaderMaterial.uniforms || null;
		}
		return null;
	}

	nextTime: number = 0;
	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.camera !== null && this.meshObject3d !== null) {
			this.meshObject3d.rotation.y = timer.elapsedTime / 7.5;
			const uniforms = this.getUniforms();
			if (uniforms !== null && false) {
				if (
					this.nextTime < timer.elapsedTime &&
					this.addedCnt < this.texture3dList.length
				) {
					let i = this.addedCnt;
					const x = i % 4;
					i = Math.floor((i - x) / 4);
					const y = i % 4;
					i = Math.floor((i - y) / 4);
					const z = i % 4;
					const texture = this.texture3dList[this.addedCnt];
					const position = new THREE.Vector3(x * 32, y * 32, z * 32).floor();
					const box = new THREE.Box3(
						new THREE.Vector3(0, 0, 0),
						new THREE.Vector3(29, 29, 29)
					);
					(timer.renderer as any).copyTextureToTexture3D(
						box,
						position,
						texture,
						uniforms.map.value
					);
					this.addedCnt++;
					this.nextTime = timer.elapsedTime + 1;
				}
				uniforms.cameraPos.value.copy(this.camera.getCamera().position);
				uniforms.frame.value++;
			}
		}
	}
}
