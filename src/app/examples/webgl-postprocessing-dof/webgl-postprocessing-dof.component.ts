import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-postprocessing-dof',
  templateUrl: './webgl-postprocessing-dof.component.html',
  styleUrls: ['./webgl-postprocessing-dof.component.scss']
})
export class WebglPostprocessingDofComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
