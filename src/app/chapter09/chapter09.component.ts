import { Component, OnInit } from '@angular/core';
import { MenuVo } from '../common-interface';

@Component({
  selector: 'app-chapter09',
  templateUrl: './chapter09.component.html',
  styleUrls: ['./chapter09.component.scss']
})
export class Chapter09Component implements OnInit {

  public menuList : MenuVo[] = [
    { url : 'pg01', name : 'Basic animations'},
    { url : 'pg02', name : 'Selecting objects'},
    { url : 'pg03', name : 'Animation tween'},
    { url : 'pg04', name : 'Trackball controls'},
    { url : 'pg05', name : 'Fly controls'},
    { url : 'pg06', name : 'Roll controls'},
    { url : 'pg07', name : 'first person camera'},
    { url : 'pg08', name : 'Orbit controls'},
    { url : 'pg09', name : 'Working with morph targets'},
    { url : 'pg10', name : 'Working with morph targets'},
    { url : 'pg11', name : 'Manual morph targets'},
    { url : 'pg12', name : 'Load blender model'},
    { url : 'pg13', name : 'Animation from blender'},
    { url : 'pg14', name : 'Animation from collada'},
    { url : 'pg15', name : 'animation from md2'},
    { url : 'pg16', name : 'animation from md2'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
