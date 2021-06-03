import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import * as GSAP from 'gsap';
import * as THREE from 'three';
import { ThreeUtil } from '../interface';
import { AbstractSubscribeComponent } from '../subscribe.abstract';

@Component({
  selector: 'three-tween',
  templateUrl: './tween.component.html',
  styleUrls: ['./tween.component.scss'],
})
export class TweenComponent extends AbstractSubscribeComponent implements OnInit {
  @Input() public targets:string = null;
  @Input() private to:any = null;
  @Input() private duration:number = null;
  @Input() private easing:string = null;
  @Input() private template:string = null;
  @Input() private repeat:number = null;
  @Input() private yoyo:boolean = null;
  @Input() private overshoot:number = null;
  @Input() private amplitude:number = null;
  @Input() private period:number = null;
  @Input() private linearRatio:number = null;
  @Input() private power:number = null;
  @Input() private yoyoMode:boolean = null;
  @Input() private steps:number = null;

  private getDuration(def?: number): number {
    return ThreeUtil.getTypeSafe(this.duration, def, 3);
  }
  private getRepeat(def?: number): number {
    return ThreeUtil.getTypeSafe(this.repeat, def, 1);
  }
  private getYoyo(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.yoyo, def, false);
  }
  private getOvershoot(def?: number): number {
    return ThreeUtil.getTypeSafe(this.overshoot, def, 1);
  }
  private getAmplitude(def?: number): number {
    return ThreeUtil.getTypeSafe(this.amplitude, def, 1);
  }
  private getPeriod(def?: number): number {
    return ThreeUtil.getTypeSafe(this.period, def, 1);
  }
  private getLinearRatio(def?: number): number {
    return ThreeUtil.getTypeSafe(this.linearRatio, def, 1);
  }
  private getPower(def?: number): number {
    return ThreeUtil.getTypeSafe(this.power, def, 1);
  }
  private getYoyoMode(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.yoyoMode, def, false);
  }

  private getSteps(def?: number): number {
    return ThreeUtil.getTypeSafe(this.steps, def, 12);
  }

  private getEasing(def?: string, isTemplate?: boolean): any {
    const easing = isTemplate
      ? ThreeUtil.getTypeSafe(this.template, def, '')
      : ThreeUtil.getTypeSafe(this.easing, def, '');
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
        return GSAP.Elastic.easeIn.config(
          this.getAmplitude(1),
          this.getPeriod(0.3)
        );
      case 'elastic.easeinout':
        return GSAP.Elastic.easeInOut.config(
          this.getAmplitude(1),
          this.getPeriod(0.3)
        );
      case 'elastic.easeout':
        return GSAP.Elastic.easeOut.config(
          this.getAmplitude(1),
          this.getPeriod(0.3)
        );
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

  private getColor(color: string | number | THREE.Color): THREE.Color {
    if (ThreeUtil.isNotNull(color)) {
      const colorStr = color.toString();
      if (colorStr.startsWith('0x')) {
        return new THREE.Color(parseInt(colorStr, 16));
      } else {
        return new THREE.Color(color);
      }
    }
    return undefined;
  }

  private getTargets(target : any, def?: string): any {
    const key = ThreeUtil.getTypeSafe(this.targets, def, null);
    if (ThreeUtil.isNotNull(key) && ThreeUtil.isNotNull(target[key])) {
      return target[key];
    }
    return target;

  }

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

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit('tween');;
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.parentEle) {
      this.addChanges(changes);
    }
  }

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }

  private parentEle: any = null;
  private tweenTarget: any = null;
  private tween : GSAP.TimelineLite = null;
  setTween(to : any, duration? : number): any {
    if (ThreeUtil.isNotNull(to)) {
      if (this.tween !== null) {
        this.tween.kill();
      }
      const fromVar = {}
      const targets = this.getTargets(this.tweenTarget, null);
      Object.entries(to).forEach(([key, value]) => {
        fromVar[key] = targets[key];
      });
      this.tween = new GSAP.TimelineLite().fromTo(
        targets,
        fromVar,
        {
          ...to,
          duration : ThreeUtil.isNotNull(duration) ? duration : this.getDuration(),
          ease: this.getEasing(),
          repeat: this.getRepeat(),
          yoyo: this.getYoyo(),
        }, 1).play();
    }
  }

  getTween(tween: GSAP.TimelineLite | GSAP.TimelineMax, tweenTarget : any,  parentEle: any): any {
    this.parentEle = parentEle;
    this.tweenTarget = tweenTarget;
    if (ThreeUtil.isNotNull(this.to)) {
      this.setTween(this.getTo(), this.getDuration());
    }
    super.callOnLoad();
    return tween;
  }
}
