import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as GSAP from 'gsap';
import { ThreeUtil } from '../interface';
import { AbstractSubscribeComponent } from '../subscribe.abstract';

/**
 * TweenComponent
 */
@Component({
  selector: 'ngx3js-tween',
  templateUrl: './tween.component.html',
  styleUrls: ['./tween.component.scss'],
})
export class TweenComponent extends AbstractSubscribeComponent implements OnInit {
  /**
   * Input  of tween component
   */
  @Input() public targets: string = null;

  /**
   * Input  of tween component
   */
  @Input() private to: any = null;

  /**
   * Input  of tween component
   */
  @Input() private duration: number = null;

  /**
   * Input  of tween component
   *
   * Notice - case insensitive.
   * 
   */
  @Input() private easing: string = null;

  /**
   * Input  of tween component
   */
  @Input() private template: string = null;

  /**
   * Input  of tween component
   */
  @Input() private repeat: number = null;

  /**
   * Input  of tween component
   */
  @Input() private yoyo: boolean = null;

  /**
   * Input  of tween component
   */
  @Input() private overshoot: number = null;

  /**
   * Input  of tween component
   */
  @Input() private amplitude: number = null;

  /**
   * Input  of tween component
   */
  @Input() private period: number = null;

  /**
   * Input  of tween component
   */
  @Input() private linearRatio: number = null;

  /**
   * Input  of tween component
   */
  @Input() private power: number = null;

  /**
   * Input  of tween component
   */
  @Input() private yoyoMode: boolean = null;

  /**
   * Input  of tween component
   */
  @Input() private steps: number = null;

  /**
   * Gets duration
   * @param [def]
   * @returns duration
   */
  private getDuration(def?: number): number {
    return ThreeUtil.getTypeSafe(this.duration, def, 3);
  }

  /**
   * Gets repeat
   * @param [def]
   * @returns repeat
   */
  private getRepeat(def?: number): number {
    return ThreeUtil.getTypeSafe(this.repeat, def, 1);
  }

