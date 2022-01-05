import { Component } from '@angular/core';
import {
	I3JS, NgxBaseComponent, NgxMeshComponent, IRendererEvent, THREE
} from 'ngx3js';

@Component({
	selector: 'app-webgl-interactive-points',
	templateUrl: './webgl-interactive-points.component.html',
	styleUrls: ['./webgl-interactive-points.component.scss'],
})
export class WebglInteractivePointsComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	ngOnInit() {
		const PARTICLE_SIZE = 20;
		let boxGeometry: I3JS.BufferGeometry = new THREE.BoxGeometry(
			200,
			200,
			200,
			16,
			16,
			16
		);
		// if normal and uv attributes are not removed, mergeVertices() can't consolidate indentical vertices with different normal/uv data
		boxGeometry.deleteAttribute('normal');
		boxGeometry.deleteAttribute('uv');
		boxGeometry = THREE.GeometryUtils.mergeVertices(boxGeometry as any) as any;
		//
		const positionAttribute = boxGeometry.getAttribute('position');
		const colors = [];
		const sizes = [];
		const color = new THREE.Color();
		for (let i = 0, l = positionAttribute.count; i < l; i++) {
			color.setHSL(0.01 + 0.1 * (i / l), 1.0, 0.5);
			color.toArray(colors, i * 3);
			sizes[i] = PARTICLE_SIZE * 0.5;
		}
		this.position = positionAttribute;
		this.colors = colors;
		this.sizes = sizes;
	}

	uniforms = {
		color: { type: 'color', value: 0xffffff },
		pointTexture: { type: 'Texture', value: 'textures/sprites/disc.png' },
		alphaTest: { value: 0.9 },
	};

	position: any;
	colors: number[] = [];
	sizes: number[] = [];

	particles: I3JS.Points = null;
	setMesh(mesh: NgxMeshComponent) {
		super.setMesh(mesh);
		this.particles = mesh.getObject3d() ;
	}

	lastIntersect: number = null;
	onMouseMove(event: IRendererEvent) {
		if (this.camera !== null && this.mesh !== null && this.particles !== null) {
			const intersect = this.camera.getIntersection(
				event.mouse,
				this.particles
			);
			const PARTICLE_SIZE = 20;
			if (intersect !== null) {
				if (this.lastIntersect != intersect.index) {
					const attributesSize = this.particles.geometry.getAttribute(
						'size'
					) as any;
					if (this.lastIntersect !== null) {
						attributesSize.array[this.lastIntersect] = PARTICLE_SIZE;
					}
					this.lastIntersect = intersect.index;
					attributesSize.array[this.lastIntersect] = PARTICLE_SIZE * 1.25;
					attributesSize.needsUpdate = true;
				}
			} else if (this.lastIntersect !== null) {
				const attributesSize = this.particles.geometry.getAttribute(
					'size'
				) as any;
				attributesSize.array[this.lastIntersect] = PARTICLE_SIZE;
				attributesSize.needsUpdate = true;
				this.lastIntersect = null;
			}
		}
	}
}
