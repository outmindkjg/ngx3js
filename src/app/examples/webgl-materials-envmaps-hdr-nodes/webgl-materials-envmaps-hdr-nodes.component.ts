import { Component } from '@angular/core';
import { WebGLRenderer } from 'three';
import { BaseComponent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webgl-materials-envmaps-hdr-nodes',
  templateUrl: './webgl-materials-envmaps-hdr-nodes.component.html',
  styleUrls: ['./webgl-materials-envmaps-hdr-nodes.component.scss']
})
export class WebglMaterialsEnvmapsHdrNodesComponent extends BaseComponent<{
  envMap: string,
  roughness: number,
  metalness: number,
  exposure: number,
  nodes: boolean,
  animate: boolean,
  debug: boolean
}> {

  constructor() {
    super({
      envMap: 'HDR',
      roughness: 0.0,
      metalness: 0.0,
      exposure: 1.0,
      nodes: true,
      animate: true,
      debug: false
    },[
      { name : 'envMap', type : 'select', select : ['Generated', 'LDR', 'HDR', 'RGBM16'], change : () => {
        this.changeEnvMap();
      }},
      { name : 'roughness', type : 'number', min : 0, max : 1, step : 0.01},
      { name : 'metalness', type : 'number', min : 0, max : 1, step : 0.01},
      { name : 'exposure', type : 'number', min : 0, max : 2, step : 0.01,finishChange : () => {
        if (this.renderer !== null) {
          const renderer = this.renderer.getRenderer() as WebGLRenderer;
          renderer.toneMappingExposure = this.controls.exposure;
        }
      }},
      { name : 'nodes', type : 'checkbox'},
      { name : 'animate', type : 'checkbox'},
      { name : 'debug', type : 'checkbox'}
    ]);
  }

  ngOnInit() {
    this.changeEnvMap();
  }

  changeEnvMap() {
    switch(this.controls.envMap) {
      case 'HDR' :
        this.envMapInfo = {
          image : 'textures/cube/pisaHDR/',
          cubeImage : ['','hdr'],
          loaderType : 'HDRCube',
          magFilter : 'LinearFilter'
        }
        break;
      case 'LDR' :
        this.envMapInfo = {
          image : 'textures/cube/pisa/',
          cubeImage : ['','png'],
          loaderType : 'CubeTexture',
          encoding : 'sRGBEncoding'
        }
        break;
      case 'RGBM16' :
        this.envMapInfo = {
          image : 'textures/cube/pisaRGBM16/',
          cubeImage : ['','png'],
          loaderType : 'rgbm',
          encoding : 'RGBM16Encoding'
        }
        break;
    }
  }

  envMapInfo : {
    image : string;
    cubeImage : string[];
    loaderType : string;
    magFilter? : string;
    encoding? : string;
  }

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.mesh !== null && this.controls.animate) {
      const mesh = this.mesh.getObject3D();
      mesh.rotation.y += 0.1 * timer.delta;
    }
  }
}
