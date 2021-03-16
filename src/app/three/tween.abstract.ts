import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import * as GSAP from 'gsap';
import { TweenComponent } from './tween/tween.component';

@Component({
  template: '',
})
export abstract class AbstractTweenComponent
  implements OnInit, OnChanges, AfterContentInit, OnDestroy {
  @Input() protected tweenStart: boolean = true;

  @ContentChildren(TweenComponent, { descendants: false })
  private tween: QueryList<TweenComponent>;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.tweenStart && this.tweenTarget) {
      this.resetTween();
    }
  }

  ngAfterContentInit(): void {
    if (this.tween !== null && this.tween !== undefined) {
      this.tween.changes.subscribe((e) => {
        this.resetTween();
      });
    }
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
    if (
      this.tweenTarget !== null &&
      this.tween !== null &&
      this.tween.length > 0 &&
      this.tweenStart
    ) {
      this.tweenTimer = new GSAP.TimelineLite();
      this.tween.forEach((tween) => {
        tween.getTween(this.tweenTimer, this.tweenTarget, this);
      });
      this.tweenTimer.play();
    } else if (this.tweenTimer !== null) {
      this.tweenTimer.kill();
      this.tweenTimer = null;
    }
  }

  ngOnDestroy(): void {}
}