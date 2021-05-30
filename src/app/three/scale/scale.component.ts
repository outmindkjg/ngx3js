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
  @Input() public visible: boolean = true;
  @Input() private refer: any = null;
  @Input() private referRef: boolean = true;
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
    this.resetScale();
  }

  private scale: THREE.Vector3 = null;
  private needUpdate: boolean = true;
  private parent: THREE.Object3D | any = null;

  setParent(parent: THREE.Object3D | any, isRestore: boolean = false): boolean {
    if (this.parent !== parent) {
      this.parent = parent;
      if (isRestore && this.parent !== null && this.parent instanceof THREE.Object3D) {
        this.scale = null;
        this.x = this.parent.scale.x;
        this.y = this.parent.scale.y;
        this.z = this.parent.scale.z;
      }
      this.resetScale();
      return true;
    }
    return false;
  }

  resetScale() {
    if (this.parent !== null && this.visible) {
      this.unSubscribeRefer('scale');
      this.unSubscribeRefer('size');
      if (this.parent instanceof THREE.Object3D) {
        this.parent.scale.copy(this.getScale());
        if (this.refer !== null && this.referRef) {
          if (this.refer.sizeSubscribe) {
            this.subscribeRefer('scale', this.refer.sizeSubscribe().subscribe((size) => {
              if (this.parent instanceof THREE.Object3D && this.visible) {
                this.parent.scale.copy(this.getScaleFromSize(size));
              }
            }));
          } else if (this.refer.scaleSubscribe) {
            this.subscribeRefer('size', this.refer.scaleSubscribe().subscribe((scale) => {
              if (this.parent instanceof THREE.Object3D && this.visible) {
                this.parent.scale.copy(scale);
              }
            }));
          }
        }
      } else if (this.parent.meshScales) {
        this.parent.meshScales.forEach((scale) => {
          scale.copy(this.getScale());
        });
      }
    } else if (this.scale !== null && this.needUpdate) {
      this.getScale();
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
    if (this.scale === null || this.needUpdate) {
      this.needUpdate = false;
      this.scale = null;
      if (this.refer !== null && this.refer !== undefined) {
        if (this.refer.getSize) {
          this.scale = this.getScaleFromSize(this.refer.getSize());
        } else if (this.refer.getScale) {
          this.scale = this.refer.getScale();
        } else if (this.refer instanceof THREE.Vector3) {
          this.scale = this.refer;
        }
      }
      if (this.scale === null) {
        this.scale = ThreeUtil.getVector3Safe(this.x, this.y, this.z, new THREE.Vector3(1, 1, 1));
      }
      if (ThreeUtil.isNotNull(this.multiply)) {
        this.scale.multiplyScalar(this.multiply);
      }
      if (this.visible) {
        this.setSubscribeNext('scale');
      }
      this.onLoad.emit(this);
    }
    return this.scale;
  }
}
