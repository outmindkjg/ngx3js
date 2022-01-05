import { Component } from '@angular/core';
import { NgxBaseComponent, IRendererTimer, THREE } from 'ngx3js';

@Component({
	selector: 'app-svg-sandbox',
	templateUrl: './svg-sandbox.component.html',
	styleUrls: ['./svg-sandbox.component.scss'],
})
export class SvgSandboxComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	ngOnInit() {
		const v = new THREE.Vector3();
		const v0 = new THREE.Vector3();
		const v1 = new THREE.Vector3();
		const v2 = new THREE.Vector3();
		const color = new THREE.Color();
		const vertices = [];
		const colors = [];

		for (let i = 0; i < 100; i++) {
			v.set(
				Math.random() * 1000 - 500,
				Math.random() * 1000 - 500,
				Math.random() * 1000 - 500
			);

			v0.set(
				Math.random() * 100 - 50,
				Math.random() * 100 - 50,
				Math.random() * 100 - 50
			);

			v1.set(
				Math.random() * 100 - 50,
				Math.random() * 100 - 50,
				Math.random() * 100 - 50
			);

			v2.set(
				Math.random() * 100 - 50,
				Math.random() * 100 - 50,
				Math.random() * 100 - 50
			);

			v0.add(v);
			v1.add(v);
			v2.add(v);

			color.setHex(Math.random() * 0xffffff);

			// create a single triangle

			vertices.push(v0.x, v0.y, v0.z);
			vertices.push(v1.x, v1.y, v1.z);
			vertices.push(v2.x, v2.y, v2.z);

			colors.push(color.r, color.g, color.b);
			colors.push(color.r, color.g, color.b);
			colors.push(color.r, color.g, color.b);
		}
		this.vertices = vertices;
		this.colors = colors;

		this.spriteInfos = [];
		for (let i = 0; i < 50; i++) {
			this.spriteInfos.push({
				color: Math.random() * 0xffffff,
				x: Math.random() * 1000 - 500,
				y: Math.random() * 1000 - 500,
				z: Math.random() * 1000 - 500,
			});
		}

		const node = document.createElementNS(
			'http://www.w3.org/2000/svg',
			'circle'
		);
		node.setAttribute('stroke', 'black');
		node.setAttribute('fill', 'red');
		node.setAttribute('r', '40');
		this.node = node;
		this.nodeInfos = [];
		for (let i = 0; i < 50; i++) {
			this.nodeInfos.push({
				x: Math.random() * 1000 - 500,
				y: Math.random() * 1000 - 500,
				z: Math.random() * 1000 - 500,
			});
		}
	}

	node: SVGCircleElement = null;

	nodeInfos: { x: number; y: number; z: number }[] = [];

	spriteInfos: {
		color: number;
		x: number;
		y: number;
		z: number;
	}[] = [];

	vertices: number[] = [];
	colors: number[] = [];

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.meshObject3d !== null) {
			const group = this.meshObject3d.getObjectByName('group');
			if (group !== null) {
				group.rotation.x += 0.01;
			}
		}
	}
}
