import { Component } from '@angular/core';
import { BaseComponent, I3JS, MeshComponent, THREE, RendererEvent } from 'ngx3js';

@Component({
	selector: 'app-webgl-interactive-lines',
	templateUrl: './webgl-interactive-lines.component.html',
	styleUrls: ['./webgl-interactive-lines.component.scss'],
})
export class WebglInteractiveLinesComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		const points = [];
		const point = new THREE.Vector3();
		const direction = new THREE.Vector3();
		for (let i = 0; i < 50; i++) {
			direction.x += Math.random() - 0.5;
			direction.y += Math.random() - 0.5;
			direction.z += Math.random() - 0.5;
			direction.normalize().multiplyScalar(10);
			point.add(direction);
			points.push(point.x, point.y, point.z);
		}
		this.points = points;
		const position = {
			x: Math.random() * 40 - 20,
			y: Math.random() * 40 - 20,
			z: Math.random() * 40 - 20,
		};
		const rotation = {
			x: Math.random() * 2 * 180,
			y: Math.random() * 2 * 180,
			z: Math.random() * 2 * 180,
		};
		const scale = {
			x: Math.random() + 0.5,
			y: Math.random() + 0.5,
			z: Math.random() + 0.5,
		};
		this.parentTransform = {
			position: position,
			rotation: rotation,
			scale: scale,
		};
		this.lineInfos = [];
		for (let i = 0; i < 50; i++) {
			const position = {
				x: Math.random() * 400 - 200,
				y: Math.random() * 400 - 200,
				z: Math.random() * 400 - 200,
			};
			const rotation = {
				x: Math.random() * 2 * 180,
				y: Math.random() * 2 * 180,
				z: Math.random() * 2 * 180,
			};
			const scale = {
				x: Math.random() + 0.5,
				y: Math.random() + 0.5,
				z: Math.random() + 0.5,
			};
			const color = Math.random() * 0xffffff;

			if (Math.random() > 0.5) {
				this.lineInfos.push({
					type: 'line',
					color: color,
					position: position,
					rotation: rotation,
					scale: scale,
				});
			} else {
				this.lineInfos.push({
					type: 'LineSegments',
					color: color,
					position: position,
					rotation: rotation,
					scale: scale,
				});
			}
		}
	}

	points: number[] = [];
	parentTransform: {
		position: { x: number; y: number; z: number };
		rotation: { x: number; y: number; z: number };
		scale: { x: number; y: number; z: number };
	} = null;

	lineInfos: {
		type: string;
		color: number;
		position: { x: number; y: number; z: number };
		rotation: { x: number; y: number; z: number };
		scale: { x: number; y: number; z: number };
	}[] = [];

	sphere: I3JS.IObject3D = null;

	setSphere(mesh: MeshComponent) {
		this.sphere = mesh.getObject3d();
	}

	parent: I3JS.IObject3D = null;
	setParentTransform(mesh: MeshComponent) {
		this.parent = mesh.getObject3d();
	}

	onMouseMove(event: RendererEvent) {
		if (this.camera !== null && this.parent !== null && this.sphere !== null) {
			const intersect = this.camera.getIntersection(
				event.mouse,
				this.parent.children,
				true
			);
			if (intersect !== null) {
				this.sphere.visible = true;
				this.sphere.position.copy(intersect.point);
			} else {
				this.sphere.visible = false;
			}
		}
	}
}
