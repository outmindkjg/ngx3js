import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
	IRendererTimer,
	NgxBaseComponent,
	NgxRendererComponent,
	THREE
} from 'ngx3js';

@Component({
	selector: 'app-ngx-geometry-browser',
	templateUrl: './ngx-geometry-browser.component.html',
	styleUrls: ['./ngx-geometry-browser.component.scss'],
})
export class NgxGeometryBrowserComponent extends NgxBaseComponent<{
	geometry: string;
}> {
	constructor(private route: ActivatedRoute) {
		super(
			{
				geometry: 'BoxGeometry',
			},
			[
				{
					type: 'select',
					name: 'geometry',
					listen: true,
					select: [
						'BoxGeometry',
						'CylinderGeometry',
						'ConeGeometry',
						'CircleGeometry',
						'DodecahedronGeometry',
						'IcosahedronGeometry',
						'LatheGeometry',
						'OctahedronGeometry',
						'PlaneGeometry',
						'RingGeometry',
						'SphereGeometry',
						'TetrahedronGeometry',
						'TorusGeometry',
						'TorusKnotGeometry',
						'TubeGeometry',
						'ShapeGeometry',
						'ExtrudeGeometry',
					],
					change: () => {
						this.changeGeometry();
					},
				},
				{ type: 'folder', name: 'attribute', children: [] },
			],
			false,
			false
		);
	}

	ngOnInit(): void {
		this.subscribeRefer(
			'router',
			this.route.params.subscribe((params) => {
				if (params['type']) {
					this.controls.geometry = params['type'];
					this.changeGeometry();
				}
			})
		);
		this.changeGeometry();
	}

	setRender(renderer: NgxRendererComponent): void {
		super.setRender(renderer);
		this.changeGeometry();
	}

	private lastGeometry: string = null;
	private lastGuiGeometry: string = null;

	changeGeometry() {
		if (this.lastGeometry !== this.controls.geometry) {
			switch (this.controls.geometry) {
				case 'BoxGeometry':
					this.geometryAttr = {
						type: this.controls.geometry,
						width: 15,
						height: 15,
						depth: 15,
						widthSegments: 1,
						heightSegments: 1,
						depthSegments: 1,
					};
					break;
				case 'CylinderGeometry':
					this.geometryAttr = {
						type: this.controls.geometry,
						radiusTop: 5,
						radiusBottom: 5,
						height: 10,
						radialSegments: 8,
						heightSegments: 1,
						openEnded: false,
						thetaStart: 0,
						thetaLength: 360,
					};
					break;
				case 'ConeGeometry':
					this.geometryAttr = {
						type: this.controls.geometry,
						radius: 5,
						height: 10,
						radialSegments: 8,
						heightSegments: 1,
						openEnded: false,
						thetaStart: 0,
						thetaLength: 360,
					};
					break;
				case 'CircleGeometry':
					this.geometryAttr = {
						type: this.controls.geometry,
						radius: 10,
						segments: 32,
						thetaStart: 0,
						thetaLength: 360,
					};
					break;
				case 'DodecahedronGeometry':
					this.geometryAttr = {
						type: this.controls.geometry,
						radius: 10,
						detail: 0,
					};
					break;
				case 'IcosahedronGeometry':
					this.geometryAttr = {
						type: this.controls.geometry,
						radius: 10,
						detail: 0,
					};
					break;
				case 'LatheGeometry':
					const points = [];
					for (let i = 0; i < 10; i++) {
						points.push(
							new THREE.Vector2(Math.sin(i * 0.2) * 10 + 5, (i - 5) * 2)
						);
					}
					this.geometryAttr = {
						type: this.controls.geometry,
						points: points,
						segments: 12,
						phiStart: 0,
						phiLength: 360,
					};
					break;
				case 'OctahedronGeometry':
					this.geometryAttr = {
						type: this.controls.geometry,
						radius: 10,
						detail: 0,
					};
					break;
				case 'PlaneGeometry':
					this.geometryAttr = {
						type: this.controls.geometry,
						width: 10,
						height: 10,
						widthSegments: 1,
						heightSegments: 1,
					};
					break;
				case 'RingGeometry':
					this.geometryAttr = {
						type: this.controls.geometry,
						innerRadius: 5,
						outerRadius: 10,
						thetaSegments: 8,
						phiSegments: 8,
						thetaStart: 0,
						thetaLength: 360,
					};
					break;
				case 'SphereGeometry':
					this.geometryAttr = {
						type: this.controls.geometry,
						radius: 15,
						widthSegments: 32,
						heightSegments: 16,
						phiStart: 0,
						phiLength: 360,
						thetaStart: 0,
						thetaLength: 180,
					};
					break;
				case 'TetrahedronGeometry':
					this.geometryAttr = {
						type: this.controls.geometry,
						radius: 10,
						detail: 0,
					};
					break;
				case 'TorusGeometry':
					this.geometryAttr = {
						type: this.controls.geometry,
						radius: 10,
						tube: 3,
						radialSegments: 16,
						tubularSegments: 100,
						arc: 360,
					};
					break;
				case 'TorusKnotGeometry':
					this.geometryAttr = {
						type: this.controls.geometry,
						radius: 10,
						tube: 3,
						tubularSegments: 64,
						radialSegments: 32,
						p: 2,
						q: 3,
					};
					break;
				case 'TubeGeometry':
					this.geometryAttr = {
						type: this.controls.geometry,
						curve: new CustomSinCurve(10),
						segments: 20,
						radius: 2,
						radialSegments: 8,
						closed: false,
					};
					break;
				case 'ShapeGeometry':
					const heartShape = new THREE.Shape();
					const x = 0,
						y = 0;
					heartShape.moveTo(x + 5, y + 5);
					heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
					heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
					heartShape.bezierCurveTo(
						x - 6,
						y + 11,
						x - 3,
						y + 15.4,
						x + 5,
						y + 19
					);
					heartShape.bezierCurveTo(
						x + 12,
						y + 15.4,
						x + 16,
						y + 11,
						x + 16,
						y + 7
					);
					heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
					heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);
					this.geometryAttr = {
						type: this.controls.geometry,
						shapes: heartShape,
						segments: 12,
						center: true,
					};
					break;
				case 'ExtrudeGeometry':
					const length = 12,
						width = 8;
					const shape = new THREE.Shape();
					shape.moveTo(0, 0);
					shape.lineTo(0, width);
					shape.lineTo(length, width);
					shape.lineTo(length, 0);
					shape.lineTo(0, 0);

					this.geometryAttr = {
						type: this.controls.geometry,
						steps: 2,
						depth: 16,
						bevelEnabled: true,
						bevelThickness: 1,
						bevelSize: 1,
						bevelOffset: 0,
						bevelSegments: 1,
						shapes: shape,
					};
					break;
			}
			this.lastGeometry = this.controls.geometry;
		}
		if (this.renderer !== null && this.lastGuiGeometry !== this.lastGeometry) {
			this.lastGuiGeometry = this.lastGeometry;
			super.clearGui('attribute');
			Object.entries(this.geometryAttr).forEach(([key, value]) => {
				switch (key) {
					case 'tube':
					case 'width':
					case 'width':
					case 'radius':
					case 'innerRadius':
					case 'outerRadius':
						this.addGui(
							key,
							value,
							null,
							false,
							0,
							30,
							this.geometryAttr,
							'attribute'
						);
						break;
					case 'height':
						this.addGui(
							key,
							value,
							null,
							false,
							1,
							50,
							this.geometryAttr,
							'attribute'
						);
						break;
					case 'steps':
					case 'widthSegments':
					case 'heightSegments':
					case 'depthSegments':
						const depthSegments = this.addGui(
							key,
							value,
							null,
							false,
							1,
							10,
							this.geometryAttr,
							'attribute'
						);
						depthSegments.step(1);
						break;
					case 'radiusTop':
					case 'radiusBottom':
						this.addGui(
							key,
							value,
							null,
							false,
							0,
							30,
							this.geometryAttr,
							'attribute'
						);
						break;
					case 'tubularSegments':
					case 'segments':
					case 'thetaSegments':
					case 'phiSegments':
					case 'radialSegments':
						const radialSegments = this.addGui(
							key,
							value,
							null,
							false,
							3,
							64,
							this.geometryAttr,
							'attribute'
						);
						radialSegments.step(1);
						break;
					case 'detail':
						const detail = this.addGui(
							key,
							value,
							null,
							false,
							0,
							5,
							this.geometryAttr,
							'attribute'
						);
						detail.step(1);
						break;
					case 'p':
					case 'q':
						const pq = this.addGui(
							key,
							value,
							null,
							false,
							1,
							20,
							this.geometryAttr,
							'attribute'
						);
						pq.step(1);
						break;
					case 'bevelSegments':
					case 'bevelThickness':
					case 'bevelSize':
						const bevelSize = this.addGui(
							key,
							value,
							null,
							false,
							0,
							5,
							this.geometryAttr,
							'attribute'
						);
						bevelSize.step(1);
						break;
					case 'bevelOffset':
						const bevelOffset = this.addGui(
							key,
							value,
							null,
							false,
							-4,
							5,
							this.geometryAttr,
							'attribute'
						);
						bevelOffset.step(1);
						break;
					case 'bevelEnabled':
					case 'closed':
					case 'openEnded':
						this.addGui(
							key,
							value,
							null,
							undefined,
							undefined,
							undefined,
							this.geometryAttr,
							'attribute'
						);
						break;
					case 'arc':
					case 'phiStart':
					case 'phiLength':
					case 'thetaStart':
					case 'thetaLength':
						this.addGui(
							key,
							value,
							null,
							false,
							0,
							360,
							this.geometryAttr,
							'attribute'
						);
						break;
				}
			});
		}
	}

	geometryAttr: any = {
		type: 'BoxGeometry',
	};

	onRender(timer: IRendererTimer): void {
		super.onRender(timer);
		if (this.meshObject3d !== null) {
			const time = timer.delta * 0.5;
			this.meshObject3d.rotation.x += time;
			this.meshObject3d.rotation.y += time;
		}
	}
}

class CustomSinCurve extends THREE.Curve {
	scale: number = 1;
	constructor(scale = 1) {
		super();
		this.scale = scale;
	}

	getPoint(t, optionalTarget = new THREE.Vector3()) {
		const tx = t * 3 - 1.5;
		const ty = Math.sin(2 * Math.PI * t);
		const tz = 0;
		return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale);
	}
}
