import { Component, ContentChildren, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import Ammo from 'ammojs-typed';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { RendererTimer, ThreeUtil } from './../interface';
import { ConvexObjectBreaker } from 'three/examples/jsm/misc/ConvexObjectBreaker.js';
import { PhysicsConstraintComponent } from './physics-constraint/physics-constraint.component';

@Component({
  selector: 'three-physics',
  templateUrl: './physics.component.html',
  styleUrls: ['./physics.component.scss'],
})
export class PhysicsComponent extends AbstractSubscribeComponent implements OnInit {
  @Input() private type:string = "";
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

  convexBreaker : ConvexObjectBreaker = null;
  
  getConvexObjectBreaker() :ConvexObjectBreaker {
    if (this.convexBreaker == null) {
      this.convexBreaker = new ConvexObjectBreaker();
    }
    return this.convexBreaker;
  }

  protected applyChanges(changes: string[]) {
    if (this.physics !== null) {
      if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
        this.getPhysics();
        return;
      }
      if (!ThreeUtil.isOnlyIndexOf(changes, ['constraint','gravity', 'gravityX', 'gravityY', 'gravityZ'], this.OBJECT_ATTR)) {
        this.needUpdate = true;
        return;
      }
      if (ThreeUtil.isIndexOf(changes, ['gravityX', 'gravityY', 'gravityZ'])) {
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
            this.physics.setGravity(gravity);
            this.physics.getWorldInfo().set_m_gravity(gravity);
            break;
        }
      });
      super.applyChanges(changes);
    }
  }

  getPhysics(): Ammo.btSoftRigidDynamicsWorld {
    if (this.ammo !== null && (this.physics === null || this._needUpdate)) {
      this.needUpdate = false;
      switch(this.type.toLowerCase()) {
        default :
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
      this.constraintList.forEach((constraint) => {
        constraint.update(timer);
      });
      this.physics.stepSimulation(timer.delta, 10);
      this.logSeq++;
      if (this.logSeq % 1000 === 0) {
        let dispatcher = this.physics.getDispatcher();
        let numManifolds = dispatcher.getNumManifolds();
        for (let i = 0; i < numManifolds; i++) {
          let contactManifold = dispatcher.getManifoldByIndexInternal(i);
          const body0 = this.getCollisionObject(contactManifold.getBody0());
          const body1 = this.getCollisionObject(contactManifold.getBody1());
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
