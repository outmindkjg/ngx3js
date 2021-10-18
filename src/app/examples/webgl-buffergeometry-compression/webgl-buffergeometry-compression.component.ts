import { Component } from '@angular/core';
import {
	BaseComponent,
	BufferGeometryUtils,
	MeshComponent,
	RendererTimer,
	THREE,
} from 'ngx3js';

@Component({
	selector: 'app-webgl-buffergeometry-compression',
	templateUrl: './webgl-buffergeometry-compression.component.html',
	styleUrls: ['./webgl-buffergeometry-compression.component.scss'],
})
export class WebglBuffergeometryCompressionComponent extends BaseComponent<{
	model: string;
	wireframe: boolean;
	texture: boolean;
	detail: number;
	rotationSpeed: number;
	QuantizePosEncoding: boolean;
	NormEncodingMethods: string; // for normal encodings
	DefaultUVEncoding: boolean;
	totalGPUMemory: string;
}> {
	constructor() {
		super(
			{
				model: 'Icosahedron',
				wireframe: false,
				texture: false,
				detail: 4,
				rotationSpeed: 0.1,
				QuantizePosEncoding: false,
				NormEncodingMethods: 'None', // for normal encodings
				DefaultUVEncoding: false,
				totalGPUMemory: '0 bytes',
			},
			[
				{
					name: 'Scene',
					type: 'folder',
					children: [
						{
							name: 'model',
							type: 'select',
							select: ['Icosahedron', 'Cylinder', 'TorusKnot', 'Teapot'],
							change: () => {
								this.changeModel();
							},
						},
						{
							name: 'wireframe',
							type: 'checkbox',
							change: () => {
								this.changeModel();
							},
						},
						{
							name: 'texture',
							type: 'checkbox',
							change: () => {
								this.changeModel();
							},
						},
						{
							name: 'detail',
							type: 'number',
							min: 1,
							max: 8,
							step: 1,
							change: () => {
								this.changeModel();
							},
						},
						{
							name: 'rotationSpeed',
							type: 'number',
							min: 0,
							max: 0.5,
							step: 0.1,
							change: () => {
								this.changeModel();
							},
						},
					],
					isOpen: true,
				},
				{
					name: 'Position Compression',
					type: 'folder',
					children: [
						{
							name: 'QuantizePosEncoding',
							type: 'checkbox',
							change: () => {
								this.changeModel();
							},
						},
					],
					isOpen: true,
				},
				{
					name: 'Normal Compression',
					type: 'folder',
					children: [
						{
							name: 'NormEncodingMethods',
							type: 'select',
							select: ['None', 'DEFAULT', 'OCT1Byte', 'OCT2Byte', 'ANGLES'],
							change: () => {
								this.changeModel();
							},
						},
					],
					isOpen: true,
				},
				{
					name: 'UV Compression',
					type: 'folder',
					children: [
						{
							name: 'DefaultUVEncoding',
							type: 'checkbox',
							change: () => {
								this.changeModel();
							},
						},
					],
					isOpen: true,
				},
				{
					name: 'Memory Info',
					type: 'folder',
					children: [{ name: 'totalGPUMemory', type: 'input', listen: true }],
					isOpen: true,
				},
			]
		);
	}
	ngOnInit() {
		this.changeModel();
	}
	changeModel() {
		const radius = 100;
		switch (this.controls.model) {
			case 'Icosahedron':
				this.modelInfo = {
					type: 'Icosahedron',
					radius: radius,
					detail: this.controls.detail,
				};
				break;
			case 'Cylinder':
				this.modelInfo = {
					type: 'Cylinder',
					radiusTop: radius,
					radiusBottom: radius,
					height: radius * 2,
					radialSegments: this.controls.detail * 6,
				};
				break;
			case 'Teapot':
				this.modelInfo = {
					type: 'Teapot',
					size: radius,
					segments: this.controls.detail * 3,
					bottom: true,
					lid: true,
					body: true,
					fitLid: true,
					blinn: true,
				};
				break;
			case 'TorusKnot':
				this.modelInfo = {
					type: 'TorusKnot',
					radius: radius,
					tube: 10,
					radialSegments: this.controls.detail * 20,
					tubularSegments: this.controls.detail * 6,
					p: 3,
					q: 4,
				};
				break;
		}
	}

	modelInfo: {
		type: string;
		radius?: number;
		detail?: number;
		radiusTop?: number;
		radiusBottom?: number;
		height?: number;
		radialSegments?: number;
		size?: number;
		segments?: number;
		bottom?: boolean;
		lid?: boolean;
		body?: boolean;
		fitLid?: boolean;
		blinn?: boolean;
		tube?: number;
		tubularSegments?: number;
		p?: number;
		q?: number;
	};

	setLightGroup(mesh: MeshComponent) {
		this.lights = mesh.getObject3d().children;
	}
	lights: THREE.Object3D[] = [];

	setGeometry(mesh: MeshComponent) {
		const geometry = (mesh.getObject3d() as any).geometry;
		this.controls.totalGPUMemory =
			BufferGeometryUtils.estimateBytesUsed(geometry) + ' bytes';
	}

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		this.lights.forEach((light) => {
			const direction = light.position.clone();
			direction.applyAxisAngle(
				new THREE.Vector3(1, 1, 0),
				(this.controls.rotationSpeed / 180) * Math.PI
			);
			light.position.add(direction.sub(light.position));
		});
	}
}
