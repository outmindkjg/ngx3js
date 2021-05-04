import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-misc-exporter-obj',
  templateUrl: './misc-exporter-obj.component.html',
  styleUrls: ['./misc-exporter-obj.component.scss']
})
export class MiscExporterObjComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
