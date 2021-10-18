import { Component } from '@angular/core';
import { BaseComponent, LightComponent, RendererTimer, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials',
	templateUrl: './webgl-materials.component.html',
	styleUrls: ['./webgl-materials.component.scss'],
})
export class WebglMaterialsComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		this.addMeshInfo(0, 'MeshLambert', { map: true, transparent: true });
		this.addMeshInfo(1, 'MeshLambert', { color: 0xdddddd });
		this.addMeshInfo(2, 'MeshPhong', {
			color: 0xdddddd,
			specular: 0x009900,
			shininess: 30,
			flatShading: true,
		});
		this.addMeshInfo(3, 'MeshNormal', {});
		this.addMeshInfo(4, 'MeshBasic', {
			color: 0xffaa00,
			transparent: true,
			blending: 'Additive',
		});
		this.addMeshInfo(5, 'MeshLambert', { color: 0xdddddd });
		this.addMeshInfo(6, 'MeshPhong', {
			color: 0xdddddd,
			specular: 0x009900,
			shininess: 30,
			map: true,
			transparent: true,
		});
		this.addMeshInfo(7, 'MeshNormal', { flatShading: true });
		this.addMeshInfo(8, 'MeshBasic', { color: 0xffaa00, wireframe: true });
		this.addMeshInfo(9, 'MeshDepth', {});
		this.addMeshInfo(10, 'MeshLambert', {
			color: 0x666666,
			emissive: 0xff0000,
		});
		this.addMeshInfo(11, 'MeshPhong', {
			color: 0x000000,
			specular: 0x666666,
			emissive: 0xff0000,
			shininess: 10,
			opacity: 0.9,
			transparent: true,
		});
		this.addMeshInfo(12, 'MeshBasic', { map: true, transparent: true });
	}

	canvasProgram(context: CanvasRenderingContext2D) {
		const image = context.getImageData(0, 0, 256, 256);
		let x = 0,
			y = 0;
		for (let i = 0, j = 0, l = image.data.length; i < l; i += 4, j++) {
			x = j % 256;
			y = x === 0 ? y + 1 : y;
			image.data[i] = 255;
			image.data[i + 1] = 255;
			image.data[i + 2] = 255;
			image.data[i + 3] = Math.floor(x ^ y);
		}
		context.putImageData(image, 0, 0);
	}

	addMeshInfo(idx, materialType: string, materialInfo: any) {
		this.meshInfos.push({
			position: {
				x: (idx % 4) * 200 - 400,
				y: 0,
				z: Math.floor(idx / 4) * 200 - 200,
			},
			rotation: {
				x: Math.random() * 360 - 180,
				y: Math.random() * 360 - 180,
				z: Math.random() * 360 - 180,
			},
			material: {
				type: materialType,
				...materialInfo,
			},
		});
	}

	pointLight: THREE.Object3D = null;
	setPointLight(light: LightComponent) {
		this.pointLight = light.getLight();
	}

	meshInfos: {
		position: { x: number; y: number; z: number };
		rotation: { x: number; y: number; z: number };
		material: {
			type: string;
			map?: boolean;
			transparent?: boolean;
			color?: number;
			specular?: number;
			shininess?: number;
			flatShading?: boolean;
			blending?: string;
			wireframe?: boolean;
			emissive?: number | string;
			opacity?: number;
		};
	}[] = [];

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		const elapsedTime = timer.elapsedTime * 0.1;
		if (this.pointLight !== null) {
			this.pointLight.position.set(
				Math.sin(elapsedTime * 7) * 300,
				Math.cos(elapsedTime * 5) * 400,
				Math.cos(elapsedTime * 3) * 300
			);
		}
		if (this.mesh !== null) {
			const children = this.mesh.getObject3d().children;
			children.forEach((child) => {
				child.rotation.x += 0.01;
				child.rotation.y += 0.005;
			});
			const material1 = (children[this.meshInfos.length - 2] as any).material;
			const material2 = (children[this.meshInfos.length - 3] as any).material;
			material1.emissive.setHSL(
				0.54,
				1,
				0.35 * (0.5 + 0.5 * Math.sin(35 * elapsedTime))
			);
			material2.emissive.setHSL(
				0.04,
				1,
				0.35 * (0.5 + 0.5 * Math.cos(35 * elapsedTime))
			);
		}
	}
}
