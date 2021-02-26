import { Component, OnInit } from '@angular/core';
import { BaseComponent, RendererEvent } from '../../three';

@Component({
  selector: 'app-webgl-decals',
  templateUrl: './webgl-decals.component.html',
  styleUrls: ['./webgl-decals.component.scss']
})
export class WebglDecalsComponent extends BaseComponent<{ minScale : number, maxScale : number, clear : () => void}> {

  constructor() {
    super({
      minScale : 10,
      maxScale : 20,
      clear : () => {

      }
    },[
      { name : 'minScale', type : 'number', min : 1, max : 30 },
      { name : 'maxScale', type : 'number', min : 1, max : 30 },
      { name : 'clear', type : 'button' },
    ]);
  }

  setEventListener( event : RendererEvent ) {
    console.log(event);
  }

}
