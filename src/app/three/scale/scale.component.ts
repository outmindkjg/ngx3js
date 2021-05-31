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
  @Output() private onLoad: EventEmitter<ScaleComponent> = new EventEmitter<ScaleComponent>();

  constructor() {
    super();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.x || changes.y || changes.z || changes.multiply || changes.refer || changes.multiply) {
      this.needUpdate = true;
    }
    super.ngOnChanges(changes);
  }

  private scale: THREE.Vector3 = null;
  private _needUpdate: boolean = true;

  set needUpdate(value : boolean) {
    if (value && this.scale !== null) {
      this._needUpdate = true;
      this.getScale();
    }
  }

  setScale(scale: THREE.Vector3 | number, y? : number, z? : number) {
    if (scale instanceof THREE.Vector3) {
      if (this.scale !== scale && ThreeUtil.isNotNull(scale)) {
        this.scale = scale;
        this._needUpdate = true;
        this.getScale();
      }
    } else if (this.scale !== null){
      this.x = ThreeUtil.getTypeSafe(scale, this.scale.x);
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
      this._needUpdate = false;
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
        this.setSubscribeNext('scale');
        this.onLoad.emit(this);
      }
    }
    return this.scale;
  }
}
