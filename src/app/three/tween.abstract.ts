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

  ngOnInit(subscribeType?: string): void {
    super.ngOnInit(subscribeType);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.tweenTimer) {
      this.addChanges(changes);
    }
  }

  ngAfterContentInit(): void {
    this.subscribeListQuery(this.tweenList, 'tweenList', 'tween');
    super.ngAfterContentInit();
  }

  protected parent: THREE.Object3D | any = null;
  private tweenTarget: any = null;
  private tweenTimer: GSAP.TimelineLite | GSAP.TimelineMax = null;

  setParent(parent: THREE.Object3D | any): boolean {
    if (this.parent !== parent) {
      this.parent = parent;
      return true;
    } else {
      return true;
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

}
