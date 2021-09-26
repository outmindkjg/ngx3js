import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

@Component({
  selector: 'app-webgl-trails',
  templateUrl: './webgl-trails.component.html',
  styleUrls: ['./webgl-trails.component.scss']
})
export class WebglTrailsComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  ngOnInit() {
    const colorArray = [ 
      { r : 1, g : 0, b : 0.5019 } ,
      { r : 1, g : 1, b : 1 } ,
      { r : 0.5019, g : 0, b : 1 }
    ];
    this.positions = [];
    this.colors = [];
    for ( let i = 0; i < 100; i ++ ) {
      this.positions.push( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 );
      const clr = colorArray[ Math.floor( Math.random() * colorArray.length ) ];
      this.colors.push( clr.r, clr.g, clr.b );
    }
  }
  
  positions : number[] = [];
  colors : number[] = [];

}
