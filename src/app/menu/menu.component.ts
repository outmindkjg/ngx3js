import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MenuVo } from '../common-interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  @ViewChild('expandButton') expandButton: ElementRef;

  @Input() menuType: string = "examples";

  menuList: MenuVo[] = [
    { url : "docs", name : "docs"},
    { url : "examples", name : "examples"}
  ];

  constructor(private ele : ElementRef ) {
  }

  ngOnInit(): void {
  
  }

  ngOnDestroy(): void {
  }

  toggleMenu() {
    const ele = this.expandButton.nativeElement.parentNode.parentNode.parentNode;
    ele.classList.toggle('open');
  }
}
