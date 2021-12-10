import { Component } from '@angular/core';
import { BaseComponent, I3JS, MeshComponent, RendererEvent } from 'ngx3js';

@Component({
	selector: 'app-webgl-geometry-terrain-raycast',
	templateUrl: './webgl-geometry-terrain-raycast.component.html',
	styleUrls: ['./webgl-geometry-terrain-raycast.component.scss'],
})
export class WebglGeometryTerrainRaycastComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	helper: I3JS.IMesh = null;
	setHelper(helper: MeshComponent) {
		this.helper = helper.getRealMesh() as any ;
	}

	setMesh(mesh: MeshComponent) {
		super.setMesh(mesh);
		if (this.mesh !== null) {
			this.meshObject3d = this.mesh.getRealMesh() as any;
		}
	}

	setEventListener(event: RendererEvent) {
		switch (event.type) {
			case 'pointermove':
			case 'mousemove':
				if (this.camera !== null && this.helper !== null) {
					const intersect = this.camera.getIntersection(
						event.mouse,
						this.meshObject3d
					);
					if (intersect !== null) {
						this.helper.position.set(0, 0, 0);
						this.helper.lookAt(intersect.face.normal);
						this.helper.position.copy(intersect.point);
					}
				}
				break;
			default:
				break;
		}
	}
}
