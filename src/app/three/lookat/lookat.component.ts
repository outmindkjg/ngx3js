import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { TagAttributes, ThreeUtil } from '../interface';
import { AbstractSubscribeComponent } from '../subscribe.abstract';

@Component({
  selector: 'ngx3js-lookat',
  templateUrl: './lookat.component.html',
  styleUrls: ['./lookat.component.scss'],
})
export class LookatComponent extends AbstractSubscribeComponent implements OnInit {
  @Input() private refer: any = null;
  @Input() private x: number = null;
  @Input() private y: number = null;
  @Input() private z: number = null;

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit('lookat');
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.lookat) {
      this.addChanges(changes);
    }
  }

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }

  private lookat: THREE.Vector3 = null;

  private _object3d: THREE.Object3D = null;

  setObject3d(object3d: THREE.Object3D) {
    if (this.lookat === null) {
      this.getLookAt();
    }
    if (ThreeUtil.isNotNull(object3d)) {
      this._object3d = object3d;
      this.synkObject3d(this.lookat);
    }
  }

  synkObject3d(lookat: THREE.Vector3 = null) {
    if (ThreeUtil.isNotNull(lookat) && this.enabled) {
      if (ThreeUtil.isNotNull(this._object3d)) {
        if (this.isIdEuals(this._object3d.userData.lookat)) {
          this._object3d.userData.lookat = this.id;
          this._object3d.lookAt(this.lookat);
        }
      } else {
        this.lookat.copy(lookat);
      }
    }
  }

  setScale(x?: number, y? : number, z? : number) {
    if (this.lookat !== null) {
      this.x = ThreeUtil.getTypeSafe(x, this.lookat.x);
      this.y = ThreeUtil.getTypeSafe(y, this.lookat.y);
      this.z = ThreeUtil.getTypeSafe(z, this.lookat.z);
    } else {
      this.x = ThreeUtil.getTypeSafe(x, 0);
      this.y = ThreeUtil.getTypeSafe(y, 0);
      this.z = ThreeUtil.getTypeSafe(z, 0);
    }
    this.needUpdate = true;
  }

  getTagAttribute(options?: any): TagAttributes {
    const tagAttributes: TagAttributes = {
      tag: 'ngx3js-lookat',
      attributes: [],
    };
    if (ThreeUtil.isNotNull(options.lookat)) {
      tagAttributes.attributes.push({ name: 'x', value: options.lookat.x });
      tagAttributes.attributes.push({ name: 'y', value: options.lookat.y });
      tagAttributes.attributes.push({ name: 'z', value: options.lookat.z });
    } else {
      tagAttributes.attributes.push({ name: 'x', value: this.x });
      tagAttributes.attributes.push({ name: 'y', value: this.y });
      tagAttributes.attributes.push({ name: 'z', value: this.z });
    }
    return tagAttributes;
  }

  protected applyChanges(changes: string[]) {
    if (this.lookat !== null) {
      if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
        this.getLookAt();
        return;
      }
      if (!ThreeUtil.isOnlyIndexOf(changes, ['init','type','enabled'])) {
        this.needUpdate = true;
        return ;
      }
      super.applyChanges(changes);
    }
  }

  private _getLookAt(): THREE.Vector3 {
    let lookat: THREE.Vector3 = null;
    if (this.refer !== null) {
      this.unSubscribeRefer('refer');
      lookat = ThreeUtil.getLookAt(this.refer);
      this.subscribeRefer(
        'refer',
        ThreeUtil.getSubscribe(
          this.refer,
          () => {
            this.needUpdate = true;
          },
          'lookat'
        )
      );
    }
    if (lookat === null) {
      lookat = ThreeUtil.getVector3Safe(this.x, this.y, this.z, null, null, true);
    }
    return lookat;
  }

  getLookAt(): THREE.Vector3 {
    if (this._needUpdate) {
      this.needUpdate = false;
      this.lookat = this._getLookAt();
      this.synkObject3d(this.lookat);
      this.setObject(this.lookat);
    }
    return this.lookat;
  }
}
