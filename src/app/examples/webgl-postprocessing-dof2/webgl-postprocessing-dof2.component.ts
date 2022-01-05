import { Component } from '@angular/core';
import { I3JS, NgxBaseComponent, NgxMeshComponent, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-postprocessing-dof2',
	templateUrl: './webgl-postprocessing-dof2.component.html',
	styleUrls: ['./webgl-postprocessing-dof2.component.scss'],
})
export class WebglPostprocessingDof2Component extends NgxBaseComponent<{
	enabled: true;
	jsDepthCalculation: true;
	shaderFocus: false;

	fstop: 2.2;
	maxblur: 1.0;

	showFocus: false;
	focalDepth: 2.8;
	manualdof: false;
	vignetting: false;
	depthblur: false;

	threshold: 0.5;
	gain: 2.0;
	bias: 0.5;
	fringe: 0.7;
	focalLength: 35;
	noise: true;
	pentagon: false;
	dithering: 0.0001;
	rings: 3;
	samples: 4;
}> {
	constructor() {
		super(
			{
				enabled: true,
				jsDepthCalculation: true,
				shaderFocus: false,
				fstop: 2.2,
				maxblur: 1.0,
				showFocus: false,
				focalDepth: 2.8,
				manualdof: false,
				vignetting: false,
				depthblur: false,
				threshold: 0.5,
				gain: 2.0,
				bias: 0.5,
				fringe: 0.7,
				focalLength: 35,
				noise: true,
				pentagon: false,
				dithering: 0.0001,
				rings: 3,
				samples: 4,
			},
			[
				{ name: 'enabled', type: 'checkbox' },
				{ name: 'jsDepthCalculation', type: 'checkbox' },
				{ name: 'shaderFocus', type: 'checkbox' },
				{
					name: 'focalDepth',
					type: 'number',
					min: 0.0,
					max: 200.0,
					listen: true,
				},
				{ name: 'fstop', type: 'number', min: 0.1, max: 22, step: 0.001 },
				{ name: 'maxblur', type: 'number', min: 0.0, max: 5.0, step: 0.025 },
				{ name: 'showFocus', type: 'checkbox' },
				{ name: 'manualdof', type: 'checkbox' },
				{ name: 'vignetting', type: 'checkbox' },
				{ name: 'depthblur', type: 'checkbox' },
				{ name: 'threshold', type: 'number', min: 0.0, max: 1, step: 0.001 },
				{ name: 'gain', type: 'number', min: 0.0, max: 100.0, step: 0.001 },
				{ name: 'bias', type: 'number', min: 0.0, max: 3.0, step: 0.001 },
				{ name: 'fringe', type: 'number', min: 0.0, max: 5.0, step: 0.001 },
				{
					name: 'focalLength',
					type: 'number',
					min: 16,
					max: 80,
					step: 0.001,
					finishChange: () => {
						if (this.camera !== null) {
							const camera =
								this.camera.getObject3d() as any;
							camera.setFocalLength(this.controls.focalLength);
						}
					},
				},
				{ name: 'noise', type: 'checkbox' },
				{ name: 'dithering', type: 'number', min: 0, max: 0.001, step: 0.0001 },
				{ name: 'pentagon', type: 'checkbox' },
				{ name: 'rings', type: 'number', min: 1, max: 8, step: 1 },
				{ name: 'samples', type: 'number', min: 1, max: 13, step: 1 },
			]
			,false , false);
	}

	ngOnInit() {
		this.planeInfos = [];
		for (let i = 0; i < 100; i++) {
			this.planeInfos.push({
				rotation: {
					x: Math.random() * 180,
					y: Math.random() * 180,
					z: Math.random() * 180,
				},
				position: {
					x: Math.random() * 150,
					y: Math.random() * 300,
					z: Math.random() * 150,
				},
			});
		}
		const monkeys = 20;
		this.monkeyInfos = [];
		for (let i = 0; i < monkeys; i++) {
			this.monkeyInfos.push({
				x: Math.sin((i / monkeys) * Math.PI * 2) * 200,
				y: Math.sin((i / monkeys) * Math.PI * 3) * 20,
				z: Math.cos((i / monkeys) * Math.PI * 2) * 200,
				ry: (i / monkeys) * 360,
			});
		}
		this.ballInfos = [];
		for (let i = 0; i < 20; i++) {
			this.ballInfos.push({
				x: (Math.random() - 0.5) * 200,
				y: Math.random() * 50,
				z: (Math.random() - 0.5) * 200,
				color: 0xffffff * Math.random(),
			});
		}
	}
	planeInfos: {
		rotation: { x: number; y: number; z: number };
		position: { x: number; y: number; z: number };
	}[] = [];

	monkeyInfos: { x: number; y: number; z: number; ry: number }[] = [];
	ballInfos: { x: number; y: number; z: number; color: number }[] = [];
	meshLeaves: I3JS.Object3D[] = [];
	setLeaves(mesh: NgxMeshComponent) {
		this.meshLeaves = mesh.getObject3d().children;
		this.meshLeaves.forEach((child) => {
			child.userData.refInfo = {
				rotation: {
					x: Math.random() * 0.1,
					y: Math.random() * 0.1,
					z: Math.random() * 0.1,
				},
				position: {
					x: Math.random() - 0.5,
					y: 0,
					z: Math.random() - 0.5,
				},
			};
		});
	}

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.meshLeaves !== null && this.meshLeaves.length > 0) {
			this.meshLeaves.forEach((plane) => {
				const info = plane.userData.refInfo;
				plane.rotation.x += info.rotation.x;
				plane.rotation.y += info.rotation.y;
				plane.rotation.z += info.rotation.z;
				plane.position.y -= 2;
				plane.position.x += info.position.x;
				plane.position.z += info.position.z;
				if (plane.position.y < 0) plane.position.y += 300;
			});
		}
	}
}
