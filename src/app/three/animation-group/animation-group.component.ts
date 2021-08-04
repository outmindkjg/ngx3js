import { AfterContentInit, Component, ContentChildren, Input, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { ThreeUtil } from '../interface';
import { MixerComponent } from '../mixer/mixer.component';
import { AbstractSubscribeComponent } from '../subscribe.abstract';

/**
 * AnimationGroupComponent
 * 
 * A group of objects that receives a shared animation state.<br /><br />
 * 
 * For an overview of the different elements of the three.js animation system see the
 * "Animation System" article in the "Next Steps" section of the manual.
 * 
 * Usage
 * 
 * Add objects you would otherwise pass as 'root' to the constructor or the [page:AnimationMixer.clipAction clipAction]
 * method of [page:AnimationMixer AnimationMixer] and instead pass this object as 'root'.<br /><br />
 * 
 * Note that objects of this class appear as one object to the mixer,
 * so cache control of the individual objects must be done	on the group.
 * 
 * Limitations
 * 
 * The animated properties must be compatible among all objects in the group.<br /><br />
 * 
 * A single property can either be controlled through a target group or directly, but not both.
 * 
 * @see THREE.AnimationObjectGroup
 */
@Component({
  selector: 'ngx3js-animation-group',
  templateUrl: './animation-group.component.html',
  styleUrls: ['./animation-group.component.scss'],
})
export class AnimationGroupComponent extends AbstractSubscribeComponent implements OnInit,OnChanges, OnDestroy, AfterContentInit {
  /**
    The name of the object (doesn't need to be unique). Default is an empty string.
   */
  @Input() public name: string = '';

  /**
   * The mixer List of MixerComponent
   */
  @ContentChildren(MixerComponent, { descendants: false }) private mixerList: QueryList<MixerComponent>;

  /**
   * Creates an instance of animation group component.
   */
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
    super.ngOnInit('animation-group');
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
    if (changes && this.animationGroup) {
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
    this.subscribeListQueryChange(this.mixerList, 'mixerList', 'mixer');
    super.ngAfterContentInit();
  }

  /**
   * Animation group of animation group component
   */
  private animationGroup: THREE.AnimationObjectGroup = null;

  /**
   * Applys changes
   * @param changes
   * @returns
   */
  public applyChanges(changes: string[]) {
    if (this.animationGroup !== null) {
      if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
        this.getAnimationGroup();
        return;
      }
      if (!ThreeUtil.isOnlyIndexOf(changes, ['init'], this.OBJECT_ATTR)) {
        this.needUpdate = true;
        return;
      }
      if (ThreeUtil.isIndexOf(changes, 'init')) {
        changes = ThreeUtil.pushUniq(changes, ['mixer']);
      }
      changes.forEach((change) => {
        switch (change.toLowerCase()) {
          case 'mixer':
            this.unSubscribeReferList('mixerList');
            if (ThreeUtil.isNotNull(this.mixerList)) {
              this.mixerList.forEach((mixer) => {
                mixer.setParent(this.animationGroup);
              });
              this.subscribeListQuery(this.mixerList, 'mixerList', 'mixer');
            }
            break;
        }
      });
      super.applyChanges(changes);
    }
  }

  /**
   * Gets object3d
   * @returns object3d
   */
  public getObject<T>(): T {
    return this.getAnimationGroup() as any;
  }

  /**
   * Gets animation group
   * @returns animation group
   */
  public getAnimationGroup<T extends THREE.AnimationObjectGroup>(): T {
    if (this.animationGroup === null || this._needUpdate) {
      this.needUpdate = false;
      this.animationGroup = new THREE.AnimationObjectGroup();
      this.setObject(this.animationGroup);
    }
    return this.animationGroup as T;
  }
}
