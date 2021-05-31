import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { TagAttributes, ThreeUtil } from '../interface';
import { AbstractSubscribeComponent } from '../subscribe.abstract';

@Component({
  selector: 'three-rotation',
  templateUrl: './rotation.component.html',
  styleUrls: ['./rotation.component.scss'],
})
export class RotationComponent extends AbstractSubscribeComponent implements OnInit {
  @Input() private refer: any = null;
  @Input() private x: number | string = 0;
  @Input() private y: number | string = 0;
  @Input() private z: number | string = 0;
  @Output() private onLoad: EventEmitter<RotationComponent> = new EventEmitter<RotationComponent>();

  constructor() {
    super();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.x || changes.y || changes.z || changes.refer) {
      this.needUpdate = true;
    }
    super.ngOnChanges(changes);
  }

  private rotation: THREE.Euler = null;
  private _needUpdate: boolean = true;

  set needUpdate(value : boolean) {
    if (value && this.rotation !== null) {
      this._needUpdate = true;
      this.getRotation();
    }
  }

  getTagAttribute(options?: any): TagAttributes {
    const tagAttributes: TagAttributes = {
      tag: 'three-rotation',
      attributes: [],
    };
    if (ThreeUtil.isNotNull(options.rotation)) {
      tagAttributes.attributes.push({ name: 'x', value: ThreeUtil.getRadian2AngleSafe(options.rotation.x) });
      tagAttributes.attributes.push({ name: 'y', value: ThreeUtil.getRadian2AngleSafe(options.rotation.y) });
      tagAttributes.attributes.push({ name: 'z', value: ThreeUtil.getRadian2AngleSafe(options.rotation.z) });
    } else {
      tagAttributes.attributes.push({ name: 'x', value: this.x });
      tagAttributes.attributes.push({ name: 'y', value: this.y });
      tagAttributes.attributes.push({ name: 'z', value: this.z });
    }
    return tagAttributes;
  }

  setRotation(rotation: THREE.Euler | number, y? : number, z? : number) {
    if (rotation instanceof THREE.Euler) {
      if (this.rotation !== rotation) {
        this.rotation = rotation;
        this._needUpdate = true;
        this.getRotation();
        return true;
      }
    } else if (this.rotation !== null){
      this.x = ThreeUtil.getTypeSafe(rotation, this.rotation.x);
      this.y = ThreeUtil.getTypeSafe(y, this.rotation.y);
      this.z = ThreeUtil.getTypeSafe(z, this.rotation.z);
      this.needUpdate = true;
    }
    return false;
  }

  getRotation(): THREE.Euler {
    if (this.rotation === null) {
      this.rotation = new THREE.Euler();
    }
    if (this._needUpdate) {
      let rotation : THREE.Euler = null;
      if (ThreeUtil.isNotNull(this.refer)) {
        rotation = ThreeUtil.getRotation(this.refer);
      }
      if (rotation === null) {
        rotation = ThreeUtil.getEulerSafe(this.x, this.y, this.z, null, true);
      }
      if (rotation !== null) {
        this.rotation.copy(rotation);
        this.setSubscribeNext('rotation');
        this.onLoad.emit(this);
      }
    }
    return this.rotation;
  }
}
