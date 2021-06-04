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

  getLookAt(): THREE.Vector3 {
    if (this._needUpdate) {
      this.needUpdate = false;
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
      this.lookat = lookat;
      this.setObject(this.lookat);
    }
    return this.lookat;
  }
}
