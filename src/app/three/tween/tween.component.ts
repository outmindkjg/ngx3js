import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as GSAP from 'gsap';
import * as THREE from 'three';

@Component({
  selector: 'three-tween',
  templateUrl: './tween.component.html',
  styleUrls: ['./tween.component.scss'],
})
export class TweenComponent implements OnInit {
  @Input() to: any = null;
  @Input() duration: number = null;
  @Input() easing: string = null;
  @Input() template: string = null;
  @Input() repeat: number = null;
  @Input() yoyo: boolean = null;
  @Input() overshoot: number = null;
  @Input() amplitude: number = null;
  @Input() period: number = null;
  @Input() linearRatio: number = null;
  @Input() power: number = null;
  @Input() yoyoMode: boolean = null;
  @Input() steps: number = null;

  private isNull(value: any): boolean {
    return value === null || value === undefined;
  }

  private isNotNull(value: any): boolean {
    return !this.isNull(value);
  }

  private getTypeSafe<T>(value: T, altValue?: T, nullValue?: T): T {
    const defValue = this.isNotNull(value) ? value : altValue;
    if (this.isNotNull(defValue)) {
      return defValue;
    }
    if (this.isNotNull(nullValue)) {
      return nullValue;
    } else {
      return undefined;
    }
  }

  private getDuration(def?: number): number {
    return this.getTypeSafe(this.duration, def, 3);
  }
  private getRepeat(def?: number): number {
    return this.getTypeSafe(this.repeat, def, 1);
  }
  private getYoyo(def?: boolean): boolean {
    return this.getTypeSafe(this.yoyo, def, false);
  }
  private getOvershoot(def?: number): number {
    return this.getTypeSafe(this.overshoot, def, 1);
  }
  private getAmplitude(def?: number): number {
    return this.getTypeSafe(this.amplitude, def, 1);
  }
  private getPeriod(def?: number): number {
    return this.getTypeSafe(this.period, def, 1);
  }
  private getLinearRatio(def?: number): number {
    return this.getTypeSafe(this.linearRatio, def, 1);
  }
  private getPower(def?: number): number {
    return this.getTypeSafe(this.power, def, 1);
  }
  private getYoyoMode(def?: boolean): boolean {
    return this.getTypeSafe(this.yoyoMode, def, false);
  }

  private getSteps(def?: number): number {
    return this.getTypeSafe(this.steps, def, 12);
  }

