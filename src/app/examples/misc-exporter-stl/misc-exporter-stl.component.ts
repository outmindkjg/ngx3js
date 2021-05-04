import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-misc-exporter-stl',
  templateUrl: './misc-exporter-stl.component.html',
  styleUrls: ['./misc-exporter-stl.component.scss']
})
export class MiscExporterStlComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
