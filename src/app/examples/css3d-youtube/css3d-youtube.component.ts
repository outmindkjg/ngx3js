import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-css3d-youtube',
  templateUrl: './css3d-youtube.component.html',
  styleUrls: ['./css3d-youtube.component.scss']
})
export class Css3dYoutubeComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  youtubeInfo : {
    id : string;
    x : number;
    y : number;
    z : number;
    ry : number;
  }[] = [
    { id : 'SJOz3qjfQXU', x : 0, y : 0, z : 240, ry : 0},
    { id : 'Y2-xZ-1HE-Q', x : 240, y : 0, z : 0, ry : 90},
    { id : 'IrydklNpcFI', x : 0, y : 0, z : -240, ry : 180},
    { id : '9ubytEsCaS0', x : -240, y : 0, z : 0, ry : -90}
  ]
}
