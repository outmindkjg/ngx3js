import { Component } from '@angular/core';
import { Sprite } from 'three';
import { BaseComponent, MeshComponent, RendererEvent } from '../../three';

@Component({
  selector: 'app-webgl-raycast-sprite',
  templateUrl: './webgl-raycast-sprite.component.html',
  styleUrls: ['./webgl-raycast-sprite.component.scss']
})
export class WebglRaycastSpriteComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  setMesh(mesh : MeshComponent) {
    super.setMesh(mesh);
    this.sprites = [];
    mesh.getObject3d().traverse((child) => {
      if (child instanceof Sprite) {
        this.sprites.push(child);
      }
    })
  }

  sprites : Sprite[] = [];

  selectedSprites : Sprite = null;
  onMouseOver(event : RendererEvent) {
    if (this.camera !== null && this.sprites.length > 0) {
      const intersect = this.camera.getIntersection(event.mouse, this.sprites);
      if (this.selectedSprites !== null) {
        this.selectedSprites.material.color.set('#69f');
      }
      if (intersect !== null && intersect.object !== null) {
        this.selectedSprites = intersect.object as Sprite;
        this.selectedSprites.material.color.set('#f00');
      }
    }
  }
}
