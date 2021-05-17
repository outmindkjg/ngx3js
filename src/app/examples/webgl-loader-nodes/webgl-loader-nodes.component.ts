import { Component } from '@angular/core';
import { Material } from 'three';
import { BaseComponent, RendererTimer } from '../../three';
import { MaterialComponent } from '../../three/material/material.component';

@Component({
  selector: 'app-webgl-loader-nodes',
  templateUrl: './webgl-loader-nodes.component.html',
  styleUrls: ['./webgl-loader-nodes.component.scss']
})
export class WebglLoaderNodesComponent extends BaseComponent<{
  load : string;
  scale : number;
}> {
  constructor() {
    super({
      load : 'caustic',
      scale : 1
    },[
      { name : 'load', type : 'select', select : ['caustic','displace','wave','xray'], change : () => {
        this.setStorageName();
      }},
      { name : 'scale', type : 'number', min : -2, max : 2, change : () => {
        if (this.timerNode !== null) {
          this.timerNode.scale = this.controls.scale;
        }
      }}
    ]);
  }

  ngOnInit() {
    this.setStorageName();
  }

  setStorageName() {
    this.storageName = 'nodes/' + this.controls.load + '.json';
  }

  storageName : string = "";

  setMaterial(material : MaterialComponent) {
    if (material.storageSource !== null) {
      const timerNode = material.storageSource.getObjectByName( "time" );
      if (timerNode !== null && timerNode !== undefined) {
        this.timerNode = timerNode;
        this.timerNode.timeScale = true;
        this.timerNode.scale = this.controls.scale;
        this.material = material;
      } else {
        this.timerNode = null;
        this.material = null;
      }
    }
  }

  material : MaterialComponent = null;
  timerNode : any = null;

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.material !== null) {
      this.material.updateNode(timer.delta);
    }
  }

}
