import { Component } from '@angular/core';
import { BaseComponent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webgl-shaders-ocean',
  templateUrl: './webgl-shaders-ocean.component.html',
  styleUrls: ['./webgl-shaders-ocean.component.scss']
})
export class WebglShadersOceanComponent extends BaseComponent<{
  sky : {
    inclination : number;
    azimuth : number;
  },
  water : {
    distortionScale : number;
    size : number;
    alpha : number;
  }
}> {

  constructor() {
    super({
      sky : {
        inclination : 0.49,
        azimuth : 0.205
      },
      water : {
        distortionScale : 3.7,
        size : 1,
        alpha : 1.0
      }
    },[
      { name : 'Sky', type : 'folder', control : 'sky', children : [
        { name : 'inclination', type : 'number', min : 0, max : 0.5, step : 0.0001 , finishChange : () => {
          this.updateSun();
        }},
        { name : 'azimuth', type : 'number', min : 0, max : 1 , step : 0.0001 , finishChange : () => {
          this.updateSun();
        }},
      ]},
      { name : 'Water', type : 'folder', control : 'water', children : [
        { name : 'distortionScale', type : 'number', min : 0, max : 8, step : 0.1 },
        { name : 'size', type : 'number', min : 0.1, max : 10 , step : 0.1 },
        { name : 'alpha', type : 'number', min : 0.9, max : 1 , step : 0.001 },
      ]}
    ]);
  }

  ngOnInit() {
    this.updateSun();  
  }
  updateSun() {
    const theta = Math.PI * ( this.controls.sky.inclination - 0.5 );
    const phi = 2 * Math.PI * ( this.controls.sky.azimuth - 0.5 );
    this.sunDirection = [
      Math.cos( phi ),
      Math.sin( phi ) * Math.sin( theta ),
      Math.sin( phi ) * Math.cos( theta )
    ];
  }

  sunDirection : number[] = [];  

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.mesh !== null) {
      const time = timer.elapsedTime;
      const mesh = this.mesh.getObject3D();
      mesh.position.y = Math.sin( time ) * 20 + 5;
      mesh.rotation.x = time * 0.5;
      mesh.rotation.z = time * 0.51;
    }
  }
}


