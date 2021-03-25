import { Component } from '@angular/core';
import { BaseComponent } from '../../three';
import { LightComponent } from '../../three/light/light.component';
import { HelperComponent } from '../../three/helper/helper.component';

@Component({
  selector: 'app-webgl-lights-hemisphere',
  templateUrl: './webgl-lights-hemisphere.component.html',
  styleUrls: ['./webgl-lights-hemisphere.component.scss']
})
export class WebglLightsHemisphereComponent extends BaseComponent<{
  dirLight : boolean;
  hemiLight : boolean;
}> {

  constructor() {
    super({
      dirLight : true,
      hemiLight : true
    },[
      { name : 'dirLight', title : 'Direction Light', type : 'checkbox', change : () => {
        if (this.dirLight !== null) {
          this.dirLight.visible = this.controls.dirLight;
        }
        if (this.dirLightHelper !== null) {
          this.dirLightHelper.visible = this.controls.dirLight;
        }
      }},
      { name : 'hemiLight', title : 'Hemisphere Light',type : 'checkbox', change : () => {
        if (this.hemiLight !== null) {
          this.hemiLight.visible = this.controls.hemiLight;
        }
        if (this.hemiLightHelper !== null) {
          this.hemiLightHelper.visible = this.controls.hemiLight;
        }
      }}
    ]);
  }

  vertexShader = `
  varying vec3 vWorldPosition;

  void main() {

    vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
    vWorldPosition = worldPosition.xyz;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

  }
  `;

  fragmentShader = `
  uniform vec3 topColor;
  uniform vec3 bottomColor;
  uniform float offset;
  uniform float exponent;

  varying vec3 vWorldPosition;

  void main() {

    float h = normalize( vWorldPosition + offset ).y;
    gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h , 0.0), exponent ), 0.0 ) ), 1.0 );

  }  
  `;

  uniforms = {
    "topColor": { type : 'color', value: 'HSL(0.6, 1, 0.6)' },
    "bottomColor": { type : 'color', value: 0xffffff },
    "offset": { type : 'number', value: 33 },
    "exponent": { type : 'number', value: 0.6 }
  };

  hemiLight : any = null;
  setHemiLight( light : LightComponent) {
    this.hemiLight = light.getLight();
  }
  dirLight : any = null;
  setDirLight( light : LightComponent) {
    this.dirLight = light.getLight();
  }

  hemiLightHelper : any = null;
  setHemiLightHelper( light : HelperComponent) {
    this.hemiLightHelper = light.getHelper();
  }
  dirLightHelper : any = null;
  setDirLightHelper( light : HelperComponent) {
    this.dirLightHelper = light.getHelper();
  }

}
