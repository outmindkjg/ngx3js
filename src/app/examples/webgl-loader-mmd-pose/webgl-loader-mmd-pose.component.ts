import { Component } from '@angular/core';
import { BaseComponent, CameraComponent, MixerComponent, THREE } from 'ngx3js';

@Component({
  selector: 'app-webgl-loader-mmd-pose',
  templateUrl: './webgl-loader-mmd-pose.component.html',
  styleUrls: ['./webgl-loader-mmd-pose.component.scss']
})
export class WebglLoaderMmdPoseComponent extends BaseComponent<{
  'animation': boolean,
  'ik': boolean,
  'outline': boolean,
  'physics': boolean,
  'showIKBones': boolean,
  'showRigidBodies': boolean
}> {

  constructor() {
    super({
      'animation': true,
      'ik': true,
      'outline': true,
      'physics': true,
      'showIKBones': false,
      'showRigidBodies': false
    },[
      { name : 'animation' , type : 'checkbox', change : () => {
        this.setHelperEnable('animation', this.controls.animation);
      }},
      { name : 'ik' , type : 'checkbox', change : () => {
        this.setHelperEnable('ik', this.controls.ik);
      }},
      { name : 'outline' , type : 'checkbox', change : () => {
        if (this.effect !== null) {
          this.effect.enabled = this.controls.outline;
        }
      }},
      { name : 'physics' , type : 'checkbox', change : () => {
        this.setHelperEnable('physics', this.controls.physics);
      }},
      { name : 'showIKBones' , type : 'checkbox', change : () => {
        if (this.mmdAnimationHelpers && this.mmdAnimationHelpers.length >= 2) {
          this.mmdAnimationHelpers[0].visible = this.controls.showIKBones;
        }
      }},
      { name : 'showRigidBodies' , type : 'checkbox', change : () => {
        if (this.mmdAnimationHelpers && this.mmdAnimationHelpers.length >= 2) {
          this.mmdAnimationHelpers[1].visible = this.controls.showRigidBodies;
        }
      }},

    ]);
  }

  effect : any = null;
  setCamera(camera : CameraComponent) {
    super.setCamera(camera);
    // this.effect = camera.getEffectComposer();
  }

  setHelperEnable(name, enable) {
    if (this.mmdAnimationHelper !== null) { 
      this.mmdAnimationHelper.enable( name, enable );
    }
  }

  mmdAnimationHelpers : THREE.Object3D[] = [];
  mmdAnimationHelper : any = null;
  setMixer(mixer : MixerComponent) {
    this.mmdAnimationHelper = mixer.getMmdAnimationHelper();
    this.mmdAnimationHelpers = mixer.getMmdAnimationHelperObject3D();
    if (this.mmdAnimationHelpers && this.mmdAnimationHelpers.length == 2) {
      this.mmdAnimationHelpers[0].visible = false;
      this.mmdAnimationHelpers[1].visible = false;
    }
    
  }

}
