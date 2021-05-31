import { ThreeUtil, RendererTimer } from './../interface';
import { PhysicsComponent } from './../physics/physics.component';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import Ammo from 'ammojs-typed';
import * as THREE from 'three';
import { AbstractSubscribeComponent } from '../subscribe.abstract';

@Component({
  selector: 'three-rigidbody',
  templateUrl: './rigidbody.component.html',
  styleUrls: ['./rigidbody.component.scss'],
})
export class RigidbodyComponent extends AbstractSubscribeComponent implements OnInit {
  @Input() public type:string = 'auto';
  @Input() private width:number = null;
  @Input() private height:number = null;
  @Input() private depth:number = null;
  @Input() private radius:number = null;
  @Input() private mass:number = null;
  @Input() private margin:number = null;
  @Input() private friction:number = null;
  @Input() private rollingFriction:number = null;
  @Input() private restitution:number = null;
  @Input() private inertia:number = null;
  @Input() private inertiaX:number = null;
  @Input() private inertiaY:number = null;
  @Input() private inertiaZ:number = null;
  @Input() private linDamping:number = null;
  @Input() private angDamping:number = null;

  @Output() private onLoad:EventEmitter<any> = new EventEmitter<any>();

  private getBoxHalfExtents(geometry : THREE.BufferGeometry, def? : THREE.Vector3 ) : Ammo.btVector3 {
    let boxHalfExtents = ThreeUtil.getVector3Safe(this.width, this.height, this.depth);
    if (ThreeUtil.isNull(boxHalfExtents)) {
      boxHalfExtents = this.getGeometrySize(geometry, def);
    }
    return new this._ammo.btVector3(boxHalfExtents.x / 2, boxHalfExtents.y / 2,boxHalfExtents.z / 2 );
  }

  private getRadius(geometry : THREE.BufferGeometry, def? : number ) : number {
    let radius = this.radius;
    if (ThreeUtil.isNull(radius)) {
      const geometrySize = this.getGeometrySize(geometry, def);
      radius = Math.max(geometrySize.x,geometrySize.y,geometrySize.z);
    }
    return radius;
  }

  private getHeight(geometry : THREE.BufferGeometry, def? : number ) : number {
    let height = this.height;
    if (ThreeUtil.isNull(height)) {
      height = this.getGeometrySize(geometry, def).y;
    }
    return height;
  }

  private getMass(def? : number ) : number {
    return ThreeUtil.getTypeSafe(this.mass, def);
  }

  private getMargin(def? : number ) : number {
    return ThreeUtil.getTypeSafe(this.margin, def);
  }

  private getFriction(def? : number ) : number {
    return ThreeUtil.getTypeSafe(this.friction, def);
  }

  private getRollingFriction(def? : number ) : number {
    return ThreeUtil.getTypeSafe(this.rollingFriction, def);
  }

  private getRestitution(def? : number ) : number {
    return ThreeUtil.getTypeSafe(this.restitution, def);
  }

  private getInertia(def? : number) : Ammo.btVector3 {
    const inertia = ThreeUtil.getTypeSafe(this.inertia, def);
    const inertiaX = ThreeUtil.getTypeSafe(this.inertiaX, 0);
    const inertiaY = ThreeUtil.getTypeSafe(this.inertiaY, inertia);
    const inertiaZ = ThreeUtil.getTypeSafe(this.inertiaZ, 0);
    return new this._ammo.btVector3(inertiaX, inertiaY, inertiaZ);
  }

  private getLinDamping(def? : number ) : number {
    return ThreeUtil.getTypeSafe(this.linDamping, def);
  }

  private getAngDamping(def? : number ) : number {
    return ThreeUtil.getTypeSafe(this.angDamping, def);
  }

  private getGeometrySize(geometry : THREE.BufferGeometry, def? : THREE.Vector3 | number ) : THREE.Vector3 {
    if (ThreeUtil.isNotNull(geometry)) {
      if (geometry instanceof THREE.BoxGeometry) {
        return new THREE.Vector3(
          geometry.parameters.width,
          geometry.parameters.height,
          geometry.parameters.depth
        );
      } else if (geometry instanceof THREE.SphereGeometry) {
        return new THREE.Vector3(
          geometry.parameters.radius,
          geometry.parameters.radius,
          geometry.parameters.radius
        );
      } else if (geometry instanceof THREE.PlaneGeometry) {
        return new THREE.Vector3(
          geometry.parameters.width,
          geometry.parameters.height,
          0.001
        );
      }
    }
    if (ThreeUtil.isNotNull(def)) {
      if (def instanceof THREE.Vector3) {
        return def;
      } else {
        return new THREE.Vector3(def, def, def);
      }
    } else {
      return new THREE.Vector3();
    }
  }

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  private parent: THREE.Object3D = null;
  setParent(parent: THREE.Object3D) {
    if (this.parent !== parent) {
      this.parent = parent;
      this.resetRigidBody();
    }
  }

