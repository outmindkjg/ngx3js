import { Component, OnInit } from '@angular/core';
import { GuiControlParam } from './../../three';

@Component({
  selector: 'app-page0306',
  templateUrl: './page0306.component.html',
  styleUrls: ['./page0306.component.scss']
})
export class Page0306Component implements OnInit {

  controls = {
    rotationSpeed : 0.02,
    color1 : 0xff0000,
    intensity1 : 2,
    color2 : 0x00ff00,
    intensity2 : 2,
    color3 : 0x0000ff,
    intensity3 : 2
  }

  controlsParams: GuiControlParam[] = [
    { name: 'color1', type: 'color'},
    { name: 'intensity1', type: 'number', min : 0, max : 15 },
    { name: 'color2', type: 'color'},
    { name: 'intensity2', type: 'number', min : 0, max : 15 },
    { name: 'color3', type: 'color'},
    { name: 'intensity3', type: 'number', min : 0, max : 15 },
  ];
 
  constructor() { }

  ngOnInit(): void {
  }

}
