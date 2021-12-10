import { Component } from '@angular/core';
import { BaseComponent, I3JS, MeshComponent, THREE, RendererEvent } from 'ngx3js';

@Component({
	selector: 'app-webgl-raycast-sprite',
	templateUrl: './webgl-raycast-sprite.component.html',
	styleUrls: ['./webgl-raycast-sprite.component.scss'],
})
export class WebglRaycastSpriteComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	setMesh(mesh: MeshComponent) {
		super.setMesh(mesh);
		this.sprites = [];
		mesh.getObject3d().traverse((child : any) => {
			if (child instanceof THREE.Sprite) {
				this.sprites.push(child);
			}
		});
	}

	sprites: I3JS.ISprite[] = [];

	selectedSprites: I3JS.ISprite = null;
	onMouseOver(event: RendererEvent) {
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
