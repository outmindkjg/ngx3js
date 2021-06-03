import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { ThreeUtil } from '../interface';
import { AbstractSubscribeComponent } from '../subscribe.abstract';

@Component({
  selector: 'three-scale',
  templateUrl: './scale.component.html',
  styleUrls: ['./scale.component.scss'],
})
export class ScaleComponent extends AbstractSubscribeComponent implements OnInit {
  @Input() private refer: any = null;
  @Input() private x: number = 1;
  @Input() private y: number = 1;
  @Input() private z: number = 1;
  @Input() private multiply: number = null;
  @Input() private scaleMode: string = 'max';

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit('scale');
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.scale) {
      this.addChanges(changes);
    }
  }

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }

  private scale: THREE.Vector3 = null;

  setScale(scale: THREE.Vector3 | number, y? : number, z? : number) {
    if (scale instanceof THREE.Vector3) {
      if (this.scale !== scale && ThreeUtil.isNotNull(scale)) {
        if (this.scale !== null) {
          scale.copy(this.scale);
          this.scale = scale;
        } else {
          this.scale = scale;
          this.needUpdate = true;
          this.getScale();
        }
      }
    } else if (this.scale !== null ){
      this.x = ThreeUtil.getTypeSafe(scale as number, this.scale.x);
      this.y = ThreeUtil.getTypeSafe(y, this.scale.y);
      this.z = ThreeUtil.getTypeSafe(z, this.scale.z);
      this.needUpdate = true;
    }
  }

  private getScaleFromSize(size: THREE.Vector2): THREE.Vector3 {
    switch (this.scaleMode) {
      case 'max':
        const maxSize = Math.max(size.x, size.y);
        return new THREE.Vector3(maxSize * this.x, maxSize * this.y, this.z);
      case 'min':
        const minSize = Math.min(size.x, size.y);
        return new THREE.Vector3(minSize * this.x, minSize * this.y, this.z);
      default:
        return new THREE.Vector3(size.x * this.x, size.y * this.y, this.z);
    }
  }

  getScale(): THREE.Vector3 {
    if (this.scale === null) {
      this.scale = new THREE.Vector3();
    }
    if (this._needUpdate) {
      this.needUpdate = false;
      let scale : THREE.Vector3 = null;
      if (this.refer !== null && this.refer !== undefined) {
        if (this.refer.getSize) {
          scale = this.getScaleFromSize(this.refer.getSize());
        } else {
          scale = ThreeUtil.getScale(this.refer);
        }
      }
      if (scale === null) {
        scale = ThreeUtil.getVector3Safe(this.x, this.y, this.z, null, null, true);
      }
      if (scale !== null) {
        this.scale.copy(scale);
        if (ThreeUtil.isNotNull(this.multiply)) {
          this.scale.multiplyScalar(this.multiply);
        }
        super.setObject(scale);
      }
    }
    return this.scale;
  }
}
