import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AbstractSubscribeComponent } from '../../subscribe.abstract';
import Ammo from 'ammojs-typed';
import { ThreeUtil } from '../../interface';

@Component({
  selector: 'three-rigidbody-node',
  templateUrl: './rigidbody-node.component.html',
  styleUrls: ['./rigidbody-node.component.scss']
})
export class RigidbodyNodeComponent extends AbstractSubscribeComponent implements OnInit {

  @Input() private type:string = "";
  @Input() private node: number = 0;
  @Input() private body: any = null;
  @Input() private disableCollisionBetweenLinkedBodies: boolean = false;
  @Input() private influence: number = 0.5;

  constructor() { 
    super();
  }

  ngOnInit(): void {
    super.ngOnInit('rigidbodynode');
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.rigidbodyNode) {
      this.addChanges(changes);
    }
  }

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }

  private physics: Ammo.btSoftRigidDynamicsWorld = null;
  private ammo: typeof Ammo = null;
  private rigidBody : Ammo.btSoftBody = null;
  setRigidbody(rigidBody : Ammo.btSoftBody, physics: Ammo.btSoftRigidDynamicsWorld, ammo) {
    this.rigidBody = rigidBody;
    this.physics = physics;
    this.ammo = ammo;
    this.getRigidbodyNode();
  }

  private getRigidBody(obj : any, key : string) {
    if (ThreeUtil.isNotNull(obj)) {
      this.unSubscribeRefer(key);
      const body = ThreeUtil.getRigidbody(obj);
      this.subscribeRefer(key, ThreeUtil.getSubscribe(obj, (event) => {
        if (this.rigidbodyNode !== null) {
          this.needUpdate = true;
        } else {
          this.getRigidbodyNode();
        }
      }, 'rigidbody'));
      return body;
    }
    return null;
  }

  private rigidbodyNode = null;

  getRigidbodyNode() : Ammo.btTypedConstraint {
    if (ThreeUtil.isNotNull(this.ammo) && ThreeUtil.isNotNull(this.rigidBody) && ThreeUtil.isNotNull(this.physics) && (this.rigidbodyNode === null || this._needUpdate)) {
      this.needUpdate = false;
      switch(this.type.toLowerCase()) {
        case "anchor" :
          const body = this.getRigidBody(this.body,'body');
          if (body !== null) {
            this.rigidBody.appendAnchor( 
              ThreeUtil.getTypeSafe(this.node, 0),
              body, 
              ThreeUtil.getTypeSafe(this.disableCollisionBetweenLinkedBodies, false), 
              ThreeUtil.getTypeSafe(this.influence, 0.5)
            );
            this.rigidbodyNode = {
              type : this.type,
              node : this.node,
              disableCollisionBetweenLinkedBodies : this.disableCollisionBetweenLinkedBodies,
              influence : this.influence,
            }
          }
          break;
      }
    }
    return this.rigidbodyNode;
  }

}