  private physics: PhysicsComponent = null;
  private _ammo: typeof Ammo = null;
  private _physics: Ammo.btDiscreteDynamicsWorld = null;

  setPhysics(physics: PhysicsComponent) {
    this.physics = physics;
    this._physics = this.physics.getPhysics();
    if (this._physics !== null) {
      this._ammo = this.physics.getAmmo();
      this.resetRigidBody();
    } else {
      this.unSubscribeRefer('physics');
      this.subscribeRefer('physics', ThreeUtil.getSubscribe(this.physics, () => {
        this._physics = this.physics.getPhysics();
        this._ammo = this.physics.getAmmo();
        this.resetRigidBody();
      },'physics'))
    }
  }
  private rigidBody: Ammo.btRigidBody = null;

  setVelocity(x : number, y : number , z : number , type : string = 'linear' ) {
    if (this.rigidBody !== null) {
      const velocity : Ammo.btVector3 = new this._ammo.btVector3(x, y, z);
      switch(type.toLowerCase()) {
        case 'angular' :
          this.rigidBody.setAngularVelocity(velocity);
          break;
        case 'linear' :
        default :
          this.rigidBody.setLinearVelocity(velocity);
          break;
      }
    }
  }

  getVelocity(type : string = 'linear' ): THREE.Vector3 {
    if (this.rigidBody !== null) {
      let velocity : Ammo.btVector3 = null;
      switch(type.toLowerCase()) {
        case 'angular' :
          velocity = this.rigidBody.getAngularVelocity();
          break;
        case 'linear' :
        default :
        velocity = this.rigidBody.getLinearVelocity();
          break;
      }
      return new THREE.Vector3(velocity.x(), velocity.y(), velocity.z());
    }
    return null;
  }
  setFactor(x : number, y : number , z : number , type : string = 'linear' ) {
    if (this.rigidBody !== null) {
      const factor : Ammo.btVector3 = new this._ammo.btVector3(x, y, z);
      switch(type.toLowerCase()) {
        case 'angular' :
          this.rigidBody.setAngularFactor(factor);
          break;
        case 'linear' :
        default :
          this.rigidBody.setLinearFactor(factor);
          break;
      }
    }
  }

  getFactor(type : string = 'linear' ): THREE.Vector3 {
    if (this.rigidBody !== null) {
      let factor : Ammo.btVector3 = null;
      switch(type.toLowerCase()) {
        case 'angular' :
          factor = this.rigidBody.getAngularFactor();
          break;
        case 'linear' :
        default :
          factor = this.rigidBody.getLinearFactor();
          break;
      }
      return new THREE.Vector3(factor.x(), factor.y(), factor.z());
    }
    return null;
  }

  clearForces() {
    if (this.rigidBody !== null) {
      this.rigidBody.clearForces();
    }
  }

  applyTorque(x : number, y : number , z : number , type : string = 'torque' ) {
    if (this.rigidBody !== null) {
      const torque : Ammo.btVector3 = new this._ammo.btVector3(x, y, z);
      switch(type.toLowerCase()) {
        case 'local' :
          this.rigidBody.applyLocalTorque(torque);
          break;
        case 'impulse' :
          this.rigidBody.applyTorqueImpulse(torque);
          break;
        case 'torque' :
        default :
          this.rigidBody.applyTorque(torque);
          break;
      }
    }
  }

  getMotionState() : Ammo.btMotionState {
    if (this.rigidBody !== null) {
      return this.rigidBody.getMotionState();
    }
    return null;
  }

  setMotionState(motionState : Ammo.btMotionState) {
    if (this.rigidBody !== null) {
      this.rigidBody.setMotionState(motionState);
    }
  }

