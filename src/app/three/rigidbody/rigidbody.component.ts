import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import Ammo from 'ammojs-typed';
import * as THREE from 'three';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { RendererTimer, ThreeUtil } from './../interface';
import { PhysicsComponent } from './../physics/physics.component';

@Component({
  selector: 'three-rigidbody',
  templateUrl: './rigidbody.component.html',
  styleUrls: ['./rigidbody.component.scss'],
})
export class RigidbodyComponent extends AbstractSubscribeComponent implements OnInit {
  @Input() public type: string = 'auto';
  @Input() private width: number = null;
  @Input() private height: number = null;
  @Input() private depth: number = null;
  @Input() private radius: number = null;
  @Input() private mass: number = null;
  @Input() private margin: number = null;
  @Input() private friction: number = null;
  @Input() private rollingFriction: number = null;
  @Input() private restitution: number = null;
  @Input() private inertia: number = null;
  @Input() private inertiaX: number = null;
  @Input() private inertiaY: number = null;
  @Input() private inertiaZ: number = null;
  @Input() private velocityX: number = null;
  @Input() private velocityY: number = null;
  @Input() private velocityZ: number = null;
  @Input() private velocityType: string = null;
  @Input() private linDamping: number = null;
  @Input() private angDamping: number = null;
  @Input() private breakable: boolean = null;

  private getBoxHalfExtents(geometry: THREE.BufferGeometry, def?: THREE.Vector3): Ammo.btVector3 {
    let boxHalfExtents = ThreeUtil.getVector3Safe(this.width, this.height, this.depth);
    if (ThreeUtil.isNull(boxHalfExtents)) {
      boxHalfExtents = this.getGeometrySize(geometry, def);
    }
    return new this._ammo.btVector3(boxHalfExtents.x / 2, boxHalfExtents.y / 2, boxHalfExtents.z / 2);
  }

  private getRadius(geometry: THREE.BufferGeometry, def?: number): number {
    let radius = this.radius;
    if (ThreeUtil.isNull(radius)) {
      const geometrySize = this.getGeometrySize(geometry, def);
      radius = Math.max(geometrySize.x, geometrySize.y, geometrySize.z);
    }
    return radius;
  }

  private getHeight(geometry: THREE.BufferGeometry, def?: number): number {
    let height = this.height;
    if (ThreeUtil.isNull(height)) {
      height = this.getGeometrySize(geometry, def).y;
    }
    return height;
  }

  private getMass(def?: number): number {
    return ThreeUtil.getTypeSafe(this.mass, def);
  }

  private getMargin(def?: number): number {
    return ThreeUtil.getTypeSafe(this.margin, def);
  }

  private getFriction(def?: number): number {
    return ThreeUtil.getTypeSafe(this.friction, def);
  }

  private getRollingFriction(def?: number): number {
    return ThreeUtil.getTypeSafe(this.rollingFriction, def);
  }

  private getRestitution(def?: number): number {
    return ThreeUtil.getTypeSafe(this.restitution, def);
  }

  private getInertia(def?: number): Ammo.btVector3 {
    const inertia = ThreeUtil.getTypeSafe(this.inertia, def);
    const inertiaX = ThreeUtil.getTypeSafe(this.inertiaX, 0);
    const inertiaY = ThreeUtil.getTypeSafe(this.inertiaY, inertia);
    const inertiaZ = ThreeUtil.getTypeSafe(this.inertiaZ, 0);
    return new this._ammo.btVector3(inertiaX, inertiaY, inertiaZ);
  }

  private getLinDamping(def?: number): number {
    return ThreeUtil.getTypeSafe(this.linDamping, def);
  }

  private getAngDamping(def?: number): number {
    return ThreeUtil.getTypeSafe(this.angDamping, def);
  }

