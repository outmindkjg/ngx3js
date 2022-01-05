import { Component, ViewChild } from '@angular/core';
import {
	I3JS, MeshSurfaceSampler, NgxBaseComponent,
	NgxMeshComponent, IRendererTimer, THREE
} from 'ngx3js';

@Component({
	selector: 'app-webgl-instancing-scatter',
	templateUrl: './webgl-instancing-scatter.component.html',
	styleUrls: ['./webgl-instancing-scatter.component.scss'],
})
export class WebglInstancingScatterComponent extends NgxBaseComponent<{
	count: number;
	distribution: string;
	resample: () => void;
}> {
	@ViewChild('flower') flower: NgxMeshComponent = null;

	constructor() {
		super(
			{
				count: 1000,
				distribution: 'random',
				resample: () => {
					this.reSample();
				},
			},
			[
				{
					name: 'count',
					type: 'number',
					min: 0,
					max: 1000,
					change: () => {
						if (this.blossomMesh !== null && this.stemMesh !== null) {
							this.blossomMesh.count = this.controls.count;
							this.stemMesh.count = this.controls.count;
						}
					},
				},
				{
					name: 'distribution',
					type: 'select',
					select: ['random', 'weighted'],
					change: () => {
						this.reSample();
					},
				},
				{ name: 'resample', type: 'button' },
			]
			,false , false);
	}

	ngAfterViewInit() {
		if (this.flower !== null) {
			this.flower.getSubscribe().subscribe(() => {
				this.setFlower(this.flower);
			});
			this.flower.getObject3d();
		}
	}

	stemMaterial: I3JS.Material = null;
	blossomMaterial: I3JS.Material = null;
	stemGeometry: I3JS.InstancedBufferGeometry = null;
	blossomGeometry: I3JS.InstancedBufferGeometry = null;

	setFlower(meshCom: NgxMeshComponent) {
		const mesh = meshCom.getObject3d();
		const _stemMesh = mesh.getObjectByName('Stem') as any;
		const _blossomMesh = mesh.getObjectByName('Blossom') as any ;
		if (_stemMesh !== undefined && _blossomMesh !== undefined) {
			const stemGeometry = new THREE.InstancedBufferGeometry();
			const blossomGeometry = new THREE.InstancedBufferGeometry();
			THREE.BufferGeometry.prototype.copy.call(
				stemGeometry,
				_stemMesh.geometry
			);
			THREE.BufferGeometry.prototype.copy.call(
				blossomGeometry,
				_blossomMesh.geometry
			);
			const defaultTransform = new THREE.Matrix4()
				.makeRotationX(Math.PI)
				.multiply(new THREE.Matrix4().makeScale(7, 7, 7));
			stemGeometry.applyMatrix4(defaultTransform);
			blossomGeometry.applyMatrix4(defaultTransform);
			this.stemGeometry = stemGeometry;
			this.blossomGeometry = blossomGeometry;
			this.stemMaterial = _stemMesh.material ;
			this.blossomMaterial = _blossomMesh.material ;
			const count = this.controls.count;
			const _color = new THREE.Color();
			const color = new Float32Array(count * 3);
			const blossomPalette = [0xf20587, 0xf2d479, 0xf2c879, 0xf2b077, 0xf24405];
			for (let i = 0; i < count; i++) {
				_color.setHex(
					blossomPalette[Math.floor(Math.random() * blossomPalette.length)]
				);
				_color.toArray(color, i * 3);
			}

			blossomGeometry.setAttribute(
				'color',
				new THREE.InstancedBufferAttribute(color, 3)
			);
			this.blossomMaterial.vertexColors = true;
			this.sampler = new MeshSurfaceSampler(this.surface as any)
				.setWeightAttribute(
					this.controls.distribution === 'weighted' ? 'uv' : null
				)
				.build();
			this.ages = new Float32Array(count);
			this.scales = new Float32Array(count);
		}
	}

	surface: I3JS.Mesh = null;
	sampler: any = null;
	dummy = new THREE.Object3D();

	_position = new THREE.Vector3();
	_normal = new THREE.Vector3();
	_scale = new THREE.Vector3();

	ages: Float32Array;
	scales: Float32Array;
	stemMesh: I3JS.InstancedMesh = null;
	blossomMesh: I3JS.InstancedMesh = null;

	setStemMesh(mesh: NgxMeshComponent) {
		this.stemMesh = mesh.getRealMesh() as any;
		this.reSample();
	}

	setBlossomMesh(mesh: NgxMeshComponent) {
		this.blossomMesh = mesh.getRealMesh() as any ;
		this.reSample();
	}

	setMesh(mesh: NgxMeshComponent) {
		super.setMesh(mesh);
		this.surface = this.mesh.getRealMesh() as any;
		this.reSample();
	}

	easeOutCubic(t) {
		return --t * t * t + 1;
	}

	// Scaling curve causes particles to grow quickly, ease gradually into full scale, then
	// disappear quickly. More of the particle's lifetime is spent around full scale.
	scaleCurve(t) {
		return Math.abs(this.easeOutCubic((t > 0.5 ? 1 - t : t) * 2));
	}

	reSample() {
		if (
			this.stemMesh !== null &&
			this.blossomMesh !== null &&
			this.surface !== null
		) {
			const count = this.controls.count;
			const surface = this.surface;
			const vertexCount = this.surface.geometry.getAttribute('position').count;
			console.info(
				'Sampling ' +
					count +
					' points from a surface with ' +
					vertexCount +
					' vertices...'
			);
			console.time('.build()');

			this.sampler = new MeshSurfaceSampler(surface as any)
				.setWeightAttribute(
					this.controls.distribution === 'weighted' ? 'uv' : null
				)
				.build();

			console.timeEnd('.build()');
			console.time('.sample()');
			for (let i = 0; i < count; i++) {
				this.ages[i] = Math.random();
				this.scales[i] = this.scaleCurve(this.ages[i]);
				this.resampleParticle(i);
			}
			console.timeEnd('.sample()');
			this.stemMesh.instanceMatrix.needsUpdate = true;
			this.blossomMesh.instanceMatrix.needsUpdate = true;
		}
	}

	resampleParticle(i) {
		if (this.stemMesh !== null && this.blossomMesh !== null) {
			this.sampler.sample(this._position, this._normal);
			this._normal.add(this._position);

			this.dummy.position.copy(this._position);
			this.dummy.scale.set(this.scales[i], this.scales[i], this.scales[i]);
			this.dummy.lookAt(this._normal);
			this.dummy.updateMatrix();

			this.stemMesh.setMatrixAt(i, this.dummy.matrix);
			this.blossomMesh.setMatrixAt(i, this.dummy.matrix);
		}
	}

	updateParticle(i) {
		this.ages[i] += 0.005;

		if (this.ages[i] >= 1) {
			this.ages[i] = 0.001;
			this.scales[i] = this.scaleCurve(this.ages[i]);
			this.resampleParticle(i);
			return;
		}

		// Update scale.

		const prevScale = this.scales[i];
		this.scales[i] = this.scaleCurve(this.ages[i]);
		this._scale.set(
			this.scales[i] / prevScale,
			this.scales[i] / prevScale,
			this.scales[i] / prevScale
		);

		// Update transform.
		this.stemMesh.getMatrixAt(i, this.dummy.matrix);
		this.dummy.matrix.scale(this._scale);
		this.stemMesh.setMatrixAt(i, this.dummy.matrix);
		this.blossomMesh.setMatrixAt(i, this.dummy.matrix);
	}

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.stemMesh && this.blossomMesh) {
			for (let i = 0; i < this.controls.count; i++) {
				this.updateParticle(i);
			}
			this.stemMesh.instanceMatrix.needsUpdate = true;
			this.blossomMesh.instanceMatrix.needsUpdate = true;
		}
	}
}
