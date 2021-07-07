import { Component, ContentChildren, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import Ammo from 'ammojs-typed';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { RendererTimer, ThreeUtil } from './../interface';
import { ConvexObjectBreaker } from 'three/examples/jsm/misc/ConvexObjectBreaker';
import { PhysicsConstraintComponent } from './physics-constraint/physics-constraint.component';
import * as THREE from 'three';

@Component({
  selector: 'three-physics',
  templateUrl: './physics.component.html',
  styleUrls: ['./physics.component.scss'],
})
export class PhysicsComponent extends AbstractSubscribeComponent implements OnInit {
  @Input() private type:string = "";
  @Input() private useCollision :boolean = false;
  @Input() private gravity:number = null;
  @Input() private gravityX:number = null;
  @Input() private gravityY:number = null;
  @Input() private gravityZ:number = null;
  @ContentChildren(PhysicsConstraintComponent, { descendants: false }) private constraintList: QueryList<PhysicsConstraintComponent>;

  private getGravity(def?: number): Ammo.btVector3 {
    const gravity = ThreeUtil.getTypeSafe(this.gravity, def);
    const gravityX = ThreeUtil.getTypeSafe(this.gravityX, 0);
    const gravityY = ThreeUtil.getTypeSafe(this.gravityY, gravity);
    const gravityZ = ThreeUtil.getTypeSafe(this.gravityZ, 0);
    return new this.ammo.btVector3(gravityX, gravityY, gravityZ);
  }

  constructor() {
    super();
  }

  ngOnInit(): void {
    Ammo().then((AmmoLib: typeof Ammo) => {
      this.ammo = AmmoLib;
      this.getPhysics();
    });
    super.ngOnInit('physics');
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.physics) {
      this.addChanges(changes);
    }
  }

  ngAfterContentInit(): void {
    this.subscribeListQueryChange(this.constraintList, 'constraintList', 'constraint');
    super.ngAfterContentInit();
  }

  private ammo: typeof Ammo = null;
  private physics: Ammo.btSoftRigidDynamicsWorld = null;

  getAmmo(){
    return this.ammo;
  }

  private convexBreaker : ConvexObjectBreaker = null;
  
  getConvexObjectBreaker() :ConvexObjectBreaker {
    if (this.convexBreaker == null) {
      this.convexBreaker = new ConvexObjectBreaker();
    }
    return this.convexBreaker;
  }

  private softBodyHelpers : Ammo.btSoftBodyHelpers = null;

  getSoftBodyHelpers () :Ammo.btSoftBodyHelpers {
    if (this.softBodyHelpers == null) {
      this.softBodyHelpers = new this.ammo.btSoftBodyHelpers();
    }
    return this.softBodyHelpers;
  }

  protected applyChanges(changes: string[]) {
    if (this.physics !== null) {
      if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
        this.getPhysics();
        return;
      }
      if (!ThreeUtil.isOnlyIndexOf(changes, ['constraint','usecollision','gravity', 'gravityx', 'gravityy', 'gravityz'], this.OBJECT_ATTR)) {
        this.needUpdate = true;
        return;
      }
      if (ThreeUtil.isIndexOf(changes, ['gravityx', 'gravityy', 'gravityz'])) {
        changes = ThreeUtil.pushUniq(changes, ['gravity']);
      }
      changes.forEach((change) => {
        switch (change.toLowerCase()) {
          case 'constraint':
            this.unSubscribeReferList('constraintList');
            if (ThreeUtil.isNotNull(this.constraintList)) {
              this.constraintList.forEach((constraint) => {
                constraint.setPhysics(this.physics, this.ammo);
              });
              this.subscribeListQuery(this.constraintList, 'constraintList', 'constraint');
            }
            break;
          case 'gravity' :
            const gravity = this.getGravity(-9.8);
            // this.physics.setGravity(gravity);
            this.physics.getWorldInfo().set_m_gravity(gravity);
            break;
        }
      });
      super.applyChanges(changes);
    }
  }

  dispatcher : Ammo.btCollisionDispatcher = null;

  getPhysics(): Ammo.btSoftRigidDynamicsWorld {
    if (this.ammo !== null && (this.physics === null || this._needUpdate)) {
      this.needUpdate = false;
      switch(this.type.toLowerCase()) {
        default :
          const collisionConfiguration = new this.ammo.btSoftBodyRigidBodyCollisionConfiguration();
          this.dispatcher = new this.ammo.btCollisionDispatcher(
            collisionConfiguration
          );
          const broadphase = new this.ammo.btDbvtBroadphase();
          const solver = new this.ammo.btSequentialImpulseConstraintSolver();
          const softBodySolver = new this.ammo.btDefaultSoftBodySolver();
          const physics = new this.ammo.btSoftRigidDynamicsWorld(
            this.dispatcher,
            broadphase,
            solver,
            collisionConfiguration,
            softBodySolver
          );
          this.physics = physics;
          super.setObject(this.physics);
          this.runSubscribeNext(this.subscribeType);
          this.applyChanges(['constraint','gravity']);
          break;
      }
    }
    return this.physics;
  }

  logSeq : number = 0;

  getRigidBody(body : Ammo.btCollisionObject) : Ammo.btRigidBody {
    return this.ammo['castObject']( body, this.ammo.btRigidBody );
  }

  getCollisionObject(body : Ammo.btCollisionObject) : THREE.Object3D {
    const rigidBody = this.getRigidBody(body);
    if (rigidBody instanceof this.ammo.btRigidBody && ThreeUtil.isNotNull(rigidBody['object3d'])) {
      return rigidBody['object3d'];
    }
    return null;
  }

  getBtVector3(pointer : any) : Ammo.btVector3 {
    return this.ammo['castObject']( pointer, this.ammo.btVector3 );
  }

  impactPoint = new THREE.Vector3();
  impactNormal = new THREE.Vector3();

  update(timer: RendererTimer) {
    if (
      this.ammo !== null &&
      this.physics instanceof this.ammo.btSoftRigidDynamicsWorld
    ) {
      this.constraintList.forEach((constraint) => {
        constraint.update(timer);
      });
      this.physics.stepSimulation(timer.delta , 10);
      let numManifolds = this.dispatcher.getNumManifolds();
      if (this.useCollision) {
        for (let i = 0; i < numManifolds; i++) {
          let contactManifold = this.dispatcher.getManifoldByIndexInternal(i);
          const body0 = this.getCollisionObject(contactManifold.getBody0());
          const body1 = this.getCollisionObject(contactManifold.getBody1());
          if (body0 !== null && body1 !== null) {
            let numContacts = contactManifold.getNumContacts();
            const contactPoints : Ammo.btManifoldPoint[] = [];
            for (let j = 0; j < numContacts; j++) {
              contactPoints.push(contactManifold.getContactPoint(j));
            }
            body0.dispatchEvent({
              type : 'collision',
              points : contactPoints,
              collision : body1
            });
          }
        }
      }
      const convexBreaker = this.convexBreaker;
      if (convexBreaker !== null) {
        for (let i = 0; i < numManifolds; i++) {
          let contactManifold = this.dispatcher.getManifoldByIndexInternal(i);
          const rb0 = this.getRigidBody(contactManifold.getBody0());
          const rb1 = this.getRigidBody(contactManifold.getBody1());
          if ( ! rb0 || ! rb1 ) {
            continue;
          }
          const threeObject0 = this.getBtVector3(rb0.getUserPointer())['threeObject'];
          const threeObject1 = this.getBtVector3(rb1.getUserPointer())['threeObject'];
          if ( ! threeObject0 && ! threeObject1 ) {
            continue;
          }
          const userData0 = threeObject0 ? threeObject0.userData : null;
          const userData1 = threeObject1 ? threeObject1.userData : null;
          const breakable0 = userData0 ? userData0.breakable : false;
          const breakable1 = userData1 ? userData1.breakable : false;
          const collided0 = userData0 ? userData0.collided : false;
          const collided1 = userData1 ? userData1.collided : false;
          if ( ( ! breakable0 && ! breakable1 ) || ( collided0 && collided1 ) ) {
            continue;
          }
          let contact = false;
          let maxImpulse = 0;
          for ( let j = 0, jl = contactManifold.getNumContacts(); j < jl; j ++ ) {
            const contactPoint = contactManifold.getContactPoint( j );
            if ( contactPoint.getDistance() < 0 ) {
              contact = true;
              const impulse = contactPoint.getAppliedImpulse();
              if ( impulse > maxImpulse ) {
                maxImpulse = impulse;
                const pos = contactPoint.get_m_positionWorldOnB();
                const normal = contactPoint.get_m_normalWorldOnB();
                this.impactPoint.set( pos.x(), pos.y(), pos.z() );
                this.impactNormal.set( normal.x(), normal.y(), normal.z() );
              }
              break;
            }
          }
          if ( ! contact ) continue;

          // Subdivision

          const fractureImpulse = 250;
          if ( breakable0 && ! collided0 && maxImpulse > fractureImpulse ) {
            const fragments : THREE.Object3D[] = []; 
            const debris = convexBreaker.subdivideByImpact( threeObject0, this.impactPoint, this.impactNormal, 1, 2 );
            const numObjects = debris.length;
            for ( let j = 0; j < numObjects; j ++ ) {
              const vel = rb0.getLinearVelocity();
              const angVel = rb0.getAngularVelocity();
              const fragment = debris[ j ];
              fragment.userData.velocity.set( vel.x(), vel.y(), vel.z() );
              fragment.userData.angularVelocity.set( angVel.x(), angVel.y(), angVel.z() );
              fragments.push(fragment);
            }
            userData0.collided = true;
            threeObject0.dispatchEvent({
              type : 'debris',
              fragments : fragments,
              collided : true,
              debris : debris
            });
          }
          if ( breakable1 && ! collided1 && maxImpulse > fractureImpulse ) {
            const fragments : THREE.Object3D[] = []; 
            const debris = convexBreaker.subdivideByImpact( threeObject1, this.impactPoint, this.impactNormal, 1, 2);
            const numObjects = debris.length;
            for ( let j = 0; j < numObjects; j ++ ) {
              const vel = rb1.getLinearVelocity();
              const angVel = rb1.getAngularVelocity();
              const fragment = debris[ j ];
              fragment.userData.velocity.set( vel.x(), vel.y(), vel.z() );
              fragment.userData.angularVelocity.set( angVel.x(), angVel.y(), angVel.z() );
              fragments.push(fragment);
            }
            threeObject1.dispatchEvent({
              type : 'debris',
              fragments : fragments,
              collided : true,
              debris : debris
            });
          }
        }
      }
    }
  }
}
