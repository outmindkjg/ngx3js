import { Component } from '@angular/core';
import { BaseComponent, MeshComponent, NODES, RendererTimer } from 'ngx3js';
import * as THREE from 'three';

@Component({
	selector: 'app-webgl-materials-compile',
	templateUrl: './webgl-materials-compile.component.html',
	styleUrls: ['./webgl-materials-compile.component.scss'],
})
export class WebglMaterialsCompileComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		const itemsonrow = 10;
		for (let i = 0; i < itemsonrow * itemsonrow; i++) {
			this.teapotInfos.push({
				x: 50 * (i % itemsonrow) - (50 * itemsonrow) / 2,
				y: 0,
				z: 50 * Math.floor(i / itemsonrow) - 150,
			});
		}
	}
	teapotInfos: { x: number; y: number; z: number }[] = [];

	setMesh(mesh: MeshComponent) {
		super.setMesh(mesh);
		setTimeout(() => {
			this.setMeshChild();
		}, 1000);
	}

	setMeshChild() {
		if (this.meshChildren !== null) {
			this.meshChildren.forEach((mesh: any) => {
				if (mesh.material) {
					mesh.material.dispose();
				}
				const mtl = new NODES.PhongNodeMaterial();
				const time = new NODES.TimerNode();
				const speed = new NODES.FloatNode(Math.random());
				const color = new NODES.ColorNode(Math.random() * 0xffffff);
				const timeSpeed = new NODES.OperatorNode(
					time,
					speed,
					NODES.OperatorNode.MUL
				);
				const sinCycleInSecs = new NODES.OperatorNode(
					timeSpeed,
					new NODES.ConstNode(NODES.ConstNode.PI2),
					NODES.OperatorNode.MUL
				);
				const cycle = new NODES.MathNode(sinCycleInSecs, NODES.MathNode.SIN);
				const cycleColor = new NODES.OperatorNode(
					cycle,
					color,
					NODES.OperatorNode.MUL
				);
				const cos = new NODES.MathNode(cycleColor, NODES.MathNode.SIN);
				mtl.color = new NODES.ColorNode(0);
				mtl.emissive = cos;
				const transformer = new NODES.ExpressionNode(
					'position + 0.0 * ' + Math.random(),
					'vec3',
					[]
				);
				(mtl as any).transform = transformer;
				// build shader ( ignore auto build )
				mtl.build();
				// set material
				mesh.material = mtl;
			});
			this.frame = new NODES.NodeFrame(0);
		}
	}
	frame: NODES.NodeFrame = null;
	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.frame != null && this.meshChildren !== null) {
			this.frame.update(timer.delta);
			this.meshChildren.forEach((mesh: any) => {
				if (mesh.material) {
					this.frame.updateNode(mesh.material);
				}
			});
		}
	}
}
