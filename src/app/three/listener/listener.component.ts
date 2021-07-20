import { Component, forwardRef, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { AbstractObject3dComponent } from '../object3d.abstract';

@Component({
  selector: 'ngx3js-listener',
  templateUrl: './listener.component.html',
  styleUrls: ['./listener.component.scss'],
  providers: [{provide: AbstractObject3dComponent, useExisting: forwardRef(() => ListenerComponent) }]
})
export class ListenerComponent extends AbstractObject3dComponent implements OnInit {

  /**
   * Set the volume.
   */
  @Input() private volume: number = 1;

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit('listener');
  }

  ngOnDestroy(): void {
    if (this.listener !== null && this.listener.parent !== null) {
      this.listener.parent.remove(this.listener);
    }
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.listener) {
      this.addChanges(changes);
      // this.resetListener(); todo
    }
  }

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }

  private listener: THREE.AudioListener = null;

  setParent(parent: THREE.Object3D): boolean {
    if (super.setParent(parent)) {
      this.resetListener();
      return true;
    } else {
      return false;
    }
  }

  resetListener() {
    if (this.listener === null || this._needUpdate) {
      this.listener = this.getListener();
    }
    if (this.listener !== null && this.parent !== null) {
      this.listener.setMasterVolume(this.volume);
      if (!this.visible && this.listener.parent !== null) {
        this.listener.parent.remove(this.listener);
        this.listener.setMasterVolume(0);
      } else if (this.visible && this.listener.parent === null) {
        if (this.listener.parent !== this.parent) {
          if (this.listener.parent !== null && this.listener.parent !== undefined) {
            this.listener.parent.remove(this.listener);
          }
          this.parent.add(this.listener);
        }
        this.listener.setMasterVolume(this.volume);
      }
      this.listener.visible = this.visible;
    }
  }

  getListener(): THREE.AudioListener {
    if (this.listener === null || this._needUpdate) {
      this.needUpdate = false;
      this.listener = new THREE.AudioListener();
      super.setObject3d(this.listener);
    }
    return this.listener;
  }
}
