import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-misc-exporter-gltf',
  templateUrl: './misc-exporter-gltf.component.html',
  styleUrls: ['./misc-exporter-gltf.component.scss']
})
export class MiscExporterGltfComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
