import { Component } from '@angular/core';
import { Object3D } from 'three';
import { BaseComponent, RendererEvent } from '../../three';
import { PassComponent } from '../../three/pass/pass.component';

@Component({
  selector: 'app-webgl-postprocessing-outline',
  templateUrl: './webgl-postprocessing-outline.component.html',
  styleUrls: ['./webgl-postprocessing-outline.component.scss']
})
export class WebglPostprocessingOutlineComponent extends BaseComponent<{
  edgeStrength: number,
  edgeGlow: number,
  edgeThickness: number,
  pulsePeriod: number,
  rotate: boolean,
  usePatternTexture: boolean,
  visibleEdgeColor : string,
  hiddenEdgeColor : string
}> {

  constructor() {
    super({
      edgeStrength: 3.0,
      edgeGlow: 0.0,
      edgeThickness: 1.0,
      pulsePeriod: 0,
      rotate: false,
      usePatternTexture: false,
      visibleEdgeColor : '#ffffff',
      hiddenEdgeColor : '#190a05'
    },[
      { name : 'edgeStrength', type : 'number', min : 0.01, max : 10},
      { name : 'edgeGlow', type : 'number', min : 0.0, max : 1},
      { name : 'edgeThickness', type : 'number', min : 1, max : 4},
      { name : 'pulsePeriod', type : 'number', min : 0.0, max : 5},
      { name : 'rotate', type : 'checkbox'},
      { name : 'usePatternTexture', type : 'checkbox'},
      { name : 'visibleEdgeColor', type : 'color'},
      { name : 'hiddenEdgeColor', type : 'color'},
    ]);
  }

  ngOnInit() {
    this.sphereInfos = [];
    for ( let i = 0; i < 20; i ++ ) {
      this.sphereInfos.push({
        x : Math.random() * 4 - 2,
        y : Math.random() * 4 - 2,
        z : Math.random() * 4 - 2,
        color : 'hsl('+Math.random()+',1.0,0.3)',
        scale : Math.random() * 0.3 + 0.1
      })
    }
  }
  sphereInfos : {
    x : number,
    y : number,
    z : number,
    color : string,
    scale : number
  }[] = [];

  outlinePass : any = null;
  setOutlinePass(pass : PassComponent) {
    this.outlinePass = pass.getPass();
    this.outlinePass.selectedObjects = this.selectedObjects;
    // console.log(this.outlinePass);
  }

  onMouseDownEvent(event : RendererEvent) {
    if (this.camera !== null) {
      const intersection = this.camera.getIntersection(event.mouse,this.mesh.getObject3d(), true);
      if (intersection !== null && intersection.object !== null) {
        if (this.selectedObjects.indexOf(intersection.object) === -1) {
          this.selectedObjects = [intersection.object];
          if (this.outlinePass !== null) {
            this.outlinePass.selectedObjects = this.selectedObjects;
          }
        }
      }
    }
  }

  selectedObjects : Object3D[] = [];

}
