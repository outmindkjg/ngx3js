import { Component, OnInit } from '@angular/core';
import { MenuVo } from '../common-interface';

@Component({
  selector: 'app-chapter11',
  templateUrl: './chapter11.component.html',
  styleUrls: ['./chapter11.component.scss']
})
export class Chapter11Component implements OnInit {

  public menuList : MenuVo[] = [
    { url : 'pg01', name : 'Effect composings'},
    { url : 'pg02', name : 'Simple passes'},
    { url : 'pg03a', name : 'Effect composings - A'},
    { url : 'pg03b', name : 'Effect composings - B'},
    { url : 'pg04', name : 'Post processing masks'},
    { url : 'pg05', name : 'Shader Pass simple'},
    { url : 'pg06', name : 'Advanced'},
    { url : 'pg07', name : 'custom shaderpass'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
