import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-gltf-extensions',
	templateUrl: './webgl-loader-gltf-extensions.component.html',
	styleUrls: ['./webgl-loader-gltf-extensions.component.scss'],
})
export class WebglLoaderGltfExtensionsComponent extends NgxBaseComponent<{
	scene: string;
	playAnimation: boolean;
	extension: string;
}> {
	constructor() {
		super(
			{
				scene: 'Boombox',
				playAnimation: true,
				extension: '',
			},
			[
				{
					name: 'scene',
					type: 'select',
					select: [
						'Boombox',
						'Bot Skinned',
						'MetalRoughSpheres',
						'Clearcoat Test',
						'Duck',
						'Monster',
						'Cesium Man',
						'Cesium Milk Truck',
						'Outlined Box',
					],
					change: () => {},
				},
			]
			,false , false);
	}

	ngOnInit() {
		this.changeScene(this.controls.scene);
	}

	changeScene(scene) {
		switch (scene) {
			case 'Boombox':
				this.sceneInfo = {
					name: 'BoomBox (PBR)',
					url: './models/gltf/BoomBox/glTF/BoomBox.gltf',
					author: 'Microsoft',
					authorURL: 'https://www.microsoft.com/',
					cameraPosX: 0.02,
					cameraPosY: 0.01,
					cameraPosZ: 0.03,
					objectRotationX: 0,
					objectRotationY: 180,
					objectRotationZ: 0,
					extensions: [
						'glTF',
						'glTF-pbrSpecularGlossiness',
						'glTF-Binary',
						'glTF-dds',
					],
					addEnvMap: true,
				};
				break;
			case 'Bot Skinned':
				this.sceneInfo = {
					name: 'Bot Skinned',
					url: './models/gltf/BotSkinned/%s/Bot_Skinned.gltf',
					author: 'MozillaVR',
					authorURL: 'https://vr.mozilla.org/',
					cameraPosX: 0.5,
					cameraPosY: 2,
					cameraPosZ: 2,
					centerX: 0,
					centerY: 1.2,
					centerZ: 0,
					objectRotationX: 0,
					objectRotationY: 0,
					objectRotationZ: 0,
					addLights: true,
					addGround: true,
					shadows: true,
					extensions: ['glTF-MaterialsUnlit'],
				};
				break;
			case 'MetalRoughSpheres':
				this.sceneInfo = {
					name: 'BoomBox (PBR)',
					url: './models/gltf/BoomBox/%s/BoomBox.gltf',
					author: 'Microsoft',
					authorURL: 'https://www.microsoft.com/',
					cameraPosX: 0.02,
					cameraPosY: 0.01,
					cameraPosZ: 0.03,
					objectRotationX: 0,
					objectRotationY: 180,
					objectRotationZ: 0,
					extensions: [
						'glTF',
						'glTF-pbrSpecularGlossiness',
						'glTF-Binary',
						'glTF-dds',
					],
					addEnvMap: true,
				};
				break;
			case 'Clearcoat Test':
				this.sceneInfo = {
					name: 'BoomBox (PBR)',
					url: './models/gltf/BoomBox/%s/BoomBox.gltf',
					author: 'Microsoft',
					authorURL: 'https://www.microsoft.com/',
					cameraPosX: 0.02,
					cameraPosY: 0.01,
					cameraPosZ: 0.03,
					objectRotationX: 0,
					objectRotationY: 180,
					objectRotationZ: 0,
					extensions: [
						'glTF',
						'glTF-pbrSpecularGlossiness',
						'glTF-Binary',
						'glTF-dds',
					],
					addEnvMap: true,
				};
				break;
			case 'Duck':
				this.sceneInfo = {
					name: 'BoomBox (PBR)',
					url: './models/gltf/BoomBox/%s/BoomBox.gltf',
					author: 'Microsoft',
					authorURL: 'https://www.microsoft.com/',
					cameraPosX: 0.02,
					cameraPosY: 0.01,
					cameraPosZ: 0.03,
					objectRotationX: 0,
					objectRotationY: 180,
					objectRotationZ: 0,
					extensions: [
						'glTF',
						'glTF-pbrSpecularGlossiness',
						'glTF-Binary',
						'glTF-dds',
					],
					addEnvMap: true,
				};
				break;
			case 'Monster':
				this.sceneInfo = {
					name: 'BoomBox (PBR)',
					url: './models/gltf/BoomBox/%s/BoomBox.gltf',
					author: 'Microsoft',
					authorURL: 'https://www.microsoft.com/',
					cameraPosX: 0.02,
					cameraPosY: 0.01,
					cameraPosZ: 0.03,
					objectRotationX: 0,
					objectRotationY: 180,
					objectRotationZ: 0,
					extensions: [
						'glTF',
						'glTF-pbrSpecularGlossiness',
						'glTF-Binary',
						'glTF-dds',
					],
					addEnvMap: true,
				};
				break;
			case 'Cesium Man':
				this.sceneInfo = {
					name: 'BoomBox (PBR)',
					url: './models/gltf/BoomBox/%s/BoomBox.gltf',
					author: 'Microsoft',
					authorURL: 'https://www.microsoft.com/',
					cameraPosX: 0.02,
					cameraPosY: 0.01,
					cameraPosZ: 0.03,
					objectRotationX: 0,
					objectRotationY: 180,
					objectRotationZ: 0,
					extensions: [
						'glTF',
						'glTF-pbrSpecularGlossiness',
						'glTF-Binary',
						'glTF-dds',
					],
					addEnvMap: true,
				};
				break;
			case 'Cesium Milk Truck':
				this.sceneInfo = {
					name: 'BoomBox (PBR)',
					url: './models/gltf/BoomBox/%s/BoomBox.gltf',
					author: 'Microsoft',
					authorURL: 'https://www.microsoft.com/',
					cameraPosX: 0.02,
					cameraPosY: 0.01,
					cameraPosZ: 0.03,
					objectRotationX: 0,
					objectRotationY: 180,
					objectRotationZ: 0,
					extensions: [
						'glTF',
						'glTF-pbrSpecularGlossiness',
						'glTF-Binary',
						'glTF-dds',
					],
					addEnvMap: true,
				};
				break;
			case 'Outlined Box':
				this.sceneInfo = {
					name: 'BoomBox (PBR)',
					url: './models/gltf/BoomBox/%s/BoomBox.gltf',
					author: 'Microsoft',
					authorURL: 'https://www.microsoft.com/',
					cameraPosX: 0.02,
					cameraPosY: 0.01,
					cameraPosZ: 0.03,
					objectRotationX: 0,
					objectRotationY: 180,
					objectRotationZ: 0,
					extensions: [
						'glTF',
						'glTF-pbrSpecularGlossiness',
						'glTF-Binary',
						'glTF-dds',
					],
					addEnvMap: true,
				};
				break;
		}
	}

	sceneInfo: {
		name: string;
		url: string;
		author: string;
		authorURL: string;
		cameraPosX: number;
		cameraPosY: number;
		cameraPosZ: number;
		centerX?: number;
		centerY?: number;
		centerZ?: number;
		objectRotationX: number;
		objectRotationY: number;
		objectRotationZ: number;
		addLights?: boolean;
		addGround?: boolean;
		shadows?: boolean;
		extensions: string[];
		addEnvMap?: boolean;
	} = null;
}
