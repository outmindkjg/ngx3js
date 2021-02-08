import { Component, Input, OnInit } from '@angular/core';
import * as THREE from 'three';
import { AbstractThreeController, ThreeUtil } from './../interface';

@Component({
  selector: 'three-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss']
})
export class ControllerComponent implements OnInit {

  @Input() controller : { new(ref : THREE.Object3D) : AbstractThreeController } = null;
  constructor() { }


  ngOnInit(): void {
  }

  private _controller : AbstractThreeController = null;
  private refObject3d : THREE.Object3D;
  setObject3D(refObject3d: THREE.Object3D) {
    if (this.refObject3d !== refObject3d) {
      this.refObject3d = refObject3d;
      if (this.refObject3d !== null) {
        this._controller = new this.controller(this.refObject3d);
      }
    }
  }
}
