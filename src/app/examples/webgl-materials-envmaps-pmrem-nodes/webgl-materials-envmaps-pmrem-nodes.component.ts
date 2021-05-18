import { Component } from '@angular/core';
import { WebGLRenderer } from 'three';
import { BaseComponent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webgl-materials-envmaps-pmrem-nodes',
  templateUrl: './webgl-materials-envmaps-pmrem-nodes.component.html',
  styleUrls: ['./webgl-materials-envmaps-pmrem-nodes.component.scss']
})
export class WebglMaterialsEnvmapsPmremNodesComponent extends BaseComponent<{
  roughness: number;
  metalness: number;
  exposure: number;
  intensity: number;
  animate: boolean;
  debug: boolean;
}> {

  constructor() {
    super({
      roughness: 0.0,
      metalness: 0.0,
      exposure: 1.0,
      intensity: 1.0,
      animate: true,
      debug: false
    },[
      { name : 'roughness', type : 'number', min : 0, max : 1, step : 0.01 },
      { name : 'metalness', type : 'number', min : 0, max : 1, step : 0.01 },
      { name : 'exposure', type : 'number', min : 0, max : 2, step : 0.01, finishChange : () => {
        if (this.renderer !== null) {
          const renderer = this.renderer.getRenderer() as WebGLRenderer;
          renderer.toneMappingExposure = this.controls.exposure;
        }
      }},
      { name : 'intensity', type : 'number', min : 0, max : 2, step : 0.01 },
      { name : 'animate', type : 'checkbox'},
      { name : 'debug', type : 'checkbox'}
    ]);
  }

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.mesh !== null && this.controls.animate) {
      const mesh = this.mesh.getObject3D();
      mesh.rotation.y += 0.1 * timer.delta;
    }
  }

}
