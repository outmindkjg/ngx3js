import { Component } from '@angular/core';
import { Color, InstancedMesh, Matrix4, Vector3 } from 'three';
import { BaseComponent, RendererTimer, ThreeUtil } from '../../three';
import { PhysicsComponent } from '../../three/physics/physics.component';
import { RigidbodyComponent } from '../../three/rigidbody/rigidbody.component';

@Component({
  selector: 'app-physics-oimo-instancing',
  templateUrl: './physics-oimo-instancing.component.html',
  styleUrls: ['./physics-oimo-instancing.component.scss']
})
export class PhysicsOimoInstancingComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  makeMatrix(mat : Matrix4) {
    mat.setPosition( Math.random() - 0.5, Math.random() * 2, Math.random() - 0.5 );
  }

  makeColor(color : Color) {
    color.setHex( 0xffffff * Math.random() );
  }

  setPhysics(physics : PhysicsComponent) {
    this.physics = physics.getPhysics();
  }

  physics : any = null;

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.physics !== null && this.meshChildren !== null && this.meshChildren.length > 0) {
      const position = new Vector3();
      this.meshChildren.forEach((child : InstancedMesh) => {
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
