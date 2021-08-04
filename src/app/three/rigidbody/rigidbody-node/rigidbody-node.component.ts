import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AbstractSubscribeComponent } from '../../subscribe.abstract';
import Ammo from 'ammojs-typed';
import { ThreeUtil } from '../../interface';

@Component({
  selector: 'ngx3js-rigidbody-node',
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

  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked the directive's
   * data-bound properties for the first time,
   * and before any of the view or content children have been checked.
   * It is invoked only once when the directive is instantiated.
   */
  ngOnInit(): void {
    super.ngOnInit('rigidbodynode');
  }

  /**
   * A callback method that performs custom clean-up, invoked immediately
   * before a directive, pipe, or service instance is destroyed.
   */
  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked data-bound properties
   * if at least one has changed, and before the view and content
   * children are checked.
   * 
   * @param changes The changed properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.rigidbodyNode) {
      this.addChanges(changes);
    }
  }

  /**
   * A callback method that is invoked immediately after
   * Angular has completed initialization of all of the directive's
   * content.
   * It is invoked only once when the directive is instantiated.
   */
  ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }

  private physics: Ammo.btSoftRigidDynamicsWorld = null;
  private ammo: typeof Ammo = null;
  private rigidBody : Ammo.btSoftBody = null;
  
  public setRigidbody(rigidBody : Ammo.btSoftBody, physics: Ammo.btSoftRigidDynamicsWorld, ammo) {
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

  public getRigidbodyNode() : Ammo.btTypedConstraint {
    if (ThreeUtil.isNotNull(this.ammo) && ThreeUtil.isNotNull(this.rigidBody) && ThreeUtil.isNotNull(this.physics) && (this.rigidbodyNode === null || this._needUpdate)) {
      this.needUpdate = false;
      switch(this.type.toLowerCase()) {
        case "anchor" :
          const body = this.getRigidBody(this.body,'body');
          if (ThreeUtil.isNotNull(body)) {
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
          } else {
            this.rigidbodyNode = null;
          }
          break;
      }
      this.setObject(this.rigidbodyNode);
    }
    return this.rigidbodyNode;
  }

}
