import { Component } from '@angular/core';
import { BaseComponent, PhysicsComponent, RendererTimer, RigidbodyComponent, ThreeUtil, THREE } from 'ngx3js';

@Component({
  selector: 'app-physics-oimo-instancing',
  templateUrl: './physics-oimo-instancing.component.html',
  styleUrls: ['./physics-oimo-instancing.component.scss']
})
export class PhysicsOimoInstancingComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  makeMatrix(mat : THREE.Matrix4) {
    mat.setPosition( Math.random() - 0.5, Math.random() * 2, Math.random() - 0.5 );
  }

  makeColor(color : THREE.Color) {
    color.setHex( 0xffffff * Math.random() );
  }

  setPhysics(physics : PhysicsComponent) {
    this.physics = physics.getPhysics();
  }

  physics : any = null;

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.physics !== null && this.meshChildren !== null && this.meshChildren.length > 0) {
      const position = new THREE.Vector3();
      this.meshChildren.forEach((child : THREE.InstancedMesh) => {
        const rigidbodyComponent : RigidbodyComponent = ThreeUtil.getRigidbodyComponent(child);
        if (rigidbodyComponent !== null) {
          for(let i = 0 ; i < 5; i ++) {
            let index = Math.min(child.count - 1, Math.floor( Math.random() * child.count ));
            position.set( Math.random() * 0.2, Math.random() + 1, Math.random() * 0.2 );
            try {
              rigidbodyComponent.setPosition( position.x,position.y,position.z, index );
            } catch(ex) {
            }
          }
        }
      });
    }
  }
}
