import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webaudio-visualizer',
  templateUrl: './webaudio-visualizer.component.html',
  styleUrls: ['./webaudio-visualizer.component.scss']
})
export class WebaudioVisualizerComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
