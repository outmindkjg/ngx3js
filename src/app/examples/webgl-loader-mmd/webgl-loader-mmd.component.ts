import { Component } from '@angular/core';
import { BaseComponent } from '../../three';
import { MixerComponent } from '../../three/mixer/mixer.component';

@Component({
  selector: 'app-webgl-loader-mmd',
  templateUrl: './webgl-loader-mmd.component.html',
  styleUrls: ['./webgl-loader-mmd.component.scss']
})
export class WebglLoaderMmdComponent extends BaseComponent<{
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
    },[]);
  }


  setMixer(mixer : MixerComponent) {
    console.log(mixer.getMmdAnimationHelpers());
  }

}