  private getGeometrySize(geometry: THREE.BufferGeometry, def?: THREE.Vector3 | number): THREE.Vector3 {
    if (ThreeUtil.isNotNull(geometry)) {
      if (geometry instanceof THREE.BoxGeometry) {
        return new THREE.Vector3(geometry.parameters.width, geometry.parameters.height, geometry.parameters.depth);
      } else if (geometry instanceof THREE.SphereGeometry) {
        return new THREE.Vector3(geometry.parameters.radius, geometry.parameters.radius, geometry.parameters.radius);
      } else if (geometry instanceof THREE.PlaneGeometry) {
        return new THREE.Vector3(geometry.parameters.width, geometry.parameters.height, 0.001);
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
    super.ngOnInit('rigidbody');
  }

  ngOnDestroy(): void {
    if (ThreeUtil.isNotNull(this._physics) && ThreeUtil.isNotNull(this.rigidBody)) {
      if (this.rigidBody instanceof this._ammo.btRigidBody) {
        this._physics.removeRigidBody(this.rigidBody);
      } else {
        this.rigidBody.bodies.forEach((rigidBody) => {
          this._physics.removeRigidBody(rigidBody);
        });
        this.rigidBody.bodies = [];
      }
      this.rigidBody = null;
    }
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.rigidBody) {
      this.addChanges(changes);
    }
  }

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }

  setParent(parent: THREE.Object3D): boolean {
    if (super.setParent(parent)) {
      this.getRigidBody();
      return true;
    } else {
      return false;
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
      this.getRigidBody();
    } else {
      this.unSubscribeRefer('physics');
      this.subscribeRefer(
        'physics',
        ThreeUtil.getSubscribe(
          this.physics,
          () => {
            this._physics = this.physics.getPhysics();
            this._ammo = this.physics.getAmmo();
            this.getRigidBody();
          },
          'physics'
        )
      );
    }
  }

  private rigidBody: Ammo.btRigidBody | { bodies: Ammo.btRigidBody[] } = null;

  private _getRigidBodies(index: number = null): Ammo.btRigidBody[] {
    const rigidBodies: Ammo.btRigidBody[] = [];
    if (this.rigidBody !== null) {
      if (this.rigidBody instanceof this._ammo.btRigidBody) {
        rigidBodies.push(this.rigidBody);
      } else {
        if (ThreeUtil.isNull(index)) {
          this.rigidBody.bodies.forEach((rigidBody) => {
            rigidBodies.push(rigidBody);
          });
        } else if (ThreeUtil.isNotNull(this.rigidBody.bodies[index])) {
          rigidBodies.push(this.rigidBody.bodies[index]);
        }
      }
    }
    return rigidBodies;
  }

  setVelocity(x: number, y: number, z: number, type: string = 'linear', index: number = null) {
    if (this.rigidBody !== null) {
      const velocity: Ammo.btVector3 = new this._ammo.btVector3(x, y, z);
      this._getRigidBodies(index).forEach((rigidBody) => {
        switch (type.toLowerCase()) {
          case 'angular':
            rigidBody.setAngularVelocity(velocity);
            break;
          case 'linear':
          default:
            rigidBody.setLinearVelocity(velocity);
            break;
        }
      });
    }
  }

  getVelocity(type: string = 'linear', index: number = null): THREE.Vector3 {
    if (this.rigidBody !== null) {
      let velocity: Ammo.btVector3 = null;
      this._getRigidBodies(index).forEach((rigidBody) => {
        switch (type.toLowerCase()) {
          case 'angular':
            velocity = rigidBody.getAngularVelocity();
            break;
          case 'linear':
          default:
            velocity = rigidBody.getLinearVelocity();
            break;
        }
      });
      if (velocity !== null) {
        return new THREE.Vector3(velocity.x(), velocity.y(), velocity.z());
      }
    }
    return null;
  }

  setFactor(x: number, y: number, z: number, type: string = 'linear', index: number = null) {
    if (this.rigidBody !== null) {
      const factor: Ammo.btVector3 = new this._ammo.btVector3(x, y, z);
      this._getRigidBodies(index).forEach((rigidBody) => {
        switch (type.toLowerCase()) {
          case 'angular':
            rigidBody.setAngularFactor(factor);
            break;
          case 'linear':
          default:
            rigidBody.setLinearFactor(factor);
            break;
        }
      });
    }
  }

