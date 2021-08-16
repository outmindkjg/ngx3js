import { Component } from '@angular/core';
import { BaseComponent, MeshComponent, RendererEvent } from '../../three';
import * as THREE from 'three';

@Component({
  selector: 'app-webgl-interactive-voxelpainter',
  templateUrl: './webgl-interactive-voxelpainter.component.html',
  styleUrls: ['./webgl-interactive-voxelpainter.component.scss']
})
export class WebglInteractiveVoxelpainterComponent extends BaseComponent<{
  clear : () => void
}> {

  constructor() {
    super({
      clear : () => {
        this.cubePositions = [];
      }
    },[{ name : 'clear', type : 'button'}]);
  }

  rollOver : THREE.Object3D = null;

  setRollOver(mesh : MeshComponent) {
    this.rollOver = mesh.getObject3d();
  }

  plane : THREE.Object3D = null;

  setPlane(mesh : MeshComponent) {
    this.plane = mesh.getObject3d();
  }

  onMouseEvent(event : RendererEvent) {
    if (this.camera !== null && this.plane !== null && this.rollOver !== null) {
      const mesh = this.mesh.getObject3d();
      const intersect = this.camera.getIntersection( event.mouse, [this.plane, ...mesh.children] );
      if ( intersect !== null) {
        this.rollOver.position.copy( intersect.point ).add( intersect.face.normal );
        if (this.rollOver.position.y < 0) {
          this.rollOver.position.y = 0;
        }
        this.rollOver.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
        switch(event.type) {
          case 'click' :
            if(event.event.shiftKey) {
              if ( intersect.object !== this.plane ) {
                intersect.object.parent.remove(intersect.object);
              }
            } else {
              this.cubePositions.push(this.rollOver.position.clone());
            }
            break;
        }
      }
    }
  }

  cubePositions : any[] = [];

}
