import { Component } from '@angular/core';
import { BaseComponent, MeshComponent } from '../../three';

@Component({
  selector: 'app-webgl-loader-nrrd',
  templateUrl: './webgl-loader-nrrd.component.html',
  styleUrls: ['./webgl-loader-nrrd.component.scss']
})
export class WebglLoaderNrrdComponent extends BaseComponent<{
  modelVisible : boolean;
  indexX : number;
  indexY : number;
  indexZ : number;
  lowerThreshold : number;
  upperThreshold : number;
  windowLow : number;
  windowHigh : number;
}> {

  constructor() {
    super({
      modelVisible : true,
      indexX : 0.5,
      indexY : 0.5,
      indexZ : 0.25,
      lowerThreshold : 0,
      upperThreshold : 1,
      windowLow : 0,
      windowHigh : 1
    },[
      { name : 'modelVisible', title : 'Model Visible', type : 'checkbox'},
      { name : 'indexX', title : 'Index X', type : 'number', min : 0, max : 1, step : 0.01 },
      { name : 'indexY', title : 'Index Y', type : 'number', min : 0, max : 1, step : 0.01 },
      { name : 'indexZ', title : 'Index Z', type : 'number', min : 0, max : 1, step : 0.01 },
      { name : 'lowerThreshold', title : 'Lower Threshold', type : 'number', min : 0, max : 1, step : 0.01, finishChange : () => {
        this.setVolumeAttribute('lowerThreshold', this.controls.lowerThreshold);
      }},
      { name : 'upperThreshold', title : 'High Threshold', type : 'number', min : 0, max : 1, step : 0.01 , finishChange : () => {
        this.setVolumeAttribute('upperThreshold', this.controls.upperThreshold);
      }},
      { name : 'windowLow', title : 'Window Low', type : 'number', min : 0, max : 1, step : 0.01 , finishChange : () => {
        this.setVolumeAttribute('windowLow', this.controls.windowLow);
      }},
      { name : 'windowHigh', title : 'Window High', type : 'number', min : 0, max : 1, step : 0.01 , finishChange : () => {
        this.setVolumeAttribute('windowHigh', this.controls.windowHigh);
      }}
    ]);
  }

  volume : any = null;
  volumeMesh : any = null;
  setVolume(mesh : MeshComponent) {
    this.volumeMesh = mesh.getMesh();
  }

  setVolumeAttribute(type : string, value : number) {
    this.volume = this.volumeMesh.userData.storageSource;
    if (this.volume !== null) {
      const volumeValue = this.volume.min + Math.floor((this.volume.max - this.volume.min) * value);
      switch(type) {
        case 'lowerThreshold' :
          this.volume.lowerThreshold = volumeValue;
          break;
        case 'upperThreshold' :
          this.volume.upperThreshold = volumeValue;
          break;
        case 'windowLow' :
          this.volume.windowLow = volumeValue;
          break;
        case 'windowHigh' :
          this.volume.windowHigh = volumeValue;
          break;
      }
      this.volume.repaintAllSlices();
    }
  }

}
