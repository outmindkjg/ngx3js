import { Component } from '@angular/core';
import {
	I3JS,
	NgxBaseComponent,
	NgxLightComponent,
	IRendererTimer,
	THREE,
	NgxMaterialComponent,
	NODES,
} from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-instance-uniform-nodes',
	templateUrl: './webgl-materials-instance-uniform-nodes.component.html',
	styleUrls: ['./webgl-materials-instance-uniform-nodes.component.scss'],
})
export class WebglMaterialsInstanceUniformNodesComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	frame:I3JS.NodeFrame = null;

	ngOnInit() {
		this.frame  =  new NODES.NodeFrame();
		this.meshInfos = [];
		for (let i = 0, l = 12; i < l; i++) {
			this.meshInfos.push({
				color: new THREE.Color(Math.random() * 0xffffff),
				position: {
					x: (i % 4) * 200 - 400,
					y: 0,
					z: Math.floor(i / 4) * 200 - 200,
				},
				rotation: {
					x: Math.random() * 200 - 100,
					y: Math.random() * 200 - 100,
					z: Math.random() * 200 - 100,
				},
			});
		}
	}

	setMeshStandardMaterial(material : NgxMaterialComponent) {
		this.material = material.getMaterial();
		this.material.colorNode = new InstanceUniformNode();
		NODES.OnNodeBuildBeforeRender(this.frame, this.material);
	}

	material : any = null;

	pointLight: I3JS.Object3D = null;

	setLight(light: NgxLightComponent) {
		this.pointLight = light.getLight();
	}

	meshInfos: {
		color: I3JS.Color;
		position: { x: number; y: number; z: number };
		rotation: { x: number; y: number; z: number };
	}[] = [];

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.pointLight !== null && this.meshChildren && this.meshChildren.length > 0) {
			this.frame.update( timer.delta )
			const elapsedTime = timer.elapsedTime * 0.1;
			this.pointLight.position.x = Math.sin(elapsedTime * 7) * 300;
			this.pointLight.position.y = Math.cos(elapsedTime * 5) * 400;
			this.pointLight.position.z = Math.cos(elapsedTime * 3) * 300;
			this.meshChildren.forEach(child => {
				child.rotation.x += 0.01;
				child.rotation.y += 0.005;
			});
		}
	}
}

class InstanceUniformNode extends NODES.Node {
	updateType: any = null;
	inputNode: any = null;

	constructor() {
		super('vec3');

		this.updateType = NODES.NodeUpdateType.Object;
		this.inputNode = new NODES.ColorNode();
	}

	update(frame) {
		const rendererState = frame.renderer.state;
		const mesh : I3JS.Mesh = frame.object;

		const meshColor = mesh.userData.color;

		this.inputNode.value.copy(meshColor);
		// force refresh material uniforms
		rendererState.useProgram(null);
	}

	generate(builder, output) {
		return this.inputNode.build(builder, output);
	}
}
