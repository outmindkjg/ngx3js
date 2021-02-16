import { Subject, Observable } from 'rxjs';
import { RendererTimer, ThreeUtil } from './../interface';
import { Component, Input, OnInit } from '@angular/core';
import Ammo from 'ammojs-typed';

@Component({
  selector: 'three-physics',
  templateUrl: './physics.component.html',
  styleUrls: ['./physics.component.scss'],
})
export class PhysicsComponent implements OnInit {
  @Input() gravity: number = null;
  @Input() gravityX: number = null;
  @Input() gravityY: number = null;
  @Input() gravityZ: number = null;

  private getGravity(def?: number): Ammo.btVector3 {
    const gravity = ThreeUtil.getTypeSafe(this.gravity, def);
    const gravityX = ThreeUtil.getTypeSafe(this.gravityX, 0);
    const gravityY = ThreeUtil.getTypeSafe(this.gravityY, gravity);
    const gravityZ = ThreeUtil.getTypeSafe(this.gravityZ, 0);
    return new this.ammo.btVector3(gravityX, gravityY, gravityZ);
  }

  constructor() {}

  ngOnInit(): void {
    Ammo().then((AmmoLib: typeof Ammo) => {
      this.ammo = AmmoLib;
      this.getPhysics();
    });
  }

  private ammo: typeof Ammo = null;
  private physics: Ammo.btDiscreteDynamicsWorld = null;

  getAmmo() {
    return this.ammo;
  }

  protected _physicsSubject: Subject<Ammo.btDynamicsWorld> = new Subject<Ammo.btDynamicsWorld>();

  physicsSubscribe(): Observable<Ammo.btDynamicsWorld> {
    return this._physicsSubject.asObservable();
  }

  getPhysics(): Ammo.btDiscreteDynamicsWorld {
    if (this.physics === null && this.ammo !== null) {
      const collisionConfiguration = new this.ammo.btSoftBodyRigidBodyCollisionConfiguration();
      const dispatcher = new this.ammo.btCollisionDispatcher(
        collisionConfiguration
      );
      const broadphase = new this.ammo.btDbvtBroadphase();
      const solver = new this.ammo.btSequentialImpulseConstraintSolver();
      const softBodySolver = new this.ammo.btDefaultSoftBodySolver();
      const physics = new this.ammo.btSoftRigidDynamicsWorld(
        dispatcher,
        broadphase,
        solver,
        collisionConfiguration,
        softBodySolver
      );
      const gravity = this.getGravity(-9.8);
      physics.setGravity(gravity);
      physics.getWorldInfo().set_m_gravity(gravity);
      this.physics = physics;
      this._physicsSubject.next(this.physics);
    }
    return this.physics;
  }

  logSeq : number = 0;

  getCollisionObject(body : Ammo.btCollisionObject) : THREE.Object3D {
    const btRigidBody =  this.ammo['castObject'](body, this.ammo.btRigidBody);
    if (btRigidBody !== null && btRigidBody !== undefined && btRigidBody['object3d'] !== null && btRigidBody['object3d'] !== undefined ) {
      return btRigidBody['object3d'];
    }
    return null;
  }

  update(timer: RendererTimer) {
    if (
      this.ammo !== null &&
      this.physics instanceof this.ammo.btSoftRigidDynamicsWorld
    ) {
      this.physics.stepSimulation(timer.delta, 10);
      this.logSeq++;
      if (this.logSeq % 1000 === 0) {
        let dispatcher = this.physics.getDispatcher();
        let numManifolds = dispatcher.getNumManifolds();
        for (let i = 0; i < numManifolds; i++) {
          let contactManifold = dispatcher.getManifoldByIndexInternal(i);
          const body0 = this.getCollisionObject(contactManifold.getBody0());
          const body1 = this.getCollisionObject(contactManifold.getBody1());
          console.log(body0.name + ' => ' + body1.name );
          let numContacts = contactManifold.getNumContacts();
          const contactPoints : Ammo.btManifoldPoint[] = [];
          for (let j = 0; j < numContacts; j++) {
            contactPoints.push(contactManifold.getContactPoint(j));
          }
          if (body0 !== null) {
            body0.dispatchEvent({
              type : 'collision',
              points : contactPoints,
              collision : body1
            })
          }
        }
      }
    }
  }
}
