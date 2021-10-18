import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-geometry-normals',
	templateUrl: './webgl-geometry-normals.component.html',
	styleUrls: ['./webgl-geometry-normals.component.scss'],
})
export class WebglGeometryNormalsComponent extends BaseComponent<{
	geometry: string;
}> {
	geometryInfo: {
		type: string;
		[key: string]: number | string;
	};
	constructor() {
		super(
			{
				geometry: 'Box',
			},
			[
				{
					name: 'geometry',
					title: 'Geometry',
					type: 'select',
					select: [
						'Box',
						'Circle',
						'Cylinder',
						'Icosahedron',
						'Octahedron',
						'Plane',
						'Ring',
						'Sphere',
						'Torus',
						'TorusKnot',
					],
					change: () => {
						this.changeGeometry(this.controls.geometry);
					},
				},
			]
		);
	}

	ngOnInit() {
		this.changeGeometry(this.controls.geometry);
	}

	changeGeometry(geoType: string) {
		switch (geoType) {
			case 'Box':
				this.geometryInfo = {
					type: 'box',
					width: 200,
					height: 200,
					depth: 200,
					widthSegments: 2,
					heightSegments: 2,
					depthSegments: 2,
				};
				break;
			case 'Circle':
				this.geometryInfo = {
					type: 'Circle',
					radius: 200,
					segments: 32,
				};
				break;
			case 'Cylinder':
				this.geometryInfo = {
					type: 'Cylinder',
					radiusTop: 75,
					radiusBottom: 75,
					height: 200,
					radialSegments: 8,
					heightSegments: 8,
				};
				break;
			case 'Icosahedron':
				this.geometryInfo = {
					type: 'Icosahedron',
					radius: 100,
					detail: 1,
				};
				break;
			case 'Octahedron':
				this.geometryInfo = {
					type: 'Octahedron',
					radius: 200,
					detail: 1,
				};
				break;
			case 'Plane':
				this.geometryInfo = {
					type: 'Plane',
					width: 200,
					height: 200,
					widthSegments: 4,
					heightSegments: 4,
				};
				break;
			case 'Ring':
				this.geometryInfo = {
					type: 'Ring',
					innerRadius: 32,
					outerRadius: 64,
					thetaSegments: 16,
				};
				break;
			case 'Sphere':
				this.geometryInfo = {
					type: 'Sphere',
					radius: 100,
					widthSegments: 12,
					heightSegments: 12,
				};
				break;
			case 'Torus':
				this.geometryInfo = {
					type: 'Torus',
					radius: 64,
					tube: 16,
					radialSegments: 12,
					tubularSegments: 12,
				};
				break;
			case 'TorusKnot':
				this.geometryInfo = {
					type: 'TorusKnot',
					radius: 64,
					tube: 16,
					radialSegments: 64,
					TubularSegments: 8,
				};
				break;
		}
	}
}
