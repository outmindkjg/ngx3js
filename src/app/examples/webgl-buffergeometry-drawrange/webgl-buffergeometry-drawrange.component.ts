import { Component } from '@angular/core';
import { BaseComponent, I3JS, MeshComponent, N3js, RendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-buffergeometry-drawrange',
	templateUrl: './webgl-buffergeometry-drawrange.component.html',
	styleUrls: ['./webgl-buffergeometry-drawrange.component.scss'],
})
export class WebglBuffergeometryDrawrangeComponent extends BaseComponent<{
	showDots: boolean;
	showLines: boolean;
	minDistance: number;
	limitConnections: boolean;
	maxConnections: number;
	particleCount: number;
}> {
	constructor() {
		super(
			{
				showDots: true,
				showLines: true,
				minDistance: 150,
				limitConnections: false,
				maxConnections: 20,
				particleCount: 500,
			},
			[
				{ name: 'showDots', type: 'checkbox' },
				{ name: 'showLines', type: 'checkbox' },
				{ name: 'minDistance', type: 'number', min: 10, max: 300 },
				{ name: 'limitConnections', type: 'checkbox' },
				{ name: 'maxConnections', type: 'number', min: 0, max: 30, step: 1 },
				{ name: 'particleCount', type: 'number', min: 0, max: 1000, step: 1 },
			]
		);
	}

	ngOnInit() {
		this.particlesData = [];
		this.particlePositions = new Float32Array(this.maxParticleCount * 3);
		const r = this.r;
		const particlePositions = this.particlePositions;
		const particlesData = this.particlesData;
		for (let i = 0; i < this.maxParticleCount; i++) {
			const x = Math.random() * r - r / 2;
			const y = Math.random() * r - r / 2;
			const z = Math.random() * r - r / 2;
			particlePositions[i * 3] = x;
			particlePositions[i * 3 + 1] = y;
			particlePositions[i * 3 + 2] = z;
			// add it to the geometry
			particlesData.push({
				velocity: N3js.getVector3(
					-1 + Math.random() * 2,
					-1 + Math.random() * 2,
					-1 + Math.random() * 2
				),
				numConnections: 0,
			});
		}
		const segments = this.maxParticleCount * this.maxParticleCount;
		this.lineColors = new Float32Array(segments * 3);
		this.linePositions = new Float32Array(segments * 3);
	}

	r: number = 800;
	rHalf = this.r / 2;
	maxParticleCount: number = 1000;
	particlePositions: Float32Array = null;
	lineColors: Float32Array = null;
	linePositions: Float32Array = null;
	particlesData: { velocity: I3JS.IVector3; numConnections: number }[] = [];

	setLineMesh(mesh: MeshComponent) {
		this.linesMesh = mesh.getMesh() as any;
	}

	linesMesh: I3JS.ILineSegments = null;

	setPointCloud(mesh: MeshComponent) {
		this.pointCloud = mesh.getMesh() as any;
	}

	pointCloud: I3JS.IPoints = null;

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (
			this.meshObject3d !== null &&
			this.pointCloud !== null &&
			this.linesMesh !== null
		) {
			const particleCount = this.controls.particleCount;
			const particlesData = this.particlesData;
			const particlePositions = this.particlePositions;
			const colors = this.lineColors;
			const positions = this.linePositions;
			const rHalf = this.rHalf;
			let vertexpos = 0;
			let colorpos = 0;
			let numConnected = 0;

			for (let i = 0; i < particleCount; i++)
				particlesData[i].numConnections = 0;

			for (let i = 0; i < particleCount; i++) {
				// get the particle
				const particleData = particlesData[i];

				particlePositions[i * 3] += particleData.velocity.x;
				particlePositions[i * 3 + 1] += particleData.velocity.y;
				particlePositions[i * 3 + 2] += particleData.velocity.z;

				if (
					particlePositions[i * 3 + 1] < -rHalf ||
					particlePositions[i * 3 + 1] > rHalf
				)
					particleData.velocity.y = -particleData.velocity.y;

				if (
					particlePositions[i * 3] < -rHalf ||
					particlePositions[i * 3] > rHalf
				)
					particleData.velocity.x = -particleData.velocity.x;

				if (
					particlePositions[i * 3 + 2] < -rHalf ||
					particlePositions[i * 3 + 2] > rHalf
				)
					particleData.velocity.z = -particleData.velocity.z;

				if (
					this.controls.limitConnections &&
					particleData.numConnections >= this.controls.maxConnections
				)
					continue;

				// Check collision
				for (let j = i + 1; j < particleCount; j++) {
					const particleDataB = particlesData[j];
					if (
						this.controls.limitConnections &&
						particleDataB.numConnections >= this.controls.maxConnections
					)
						continue;

					const dx = particlePositions[i * 3] - particlePositions[j * 3];
					const dy =
						particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
					const dz =
						particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
					const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

					if (dist < this.controls.minDistance) {
						particleData.numConnections++;
						particleDataB.numConnections++;

						const alpha = 1.0 - dist / this.controls.minDistance;

						positions[vertexpos++] = particlePositions[i * 3];
						positions[vertexpos++] = particlePositions[i * 3 + 1];
						positions[vertexpos++] = particlePositions[i * 3 + 2];

						positions[vertexpos++] = particlePositions[j * 3];
						positions[vertexpos++] = particlePositions[j * 3 + 1];
						positions[vertexpos++] = particlePositions[j * 3 + 2];

						colors[colorpos++] = alpha;
						colors[colorpos++] = alpha;
						colors[colorpos++] = alpha;

						colors[colorpos++] = alpha;
						colors[colorpos++] = alpha;
						colors[colorpos++] = alpha;
						numConnected++;
					}
				}
			}
			this.linesMesh.geometry.setDrawRange(0, numConnected * 2);
			this.linesMesh.geometry.attributes.position.needsUpdate = true;
			this.linesMesh.geometry.attributes.color.needsUpdate = true;
			this.pointCloud.geometry.attributes.position.needsUpdate = true;
		} else {
			this.consoleLogTime('render', {
				linesMesh: this.linesMesh,
				pointCloud: this.pointCloud,
			});
		}
	}
}
