import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl2-multisampled-renderbuffers',
  templateUrl: './webgl2-multisampled-renderbuffers.component.html',
  styleUrls: ['./webgl2-multisampled-renderbuffers.component.scss']
})
export class Webgl2MultisampledRenderbuffersComponent extends BaseComponent<{
  geometry : string;
  curve : string;
}> {

  constructor() {
    super({
      geometry : 'box',
      curve : 'triangle'
    },[
      { name : 'geometry', type : 'select', select : [ 'box', 'sphere','torus']},
      { name : 'curve', type : 'select', select : [ 'triangle', 'square','pentagon']}
    ]);
  }

}
