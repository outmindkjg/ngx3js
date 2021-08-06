import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgpu-materials',
  templateUrl: './webgpu-materials.component.html',
  styleUrls: ['./webgpu-materials.component.scss']
})
export class WebgpuMaterialsComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