  private getEasing(def?: string, isTemplate?: boolean): any {
    const easing = isTemplate
      ? this.getTypeSafe(this.template, def, '')
      : this.getTypeSafe(this.easing, def, '');
    switch (easing.toLowerCase()) {
      case 'power1':
      case 'power1.easein':
        return GSAP.Power1.easeIn;
      case 'Power1.easeInOut':
        return GSAP.Power1.easeInOut;
      case 'Power1.easeOut':
        return GSAP.Power1.easeOut;
      case 'Power2':
      case 'Power2.easeIn':
        return GSAP.Power2.easeIn;
      case 'Power2.easeInOut':
        return GSAP.Power2.easeInOut;
      case 'Power2.easeOut':
        return GSAP.Power2.easeOut;
      case 'Power3':
      case 'Power3.easeIn':
        return GSAP.Power3.easeIn;
      case 'Power3.easeInOut':
        return GSAP.Power3.easeInOut;
      case 'Power3.easeOut':
        return GSAP.Power3.easeOut;
      case 'Power4':
      case 'Power4.easeIn':
        return GSAP.Power4.easeIn;
      case 'Power4.easeInOut':
        return GSAP.Power4.easeInOut;
      case 'Power4.easeOut':
        return GSAP.Power4.easeOut;
      case 'Back':
      case 'Back.easeIn':
        return GSAP.Back.easeIn.config(this.getOvershoot(1.7));
      case 'Back.easeInOut':
        return GSAP.Back.easeInOut.config(this.getOvershoot(1.7));
      case 'Back.easeOut':
        return GSAP.Back.easeOut.config(this.getOvershoot(1.7));
      case 'Elastic':
      case 'Elastic.easeIn':
        return GSAP.Elastic.easeIn.config(
          this.getAmplitude(1),
          this.getPeriod(0.3)
        );
      case 'Elastic.easeInOut':
        return GSAP.Elastic.easeInOut.config(
          this.getAmplitude(1),
          this.getPeriod(0.3)
        );
      case 'Elastic.easeOut':
        return GSAP.Elastic.easeOut.config(
          this.getAmplitude(1),
          this.getPeriod(0.3)
        );
      case 'Bounce':
      case 'Bounce.easeIn':
        return GSAP.Bounce.easeIn;
      case 'Bounce.easeInOut':
        return GSAP.Bounce.easeInOut;
      case 'Bounce.easeOut':
        return GSAP.Bounce.easeOut;
      case 'Rough':
      case 'Rough.easeIn':
      case 'Rough.easeInOut':
      case 'Rough.easeOut':

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
      case 'SlowMo':
      case 'SlowMo.easeIn':
      case 'SlowMo.easeInOut':
      case 'SlowMo.easeOut':
        /*
        return GSAP.SlowMo.ease.config(
          this.getLinearRatio(0.7),
          this.getPower(0.7),
          this.getYoyoMode(false)
        );
        */
      case 'Stepped':
      case 'Stepped.easeIn':
      case 'Stepped.easeInOut':
      case 'Stepped.easeOut':
      //  return GSAP.SteppedEase;
       return GSAP.SteppedEase.config(this.getSteps(12));
      case 'Circ':
      case 'Circ.easeIn':
        return GSAP.Circ.easeIn;
      case 'Circ.easeInOut':
        return GSAP.Circ.easeInOut;
      case 'Circ.easeOut':
        return GSAP.Circ.easeOut;
      case 'Expo':
      case 'Expo.easeIn':
        return GSAP.Expo.easeIn;
      case 'Expo.easeInOut':
        return GSAP.Expo.easeInOut;
      case 'Expo.easeOut':
        return GSAP.Expo.easeOut;
      case 'Sine':
      case 'Sine.easeIn':
        return GSAP.Sine.easeIn;
      case 'Sine.easeInOut':
        return GSAP.Sine.easeInOut;
      case 'Sine.easeOut':
        return GSAP.Sine.easeOut;
      case 'Custom':
      case 'Custom.easeIn':
      case 'Custom.easeInOut':
      case 'Custom.easeOut':
        return GSAP.Power0.easeNone;
      //  return GSAP.CustomEase.create();
      case 'Power0':
      case 'Power0.easeIn':
      case 'Power0.easeInOut':
      case 'Power0.easeOut':
      default:
        return GSAP.Power0.easeNone;
    }
  }

  private getColor(color: string | number | THREE.Color): THREE.Color {
    if (this.isNotNull(color)) {
      const colorStr = color.toString();
      if (colorStr.startsWith('0x')) {
        return new THREE.Color(parseInt(colorStr, 16));
      } else {
        return new THREE.Color(color);
      }
    }
    return undefined;
  }

  private getTo(def?: any): any {
    const to = this.getTypeSafe(this.to, def, {});
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

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.parentEle !== null && this.parentEle.resetTween) {
      this.parentEle.resetTween();
    }
  }

  private parentEle: any = null;
  private tweenTarget: any = null;

  getTween(tween: GSAP.TimelineLite | GSAP.TimelineMax, tweenTarget : any,  parentEle: any): any {
    this.parentEle = parentEle;
    this.tweenTarget = tweenTarget;
    if (this.isNotNull(this.to)) {
      tween.to(
        tweenTarget,
        {
          ...this.getTo(),
          duration : this.getDuration(),
          ease: this.getEasing(),
          repeat: this.getRepeat(),
          yoyo: this.getYoyo(),
        });
    }
    return tween;
  }
}
