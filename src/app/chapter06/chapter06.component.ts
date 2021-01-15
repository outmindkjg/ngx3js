import { Component, OnInit } from '@angular/core';
import { MenuVo } from '../common-interface';

@Component({
  selector: 'app-chapter06',
  templateUrl: './chapter06.component.html',
  styleUrls: ['./chapter06.component.scss']
})
export class Chapter06Component implements OnInit {

  public menuList : MenuVo[] = [
    { url : 'pg01', name : ''},
    { url : 'pg02', name : ''},
    { url : 'pg03', name : ''},
    { url : 'pg04', name : ''},
    { url : 'pg05', name : ''},
    { url : 'pg06', name : ''},
    { url : 'pg07', name : ''},
    { url : 'pg08', name : ''},
    { url : 'pg09', name : ''},
    { url : 'pg10', name : ''}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
