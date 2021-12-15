import { Component } from '@angular/core';
import { I3JS, NgxBaseComponent, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-ngx-camera',
	templateUrl: './ngx-camera.component.html',
	styleUrls: ['./ngx-camera.component.scss'],
})
export class NgxCameraComponent extends NgxBaseComponent<{
	environment: {
		clearColor: string;
		background: string;
	};
	camera: {
		type: string;
		near: number;
		far: number;
	};
	perspective: {
		fov: number;
		aspect: number;
	};
	orthographic: {
		orthoSize: number;
		left: number;
		right: number;
		top: number;
		bottom: number;
	};
	viewport: {
		enable: boolean;
		viewportType: string;
		x: number;
		y: number;
		width: number;
		height: number;
	};
	scissorTest: {
		enable: boolean;
		x: number;
		y: number;
		width: number;
		height: number;
	};
}> {
	constructor() {
		super(
			{
				environment: {
					clearColor: '0xffffff',
					background: '0x121212',
				},
				camera: {
					type: 'PerspectiveCamera',
					near: 1,
					far: 100,
				},
				perspective: {
					fov: 45,
					aspect: 1,
				},
				orthographic: {
					orthoSize: 10,
					left: -1,
					right: 1,
					top: 1,
					bottom: -1,
				},
				viewport: {
					enable: false,
					viewportType: 'renderer',
					x: 0,
					y: 0,
					width: 100,
					height: 100,
				},
				scissorTest: {
					enable: false,
					x: 0,
					y: 0,
					width: 100,
					height: 100,
				},
			},
			[
				{
					name: 'environment',
					type: 'folder',
					control: 'environment',
					children: [
						{ name: 'clearColor', type: 'color' },
						{ name: 'background', type: 'color' },
					],
				},
				{
					name: 'camera',
					type: 'folder',
					control: 'camera',
					children: [
						{
							name: 'type',
							type: 'select',
							select: ['PerspectiveCamera', 'OrthographicCamera'],
							change: () => {
								this.changeCamera();
							},
						},
						{ name: 'near', type: 'number', min: 5, max: 15, step: 0.2 },
						{ name: 'far', type: 'number', min: 15, max: 50, step: 1 },
					],
				},
				{
					name: 'perspective',
					type: 'folder',
					control: 'perspective',
					children: [
						{ name: 'fov', type: 'number', min: 20, max: 90, step: 1 },
						{ name: 'aspect', type: 'number', min: 0.7, max: 1.3, step: 0.02 },
					],
				},
				{
					name: 'orthographic',
					type: 'folder',
					control: 'orthographic',
					children: [
						{ name: 'orthoSize', type: 'number', min: 5, max: 15, step: 0.1 },
						{ name: 'left', type: 'number', min: -2, max: 0, step: 0.01 },
						{ name: 'right', type: 'number', min: 0, max: 2, step: 0.01 },
						{ name: 'top', type: 'number', min: 0, max: 2, step: 0.01 },
						{ name: 'bottom', type: 'number', min: -2, max: 0, step: 0.01 },
					],
				},
				{
					name: 'viewport',
					type: 'folder',
					control: 'viewport',
					children: [
						{ name: 'enable', type: 'checkbox' },
						{
							name: 'viewportType',
							type: 'select',
							select: ['renderer', 'viewoffset', 'camera'],
						},
						{ name: 'x', type: 'number', min: 0, max: 50, step: 5 },
						{ name: 'y', type: 'number', min: 0, max: 50, step: 5 },
						{ name: 'width', type: 'number', min: 0, max: 100, step: 5 },
						{ name: 'height', type: 'number', min: 0, max: 100, step: 5 },
					],
				},
				{
					name: 'scissorTest',
					type: 'folder',
					control: 'scissorTest',
					children: [
						{ name: 'enable', type: 'checkbox' },
						{ name: 'x', type: 'number', min: 0, max: 50, step: 5 },
						{ name: 'y', type: 'number', min: 0, max: 50, step: 5 },
						{ name: 'width', type: 'number', min: 0, max: 100, step: 5 },
						{ name: 'height', type: 'number', min: 0, max: 100, step: 5 },
					],
				},
			],
			true,
			false
		);
	}

	cameraPosition: { x: number; y: number; z: number } = { x: 0, y: 5, z: 10 };
	changeCamera() {
		if (this.cameraObject3d !== null) {
			const position: I3JS.Vector3 = this.cameraObject3d.position;
			this.cameraPosition.x = position.x;
			this.cameraPosition.y = position.y;
			this.cameraPosition.z = position.z;
		}
	}

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.meshObject3d !== null) {
			const elapsedTime = timer.elapsedTime;
			this.meshObject3d.rotation.y = elapsedTime / 5;
			this.meshChildren.forEach((child) => {
				child.rotation.x = elapsedTime / 2;
				child.rotation.y = elapsedTime / 4;
			});
		}
	}
}
