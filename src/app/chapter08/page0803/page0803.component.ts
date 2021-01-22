import { Component, OnInit, ViewChild } from '@angular/core';
import { GeometriesVector3, GuiControlParam, MeshComponent, RendererTimer } from 'src/app/three';

@Component({
  selector: 'app-page0803',
  templateUrl: './page0803.component.html',
  styleUrls: ['./page0803.component.scss']
})
export class Page0803Component implements OnInit {

  @ViewChild('target') targetObj : MeshComponent;

  private savedName = 'localStorage0803';
  private saveSeqn : number = 0;
  public loadedName : string = null;

  controls = {
    save : () => {
      if (this.targetObj !== null && this.targetObj !== undefined) {
        this.saveSeqn++;
        this.saveSeqn = (this.saveSeqn % 5) + 1;
        this.targetObj.setSavelocalStorage(this.savedName +'_'+ this.saveSeqn);
      }
    },
    load : () => {
      if (this.saveSeqn > 0) {
        this.loadedName = this.savedName +'_'+ this.saveSeqn;
        this.saveSeqn--;
      }
    },
    mesh : {
      radius : 5,
      tube : 0.7,
      radialSegments : 96,
      tubularSegments : 12,
      p : 5,
      q : 4,
    },
    rotate: true,
    wireframe: false,
  }

  controlsParams: GuiControlParam[] = [
    { name : 'Save & Load', type : 'folder', children : [
      { name: "save", type: "button" },
      { name: "load", type: "button" },
    ], isOpen : true},
    { name : 'Mesh', type : 'folder', control : 'mesh', children : [
      { name: "radius", type: "number", min: 0, max: 40 },
      { name: "tube", type: "number", min: 0, max: 40},
      { name: "radialSegments", type: "number", min: 0, max: 400, step : 1 },
      { name: "tubularSegments", type: "number", min: 1, max: 20, step : 1 },
      { name: "p", type: "number", min: 1, max: 10, step : 1 },
      { name: "q", type: "number", min: 1, max: 15, step : 1 },
    ], isOpen : true},
    { name: "rotate", type: "checkbox" },
    { name: "wireframe", type: "checkbox" },
  ]

  constructor() { }

  ngOnInit(): void {

  }

  rotation: GeometriesVector3 = {
    x: 0, y: 0, z: 0
  }

  onRender(timer: RendererTimer) {    
    if (this.controls.rotate) {
      this.rotation.y += timer.delta * 20;
      this.rotation.x = this.rotation.z = this.rotation.y;
    }

  }
}
