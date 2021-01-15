import { Component, Input, OnInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'three-',
  templateUrl: './helper.component.html',
  styleUrls: ['./helper.component.scss'],
})
export class HelperComponent implements OnInit {
  @Input() type: string = 'plane';
  constructor() {}

  ngOnInit(): void {}

  private helper: THREE.LineSegments | THREE.Object3D = null;

  getHelper(): THREE.LineSegments | THREE.Object3D {
    if (this.helper === null) {
      switch (this.type.toLowerCase()) {
        case 'arrow':
          /**
           * @param [dir=new THREE.Vector3( 0, 0, 1 )]
           * @param [origin=new THREE.Vector3( 0, 0, 0 )]
           * @param [length=1]
           * @param [color=0xffff00]
           * @param headLength
           * @param headWidth
           */
          this.helper = new THREE.ArrowHelper(
            null // dir: Vector3,
            // origin?: Vector3,
            // length?: number,
            // color?: Color | string | number,
            // headLength?: number,
            // headWidth?: number
          );
          break;
        case 'axes':
          this.helper = new THREE.AxesHelper(
            1 //@param [size=1]
          );
          break;
        case 'box':
          /**
           * @param object
           * @param [color=0xffff00]
           */
          this.helper = new THREE.BoxHelper(
            null, // object: Object3D,
            null // color?: Color | string | number
          );
          break;
        case 'box3':
          this.helper = new THREE.Box3Helper(null);
          break;
        case 'camera':
          this.helper = new THREE.CameraHelper(null);
          break;
        case 'directionallight':
          this.helper = new THREE.DirectionalLightHelper(null);
          break;
        case 'grid':
          this.helper = new THREE.GridHelper();
          break;
        case 'polargrid':
          this.helper = new THREE.PolarGridHelper(
            null,
            null,
            null,
            null,
            null,
            null
          );
          break;
        case 'hemispherelight':
          this.helper = new THREE.HemisphereLightHelper(null, null);
          break;
        case 'plane':
          this.helper = new THREE.PlaneHelper(null);
          break;
        case 'pointlight':
          this.helper = new THREE.PointLightHelper(null);
          break;
        case 'skeleton':
          this.helper = new THREE.SkeletonHelper(null);
          break;
        case 'spotlight':
          this.helper = new THREE.SpotLightHelper(null);
          break;
      }
    }
    return this.helper;
  }
}
