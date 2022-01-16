import { Component } from '@angular/core';
import {
	I3JS,
	NgxBaseComponent,
	NgxLightComponent,
	IRendererTimer,
	THREE,
	NgxMaterialComponent,
	NodeFrame,
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
		this.frame  =  new THREE.NodeFrame();
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
		this.material.updateFrame = (node : NodeFrame) => {
			
		}
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
		if (this.pointLight !== null) {
			this.frame.update( timer.delta )
			.updateNode( this.material );
			const elapsedTime = timer.elapsedTime * 0.1;
			this.pointLight.position.x = Math.sin(elapsedTime * 7) * 300;
			this.pointLight.position.y = Math.cos(elapsedTime * 5) * 400;
			this.pointLight.position.z = Math.cos(elapsedTime * 3) * 300;
		}
	}
}

class InstanceUniformNode extends THREE.NodeNode {
	updateType: any = null;
	inputNode: any = null;

	constructor() {
		super('vec3');

		this.updateType = THREE.NodeUpdateType.Object;

		this.inputNode = new THREE.ColorNode();
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
