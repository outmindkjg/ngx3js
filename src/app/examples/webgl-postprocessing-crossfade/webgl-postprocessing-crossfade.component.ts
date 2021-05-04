import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-postprocessing-crossfade',
  templateUrl: './webgl-postprocessing-crossfade.component.html',
  styleUrls: ['./webgl-postprocessing-crossfade.component.scss']
})
export class WebglPostprocessingCrossfadeComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
