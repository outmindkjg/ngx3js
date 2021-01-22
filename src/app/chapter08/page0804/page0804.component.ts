import { Component, OnInit, ViewChild } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer, SceneComponent } from 'src/app/three';

@Component({
  selector: 'app-page0804',
  templateUrl: './page0804.component.html',
  styleUrls: ['./page0804.component.scss']
})
export class Page0804Component implements OnInit {

  @ViewChild('target') targetObj : SceneComponent;

  private savedName = 'localStorage0804';
  private saveSeqn : number = 0;
  public loadedName : string = null;

  controls = {
    exportScene : () => {
      if (this.targetObj !== null && this.targetObj !== undefined) {
        this.saveSeqn++;
        this.saveSeqn = (this.saveSeqn % 5) + 1;
        this.targetObj.setSavelocalStorage(this.savedName +'_'+ this.saveSeqn);
      }
    },
    clearScene : () => {
      if (this.targetObj !== null && this.targetObj !== undefined) {
        this.targetObj.setClear();
      }
    },
    importScene : () => {
      if (this.saveSeqn > 0) {
        this.loadedName = this.savedName +'_'+ this.saveSeqn;
        this.saveSeqn--;
        console.log(this.loadedName);
      }
    },
    rotate: true,
    wireframe: false,
  }

  controlsParams: GuiControlParam[] = [
    { name: "exportScene", type: "button" },
    { name: "clearScene", type: "button" },
    { name: "importScene", type: "button" },
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
