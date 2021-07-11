import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import * as THREE from 'three';
import { ThreeUtil } from '../interface';

@Component({
  selector: 'three-keyframe',
  templateUrl: './keyframe.component.html',
  styleUrls: ['./keyframe.component.scss'],
})
export class KeyframeComponent extends AbstractSubscribeComponent implements OnInit {
  @Input() public name: string = '';
  @Input() public type: string = '';
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

  getInterpolation(def?: string): THREE.InterpolationModes {
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
      const times: number[] = [];
      const values: number[] = [];
      const interpolation: THREE.InterpolationModes = this.getInterpolation();
      switch (this.type.toLowerCase()) {
        case 'position':
          this.keyframe = new THREE.VectorKeyframeTrack('.position', times, values, interpolation);
          break;
        case 'scale':
          this.keyframe = new THREE.VectorKeyframeTrack('.scale', times, values, interpolation);
          break;
        case 'quaternion':
          this.keyframe = new THREE.QuaternionKeyframeTrack('.quaternion', times, values, interpolation);
          break;
        case 'color':
          this.keyframe = new THREE.ColorKeyframeTrack('.material.color', times, values, interpolation);
          break;
        case 'opacity':
          this.keyframe = new THREE.NumberKeyframeTrack('.material.opacity', times, values, interpolation);
          break;
        case 'transparent' :
          this.keyframe = new THREE.BooleanKeyframeTrack('.material.transparent', times, values);
          break;
        case 'string' :
          this.keyframe = new THREE.StringKeyframeTrack('.material.opacity', times, values, interpolation);
          break;
      }
      this.clip.tracks.push(this.keyframe);
      this.setObject(this.keyframe);
    }
    return this.keyframe;
  }
}
