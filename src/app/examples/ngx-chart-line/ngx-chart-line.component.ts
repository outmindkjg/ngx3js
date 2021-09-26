import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

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
      pointStyle : 'ring'
    },[
      { name : 'pointStyle', type : 'select', select : ['circle', 'sphere', 'plane', 'box', 'star', 'ring']}
    ]);
  }

}
