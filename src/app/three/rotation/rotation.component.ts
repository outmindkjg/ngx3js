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

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit('rotation');
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.rotation) {
      this.addChanges(changes);
    }
  }

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }

  private rotation: THREE.Euler = null;

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
      if (this.rotation !== rotation && ThreeUtil.isNotNull(rotation)) {
        if (this.rotation !== null) {
          rotation.copy(this.rotation);
          this.rotation = rotation;
        } else {
          this.rotation = rotation;
          this.needUpdate = true;
          this.getRotation();
        }
      }
    } else if (this.rotation !== null){
      this.x = ThreeUtil.getTypeSafe(rotation , this.rotation.x);
      this.y = ThreeUtil.getTypeSafe(y, this.rotation.y);
      this.z = ThreeUtil.getTypeSafe(z, this.rotation.z);
      this.needUpdate = true;
    }
  }

  protected applyChanges(changes: string[]) {
    if (this.rotation !== null) {
      if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
        this.getRotation();
        return;
      }
      if (!ThreeUtil.isIndexOf(changes, ['init'])) {
        this.needUpdate = true;
        return ;
      }
      super.applyChanges(changes);
    }
  }

  getRotation(): THREE.Euler {
    if (this.rotation === null) {
      this.rotation = new THREE.Euler();
    }
    if (this._needUpdate) {
      this.needUpdate = false;
      let rotation : THREE.Euler = null;
      if (ThreeUtil.isNotNull(this.refer)) {
        rotation = ThreeUtil.getRotation(this.refer);
      }
      if (rotation === null) {
        rotation = ThreeUtil.getEulerSafe(this.x, this.y, this.z, null, true);
      }
      if (rotation !== null) {
        this.rotation.copy(rotation);
        super.setObject(rotation);
      }
    }
    return this.rotation;
  }
}
