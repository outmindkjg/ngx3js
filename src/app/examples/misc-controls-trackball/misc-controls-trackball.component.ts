import { Component } from '@angular/core';
import { OrthographicCamera } from 'three';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-misc-controls-trackball',
  templateUrl: './misc-controls-trackball.component.html',
  styleUrls: ['./misc-controls-trackball.component.scss']
})
export class MiscControlsTrackballComponent extends BaseComponent<{
  orthographicCamera : boolean
}> {

  constructor() {
    super({
      orthographicCamera : false
    },[
      { name : 'orthographicCamera', type : 'checkbox'}
    ]);
  }

  ngOnInit() {
    this.meshInfos = [];
    for ( let i = 0; i < 500; i ++ ) {
      this.meshInfos.push({
        x : ( Math.random() - 0.5 ) * 1000,
        y : ( Math.random() - 0.5 ) * 1000,
        z : ( Math.random() - 0.5 ) * 1000
      })
    }
  }

  meshInfos : {
    x : number;
    y : number;
    z : number;
  }[] = [];

}