  setMotionStatePosition(x : number = null, y : number = null, z : number = null, rx : number = null, ry : number = null, rz : number = null) {
    if (this.rigidBody !== null) {
      const transform = new this._ammo.btTransform();
      transform.setIdentity();
      const quaternion = this.parent.quaternion;
      const relRotation = ThreeUtil.getEulerSafe(rx, ry, rz);
      if (ThreeUtil.isNotNull(relRotation)) {
        quaternion.setFromEuler(relRotation);
      }
      transform.setRotation( new this._ammo.btQuaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w));
      const position = this.parent.position;
      const relPosition = ThreeUtil.getVector3Safe(x, y, z);
      if (ThreeUtil.isNotNull(relPosition)) {
        position.copy(relPosition);
      }
      transform.setOrigin(new this._ammo.btVector3(position.x, position.y, position.z));
      const motionState = new this._ammo.btDefaultMotionState(transform);
      this.setMotionState(motionState);
    }
  }

  setMotionStateRotation(x : number, y : number, z : number) {
    if (this.rigidBody !== null) {
      const transform = new this._ammo.btTransform();
      transform.setIdentity();
      const quaternion : THREE.Quaternion = new THREE.Quaternion();
      quaternion.setFromEuler(ThreeUtil.getEulerSafe(x, y, z));
      transform.setRotation( new this._ammo.btQuaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w));
      const position = this.parent.position;
      transform.setOrigin(new this._ammo.btVector3(position.x, position.y, position.z));
      const motionState = new this._ammo.btDefaultMotionState(transform);
      this.setMotionState(motionState);
    }
  }


  applyForce(x : number, y : number , z : number , type : string = 'force', relX : number = 0, relY : number = 0, relZ : number = 0 ) {
    if (this.rigidBody !== null) {
      const force : Ammo.btVector3 = new this._ammo.btVector3(x, y, z);
      switch(type.toLowerCase()) {
        case 'centrallocal' :
          this.rigidBody.applyCentralLocalForce(force);
          break;
        case 'central' :
          this.rigidBody.applyCentralForce(force);
          break;
        case 'force' :
        default :
          const relPos : Ammo.btVector3 = new this._ammo.btVector3(relX, relY, relZ);
          this.rigidBody.applyForce(force, relPos);
          break;
      }
    }
  }

  resetRigidBody() : Ammo.btRigidBody {
    if (
      this.rigidBody === null &&
      this.parent !== null &&
      this._physics !== null &&
      ThreeUtil.isNotNull(this._ammo) &&
      ThreeUtil.isNotNull(this._physics)
    ) {
      let shape: Ammo.btCollisionShape = null;
      let type : string = this.type;
      let geometry : THREE.BufferGeometry = null;
      if (this.parent instanceof THREE.Mesh) {
        geometry = this.parent.geometry;
      } else {
        type = 'empty';
      }
      if (type.toLowerCase() === 'auto') {
        if (ThreeUtil.isNotNull(geometry)) {
          if (geometry instanceof THREE.BoxGeometry) {
            type = 'box';
          } else if (geometry instanceof THREE.SphereGeometry) {
            type = 'sphere';
          } else if (geometry instanceof THREE.ConeGeometry) {
            type = 'cone';
          } else if (geometry instanceof THREE.CylinderGeometry) {
            type = 'cylinder';
          } else if (geometry instanceof THREE.PlaneGeometry) {
            type = 'staticplane';
          } else {
            type = 'empty';
          }
        } else {
          type = 'empty';
        }
      }
      switch (type.toLowerCase()) {
        case 'convextriangle':
          {
            const meshInterface: Ammo.btStridingMeshInterface = null;
            const calcAabb: boolean = false;
            shape = new this._ammo.btConvexTriangleMeshShape(meshInterface, calcAabb);
          }
          break;
        case 'box':
          {
            shape = new this._ammo.btBoxShape(
              this.getBoxHalfExtents(geometry)
            );
          }
          break;
        case 'capsule':
          {
            shape = new this._ammo.btCapsuleShape(
              this.getRadius(geometry, 0),
              this.getHeight(geometry, 0),
            );
          }
          break;
        case 'capsulex':
          {
            shape = new this._ammo.btCapsuleShapeX(
              this.getRadius(geometry, 0),
              this.getHeight(geometry, 0),
            );
          }
          break;
        case 'capsulez':
          {
            shape = new this._ammo.btCapsuleShapeZ(
              this.getRadius(geometry, 0),
              this.getHeight(geometry, 0),
            );
          }
          break;
        case 'cylinder':
          {
            shape = new this._ammo.btCylinderShape(
              this.getBoxHalfExtents(geometry)
            );
          }
          break;
        case 'cylinderx':
          {
            shape = new this._ammo.btCylinderShapeX(
              this.getBoxHalfExtents(geometry)
            );
          }
          break;
        case 'cylinderz':
          {
            shape = new this._ammo.btCylinderShapeZ(
              this.getBoxHalfExtents(geometry)
            );
          }
          break;
        case 'sphere':
          {
            shape = new this._ammo.btSphereShape(
              this.getRadius(geometry, 0)
            );
          }
          break;
        case 'multisphere':
          {
            const positions: Ammo.btVector3 = null;
            const radii: ReadonlyArray<number> = null;
            const numPoints: number = null;
            shape = new this._ammo.btMultiSphereShape(positions, radii, numPoints);
          }
          break;
        case 'cone':
          {
            shape = new this._ammo.btConeShape(
              this.getRadius(geometry, 0),
              this.getHeight(geometry, 0),
            );
          }
          break;
        case 'conex':
          {
            shape = new this._ammo.btConeShapeX(
              this.getRadius(geometry, 0),
              this.getHeight(geometry, 0),
            );
          }
          break;
        case 'conez':
          {
            shape = new this._ammo.btConeShapeZ(
              this.getRadius(geometry, 0),
              this.getHeight(geometry, 0),
            );
          }
          break;
        case 'convexhull':
          {
            const points: ReadonlyArray<number> = null;
            const numPoints : number = null;
            shape = new this._ammo.btConvexHullShape(points, numPoints);
          }
          break;
        case 'compound':
          {
            const enableDynamicAabbTree : boolean = false;
            shape = new this._ammo.btCompoundShape(enableDynamicAabbTree);
          }
          break;
        case 'staticplane':
          {
            const planeNormal: Ammo.btVector3 = null;
            const planeConstant: number = null;
            shape = new this._ammo.btStaticPlaneShape(planeNormal, planeConstant);
          }
          break;
        case 'bvhtriangle':
          {
            const meshInterface: Ammo.btStridingMeshInterface = null;
            const useQuantizedAabbCompression: boolean = null;
            const buildBvh: boolean = null;
            shape = new this._ammo.btBvhTriangleMeshShape(meshInterface, useQuantizedAabbCompression, buildBvh);
          }
          break;
        case 'heightfieldterrain':
          {
            const heightStickWidth: number = null;
            const heightStickLength: number = null;
            const heightfieldData: unknown = null;
            const heightScale: number = null;
            const minHeight: number = null;
            const maxHeight: number = null;
            const upAxis: number = null;
            const hdt: Ammo.PHY_ScalarType = null;
            const flipQuadEdges: boolean = null;
            shape = new this._ammo.btHeightfieldTerrainShape(
              heightStickWidth,
              heightStickLength,
              heightfieldData,
              heightScale,
              minHeight,
              maxHeight,
              upAxis,
              hdt,
              flipQuadEdges
            );
          }
          break;
        case 'empty':
        default :
            shape = new this._ammo.btEmptyShape();
            break;
      }
      const scale = this.parent.scale;
      shape.setLocalScaling(new this._ammo.btVector3(scale.x, scale.y, scale.z));
      shape.setMargin(this.getMargin(0.05));
      const mass = this.getMass();
      const localInertia = this.getInertia(0);
      shape.calculateLocalInertia(mass, localInertia);
      const transform = new this._ammo.btTransform();
      transform.setIdentity();
      const quaternion = this.parent.quaternion;
      transform.setRotation( new this._ammo.btQuaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w));
      const pos = this.parent.position;
      transform.setOrigin(new this._ammo.btVector3(pos.x, pos.y, pos.z));
      const motionState = new this._ammo.btDefaultMotionState(transform);
      const rbInfo = new this._ammo.btRigidBodyConstructionInfo(
        mass,
        motionState,
        shape,
        localInertia
      );
      const body = new this._ammo.btRigidBody(rbInfo);
      if (mass > 0) {
        body.setActivationState(4);
      }
      body.setFriction(this.getFriction(0));
      body.setRollingFriction(this.getRollingFriction(0));
      body.setRestitution(this.getRestitution(0));
      body.setDamping(
        this.getLinDamping(0),
        this.getAngDamping(0)
      );
      body['object3d'] = this.parent;
      this.transformAux = new this._ammo.btTransform();
      this.rigidBody = body;
      this._physics.addRigidBody(body);
      this.parent.userData.physicsBody = body;
      this.parent.userData.physicsComponent = this;
      this.parent.addEventListener('collision' , (e) => {
        console.log('collision', e);
      })
      this.onLoad.emit(this);
    }
    return this.rigidBody;
  }

  private transformAux : Ammo.btTransform = null;

  update(timer : RendererTimer) {
    if (this.rigidBody !== null) {
      const objThree = this.parent;
      const objPhys : Ammo.btRigidBody = this.rigidBody;
      const ms = objPhys.getMotionState();
      if ( ms ) {
        const transformAux = this.transformAux;
        ms.getWorldTransform( transformAux );
        const p = transformAux.getOrigin();
        const q = transformAux.getRotation();
        objThree.position.set( p.x(), p.y(), p.z() );
        objThree.quaternion.set( q.x(), q.y(), q.z(), q.w() );
      }
    }
  }

}
