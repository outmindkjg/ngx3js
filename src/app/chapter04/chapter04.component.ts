import { Component, OnInit } from '@angular/core';
import { MenuVo } from '../common-interface';

@Component({
  selector: 'app-chapter04',
  templateUrl: './chapter04.component.html',
  styleUrls: ['./chapter04.component.scss']
})
export class Chapter04Component implements OnInit {

  public menuList : MenuVo[] = [
    { url : 'pg01', name : 'MeshBasicMaterial'},
    { url : 'pg02', name : 'Depth Material'},
    { url : 'pg03', name : 'Combined Material'},
    { url : 'pg04', name : 'Mesh normal material'},
    { url : 'pg05', name : 'Mesh face material'},
    { url : 'pg06', name : 'Mesh Lambert material'},
    { url : 'pg07', name : 'Mesh Phong material'},
    { url : 'pg08', name : 'Shader material'},
    { url : 'pg09', name : 'Linematerial'},
    { url : 'pg10', name : 'Linematerial Dashed'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
