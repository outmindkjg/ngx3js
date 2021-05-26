import { Component } from '@angular/core';
import { CSMHelper } from 'three/examples/jsm/csm/CSMHelper';
import { BaseComponent } from '../../three';
import { ControlComponent } from '../../three/control/control.component';
import { HelperComponent } from '../../three/helper/helper.component';

@Component({
  selector: 'app-webgl-shadowmap-csm',
  templateUrl: './webgl-shadowmap-csm.component.html',
  styleUrls: ['./webgl-shadowmap-csm.component.scss']
})
export class WebglShadowmapCsmComponent extends BaseComponent<{
  orthographic: boolean,
  fade: boolean,
  far: number,
  mode: string,
  lightX:number,
  lightY:number,
  lightZ:number,
  margin:number,
  lightFar:number,
  lightNear:number,
  autoUpdateHelper:boolean,
  helper : any;
}> {
  constructor() {
    super({
      orthographic: false,
      fade: false,
      far: 1000,
      mode: 'practical',
      lightX: -1,
      lightY: -1,
      lightZ: -1,
      margin: 100,
      lightFar: 5000,
      lightNear:1,
      autoUpdateHelper: true,
      helper : {
        visible : false,
        displayFrustum : true,
        displayPlanes : true,
        displayShadowBounds : true,
        updateHelper: () => {
          // csmHelper.update();
        }
      }
    },[
      { name : 'orthographic', type : 'checkbox', change : () => {
        if (this.csm !== null && this.oCamera !== null && this.pCamera !== null) {
          this.csm.camera = this.controls.orthographic ? this.oCamera : this.pCamera;
          this.csm.updateFrustums();
        }
      }},
      { name : 'fade', type : 'checkbox', change : () => {
        if (this.csm !== null) {
          this.csm.fade = this.controls.fade;
          this.csm.updateFrustums();
        }
      }},
      { name : 'far', title : 'shadow far', type : 'number', min : 1, max : 5000, change : () => {
        if (this.csm !== null) {
          this.csm.maxFar = this.controls.far;
          this.csm.updateFrustums();
        }
      }},
      { name : 'mode', title : 'frustum split mode', type : 'select', select : ['uniform', 'logarithmic', 'practical'], change : () => {
        if (this.csm !== null) {
          this.csm.mode = this.controls.mode;
          this.csm.updateFrustums();
        }
      }},
      { name : 'lightX', title : 'light direction x', type : 'number', min : -1, max : 1, change : () => {
        if (this.csm !== null) {
          this.csm.lightDirection.x = this.controls.lightX;
          this.csm.updateFrustums();
        }
      }},
      { name : 'lightY', title : 'light direction y', type : 'number', min : -1, max : 1, change : () => {
        if (this.csm !== null) {
          this.csm.lightDirection.y = this.controls.lightY;
          this.csm.updateFrustums();
        }
      }},
      { name : 'lightZ', title : 'light direction z', type : 'number', min : -1, max : 1, change : () => {
        if (this.csm !== null) {
          this.csm.lightDirection.z = this.controls.lightZ;
          this.csm.updateFrustums();
        }
      }},
      { name : 'margin', title : 'light margin', type : 'number', min : 0, max : 200, change : () => {
        if (this.csm !== null) {
          this.csm.lightMargin = this.controls.margin;
          this.csm.updateFrustums();
        }
      }},
      { name : 'lightNear', title : 'light near', type : 'number', min : 0, max : 10000, change : () => {
        if (this.csm !== null) {
					for ( let i = 0; i < this.csm.lights.length; i ++ ) {
						this.csm.lights[ i ].shadow.camera.near = this.controls.lightNear;
						this.csm.lights[ i ].shadow.camera.updateProjectionMatrix();
					}
        }
      }},
      { name : 'lightFar', title : 'light far', type : 'number', min : 0, max : 10000, change : () => {
        if (this.csm !== null) {
					for ( let i = 0; i < this.csm.lights.length; i ++ ) {
						this.csm.lights[ i ].shadow.camera.far = this.controls.lightFar;
						this.csm.lights[ i ].shadow.camera.updateProjectionMatrix();
					}
        }
      }},
      { name : 'helper' , type : 'folder', control : 'helper', children : [
        { name : 'visible' , type : 'checkbox', change : () => {
          this.changeHelper();
        }},
        { name : 'displayFrustum' , type : 'checkbox', change : () => {
          this.changeHelper();
        }},
        { name : 'displayShadowBounds' , type : 'checkbox', change : () => {
          this.changeHelper();
        }}
      ], isOpen : true}
    ]);
  }


  setCsm(control : ControlComponent) {
    this.csm = control.getControl();
  }

  changeHelper() {
    if (this.helper !== null) {
      this.helper['visible'] = this.controls.helper.visible;
      this.helper.displayFrustum = this.controls.helper.displayFrustum;
      this.helper.displayPlanes = this.controls.helper.displayPlanes;
      this.helper.displayShadowBounds = this.controls.helper.displayShadowBounds;
      this.helper.updateVisibility();
    }
  }

  setHelper(helper : HelperComponent ) {
    this.helper = (helper.getHelper() as any) as CSMHelper;
  }

  csm : any = null;
  helper : CSMHelper = null;
  oCamera : any = null;
  pCamera : any = null;

  ngOnInit() {
    this.cubeInfos = [];
    for ( let i = 0; i < 40; i ++ ) {
      this.cubeInfos.push({
        px : - i * 25,
        pz : 30,
        sy : Math.random() * 2 + 6,
        matrial : i % 2 === 0
      });
      this.cubeInfos.push({
        px : - i * 25,
        pz : -30,
        sy : Math.random() * 2 + 6,
        matrial : i % 2 !== 0
      });
    }
  }

  cubeInfos : {
    px : number;
    pz : number;
    sy : number;
    matrial : boolean;
  }[] = [];

}
