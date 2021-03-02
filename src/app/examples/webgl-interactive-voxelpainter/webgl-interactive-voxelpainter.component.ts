import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-interactive-voxelpainter',
  templateUrl: './webgl-interactive-voxelpainter.component.html',
  styleUrls: ['./webgl-interactive-voxelpainter.component.scss']
})
export class WebglInteractiveVoxelpainterComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