  /**
   * Gets yoyo
   * @param [def]
   * @returns true if yoyo
   */
  private getYoyo(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.yoyo, def, false);
  }

  /**
   * Gets overshoot
   * @param [def]
   * @returns overshoot
   */
  private getOvershoot(def?: number): number {
    return ThreeUtil.getTypeSafe(this.overshoot, def, 1);
  }

  /**
   * Gets amplitude
   * @param [def]
   * @returns amplitude
   */
  private getAmplitude(def?: number): number {
    return ThreeUtil.getTypeSafe(this.amplitude, def, 1);
  }

  /**
   * Gets period
   * @param [def]
   * @returns period
   */
  private getPeriod(def?: number): number {
    return ThreeUtil.getTypeSafe(this.period, def, 1);
  }

  /**
   * Gets linear ratio
   * @param [def]
   * @returns linear ratio
   */
  private getLinearRatio(def?: number): number {
    return ThreeUtil.getTypeSafe(this.linearRatio, def, 1);
  }

  /**
   * Gets power
   * @param [def]
   * @returns power
   */
  private getPower(def?: number): number {
    return ThreeUtil.getTypeSafe(this.power, def, 1);
  }

  /**
   * Gets yoyo mode
   * @param [def]
   * @returns true if yoyo mode
   */
  private getYoyoMode(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.yoyoMode, def, false);
  }

  /**
   * Gets steps
   * @param [def]
   * @returns steps
   */
  private getSteps(def?: number): number {
    return ThreeUtil.getTypeSafe(this.steps, def, 12);
  }

  /**
   * Gets easing
   * @param [def]
   * @param [isTemplate]
   * @returns easing
   */
  private getEasing(def?: string, isTemplate?: boolean): any {
    const easing = isTemplate ? ThreeUtil.getTypeSafe(this.template, def, '') : ThreeUtil.getTypeSafe(this.easing, def, '');
    switch (easing.toLowerCase()) {
      case 'power1':
      case 'power1.easein':
        return GSAP.Power1.easeIn;
      case 'power1.easeinout':
        return GSAP.Power1.easeInOut;
      case 'power1.easeout':
        return GSAP.Power1.easeOut;
      case 'power2':
      case 'power2.easein':
        return GSAP.Power2.easeIn;
      case 'power2.easeinout':
        return GSAP.Power2.easeInOut;
      case 'power2.easeout':
        return GSAP.Power2.easeOut;
      case 'power3':
      case 'power3.easein':
        return GSAP.Power3.easeIn;
      case 'power3.easeinout':
        return GSAP.Power3.easeInOut;
      case 'power3.easeout':
        return GSAP.Power3.easeOut;
      case 'power4':
      case 'power4.easein':
        return GSAP.Power4.easeIn;
      case 'power4.easeinout':
        return GSAP.Power4.easeInOut;
      case 'power4.easeout':
        return GSAP.Power4.easeOut;
      case 'back':
      case 'back.easein':
        return GSAP.Back.easeIn.config(this.getOvershoot(1.7));
      case 'back.easeinout':
        return GSAP.Back.easeInOut.config(this.getOvershoot(1.7));
      case 'back.easeout':
        return GSAP.Back.easeOut.config(this.getOvershoot(1.7));
      case 'elastic':
      case 'elastic.easein':
        return GSAP.Elastic.easeIn.config(this.getAmplitude(1), this.getPeriod(0.3));
      case 'elastic.easeinout':
        return GSAP.Elastic.easeInOut.config(this.getAmplitude(1), this.getPeriod(0.3));
      case 'elastic.easeout':
        return GSAP.Elastic.easeOut.config(this.getAmplitude(1), this.getPeriod(0.3));
      case 'bounce':
      case 'bounce.easein':
        return GSAP.Bounce.easeIn;
      case 'bounce.easeinout':
        return GSAP.Bounce.easeInOut;
      case 'bounce.easeout':
        return GSAP.Bounce.easeOut;
      case 'rough':
      case 'rough.easein':
      case 'rough.easeinout':
      case 'rough.easeout':

      /*
        return GSAP.RoughEase.config({
          template: this.getEasing(null, true),
          strength: 1,
          points: 20,
          taper: 'none',
          randomize: true,
          clamp: false,
        });
        */
      case 'slowmo':
      case 'slowmo.easein':
      case 'slowmo.easeinout':
      case 'slowmo.easeout':
      /*
        return GSAP.SlowMo.ease.config(
          this.getLinearRatio(0.7),
          this.getPower(0.7),
          this.getYoyoMode(false)
        );
        */
      case 'stepped':
      case 'stepped.easein':
      case 'stepped.easeinout':
      case 'stepped.easeout':
        //  return GSAP.SteppedEase;
        return GSAP.SteppedEase.config(this.getSteps(12));
      case 'circ':
      case 'circ.easein':
        return GSAP.Circ.easeIn;
      case 'circ.easeinout':
        return GSAP.Circ.easeInOut;
      case 'circ.easeout':
        return GSAP.Circ.easeOut;
      case 'expo':
      case 'expo.easein':
        return GSAP.Expo.easeIn;
      case 'expo.easeinout':
        return GSAP.Expo.easeInOut;
      case 'expo.easeout':
        return GSAP.Expo.easeOut;
      case 'sine':
      case 'sine.easein':
        return GSAP.Sine.easeIn;
      case 'sine.easeinout':
        return GSAP.Sine.easeInOut;
      case 'sine.easeout':
        return GSAP.Sine.easeOut;
      case 'custom':
      case 'custom.easein':
      case 'custom.easeinout':
      case 'custom.easeout':
        return GSAP.Power0.easeNone;
      //  return GSAP.CustomEase.create();
      case 'power0':
      case 'power0.easein':
      case 'power0.easeinout':
      case 'power0.easeout':
      default:
        return GSAP.Power0.easeNone;
    }
  }

  /**
   * Gets targets
   * @param target
   * @param [def]
   * @returns targets
   */
  private getTargets(target: any, def?: string): any {
    const key = ThreeUtil.getTypeSafe(this.targets, def, null);
    if (ThreeUtil.isNotNull(key) && ThreeUtil.isNotNull(target[key])) {
      return target[key];
    }
    return target;
  }

  /**
   * Gets to
   * @param [def]
   * @returns to
   */
  private getTo(def?: any): any {
    const to = ThreeUtil.getTypeSafe(this.to, def, {});
    const result: { [key: string]: any } = {};
    Object.entries(to).forEach(([key, value]) => {
      switch (key) {
        default:
          result[key] = value;
          break;
      }
    });
    return result;
  }

  /**
   * Creates an instance of tween component.
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
    super.ngOnInit('tween');
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
    if (changes && this.parentEle) {
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

  /**
   * Parent ele of tween component
   */
  private parentEle: any = null;

  /**
   * Tween target of tween component
   */
  private _tweenTarget: any = null;

  /**
   * Tween  of tween component
   */
  private _tween: GSAP.TimelineLite = null;

  /**
   * Sets tween
   * @param to
   * @param [duration]
   * @returns tween
   */
  public setTween(to: any, duration?: number): any {
    if (ThreeUtil.isNotNull(to)) {
      if (this._tween !== null) {
        this._tween.kill();
      }
      const fromVar = {};
      const targets = this.getTargets(this._tweenTarget, null);
      Object.entries(to).forEach(([key, value]) => {
        fromVar[key] = targets[key];
      });
      this._tween = new GSAP.TimelineLite()
        .fromTo(
          targets,
          fromVar,
          {
            ...to,
            duration: ThreeUtil.isNotNull(duration) ? duration : this.getDuration(),
            ease: this.getEasing(),
            repeat: this.getRepeat(),
            yoyo: this.getYoyo(),
          },
          1
        )
        .play();
    }
  }

  /**
   * Gets tween
   * @param tween
   * @param tweenTarget
   * @param parentEle
   * @returns tween
   */
  public getTween(tween: GSAP.TimelineLite | GSAP.TimelineMax, tweenTarget: any, parentEle: any): any {
    this.parentEle = parentEle;
    this._tweenTarget = tweenTarget;
    if (ThreeUtil.isNotNull(this.to)) {
      this.setTween(this.getTo(), this.getDuration());
    }
    super.callOnLoad();
    return tween;
  }
}
