import { Component, OnInit } from '@angular/core';
import { MenuVo } from '../common-interface';

@Component({
  selector: 'app-chapter08',
  templateUrl: './chapter08.component.html',
  styleUrls: ['./chapter08.component.scss']
})
export class Chapter08Component implements OnInit {

  public menuList : MenuVo[] = [
    { url : 'pg01', name : 'Grouping'},
    { url : 'pg02', name : 'Merge objects'},
    { url : 'pg03', name : 'Load and Save Object'},
    { url : 'pg04', name : 'Load and Save Scene'},
    { url : 'pg05', name : 'Load blender model'},
    { url : 'pg06', name : 'Load OBJ model'},
    { url : 'pg07', name : 'Load OBJ and MTL'},
    { url : 'pg08', name : 'Load collada model'},
    { url : 'pg09', name : 'Load STL model'},
    { url : 'pg10', name : 'Load CTM model'},
    { url : 'pg11', name : 'Load VTK model'},
    { url : 'pg12', name : 'Load PDB model'},
    { url : 'pg13', name : 'Load PLY model'},
    { url : 'pg14', name : 'Load AWD model'},
    { url : 'pg15', name : 'Load assimp model'},
    { url : 'pg16', name : 'Load VRML model'},
    { url : 'pg17', name : 'Load babylon model'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
