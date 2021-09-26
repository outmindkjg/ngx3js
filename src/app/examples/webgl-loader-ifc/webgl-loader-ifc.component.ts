import { Component } from '@angular/core';
import { BaseComponent, MeshComponent } from 'ngx3js';

@Component({
  selector: 'app-webgl-loader-ifc',
  templateUrl: './webgl-loader-ifc.component.html',
  styleUrls: ['./webgl-loader-ifc.component.scss']
})
export class WebglLoaderIfcComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  setMesh(mesh : MeshComponent) {
    super.setMesh(mesh);

  }

  

}
