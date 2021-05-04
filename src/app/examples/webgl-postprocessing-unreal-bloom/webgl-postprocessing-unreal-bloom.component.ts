import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-postprocessing-unreal-bloom',
  templateUrl: './webgl-postprocessing-unreal-bloom.component.html',
  styleUrls: ['./webgl-postprocessing-unreal-bloom.component.scss']
})
export class WebglPostprocessingUnrealBloomComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
