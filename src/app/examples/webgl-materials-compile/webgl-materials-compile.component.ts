import { Component } from '@angular/core';
import { BaseComponent, MeshComponent, RendererTimer, THREE, I3JS } from 'ngx3js';

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
				const mtl = new THREE.PhongNodeMaterial();
				const time = new THREE.TimerNode();
				const speed = new THREE.FloatNode(Math.random());
				const color = new THREE.ColorNode(Math.random() * 0xffffff);
				const timeSpeed = new THREE.OperatorNode(
					time,
					speed,
					THREE.OperatorNode.MUL
				);
				const sinCycleInSecs = new THREE.OperatorNode(
					timeSpeed,
					new THREE.ConstNode(THREE.ConstNode.PI2),
					THREE.OperatorNode.MUL
				);
				const cycle = new THREE.MathNode(sinCycleInSecs, THREE.MathNode.SIN);
				const cycleColor = new THREE.OperatorNode(
					cycle,
					color,
					THREE.OperatorNode.MUL
				);
				const cos = new THREE.MathNode(cycleColor, THREE.MathNode.SIN);
				mtl.color = new THREE.ColorNode(0);
				mtl.emissive = cos;
				const transformer = new THREE.ExpressionNode(
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
			this.frame = new THREE.NodeFrame(0);
		}
	}
	frame: I3JS.INodeFrame = null;
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
