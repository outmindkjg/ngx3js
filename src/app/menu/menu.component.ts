import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuVo } from '../common-interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  @Input() menuType: string = "top";
  @Input() menuList: MenuVo[] = [];
  activeMenu : MenuVo = null;

  showMenu: boolean = true;
  static lastMenu : MenuComponent = null;
  private subscription: Subscription;
  private menuId : string = '';
  constructor(private router: Router) {
    this.subscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.changeRouter(event.urlAfterRedirects || event.url);
      }
    });
  }

  ngOnInit(): void {
  
  }

  changeRouter(url : string) {
    this.menuId = url.split('/')[ this.menuType == 'page' ? 2 : 1];
    this.ngOnChanges();
  }

  ngOnChanges(changes?: SimpleChanges): void {
    this.menuList.forEach(menu => {
      menu.selected = (menu.url == this.menuId) ? true : false;
      if (menu.selected) {
        this.activeMenu = menu;
      }
    })
    this.showMenu = false;
  }

  ngOnDestroy(): void {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
    if (this.showMenu) {
      if (MenuComponent.lastMenu != this) {
        if (MenuComponent.lastMenu != null) {
          MenuComponent.lastMenu.showMenu = false;
        } 
        MenuComponent.lastMenu = this;
      }
    } else {
      MenuComponent.lastMenu = null;
    }
  }


}
