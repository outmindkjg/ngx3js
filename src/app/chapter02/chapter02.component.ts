import { Component, OnInit } from '@angular/core';
import { MenuVo } from '../common-interface';

@Component({
  selector: 'app-chapter02',
  templateUrl: './chapter02.component.html',
  styleUrls: ['./chapter02.component.scss']
})
export class Chapter02Component implements OnInit {

  public menuList : MenuVo[] = [
    { url : 'pg01', name : 'Basic Scene'},
    { url : 'pg02', name : 'Foggy Scene'},
    { url : 'pg03', name : 'Override Material'},
    { url : 'pg04', name : 'Geometries'},
    { url : 'pg05', name : 'Custom geometry'},
    { url : 'pg06', name : 'Mesh Properties'},
    { url : 'pg07', name : 'Both Cameras'},
    { url : 'pg08', name : 'Cameras LookAt'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
