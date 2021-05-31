import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { ThreeUtil } from '../interface';
import { AbstractSubscribeComponent } from '../subscribe.abstract';

@Component({
  selector: 'three-listener',
  templateUrl: './listener.component.html',
  styleUrls: ['./listener.component.scss']
})
export class ListenerComponent extends AbstractSubscribeComponent implements OnInit {

  @Input() private volume:number = 1 ;
  @Input() public visible:boolean = true ;

  constructor() { 
    super();
  }


  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnDestroy(): void {
    if (this.listener !== null && this.listener.parent !== null) {
      this.listener.parent.remove(this.listener);
    }
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.resetListener();
    }
    super.ngOnChanges(changes);
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
