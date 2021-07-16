import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MenuVo } from '../common-interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  @Input() menuType: string = "examples";
  menuList: MenuVo[] = [
    { url : "docs", name : "docs"},
    { url : "examples", name : "examples"}
  ];

  constructor() {
  }

  ngOnInit(): void {
  
  }

  ngOnDestroy(): void {
  }

}
