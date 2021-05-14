import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-modifier-edgesplit',
  templateUrl: './webgl-modifier-edgesplit.component.html',
  styleUrls: ['./webgl-modifier-edgesplit.component.scss']
})
export class WebglModifierEdgesplitComponent extends BaseComponent<{
  smoothShading: boolean,
  edgeSplit: boolean,
  cutOffAngle: number,
  showMap: boolean,
  tryKeepNormals: boolean,
}> {

  constructor() {
    super({
      smoothShading: true,
      edgeSplit: true,
      cutOffAngle: 20,
      showMap: false,
      tryKeepNormals: true,
    },[
      { name : 'showMap', type : 'checkbox'},
      { name : 'smoothShading', type : 'checkbox'},
      { name : 'edgeSplit', type : 'checkbox'},
      { name : 'cutOffAngle', type : 'number', min : 0, max : 180 },
      { name : 'tryKeepNormals', type : 'checkbox'},

    ]);
  }

}