  getFactor(type: string = 'linear', index: number = null): THREE.Vector3 {
    if (this.rigidBody !== null) {
      let factor: Ammo.btVector3 = null;
      this._getRigidBodies(index).forEach((rigidBody) => {
        switch (type.toLowerCase()) {
          case 'angular':
            factor = rigidBody.getAngularFactor();
            break;
          case 'linear':
          default:
            factor = rigidBody.getLinearFactor();
            break;
        }
      });
      if (factor !== null) {
        return new THREE.Vector3(factor.x(), factor.y(), factor.z());
      }
    }
    return null;
  }

  clearForces(index: number = null) {
    if (this.rigidBody !== null) {
      this._getRigidBodies(index).forEach((rigidBody) => {
        rigidBody.clearForces();
      });
    }
  }

  applyTorque(x: number, y: number, z: number, type: string = 'torque', index: number = null) {
    if (this.rigidBody !== null) {
      const torque: Ammo.btVector3 = new this._ammo.btVector3(x, y, z);
      this._getRigidBodies(index).forEach((rigidBody) => {
        switch (type.toLowerCase()) {
          case 'local':
            rigidBody.applyLocalTorque(torque);
            break;
          case 'impulse':
            rigidBody.applyTorqueImpulse(torque);
            break;
          case 'torque':
          default:
            rigidBody.applyTorque(torque);
            break;
        }
      });
    }
  }

  getMotionState(index: number = null): Ammo.btMotionState {
    let motionState = null;
    if (this.rigidBody !== null) {
      this._getRigidBodies(index).forEach((rigidBody) => {
        motionState = rigidBody.getMotionState();
      });
    }
    return motionState;
  }

  setMotionState(motionState: Ammo.btMotionState, index: number = null) {
    if (this.rigidBody !== null) {
      this._getRigidBodies(index).forEach((rigidBody) => {
        rigidBody.setMotionState(motionState);
      });
    }
  }

