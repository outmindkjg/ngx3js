import { Component } from '@angular/core';
import { Color, Object3D } from 'three';
import { BaseComponent, MeshComponent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webgl-materials-variations-phong',
  templateUrl: './webgl-materials-variations-phong.component.html',
  styleUrls: ['./webgl-materials-variations-phong.component.scss']
})
export class WebglMaterialsVariationsPhongComponent extends BaseComponent<{}> {


  constructor() {
    super({},[]);
  }

  ngOnInit() {
    const numberOfSphersPerSide = 5;
    const stepSize = 1.0 / numberOfSphersPerSide;
    this.sphereInfos = [];
    let index = 0;
    for ( let alpha = 0, alphaIndex = 0; alpha <= 1.0; alpha += stepSize, alphaIndex ++ ) {
      const specularShininess = Math.pow( 2, alpha * 10 );
      for ( let beta = 0; beta <= 1.0; beta += stepSize ) {
        const specularColor = 'rgb('+ beta * 0.2 *255 + ','+beta * 0.2 *255+','+ beta * 0.2 * 255+')';
        for ( let gamma = 0; gamma <= 1.0; gamma += stepSize ) {
          // basic monochromatic energy preservation
          const diffuseColor = new Color().setHSL( alpha, 0.5, gamma * 0.5 + 0.1 ).multiplyScalar( 1 - beta * 0.2 );
          this.sphereInfos.push({
            color: diffuseColor.getHex(),
            specular: specularColor,
            reflectivity: beta,
            shininess: specularShininess,
            envMap: ( index % 2 ) == 1 ? true : false,
            x : alpha * 400 - 200,
            y : beta * 400 - 200,
            z : gamma * 400 - 200,
          });
          index ++;
        }
      }
    }
    this.labelInfos = [];
    this.labelInfos.push({
      text : "-shininess",
      x : -350,
      y : 0, 
      z : 0
    })
    this.labelInfos.push({
      text : "+shininess",
      x : 350,
      y : 0, 
      z : 0
    })
    this.labelInfos.push({
      text : "-specular, -reflectivity",
      x : 0,
      y : -300, 
      z : 0
    })
    this.labelInfos.push({
      text : "+specular, +reflectivity",
      x : 0,
      y : 300, 
      z : 0
    })
    this.labelInfos.push({
      text : "+diffuse",
      x : 0,
      y : 0, 
      z : -300
    })
    this.labelInfos.push({
      text : "-diffuse",
      x : 0,
      y : 0, 
      z : 300
    })

  }

  sphereInfos : {
    color: number,
    specular: string,
    reflectivity: number,
    shininess: number,
    envMap: boolean,
    x : number,
    y : number,
    z : number,
  }[] = [];

  labelInfos : {
    text : string;
    x : number;
    y : number;
    z : number;
  }[] = [];

  setPointLight(mesh : MeshComponent) {
    this.pointLight = mesh.getObject3d();
  }

  pointLight : Object3D = null;

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.pointLight !== null) {
      const time = timer.elapsedTime * 0.25;
      const particleLight = this.pointLight;
      particleLight.position.x = Math.sin( time * 7 ) * 300;
      particleLight.position.y = Math.cos( time * 5 ) * 400;
      particleLight.position.z = Math.cos( time * 3 ) * 300;
    }
  }  

}

