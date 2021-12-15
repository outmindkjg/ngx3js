import { Component } from '@angular/core';
import { I3JS, NgxBaseComponent, NgxMeshComponent, IRendererEvent, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-raycast-sprite',
	templateUrl: './webgl-raycast-sprite.component.html',
	styleUrls: ['./webgl-raycast-sprite.component.scss'],
})
export class WebglRaycastSpriteComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	setMesh(mesh: NgxMeshComponent) {
		super.setMesh(mesh);
		this.sprites = [];
		mesh.getObject3d().traverse((child : any) => {
			if (child instanceof THREE.Sprite) {
				this.sprites.push(child);
			}
		});
	}

	sprites: I3JS.Sprite[] = [];

	selectedSprites: I3JS.Sprite = null;
	onMouseOver(event: IRendererEvent) {
		if (this.camera !== null && this.sprites.length > 0) {
			const intersect = this.camera.getIntersection(event.mouse, this.sprites);
			if (this.selectedSprites !== null) {
				this.selectedSprites.material.color.set('#69f');
			}
			if (intersect !== null && intersect.object !== null) {
				this.selectedSprites = intersect.object as any;
				this.selectedSprites.material.color.set('#f00');
			}
		}
	}
}
