import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-ngx-material',
  templateUrl: './ngx-material.component.html',
  styleUrls: ['./ngx-material.component.scss']
})
export class NgxMaterialComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
