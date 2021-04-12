import { Component } from '@angular/core';
import { BaseComponent, MeshComponent } from '../../three';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import * as THREE from 'three';

@Component({
  selector: 'app-webgl-loader-texture-ktx2',
  templateUrl: './webgl-loader-texture-ktx2.component.html',
  styleUrls: ['./webgl-loader-texture-ktx2.component.scss']
})
export class WebglLoaderTextureKtx2Component extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
