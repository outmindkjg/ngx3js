import { Component } from '@angular/core';
import {
	BaseComponent, LightComponent, RendererTimer, THREE
} from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-instance-uniform-nodes',
	templateUrl: './webgl-materials-instance-uniform-nodes.component.html',
	styleUrls: ['./webgl-materials-instance-uniform-nodes.component.scss'],
})
export class WebglMaterialsInstanceUniformNodesComponent extends BaseComponent<{}> {
	constructor() {
		super(
			{
			},
			[]
		);
	}

	ngOnInit() {
		this.meshInfos = [];
		for ( let i = 0, l = 12; i < l; i ++ ) {
			this.meshInfos.push({
				color : Math.random() * 0xffffff,
				position : {
					x : (i % 4 ) * 200 - 400,
					y : 0,
					z : Math.floor( i / 4 ) * 200 - 200
				},
				rotation : {
					x : Math.random() * 200 - 100,
					y : Math.random() * 200 - 100,
					z : Math.random() * 200 - 100,
				}
			})
		}
	}

	pointLight : THREE.Object3D = null;

	setLight(light  : LightComponent) {
		this.pointLight = light.getLight();
	}

	meshInfos : {
		color : number;
		position : { x : number, y : number, z : number},
		rotation : { x : number, y : number, z : number},
	}[] = [];

	onRender(timer : RendererTimer) {
		super.onRender(timer);
		if (this.pointLight !== null) {
			const elapsedTime = timer.elapsedTime * 0.1 ;
			this.pointLight.position.x = Math.sin( elapsedTime * 7 ) * 300;
			this.pointLight.position.y = Math.cos( elapsedTime * 5 ) * 400;
			this.pointLight.position.z = Math.cos( elapsedTime * 3 ) * 300;
		}	
	}
}
