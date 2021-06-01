import { AfterContentInit, Component, ContentChildren, Input, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as GSAP from 'gsap';
import { ThreeUtil } from './interface';
import { AbstractSubscribeComponent } from './subscribe.abstract';
import { TweenComponent } from './tween/tween.component';

@Component({
  template: '',
})
export abstract class AbstractTweenComponent extends AbstractSubscribeComponent implements OnInit, OnChanges, AfterContentInit, OnDestroy {
  @Input() protected tweenStart: boolean = true;

  @ContentChildren(TweenComponent, { descendants: false }) private tweenList: QueryList<TweenComponent>;

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes) {
      if (changes.tweenStart && this.tweenTarget) {
        this.resetTween();
      }
      if (changes.tweenStart) {
        delete changes.tweenStart;
      }
      if (changes.tweenTarget) {
        delete changes.tweenTarget;
      }
    }
  }

  ngAfterContentInit(): void {
    this.subscribeListQuery(this.tweenList, 'tweenList', 'tween');
    super.ngAfterContentInit();
  }

  protected synkObject(synkTypes: string[]) {
    super.synkObject(synkTypes);
  }

  protected parent: THREE.Object3D | any = null;
  private tweenTarget: any = null;
  private tweenTimer: GSAP.TimelineLite | GSAP.TimelineMax = null;

  setParent(parent: THREE.Object3D | any, isRestore: boolean = false): boolean {
    if (isRestore) {
      if (this.parent !== parent.parent) {
        this.parent = parent.parent;
        return true;
      } else {
        return false;
      }
    } else if (this.parent !== parent) {
      this.parent = parent;
      return true;
    } else {
      return false;
    }
  }

  setTweenTarget(tweenTarget: any) {
    if (this.tweenTarget !== tweenTarget) {
      this.tweenTarget = tweenTarget;
      this.resetTween();
    }
  }

  resetTween() {
    if (ThreeUtil.isNotNull(this.tweenTarget) && ThreeUtil.isNotNull(this.tweenList) && this.tweenList.length > 0 && this.tweenStart) {
      this.tweenTimer = new GSAP.TimelineLite();
      this.tweenList.forEach((tween) => {
        tween.getTween(this.tweenTimer, this.tweenTarget, this);
      });
      this.tweenTimer.play();
    } else if (this.tweenTimer !== null) {
      this.tweenTimer.kill();
      this.tweenTimer = null;
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
