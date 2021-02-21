import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { ThreeUtil } from '../interface';

@Component({
  selector: 'three-listener',
  templateUrl: './listener.component.html',
  styleUrls: ['./listener.component.scss']
})
export class ListenerComponent implements OnInit {

  @Input() private volume:number = 1 ;
  @Input() public visible:boolean = true ;

  constructor() { }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.listener !== null && this.listener.parent !== null) {
      this.listener.parent.remove(this.listener);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.resetListener();
    }
  }

  private listener : THREE.AudioListener = null;

  private parent: THREE.Object3D = null;

  setParent(parent: THREE.Object3D) {
    if (this.parent !== parent) {
      this.parent = parent;
      this.resetListener();
    }
  }

  resetListener() {
    if (this.listener === null) {
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

  getListener() : THREE.AudioListener {
    if (this.listener === null) {
      this.listener = new THREE.AudioListener();
      if (ThreeUtil.isNull(this.listener.userData.component)) {
        this.listener.userData.component = this;
      }
    }
    return this.listener;
  }
}
