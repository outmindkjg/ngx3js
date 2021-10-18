import { Component } from '@angular/core';
import { BaseComponent, MeshComponent, THREE, ThreeUtil } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-dm3',
	templateUrl: './webgl-loader-dm3.component.html',
	styleUrls: ['./webgl-loader-dm3.component.scss'],
})
export class WebglLoaderDm3Component extends BaseComponent<{
	pointclouds: boolean;
	textdot: boolean;
	curves: boolean;
	brep: boolean;
	subd: boolean;
	lights: boolean;
}> {
	constructor() {
		super(
			{
				pointclouds: false,
				textdot: false,
				curves: true,
				brep: true,
				subd: false,
				lights: false,
			},
			[
				{
					name: 'pointclouds',
					type: 'checkbox',
					change: () => {
						this.setMeshVisible('pointclouds', this.controls.pointclouds);
					},
				},
				{
					name: 'textdot',
					type: 'checkbox',
					change: () => {
						this.setMeshVisible('textdot', this.controls.textdot);
					},
				},
				{
					name: 'curves',
					type: 'checkbox',
					change: () => {
						this.setMeshVisible('curves', this.controls.curves);
					},
				},
				{
					name: 'brep',
					type: 'checkbox',
					change: () => {
						this.setMeshVisible('brep', this.controls.brep);
					},
				},
				{
					name: 'subd',
					type: 'checkbox',
					change: () => {
						this.setMeshVisible('subd', this.controls.subd);
					},
				},
				{
					name: 'lights',
					type: 'checkbox',
					change: () => {
						this.setMeshVisible('lights', this.controls.lights);
					},
				},
			]
		);
	}

	setMeshVisible(name: string, visible: boolean) {
		this.loadedMesh = this.meshObject3d as THREE.Mesh;
		if (
			ThreeUtil.isNotNull(this.loadedMesh) &&
			ThreeUtil.isNotNull(this.loadedMesh.userData.layers)
		) {
			const layers = this.loadedMesh.userData.layers;
			this.loadedMesh.traverse(function (child) {
				if (child.userData.hasOwnProperty('attributes')) {
					if ('layerIndex' in child.userData.attributes) {
						const layerName = layers[child.userData.attributes.layerIndex].name;
						if (layerName === name) {
							child.visible = visible;
						}
					}
				}
			});
		}
	}

	private loadedMesh: THREE.Mesh = null;

	setMesh(mesh: MeshComponent) {
		super.setMesh(mesh);
	}
}
