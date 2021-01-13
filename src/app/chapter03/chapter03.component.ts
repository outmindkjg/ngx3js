import { Component, OnInit } from '@angular/core';
import { MenuVo } from '../common-interface';

@Component({
  selector: 'app-chapter03',
  templateUrl: './chapter03.component.html',
  styleUrls: ['./chapter03.component.scss']
})
export class Chapter03Component implements OnInit {

  public menuList : MenuVo[] = [
    { url : 'pg01', name : 'Ambient Light'},
    { url : 'pg02', name : 'Point Light'},
    { url : 'pg03', name : 'Spot Light'},
    { url : 'pg04', name : 'Directional Light'},
    { url : 'pg05', name : 'Hemisphere Light'},
    { url : 'pg06', name : 'Area Light'},
    { url : 'pg07', name : 'Lensflarest'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
