import { Component } from '@angular/core';
import { NgxBaseComponent, NgxMeshComponent, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-collada-kinematics',
	templateUrl: './webgl-loader-collada-kinematics.component.html',
	styleUrls: ['./webgl-loader-collada-kinematics.component.scss'],
})
export class WebglLoaderColladaKinematicsComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	setMesh(mesh: NgxMeshComponent) {
		super.setMesh(mesh);
		const dae = mesh.getObject3d();
		dae.traverse((child: any) => {
			if (child.isMesh) {
				child.material.flatShading = true;
				child.material.color = new THREE.Color(0xffffff);
			}
		});
	}
}
