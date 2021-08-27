import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-ngx-chart-line',
  templateUrl: './ngx-chart-line.component.html',
  styleUrls: ['./ngx-chart-line.component.scss']
})
export class NgxChartLineComponent extends BaseComponent<{
  pointStyle : string
}> {

  constructor() {
    super({
      pointStyle : 'box'
    },[
      { name : 'pointStyle', type : 'select', select : ['circle', 'sphere', 'plane', 'box', 'star']}
    ]);
  }

}
