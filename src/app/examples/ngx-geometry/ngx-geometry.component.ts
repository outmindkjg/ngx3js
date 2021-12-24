import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxBaseComponent, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-ngx-geometry',
	templateUrl: './ngx-geometry.component.html',
	styleUrls: ['./ngx-geometry.component.scss'],
})
export class NgxGeometryComponent extends NgxBaseComponent<{
	color: number;
	geometry: {
		type: string;
		width: number;
		height: number;
		depth: number;
		radius: number;
		segments: number;
	};
}> {
	constructor(private route: ActivatedRoute) {
		super(
			{
				color: 0x999999,
				geometry: {
					type: 'BoxBufferGeometry',
					width: 2,
					height: 2,
					depth: 2,
					radius: 1,
					segments: 1,
				},
			},
			[
				{ name: 'color', type: 'color' },
				{
					name: 'geometry',
					type: 'folder',
					control: 'geometry',
					children: [
						{
							name: 'type',
							type: 'select',
							select: [
								'BoxBufferGeometry',
								'BoxLineGeometry',
								//	'BufferGeometry',
								'CapsuleGeometry',
								'CircleBufferGeometry',
								'CircleDepthGeometry',
								'ConeBufferGeometry',
								'ConvexGeometry',
								'CylinderBufferGeometry',
								//	'DecalGeometry',
								'DodecahedronBufferGeometry',
								//	'ExtrudeBufferGeometry',
								// 'GridGeometry',
								'IcosahedronBufferGeometry',
								//	'InstancedBufferGeometry',
								//	'LatheBufferGeometry',
								//	'LightningStrikeGeometry',
								//	'LineGeometry',
								'OctahedronBufferGeometry',
								'ParametricGeometry',
								'ParametricPlaneGeometry',
								'ParametricSphereGeometry',
								'ParametricTorusKnotGeometry',
								//	'ParametricTubeGeometry',
								'PlaneBufferGeometry',
								'PlaneDepthGeometry',
								'PlanePerlinGeometry',
								//	'PolyhedronBufferGeometry',
								'RingBufferGeometry',
								'RingDepthGeometry',
								//	'RollerCoasterGeometry',
								//	'RollerCoasterLiftersGeometry',
								//	'RollerCoasterShadowGeometry',
								//	'RollerCoasterSkyGeometry',
								//	'RollerCoasterTreesGeometry',
								//	'RopeGeometry',
								'RoundedBoxGeometry',
								//	'ShapeBufferGeometry',
								'SphereBufferGeometry',
								'StarDepthGeometry',
								'StarGeometry',
								'TeapotGeometry',
								'TetrahedronBufferGeometry',
								'TextGeometry',
								'TorusBufferGeometry',
								'TorusKnotBufferGeometry',
								//	'TubeBufferGeometry',
							],
							listen: true,
							change: () => {
								this.changeGeometry();
							},
						},
						{
							name: 'width',
							type: 'number',
							min: 1,
							max: 2.5,
							step: 0.1,
							listen: true,
						},
						{
							name: 'height',
							type: 'number',
							min: 1,
							max: 2.5,
							step: 0.1,
							listen: true,
						},
						{
							name: 'depth',
							type: 'number',
							min: 1,
							max: 2.5,
							step: 0.1,
							listen: true,
						},
						{
							name: 'radius',
							type: 'number',
							min: 0.5,
							max: 1.25,
							step: 0.1,
							listen: true,
						},
						{
							name: 'segments',
							type: 'number',
							min: 1,
							max: 30,
							step: 1,
							listen: true,
						},
					],
				},
			],
			true,
			false
		);
	}

	changeGeometry() {
		this.meshType = 'mesh';
		switch (this.controls.geometry.type) {
			case 'CircleBufferGeometry':
			case 'CircleDepthGeometry':
				this.controls.geometry.segments = 30;
				break;
			case 'CapsuleGeometry':
				this.controls.geometry.segments = 20;
				break;
			case 'StarDepthGeometry':
			case 'StarGeometry':
				this.controls.geometry.segments = 5;
				break;
			case 'BoxLineGeometry':
				this.meshType = 'line';
				break;
		}
	}

	meshType: string = 'mesh';

	ngOnInit() {
		this.subscribeRefer(
			'router',
			this.route.params.subscribe((params) => {
				if (params['type']) {
					switch (params['type']) {
						case 'BufferGeometry':
						case 'DecalGeometry':
						case 'ExtrudeBufferGeometry':
						case 'GridGeometry':
						case 'InstancedBufferGeometry':
						case 'LatheBufferGeometry':
						case 'LightningStrikeGeometry':
						case 'LineGeometry':
						case 'ParametricTubeGeometry':
						case 'PolyhedronBufferGeometry':
						case 'RollerCoasterGeometry':
						case 'RollerCoasterLiftersGeometry':
						case 'RollerCoasterShadowGeometry':
						case 'RollerCoasterSkyGeometry':
						case 'RollerCoasterTreesGeometry':
						case 'RopeGeometry':
						case 'ShapeBufferGeometry':
						case 'TubeBufferGeometry':
							break;
						case 'BoxGeometry':
							this.controls.geometry.type = 'BoxBufferGeometry';
							this.changeGeometry();
							break;
						case 'CircleGeometry':
							this.controls.geometry.type = 'CircleBufferGeometry';
							this.changeGeometry();
							break;
						case 'ConeGeometry':
							this.controls.geometry.type = 'ConeBufferGeometry';
							this.changeGeometry();
							break;
						case 'CylinderGeometry':
							this.controls.geometry.type = 'CylinderBufferGeometry';
							this.changeGeometry();
							break;
						case 'DodecahedronGeometry':
							this.controls.geometry.type = 'DodecahedronBufferGeometry';
							this.changeGeometry();
							break;
						case 'IcosahedronGeometry':
							this.controls.geometry.type = 'IcosahedronBufferGeometry';
							this.changeGeometry();
							break;
						case 'OctahedronGeometry':
							this.controls.geometry.type = 'OctahedronBufferGeometry';
							this.changeGeometry();
							break;
						case 'PlaneGeometry':
							this.controls.geometry.type = 'PlaneBufferGeometry';
							this.changeGeometry();
							break;
						case 'RingGeometry':
							this.controls.geometry.type = 'RingBufferGeometry';
							this.changeGeometry();
							break;
						case 'SphereGeometry':
							this.controls.geometry.type = 'SphereBufferGeometry';
							this.changeGeometry();
							break;
						case 'TetrahedronGeometry':
							this.controls.geometry.type = 'TetrahedronBufferGeometry';
							this.changeGeometry();
							break;
						case 'TorusGeometry':
							this.controls.geometry.type = 'TorusBufferGeometry';
							this.changeGeometry();
							break;
						case 'TorusKnotGeometry':
							this.controls.geometry.type = 'TorusKnotBufferGeometry';
							this.changeGeometry();
							break;
						default:
							this.controls.geometry.type = params['type'];
							this.changeGeometry();
							break;
					}
				}
			})
		);
	}

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.meshObject3d !== null) {
			const elapsedTime = timer.elapsedTime;
			this.meshObject3d.rotation.y = elapsedTime / 5;
		}
	}
}
