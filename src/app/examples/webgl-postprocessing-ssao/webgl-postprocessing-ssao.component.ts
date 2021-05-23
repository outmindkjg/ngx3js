import { Component } from '@angular/core';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass';
import { BaseComponent, RendererTimer } from '../../three';
import { PassComponent } from '../../three/pass/pass.component';

@Component({
  selector: 'app-webgl-postprocessing-ssao',
  templateUrl: './webgl-postprocessing-ssao.component.html',
  styleUrls: ['./webgl-postprocessing-ssao.component.scss']
})
export class WebglPostprocessingSsaoComponent extends BaseComponent<{
  output : string;
  kernelRadius : number;
  minDistance : number;
  maxDistance : number;
}> {

  constructor() {
    super({
      output : '0',
      kernelRadius : 16,
      minDistance : 0.005,
      maxDistance : 0.1
    },[
      { name : 'output' , type : 'select', select : {
					'Default': '0',
					'SSAO Only': '1',
					'SSAO Only + Blur': '2',
					'Beauty': '3',
					'Depth': '4',
					'Normal': '5'
      }, change : () => {
        this.changePass();
      }},
      { name : 'kernelRadius' , type : 'number', min : 0, max : 32, change : () => {
        this.changePass();
      }},
      { name : 'minDistance' , type : 'number', min : 0.001, max : 0.02, change : () => {
        this.changePass();
      }},
      { name : 'maxDistance' , type : 'number', min : 0.01, max : 0.3, change : () => {
        this.changePass();
      }}
    ]);
  }

  setSsaoPass(pass : PassComponent) {
    this.pass = pass.getPass() as SSAOPass;
    this.changePass();
  }

  pass : SSAOPass = null;

  changePass() {
    if (this.pass !== null) {
      this.pass.output = parseInt(this.controls.output);
      this.pass.kernelRadius = this.controls.kernelRadius;
      this.pass.minDistance = this.controls.minDistance;
      this.pass.maxDistance = this.controls.maxDistance;
      console.log(this.pass);
    }
  }



  ngOnInit() {
    this.meshInfos = [];
    for ( let i = 0; i < 100; i ++ ) {
      this.meshInfos.push({
        position : {x : Math.random() * 400 - 200, y : Math.random() * 400 - 200, z : Math.random() * 400 - 200 },
        rotation : {x : Math.random() * 360, y : Math.random() * 360, z : Math.random() * 360 },
        scale : Math.random() * 10 + 2,
        color : Math.random() * 0xffffff
      });
    }
  }

  meshInfos : {
    position : {x : number, y : number, z : number },
    rotation : {x : number, y : number, z : number },
    scale : number,
    color : number
  }[] = [];

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.mesh !== null) {
      const elapsedTime = timer.elapsedTime;
      const group = this.mesh.getObject3D();
      group.rotation.x = elapsedTime * 0.2;
      group.rotation.y = elapsedTime * 0.1;
    }
  }
}
