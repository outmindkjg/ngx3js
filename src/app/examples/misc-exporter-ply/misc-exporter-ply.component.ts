import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-misc-exporter-ply',
  templateUrl: './misc-exporter-ply.component.html',
  styleUrls: ['./misc-exporter-ply.component.scss']
})
export class MiscExporterPlyComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
