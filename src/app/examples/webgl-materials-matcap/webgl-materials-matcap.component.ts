import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

@Component({
  selector: 'app-webgl-materials-matcap',
  templateUrl: './webgl-materials-matcap.component.html',
  styleUrls: ['./webgl-materials-matcap.component.scss']
})
export class WebglMaterialsMatcapComponent extends BaseComponent<{
  color : number;
  exposure : number;
}> {

  constructor() {
    super({
      color : 0xffffff,
      exposure : 1.0
    },[
      { name : 'color', type : 'color'},
      { name : 'exposure' , type : 'number', min : 0, max : 2 }
    ]);
  }

}
