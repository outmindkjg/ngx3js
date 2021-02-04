import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

import * as TWEEN from '@tweenjs/tween.js';
import * as THREE from 'three';

@Component({
  selector: 'three-tween',
  templateUrl: './tween.component.html',
  styleUrls: ['./tween.component.scss']
})
export class TweenComponent implements OnInit {

  @Input() to: any = null;
  @Input() duration: number = null;
  @Input() easing: string = null;
  @Input() repeat: number = null;
  @Input() yoyo: boolean = null;

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
    return this.getTypeSafe(this.duration, def, 1000);
  }
  private getRepeat(def?: number): number {
    return this.getTypeSafe(this.repeat, def, 1);
  }
  private getYoyo(def?: boolean): boolean {
    return this.getTypeSafe(this.yoyo, def, false);
  }
  private getEasing(def?: string): any {
    const easing = this.getTypeSafe(this.easing, def, '');
    switch (easing.toLowerCase()) {
      case 'linear':
      case 'linear-none':
        return TWEEN.Easing.Linear.None;
      case 'quadratic':
      case 'quadratic-in':
        return TWEEN.Easing.Quadratic.In;
      case 'quadratic-out':
        return TWEEN.Easing.Quadratic.Out;
      case 'quadratic-inout':
        return TWEEN.Easing.Quadratic.InOut;
      case 'cubic':
      case 'cubic-in':
        return TWEEN.Easing.Cubic.In;
      case 'cubic-out':
        return TWEEN.Easing.Cubic.Out;
      case 'cubic-inout':
        return TWEEN.Easing.Cubic.InOut;
      case 'quartic':
      case 'quartic-in':
        return TWEEN.Easing.Quartic.In;
      case 'quartic-out':
        return TWEEN.Easing.Quartic.Out;
      case 'quartic-inout':
        return TWEEN.Easing.Quartic.InOut;
      case 'sinusoidal':
      case 'sinusoidal-in':
        return TWEEN.Easing.Sinusoidal.In;
      case 'sinusoidal-out':
        return TWEEN.Easing.Sinusoidal.Out;
      case 'sinusoidal-inout':
        return TWEEN.Easing.Sinusoidal.InOut;
      case 'exponential':
      case 'exponential-in':
        return TWEEN.Easing.Exponential.In;
      case 'exponential-out':
        return TWEEN.Easing.Exponential.Out;
      case 'exponential-inout':
        return TWEEN.Easing.Exponential.InOut;
      case 'circular':
      case 'circular-in':
        return TWEEN.Easing.Circular.In;
      case 'circular-out':
        return TWEEN.Easing.Circular.Out;
      case 'circular-inout':
        return TWEEN.Easing.Circular.InOut;
      case 'elastic':
      case 'elastic-in':
        return TWEEN.Easing.Elastic.In;
      case 'elastic-out':
        return TWEEN.Easing.Elastic.Out;
      case 'elastic-inout':
        return TWEEN.Easing.Elastic.InOut;
      case 'back':
      case 'back-in':
        return TWEEN.Easing.Back.In;
      case 'back-out':
        return TWEEN.Easing.Back.Out;
      case 'back-inout':
        return TWEEN.Easing.Back.InOut;
      case 'bounce':
      case 'bounce-in':
        return TWEEN.Easing.Bounce.In;
      case 'bounce-out':
        return TWEEN.Easing.Bounce.Out;
      case 'bounce-inout':
        return TWEEN.Easing.Bounce.InOut;
      default:
        return TWEEN.Easing.Linear.None;
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
    const result : { [key : string] : number } = {};
    Object.entries(to).forEach(([key, value]) => {
      switch(key) {
        case 'color' :
          if (typeof(value) == 'string' || typeof(value) == 'number' || value instanceof THREE.Color) {
            result[key] = this.getColor(value).getHex();
          }
          break;
        default :
          if (typeof(value) == 'string') {
            result[key] = parseFloat(value);
          } else if (typeof(value) == 'number') {
            result[key] = value;
          }
          break;
      }
    });
    return result;
  }
  

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.parentEle !== null && this.parentEle.resetTween) {
      this.parentEle.resetTween();
    }
  }

  private parentEle : any = null;
  getTween(tween: TWEEN.Tween<any>, parentEle : any): TWEEN.Tween<any> {
    this.parentEle = parentEle;
    if (this.isNotNull(this.to)) {
      tween.to(this.getTo(), this.getDuration())
        .easing(this.getEasing())
        .repeat(this.getRepeat())
        .yoyo(this.getYoyo());
    }
    return tween;
  }

}
