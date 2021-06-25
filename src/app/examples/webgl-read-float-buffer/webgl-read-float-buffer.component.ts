import { Component } from '@angular/core';
import { ShaderMaterial } from 'three';
import { BaseComponent, RendererTimer } from '../../three';
import { MaterialComponent } from '../../three/material/material.component';

@Component({
  selector: 'app-webgl-read-float-buffer',
  templateUrl: './webgl-read-float-buffer.component.html',
  styleUrls: ['./webgl-read-float-buffer.component.scss']
})
export class WebglReadFloatBufferComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  setMaterial(material : MaterialComponent) {
    this.material = material.getMaterial() as ShaderMaterial;
  }

  material : ShaderMaterial = null;
  delta = 0.01;
  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.mesh !== null) {
      const time = timer.elapsedTime * 1.5;
      const mesh = this.mesh.getObject3d();
      mesh.rotation.y = - time;
      if (this.material !== null) {
				if ( this.material.uniforms[ "time" ].value > 1 || this.material.uniforms[ "time" ].value < 0 ) {
					this.delta *= - 1;
				}
				this.material.uniforms[ "time" ].value += this.delta;
      }
    }
  }

}
