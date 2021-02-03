import { Component, OnInit } from '@angular/core';
import { MenuVo } from '../common-interface';

@Component({
  selector: 'app-chapter12',
  templateUrl: './chapter12.component.html',
  styleUrls: ['./chapter12.component.scss']
})
export class Chapter12Component implements OnInit {

  public menuList : MenuVo[] = [
    { url : 'pg01', name : 'test1'},
    { url : 'pg02', name : 'test2'},
    { url : 'pg03', name : 'test3'},
    { url : 'pg04', name : 'test4'},
    { url : 'pg05', name : 'test5'},
    { url : 'pg06', name : 'test6'},
    { url : 'pg07', name : 'test7'}
  ];
 
  constructor() { }

  ngOnInit(): void {
  }

}
