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
  @Input() private speed: number = 0.1;

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

  setLookAt(lookat: THREE.Vector3 | number, y? : number, z? : number) {
    if (lookat instanceof THREE.Vector3) {
      if (this.lookat !== lookat && ThreeUtil.isNotNull(lookat)) {
        if (this.lookat !== null) {
          lookat.copy(this.lookat);
          this.lookat = lookat;
        } else {
          this.lookat = lookat;
          this.needUpdate = true;
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

  _lastLookat : THREE.Vector3 = null;
  _lastLookatBind : any = null;
  protected setLookatTarget(lookat : THREE.Vector3) {
    if (this._lastLookat !== lookat && lookat !== null) {
      this._lastLookat = lookat;
    }
    if (this._lastLookat !== null && this.lookat !== null) {
      this.lookat.lerp(this._lastLookat, this.speed);
      if (this.lookat.distanceTo(this._lastLookat) > 0.01) {
        if (this._lastLookatBind === null) {
          this._lastLookatBind = setTimeout(() => {
            this._lastLookatBind = null;
            this.setLookatTarget(null);
          }, 0.01);
        }
      } else {
        this.lookat.copy(this._lastLookat);
        this.setObject(this._lastLookat);
      }
    }
  }

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
      if (lookat !== null && this.lookat !== null) {
          this.setLookatTarget(lookat);
      }
      if (this.lookat === null) {
        this.lookat = new THREE.Vector3();
        this.lookat.copy(lookat);
        this.setObject(lookat);
      }
    }
    return this.lookat;
  }
}
