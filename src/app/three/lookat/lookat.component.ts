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
        this.setSubscribeNext('lookat');
        this.onLoad.emit(this);
      }
    }
  }

  getLookAt(): THREE.Vector3 {
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
      if (lookat !== null && this.lookat !== null) {
          this.setLookatTarget(lookat);
      }
      if (this.lookat === null) {
        this.lookat = new THREE.Vector3();
        this.lookat.copy(lookat);
        this.setSubscribeNext('lookat');
        this.onLoad.emit(this);
      }
    }
    return this.lookat;
  }
}
