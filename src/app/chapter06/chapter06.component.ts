import { Component, OnInit } from '@angular/core';
import { MenuVo } from '../common-interface';

@Component({
  selector: 'app-chapter06',
  templateUrl: './chapter06.component.html',
  styleUrls: ['./chapter06.component.scss']
})
export class Chapter06Component implements OnInit {

  public menuList : MenuVo[] = [
    { url : 'pg01', name : 'Advanced 3D geometries - Convex Hull'},
    { url : 'pg02', name : 'Advanced 3D geometries - Lathe'},
    { url : 'pg03', name : 'Extrude Geometry'},
    { url : 'pg04', name : 'Extrude TubeGeometry'},
    { url : 'pg05', name : 'Extrude SVG'},
    { url : 'pg06', name : 'Parametric geometries'},
    { url : 'pg07', name : 'Text geometry'},
    { url : 'pg08', name : 'Binary operations'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
