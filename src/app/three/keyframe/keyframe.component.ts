import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import * as THREE from 'three';
import { ThreeUtil } from '../interface';

@Component({
  selector: 'ngx3js-keyframe',
  templateUrl: './keyframe.component.html',
  styleUrls: ['./keyframe.component.scss'],
})
export class KeyframeComponent extends AbstractSubscribeComponent implements OnInit {
  @Input() public name: string = '';
  @Input() public type: string = '';
  @Input() public times: number[] = null;
  @Input() public vectors: number[] | { x : number, y : number, z : number}[] = [];
  @Input() public quaternions: number[] | { x : number, y : number, z : number, w? : number }[] = [];
  @Input() public colors: number[] | { r : number, g : number, b : number }[] | string[] = [];
  @Input() public values: number[] = [];
  @Input() public booleans: boolean[] | number[] = [];
  
  @Input() public interpolation: string = '';

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
    if (changes && this.keyframe) {
      this.addChanges(changes);
    }
  }

  private getVectors(size : number): number[] {
    const vectors : number[] = [];
    this.vectors.forEach(v => {
      if (typeof v === 'number') {
        vectors.push(v);
      } else {
        vectors.push(v.x, v.y, v.z);
      }
    });
    return this.checkSize(vectors, size * 3, 0);
  }

  private getQuaternions(size : number): number[] {
    const quaternions : number[] = [];
    const tmpQuaternion = new THREE.Quaternion();
    this.quaternions.forEach(v => {
      if (typeof v === 'number') {
        quaternions.push(v);
      } else if (ThreeUtil.isNotNull(v.w)){
        quaternions.push(v.x, v.y, v.z, v.w);
      } else {
        tmpQuaternion.setFromEuler(ThreeUtil.getEulerSafe(v.x, v.y, v.z));
        quaternions.push(tmpQuaternion.x, tmpQuaternion.y, tmpQuaternion.z, tmpQuaternion.w);
      }
    });
    return this.checkSize(quaternions, size * 4, 0);
  }

  private getColors(size : number): number[] {
    const colors : number[] = [];
    this.colors.forEach(v => {
      if (typeof v === 'number' || typeof v === 'string') {
        const tmp = ThreeUtil.getColorSafe(v, 0x000000);
        colors.push(tmp.r, tmp.g, tmp.b);
      } else {
        colors.push(v.r, v.g, v.b);
      }
    });
    return this.checkSize(colors, size * 3, 0);
  }

  private getValues(size : number): number[] {
    const values : number[] = [];
    this.values.forEach(v => {
      values.push(v);
    });
    return this.checkSize(values, size, 0);
  }

  private getBooleans(size : number): boolean[] {
    const booleans : boolean[] = [];
    this.booleans.forEach(v => {
      if (typeof v === 'boolean') {
        booleans.push(v);
      } else {
        booleans.push(v > 0);
      }
    });
    return this.checkSize(booleans, size, true);
  }
  


  private checkSize<T>(values : T[], size : number, def : T): T[] {
    const remind = size - values.length;
    if (remind > 0) {
      for(let i = 0; i < remind ; i++) {
        values.push(def);
      }
    } else if (remind < 0) {
      for(let i = 0; i < remind * -1 ; i++) {
        values.pop();
      }
    }
    return values;
  }


  private getInterpolation(def?: string): THREE.InterpolationModes {
    const interpolation = ThreeUtil.getTypeSafe(this.interpolation, def, '');
    switch (interpolation.toLowerCase()) {
      case 'interpolatediscrete':
      case 'discrete':
        return THREE.InterpolateDiscrete;
      case 'interpolatelinear':
      case 'linear':
        return THREE.InterpolateLinear;
      case 'interpolatesmooth':
      case 'smooth':
        return THREE.InterpolateSmooth;
      default:
        return undefined;
    }
  }

  private clip: THREE.AnimationClip = null;
  setClip(clip: THREE.AnimationClip) {
    if (this.clip !== clip) {
      this.clip = clip;
      this.getKeyframe();
    }
  }

  applyChanges(changes: string[]) {
    if (this.keyframe !== null) {
      if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
        this.getKeyframe();
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
            break;
        }
      });
      super.applyChanges(changes);
    }
  }  
  private keyframe: THREE.KeyframeTrack = null;

  getKeyframe(): THREE.KeyframeTrack {
    if (this.clip !== null && (this.keyframe === null || this._needUpdate)) {
      this.needUpdate = false;
      if (this.keyframe !== null) {
        const idx = this.clip.tracks.indexOf(this.keyframe);
        if (idx > -1) {
          this.clip.tracks.splice(idx, 1);
        }
      }
      const times: number[] = ThreeUtil.getTypeSafe(this.times, [0,1,2]);
      const interpolation: THREE.InterpolationModes = this.getInterpolation();
      switch (this.type.toLowerCase()) {
        case 'position':
          this.keyframe = new THREE.VectorKeyframeTrack('.position', times, this.getVectors(times.length), interpolation);
          break;
        case 'scale':
          this.keyframe = new THREE.VectorKeyframeTrack('.scale', times, this.getVectors(times.length), interpolation);
          break;
        case 'quaternion':
          this.keyframe = new THREE.QuaternionKeyframeTrack('.quaternion', times, this.getQuaternions(times.length), interpolation);
          break;
        case 'color':
        case 'specular' :
        case 'emissive' :
        case 'sheen' :
          this.keyframe = new THREE.ColorKeyframeTrack('.material.' + this.type.toLowerCase() , times, this.getColors(times.length), interpolation);
          break;
        case 'shininess' :
        case 'opacity':
        case 'reflectivity' :
          this.keyframe = new THREE.NumberKeyframeTrack('.material.' + this.type.toLowerCase() , times, this.getValues(times.length), interpolation);
          break;
        case 'transparent' :
        case 'wireframe' :
          this.keyframe = new THREE.BooleanKeyframeTrack('.material.' + this.type.toLowerCase(), times, this.getBooleans(times.length));
          break;
        case 'string' :
          // this.keyframe = new THREE.StringKeyframeTrack('.material.opacity', times, values, interpolation);
          break;
      }
      this.clip.tracks.push(this.keyframe);
      this.setObject(this.keyframe);
    }
    return this.keyframe;
  }
}