  setMotionStatePosition(x: number = null, y: number = null, z: number = null, rx: number = null, ry: number = null, rz: number = null, index: number = null) {
    if (this.rigidBody !== null) {
      const transform = new this._ammo.btTransform();
      transform.setIdentity();
      const quaternion = this.parent.quaternion;
      const relRotation = ThreeUtil.getEulerSafe(rx, ry, rz);
      if (ThreeUtil.isNotNull(relRotation)) {
        quaternion.setFromEuler(relRotation);
      }
      transform.setRotation(new this._ammo.btQuaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w));
      const position = this.parent.position;
      const relPosition = ThreeUtil.getVector3Safe(x, y, z);
      if (ThreeUtil.isNotNull(relPosition)) {
        position.copy(relPosition);
      }
      transform.setOrigin(new this._ammo.btVector3(position.x, position.y, position.z));
      const motionState = new this._ammo.btDefaultMotionState(transform);
      this.setMotionState(motionState, index);
    }
  }

  setMotionStateRotation(x: number, y: number, z: number, index: number = null) {
    if (this.rigidBody !== null) {
      const transform = new this._ammo.btTransform();
      transform.setIdentity();
      const quaternion: THREE.Quaternion = new THREE.Quaternion();
      quaternion.setFromEuler(ThreeUtil.getEulerSafe(x, y, z));
      transform.setRotation(new this._ammo.btQuaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w));
      const position = this.parent.position;
      transform.setOrigin(new this._ammo.btVector3(position.x, position.y, position.z));
      const motionState = new this._ammo.btDefaultMotionState(transform);
      this.setMotionState(motionState, index);
    }
  }

  setPosition(x: number, y: number, z: number, index: number = null) {
    if (this.rigidBody !== null) {
      let rigidBody: Ammo.btRigidBody = null;
      if (this.rigidBody instanceof this._ammo.btRigidBody) {
        rigidBody = this.rigidBody;
      } else if (ThreeUtil.isNotNull(index) && ThreeUtil.isNotNull(this.rigidBody.bodies[index])) {
        rigidBody = this.rigidBody.bodies[index];
      }
      if (rigidBody !== null) {
        rigidBody.setAngularVelocity(new this._ammo.btVector3(0, 0, 0));
        rigidBody.setLinearVelocity(new this._ammo.btVector3(0, 0, 0));
        const transform = new this._ammo.btTransform();
        transform.setIdentity();
        transform.setOrigin(new this._ammo.btVector3(x, y, z));
        rigidBody.setWorldTransform(transform);
      }
    }
  }

  applyForce(x: number, y: number, z: number, type: string = 'force', relX: number = 0, relY: number = 0, relZ: number = 0, index: number = null) {
    if (this.rigidBody !== null) {
      const force: Ammo.btVector3 = new this._ammo.btVector3(x, y, z);
      this._getRigidBodies(index).forEach((rigidBody) => {
        switch (type.toLowerCase()) {
          case 'centrallocal':
            rigidBody.applyCentralLocalForce(force);
            break;
          case 'central':
            rigidBody.applyCentralForce(force);
            break;
          case 'force':
          default:
            const relPos: Ammo.btVector3 = new this._ammo.btVector3(relX, relY, relZ);
            rigidBody.applyForce(force, relPos);
            break;
        }
      });
    }
  }

  protected applyChanges(changes: string[]) {
    if (this.rigidBody !== null) {
      if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
        this.getRigidBody();
        return;
      }
      if (!ThreeUtil.isOnlyIndexOf(changes, ['velocity', 'velocityx', 'velocityy', 'velocityz', 'velocitytype'], this.OBJECT_ATTR)) {
        this.needUpdate = true;
        return;
      }
      if (ThreeUtil.isIndexOf(changes, ['velocityx', 'velocityy', 'velocityz', 'velocitytype'])) {
        changes = ThreeUtil.pushUniq(changes, ['velocity']);
      }
      changes.forEach((change) => {
        switch (change.toLowerCase()) {
          case 'velocity':
            if (ThreeUtil.isNotNull(this.velocityX) || ThreeUtil.isNotNull(this.velocityY) || ThreeUtil.isNotNull(this.velocityZ)) {
              this.setVelocity(ThreeUtil.getTypeSafe(this.velocityX, 0), ThreeUtil.getTypeSafe(this.velocityY, 0), ThreeUtil.getTypeSafe(this.velocityZ, 0), ThreeUtil.getTypeSafe(this.velocityType, 'linear'));
            }
            break;
        }
      });
      super.applyChanges(changes);
    }
  }

  getRigidBody(): Ammo.btRigidBody | { bodies: Ammo.btRigidBody[] } {
    if (this.parent !== null && ThreeUtil.isNotNull(this._ammo) && ThreeUtil.isNotNull(this._physics) && (this.rigidBody === null || this._needUpdate)) {
      this.needUpdate = false;
      if (this.rigidBody !== null) {
        if (this.rigidBody instanceof this._ammo.btRigidBody) {
          this._physics.removeRigidBody(this.rigidBody);
        } else {
          this.rigidBody.bodies.forEach((rigidBody) => {
            this._physics.removeRigidBody(rigidBody);
          });
        }
      }
      this.transformAux = new this._ammo.btTransform();
      let shape: Ammo.btCollisionShape = null;
      let type: string = this.type;
      let geometry: THREE.BufferGeometry = null;
      if (this.parent instanceof THREE.Mesh) {
        geometry = this.parent.geometry;
      } else {
        type = 'empty';
      }
      if (type.toLowerCase() === 'auto') {
        if (ThreeUtil.isNotNull(geometry)) {
          switch (geometry.type.toLowerCase()) {
            case 'boxgeometry':
              type = 'box';
              break;
            case 'spheregeometry':
              type = 'sphere';
              break;
            case 'conegeometry':
              type = 'cone';
              break;
            case 'cylindergeometry':
              type = 'cylinder';
              break;
            case 'planegeometry':
              type = 'staticplane';
              break;
            case 'capsulegeometry':
              type = 'capsule';
              break;
            case 'ropegeometry':
              type = 'capsule';
              break;
            default:
              type = 'convexhull';
              break;
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
            shape = new this._ammo.btBoxShape(this.getBoxHalfExtents(geometry));
          }
          break;
        case 'capsule':
          {
            shape = new this._ammo.btCapsuleShape(this.getRadius(geometry, 0), this.getHeight(geometry, 0));
          }
          break;
        case 'capsulex':
          {
            shape = new this._ammo.btCapsuleShapeX(this.getRadius(geometry, 0), this.getHeight(geometry, 0));
          }
          break;
        case 'capsulez':
          {
            shape = new this._ammo.btCapsuleShapeZ(this.getRadius(geometry, 0), this.getHeight(geometry, 0));
          }
          break;
        case 'cylinder':
          {
            shape = new this._ammo.btCylinderShape(this.getBoxHalfExtents(geometry));
          }
          break;
        case 'cylinderx':
          {
            shape = new this._ammo.btCylinderShapeX(this.getBoxHalfExtents(geometry));
          }
          break;
        case 'cylinderz':
          {
            shape = new this._ammo.btCylinderShapeZ(this.getBoxHalfExtents(geometry));
          }
          break;
        case 'sphere':
          {
            shape = new this._ammo.btSphereShape(this.getRadius(geometry, 0));
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
            shape = new this._ammo.btConeShape(this.getRadius(geometry, 0), this.getHeight(geometry, 0));
          }
          break;
        case 'conex':
          {
            shape = new this._ammo.btConeShapeX(this.getRadius(geometry, 0), this.getHeight(geometry, 0));
          }
          break;
        case 'conez':
          {
            shape = new this._ammo.btConeShapeZ(this.getRadius(geometry, 0), this.getHeight(geometry, 0));
          }
          break;
        case 'convexhull':
          {
            const btConvexHullShape = new this._ammo.btConvexHullShape();
            if (ThreeUtil.isNotNull(geometry)) {
              const coords = geometry.attributes.position.array;
              const tempBtVec3 = new this._ammo.btVector3(0, 0, 0);
              for (let i = 0, il = coords.length; i < il; i += 3) {
                tempBtVec3.setValue(coords[i], coords[i + 1], coords[i + 2]);
                const lastOne = i >= il - 3;
                btConvexHullShape.addPoint(tempBtVec3, lastOne);
              }
            }
            shape = btConvexHullShape;
          }
          break;
        case 'compound':
          {
            const enableDynamicAabbTree: boolean = false;
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
            shape = new this._ammo.btHeightfieldTerrainShape(heightStickWidth, heightStickLength, heightfieldData, heightScale, minHeight, maxHeight, upAxis, hdt, flipQuadEdges);
          }
          break;
        case 'empty':
        default:
          shape = new this._ammo.btEmptyShape();
          break;
      }
      const scale = this.parent.scale;
      shape.setLocalScaling(new this._ammo.btVector3(scale.x, scale.y, scale.z));
      shape.setMargin(this.getMargin(0.05));
      const mass = this.getMass();
      const localInertia = this.getInertia(0);
      shape.calculateLocalInertia(mass, localInertia);
      if (this.parent instanceof THREE.InstancedMesh) {
        const array = this.parent.instanceMatrix.array as [];
        const bodies: Ammo.btRigidBody[] = [];
        for (let i = 0; i < this.parent.count; i++) {
          const index = i * 16;
          const transform = new this._ammo.btTransform();
          transform.setFromOpenGLMatrix(array.slice(index, index + 16));
          const motionState = new this._ammo.btDefaultMotionState(transform);
          const localInertia = new this._ammo.btVector3(0, 0, 0);
          shape.calculateLocalInertia(mass, localInertia);
          const rbInfo = new this._ammo.btRigidBodyConstructionInfo(mass, motionState, shape, localInertia);
          const body = new this._ammo.btRigidBody(rbInfo);
          if (mass > 0) {
            body.setActivationState(4);
          }
          if (ThreeUtil.isNotNull(this.friction)) {
            body.setFriction(this.getFriction(0));
          }
          if (ThreeUtil.isNotNull(this.rollingFriction)) {
            body.setRollingFriction(this.getRollingFriction(0));
          }
          if (ThreeUtil.isNotNull(this.restitution)) {
            body.setRestitution(this.getRestitution(0));
          }
          body.setDamping(this.getLinDamping(0), this.getAngDamping(0));
          this._physics.addRigidBody(body);
          bodies.push(body);
        }
        if (mass > 0) {
          this.parent.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        }
        this.rigidBody = {
          bodies: bodies,
        };
      } else {
        const transform = new this._ammo.btTransform();
        transform.setIdentity();
        const quaternion = this.parent.quaternion;
        transform.setRotation(new this._ammo.btQuaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w));
        const pos = this.parent.position;
        transform.setOrigin(new this._ammo.btVector3(pos.x, pos.y, pos.z));
        const motionState = new this._ammo.btDefaultMotionState(transform);
        const rbInfo = new this._ammo.btRigidBodyConstructionInfo(mass, motionState, shape, localInertia);
        const body = new this._ammo.btRigidBody(rbInfo);
        if (mass > 0) {
          body.setActivationState(4);
        }
        if (ThreeUtil.isNotNull(this.friction)) {
          body.setFriction(this.getFriction(0));
        }
        if (ThreeUtil.isNotNull(this.rollingFriction)) {
          body.setRollingFriction(this.getRollingFriction(0));
        }
        if (ThreeUtil.isNotNull(this.restitution)) {
          body.setRestitution(this.getRestitution(0));
        }
        body.setDamping(this.getLinDamping(0), this.getAngDamping(0));
        body['object3d'] = this.parent;
        this.rigidBody = body;
        this._physics.addRigidBody(body);
        this.parent.addEventListener('collision', (e) => {
          this.consoleLog('collision', e);
        });
        if (this.breakable) {
          this.physics.getConvexObjectBreaker().prepareBreakableObject(this.parent, mass, new THREE.Vector3(), new THREE.Vector3(), true);
          const btVecUserData = new this._ammo.btVector3(0, 0, 0);
          btVecUserData['threeObject'] = this.parent;
          body.setUserPointer(btVecUserData);
        }
      }
      this.parent.userData.rigidBody = this.id;
      super.setObject(this.rigidBody);
      this.applyChanges(['velocity']);
    }
    return this.rigidBody;
  }

  private transformAux: Ammo.btTransform = null;

  private _instancedMeshCompose(position: Ammo.btVector3, quaternion: Ammo.btQuaternion, array: number[], index: number) {
    const x = quaternion.x(),
      y = quaternion.y(),
      z = quaternion.z(),
      w = quaternion.w();
    const x2 = x + x,
      y2 = y + y,
      z2 = z + z;
    const xx = x * x2,
      xy = x * y2,
      xz = x * z2;
    const yy = y * y2,
      yz = y * z2,
      zz = z * z2;
    const wx = w * x2,
      wy = w * y2,
      wz = w * z2;
    array[index + 0] = 1 - (yy + zz);
    array[index + 1] = xy + wz;
    array[index + 2] = xz - wy;
    array[index + 3] = 0;
    array[index + 4] = xy - wz;
    array[index + 5] = 1 - (xx + zz);
    array[index + 6] = yz + wx;
    array[index + 7] = 0;
    array[index + 8] = xz + wy;
    array[index + 9] = yz - wx;
    array[index + 10] = 1 - (xx + yy);
    array[index + 11] = 0;
    array[index + 12] = position.x();
    array[index + 13] = position.y();
    array[index + 14] = position.z();
    array[index + 15] = 1;
  }

  update(timer: RendererTimer) {
    if (this.rigidBody !== null) {
      if (this.rigidBody instanceof this._ammo.btRigidBody) {
        const worldTransform = this.transformAux;
        const motionState = this.rigidBody.getMotionState();
        motionState.getWorldTransform(worldTransform);
        const position = worldTransform.getOrigin();
        const quaternion = worldTransform.getRotation();
        this.parent.position.set(position.x(), position.y(), position.z());
        this.parent.quaternion.set(quaternion.x(), quaternion.y(), quaternion.z(), quaternion.w());
      } else if (this.parent instanceof THREE.InstancedMesh) {
        const array = this.parent.instanceMatrix.array as number[];
        const bodies = this.rigidBody.bodies;
        const worldTransform = this.transformAux;
        for (let j = 0; j < bodies.length; j++) {
          const body = bodies[j];
          const motionState = body.getMotionState();
          motionState.getWorldTransform(worldTransform);
          const position = worldTransform.getOrigin();
          const quaternion = worldTransform.getRotation();
          this._instancedMeshCompose(position, quaternion, array, j * 16);
        }
        this.parent.instanceMatrix.needsUpdate = true;
      }
    }
  }
}
