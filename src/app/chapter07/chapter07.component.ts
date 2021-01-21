import { Component, OnInit } from '@angular/core';
import { MenuVo } from '../common-interface';

@Component({
  selector: 'app-chapter07',
  templateUrl: './chapter07.component.html',
  styleUrls: ['./chapter07.component.scss']
})
export class Chapter07Component implements OnInit {

  public menuList : MenuVo[] = [
    { url : 'pg01', name : 'Particles - Only works in CanvasRenderer'},
    { url : 'pg02', name : 'Particles - Only works in WebGLRenderer'},
    { url : 'pg03', name : 'Particle Basic Material'},
    { url : 'pg04', name : 'Particles - Canvas based texture'},
    { url : 'pg05a', name : 'Particles - Canvas based texture - WebGL'},
    { url : 'pg05b', name : 'Particles - Canvas based texture'},
    { url : 'pg06', name : 'Particles - Rainy scene'},
    { url : 'pg07', name : 'Particles - Snowy scene'},
    { url : 'pg08', name : 'Particles - Sprites'},
    { url : 'pg09', name : 'Sprites in 3D'},
    { url : 'pg10', name : '3D Torusknot'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
