import { Component } from '@angular/core';
import {
	BaseComponent,
	GeometryComponent, I3JS, MaterialComponent,
	MeshComponent, THREE, RendererTimer
} from 'ngx3js';

@Component({
	selector: 'app-webgl-instancing-modified',
	templateUrl: './webgl-instancing-modified.component.html',
	styleUrls: ['./webgl-instancing-modified.component.scss'],
})
export class WebglInstancingModifiedComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	amount: number = 8;
	count: number = Math.pow(this.amount, 3);

	setMesh(mesh: MeshComponent) {
		super.setMesh(mesh);
	}
	colorParsChunk = [
		'attribute vec3 instanceColor;',
		'varying vec3 vInstanceColor;',
		'#include <common>',
	].join('\n');

	instanceColorChunk = [
		'#include <begin_vertex>',
		'\tvInstanceColor = instanceColor;',
	].join('\n');

	fragmentParsChunk = [
		'varying vec3 vInstanceColor;',
		'#include <common>',
	].join('\n');

	colorChunk = [
		'vec4 diffuseColor = vec4( diffuse * vInstanceColor, opacity );',
	].join('\n');

	setGeometry(geometry: GeometryComponent) {
		const instanceColors = [];
		for (let i = 0; i < this.count; i++) {
			instanceColors.push(Math.random());
			instanceColors.push(Math.random());
			instanceColors.push(Math.random());
		}
		geometry
			.getGeometry()
			.setAttribute(
				'instanceColor',
				new THREE.InstancedBufferAttribute(new Float32Array(instanceColors), 3)
			);
	}

	setMaterial(material: MaterialComponent) {
		const meshMatcapMaterial = material.getMaterial();
		meshMatcapMaterial.onBeforeCompile = (shader) => {
			shader.vertexShader = shader.vertexShader
				.replace('#include <common>', this.colorParsChunk)
				.replace('#include <begin_vertex>', this.instanceColorChunk);
			shader.fragmentShader = shader.fragmentShader
				.replace('#include <common>', this.fragmentParsChunk)
				.replace(
					'vec4 diffuseColor = vec4( diffuse, opacity );',
					this.colorChunk
				);
		};
	}

	dummy = new THREE.Object3D();

	makeMatrix = (matrix: I3JS.IMatrix4, i: number, time: number = 0) => {
		const offset = (this.amount - 1) / 2;
		const x = i % this.amount;
		i = Math.floor((i - x) / this.amount);
		const y = i % this.amount;
		i = Math.floor((i - y) / this.amount);
		const z = i % this.amount;
		const dummy = this.dummy;
		dummy.position.set(offset - x, offset - y, offset - z);
		dummy.rotation.y =
			Math.sin(x / 4 + time) + Math.sin(y / 4 + time) + Math.sin(z / 4 + time);
		dummy.rotation.z = dummy.rotation.y * 2;
		dummy.updateMatrix();
		matrix.copy(dummy.matrix);
	};

	matrix = new THREE.Matrix4();

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.meshObject3d !== null) {
			const time = timer.elapsedTime;
			const instancedMesh: I3JS.IInstancedMesh = this.meshObject3d as any;
			instancedMesh.rotation.x = Math.sin(time / 4);
			instancedMesh.rotation.y = Math.sin(time / 2);
			for (let i = 0; i < this.count; i++) {
				this.makeMatrix(this.matrix, i, time);
				instancedMesh.setMatrixAt(i, this.matrix);
			}
			instancedMesh.instanceMatrix.needsUpdate = true;
		}
	}
}
