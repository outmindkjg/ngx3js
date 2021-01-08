import { Component, OnInit } from '@angular/core';
import { MenuVo } from '../common-interface';

@Component({
  selector: 'app-chapter01',
  templateUrl: './chapter01.component.html',
  styleUrls: ['./chapter01.component.scss']
})
export class Chapter01Component implements OnInit {

  public menuList : MenuVo[] = [
    { url : 'pg01', name : 'Basic skeleton'},
    { url : 'pg02', name : 'First Scene'},
    { url : 'pg03', name : 'Materials and light'},
    { url : 'pg04', name : 'Materials, light and animation'},
    { url : 'pg05', name : 'Control gui'},
    { url : 'pg06', name : 'Screen size change'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
