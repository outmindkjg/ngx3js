import { Component } from '@angular/core';
import {
	NgxBaseComponent,
	NgxMeshComponent,
	IRendererEvent,
	IRendererTimer
} from 'ngx3js';

@Component({
	selector: 'app-webgl-performance-static',
	templateUrl: './webgl-performance-static.component.html',
	styleUrls: ['./webgl-performance-static.component.scss'],
})
export class WebglPerformanceStaticComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	ngOnInit() {
		this.meshInfos = [];
		for (let i = 0; i < 1000; i++) {
			const scale = Math.random() * 50 + 100;
			this.meshInfos.push({
				position: {
					x: Math.random() * 8000 - 4000,
					y: Math.random() * 8000 - 4000,
					z: Math.random() * 8000 - 4000,
				},
				rotation: {
					x: Math.random() * 360,
					y: Math.random() * 360,
					z: Math.random() * 360,
				},
				scale: {
					x: scale,
					y: scale,
					z: scale,
				},
			});
		}
	}

	meshInfos: {
		position: { x: number; y: number; z: number };
		rotation: { x: number; y: number; z: number };
		scale: { x: number; y: number; z: number };
	}[] = [];

	setMesh(mesh: NgxMeshComponent) {
		super.setMesh(mesh);
		this.meshChildren = mesh.getObject3d().children;
	}

	mouseX: number = 0;
	mouseY: number = 0;

	onMouseMove(event: IRendererEvent) {
		this.mouseX = event.mouse.x * event.width * 2;
		this.mouseY = event.mouse.y * event.height * 2;
	}

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.camera !== null) {
			const camera = this.camera.getObject3d();
			camera.position.x += (this.mouseX - camera.position.x) * 0.05;
			camera.position.y += (-this.mouseY - camera.position.y) * 0.05;
			camera.lookAt(0, 0, 0);
		}
	}
}
