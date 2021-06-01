import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { ThreeUtil } from '../interface';
import { AbstractSubscribeComponent } from '../subscribe.abstract';

@Component({
  selector: 'three-lookat',
  templateUrl: './lookat.component.html',
  styleUrls: ['./lookat.component.scss'],
})
export class LookatComponent extends AbstractSubscribeComponent implements OnInit {
  @Input() private refer: any = null;
  @Input() private x: number = null;
  @Input() private y: number = null;
  @Input() private z: number = null;
  @Output() private onLoad: EventEmitter<LookatComponent> = new EventEmitter<LookatComponent>();

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.x || changes.y || changes.z || changes.refer) {
      this.needUpdate = true;
    }
    super.ngOnChanges(changes);
  }

  private _needUpdate: boolean = true;
  set needUpdate(value: boolean) {
    if (value && this.lookat !== null) {
      this._needUpdate = true;
      this.getLookAt();
    }
  }

  private lookat: THREE.Vector3 = null;

  setLookAt(lookat: THREE.Vector3 | number, y? : number, z? : number) {
    if (lookat instanceof THREE.Vector3) {
      if (this.lookat !== lookat && ThreeUtil.isNotNull(lookat)) {
        if (this.lookat !== null) {
          lookat.copy(this.lookat);
          this.lookat = lookat;
        } else {
          this.lookat = lookat;
          this._needUpdate = true;
          this.getLookAt();
        }
      }
    } else if (this.lookat !== null){
      this.x = ThreeUtil.getTypeSafe(lookat, this.lookat.x);
      this.y = ThreeUtil.getTypeSafe(y, this.lookat.y);
      this.z = ThreeUtil.getTypeSafe(z, this.lookat.z);
      this.needUpdate = true;
    }
  }

  getLookAt(): THREE.Vector3 {
    if (this.lookat === null) {
      this.lookat = new THREE.Vector3();
    }
    if (this._needUpdate) {
      this._needUpdate = false;
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
      if (lookat !== null) {
        this.lookat.copy(lookat);
        this.setSubscribeNext('lookat');
        this.onLoad.emit(this);
      }
    }
    return this.lookat;
  }
}
