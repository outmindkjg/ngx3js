import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-materials-physical-reflectivity',
  templateUrl: './webgl-materials-physical-reflectivity.component.html',
  styleUrls: ['./webgl-materials-physical-reflectivity.component.scss']
})
export class WebglMaterialsPhysicalReflectivityComponent extends BaseComponent<{
  projection: string,
  autoRotate: boolean,
  reflectivity: number,
  background: boolean,
  exposure: number,
  gemColor: string
}> {

  constructor() {
    super({
      projection: 'normal',
      autoRotate: true,
      reflectivity: 1.0,
      background: false,
      exposure: 1.0,
      gemColor: 'Green'
    },[
      
    ]);
  }

}
