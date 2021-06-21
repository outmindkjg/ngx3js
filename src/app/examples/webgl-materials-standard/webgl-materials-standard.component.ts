import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-materials-standard',
  templateUrl: './webgl-materials-standard.component.html',
  styleUrls: ['./webgl-materials-standard.component.scss']
})
export class WebglMaterialsStandardComponent extends BaseComponent<{
  environment : string;
}> {

  constructor() {
    super({
      environment : 'venice_sunset_1k.hdr'
    },[
      { name : 'environment' , type : 'select', select : {
        'Venice Sunset': 'venice_sunset_1k.hdr',
        'Overpass': 'pedestrian_overpass_1k.hdr'
      }}
    ]);
  }


}
