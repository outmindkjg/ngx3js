import { Component } from '@angular/core';
import { BaseComponent, RendererTimer } from 'ngx3js';

@Component({
  selector: 'app-webgl-postprocessing-dof',
  templateUrl: './webgl-postprocessing-dof.component.html',
  styleUrls: ['./webgl-postprocessing-dof.component.scss']
})
export class WebglPostprocessingDofComponent extends BaseComponent<{
  focus: number,
  aperture: number,
  maxblur: number
}> {

  constructor() {
    super({
      focus: 500.0,
      aperture: 5,
      maxblur: 0.01
    },[
        { name : 'focus', type : 'number', min : 10.0, max : 3000.0, step : 10 },
        { name : 'aperture', type : 'number', min : 0, max : 10, step : 0.1 },
        { name : 'maxblur', type : 'number', min : 0.0, max : 0.01, step : 0.001 }
    ]);
  }

  ngOnInit() {
    this.meshInfos = [];
    const xgrid = 14, ygrid = 9, zgrid = 14;
    for ( let i = 0; i < xgrid; i ++ ) {
      for ( let j = 0; j < ygrid; j ++ ) {
        for ( let k = 0; k < zgrid; k ++ ) {
          this.meshInfos.push({
            x : 200 * ( i - xgrid / 2 ),
            y : 200 * ( j - ygrid / 2 ),
            z : 200 * ( k - zgrid / 2 ),
            scale : 60
          })
        }
      }
    }
  }
  meshInfos : { x : number, y : number, z : number, scale : number }[] = [];

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.meshChildren !== null && this.meshChildren.length > 0) {
      const totalLen = this.meshChildren.length;
      const time = timer.elapsedTime * 0.05;
      this.meshChildren.forEach((child, i) => {
        const h = ( 360 * ( i / totalLen + time ) % 360 ) / 360;
        (child as any).material.color.setHSL( h, 1, 0.5 );
      });
    }
  }
}
