import { Component, OnInit } from '@angular/core';
import { MenuVo } from '../common-interface';

@Component({
  selector: 'app-chapter05',
  templateUrl: './chapter05.component.html',
  styleUrls: ['./chapter05.component.scss']
})
export class Chapter05Component implements OnInit {

  public menuList : MenuVo[] = [
    { url : 'pg01', name : 'Basic 2D geometries - Plane'},
    { url : 'pg02', name : 'Basic 2D geometries - Circle'},
    { url : 'pg03', name : 'Basic 2D geometries - Shape'},
    { url : 'pg04', name : 'Basic 2D geometries - Ring'},
    { url : 'pg05', name : 'Basic 3D geometries - Cube'},
    { url : 'pg06', name : 'Basic 3D geometries - Sphere'},
    { url : 'pg07', name : 'Basic 3D geometries - Cylinder'},
    { url : 'pg08', name : 'Basic 3D geometries - Torus'},
    { url : 'pg09', name : 'Basic 3D geometries - Ring'},
    { url : 'pg10', name : 'Basic 3D geometries - Torusknot'},
    { url : 'pg11', name : 'Basic 3D geometries - Polyhedron'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
