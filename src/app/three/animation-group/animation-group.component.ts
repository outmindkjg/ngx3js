import { Component, ContentChildren, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import { ThreeUtil } from '../interface';
import { MixerComponent } from '../mixer/mixer.component';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import * as THREE from 'three';

@Component({
  selector: 'ngx3js-animation-group',
  templateUrl: './animation-group.component.html',
  styleUrls: ['./animation-group.component.scss']
})
export class AnimationGroupComponent extends AbstractSubscribeComponent implements OnInit {
  @Input() public name: string = '';
  @ContentChildren(MixerComponent, { descendants: false }) private mixerList: QueryList<MixerComponent>;

  constructor() { 
    super();
  }

  ngOnInit(): void {
    super.ngOnInit('keyframe');
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.animationGroup) {
      this.addChanges(changes);
    }
  }

  ngAfterContentInit(): void {
    this.subscribeListQueryChange(this.mixerList, 'mixerList', 'mixer');
    super.ngAfterContentInit();
  }

  private animationGroup : THREE.AnimationObjectGroup = null;

  applyChanges(changes: string[]) {
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

  getAnimationGroup():THREE.AnimationObjectGroup {
    if (this.animationGroup === null || this._needUpdate) {
      this.needUpdate = false;
      this.animationGroup = new THREE.AnimationObjectGroup();
      this.setObject(this.animationGroup);
    }
    return this.animationGroup;
  }
}
