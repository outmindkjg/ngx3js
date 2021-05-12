import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-shadowmap',
  templateUrl: './webgl-shadowmap.component.html',
  styleUrls: ['./webgl-shadowmap.component.scss']
})
export class WebglShadowmapComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  ngOnInit() {
    this.horsePositions = [
      { x : 0, y : this.floor, z : 300 },
      { x : 100 - Math.random() * 1000, y : this.floor, z : 450 },
      { x : 100 - Math.random() * 1000, y : this.floor, z : 600 },
      { x : 100 - Math.random() * 1000, y : this.floor, z : -300 },
      { x : 100 - Math.random() * 1000, y : this.floor, z : -450 },
      { x : 100 - Math.random() * 1000, y : this.floor, z : -600 },
    ]
  }
  floor : number = -250;

  horsePositions : { x : number, y : number, z : number }[] = [];

}
