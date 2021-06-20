import { Component } from '@angular/core';
import { Mesh, ShaderMaterial } from 'three';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-materials-parallaxmap',
  templateUrl: './webgl-materials-parallaxmap.component.html',
  styleUrls: ['./webgl-materials-parallaxmap.component.scss']
})
export class WebglMaterialsParallaxmapComponent extends BaseComponent<{
  mode: string;
  scale: number;
  minLayers: number;
  maxLayers: number;
}> {

  constructor() {
    super({
      mode: 'USE_RELIEF_PARALLAX',
      scale: 0.005,
      minLayers: 20,
      maxLayers: 25
    },[
      { name : 'mode', type : 'select', select : {
          none: 'NO_PARALLAX',
          basic: 'USE_BASIC_PARALLAX',
          steep: 'USE_STEEP_PARALLAX',
          occlusion: 'USE_OCLUSION_PARALLAX', // a.k.a. POM
          relief: 'USE_RELIEF_PARALLAX'
      } , change : () => {
        this.guiChanged();
      }},
      { name : 'scale', type : 'number', min : 0.0, max : 0.01, step : 0.001 , change : () => {
        this.guiChanged();
      }},
      { name : 'minLayers', type : 'number', min : 1, max : 30, step : 1 , change : () => {
        this.guiChanged();
      }},
      { name : 'maxLayers', type : 'number', min : 1, max : 30, step : 1 , change : () => {
        this.guiChanged();
      }},
    ]);
  }

  guiChanged() {
    if (this.meshObject3d !== null && this.meshObject3d instanceof Mesh && this.meshObject3d.material instanceof ShaderMaterial) {
      const material = this.meshObject3d.material;
      const uniforms = material.uniforms;
      uniforms[ 'parallaxScale' ].value = - 1.0 * this.controls.scale;
      uniforms[ 'parallaxMinLayers' ].value = this.controls.minLayers;
      uniforms[ 'parallaxMaxLayers' ].value = this.controls.maxLayers;
      material.defines = {};
      material.defines[ this.controls.mode ] = '';
      material.needsUpdate = true;
    }
  }
}
