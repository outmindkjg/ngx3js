import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-lines-fat-wireframe',
  templateUrl: './webgl-lines-fat-wireframe.component.html',
  styleUrls: ['./webgl-lines-fat-wireframe.component.scss']
})
export class WebglLinesFatWireframeComponent extends BaseComponent<{
  lineType : string,
  width : number,
  dashed : boolean,
  dashScale : number,
  dashGap : number
}> {

  constructor() {
    super({
      lineType : 'LineGeometry',
      width : 5,
      dashed : false,
      dashScale : 1,
      dashGap : 1
    },[
      { name : 'lineType' , title : 'Line Type',type : 'select', select : ['LineGeometry','gl.LINE']},
      { name : 'width', title : 'Width (px)', type : 'number', min : 1, max : 10 },
      { name : 'dashed', title : 'Dashed', type : 'checkbox'},
      { name : 'dashScale', title : 'Dash Scale', type : 'number', min : 0.5, max : 1, step : 0.1},
      { name : 'dashGap', title : 'Dash Gap', type : 'select', select : ['2 : 1', '1 : 1', '1 : 2']},
    ]);
  }

}
