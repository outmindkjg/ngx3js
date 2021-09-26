import { Component } from '@angular/core';
import { BaseComponent, RendererTimer, THREE } from 'ngx3js';

@Component({
  selector: 'app-webgl2-volume-perlin',
  templateUrl: './webgl2-volume-perlin.component.html',
  styleUrls: ['./webgl2-volume-perlin.component.scss']
})
export class Webgl2VolumePerlinComponent extends BaseComponent<{
  threshold: number, 
  steps: number  
}> {

  constructor() {
    super({
      threshold: 0.6, 
      steps: 200
    },[
      { name : 'threshold', type : 'number', min : 0, max : 1, step : 0.01, change : () => { this.updateUniforms(); }},
      { name : 'steps', type : 'number', min : 0, max : 300, step : 1, change : () => { this.updateUniforms(); }}
    ]);
  }

  updateUniforms() {
    const uniforms = this.getUniforms();
    if (uniforms !== null) {
      uniforms.threshold.value = this.controls.threshold;
      uniforms.steps.value = this.controls.steps;
    }
  }

  getUniforms() : { [uniform: string]: THREE.IUniform } {
    if (this.mesh !== null) {
      return this.mesh.getUniforms();
    }
    return null;
  }

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.camera !== null && this.meshObject3d !== null) {
      this.meshObject3d.rotation.y = timer.elapsedTime / 7.5;
      this.mesh.getMesh()
      const uniforms = this.getUniforms();
      if (uniforms !== null ) {
        uniforms.cameraPos.value.copy( (this.camera.getCamera() as THREE.Camera).position );
      }
    }
  }

}
