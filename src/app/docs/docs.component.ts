import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RendererComponent, ThreeUtil } from './../three';
import { HttpClient } from "@angular/common/http";

export interface SearchMenu {
  id: string;
  safeId?: string;
  name: string;
  image?: string;
  selected: boolean;
  children? : SearchMenu[]; 
  tags: string;
}

export interface SearchMenuTop {
  name: string;
  children: SearchMenu[] ;
}

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit {

  @ViewChild('search') search: ElementRef;

  private subscription: Subscription;

  constructor(private router: Router, private ele: ElementRef, private http: HttpClient ) {
    this.subscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.changeRouter(event.urlAfterRedirects || event.url);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  ngOnInit(): void {
    this.checkSearch('');
  }

  private menuId: string = '';

  changeRouter(url: string) {
    this.menuId = url;
    if (this.menuId !== null && this.menuId !== undefined) {
      this.checkSearchMenuSelected(this.searchMenu);
      this.setFocus(this.menuId);
    }
  }

  setFocus(menuId: string) {
    setTimeout(() => {
      const links: HTMLAnchorElement[] = this.ele.nativeElement.getElementsByTagName('a');
      let selected: HTMLAnchorElement = null;
      for (let i = 0; i < links.length; i++) {
        if (links[i].getAttribute('href') === '#' + menuId) {
          selected = links[i];
          break;
        }
      }
      if (selected !== null) {
        selected.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }, 1000);
  }

  ngAfterViewInit() {}

  searchFocused: boolean = false;

  searchFocus() {
    this.searchFocused = true;
  }

  searchKeyUp() {
    const filter = this.search.nativeElement.value;
    if (filter != '') {
      this.checkSearch(filter);
    }
  }

  searchBlur() {
    if (this.search.nativeElement.value === '') {
      this.searchFocused = false;
    } else {
      this.checkSearch(this.search.nativeElement.value);
    }
  }

  searchClear() {
    this.search.nativeElement.value = '';
    this.checkSearch('');
  }

  minimal: boolean = false;
  toggleMinimal() {
    this.minimal = !this.minimal;
  }

  language : string = "ko";
  checkSearch(filter: string) {
    if (this.list === null ) {
      this.http.get('assets/list.json').subscribe ( 
        response => { 
          this.list = response as any;
          this.checkSearch(filter);
        }
      )
      return ;
    }
    if (filter.split(' ').join('') === '') {
      this.searchFocused = false;
    } else {
      this.searchFocused = true;
      filter = filter.toLowerCase();
    }
    const searchMenu: SearchMenuTop[] = [];
    const listLocale = this.list[this.language] || this.list['en'];
    Object.entries(listLocale).forEach(([key, value]) => {
      const children = this.getSearchChildren(value, filter, key);
      if (children.length > 0) {
        searchMenu.push({
          name: key.split('_').join(' '),
          children: children,
        });
      }
    });
    this.searchMenu = this.checkSearchMenuSelected(searchMenu);
  }

  checkSearchMenuSelected(searchMenu: SearchMenuTop[]): SearchMenuTop[] {
    searchMenu.forEach((menu) => {
      menu.children.forEach((child) => {
        child.selected = child.id === this.menuId;
        if (child.children !== null && child.children.length > 0) {
          child.children.forEach((gchild) => {
            gchild.selected = gchild.id === this.menuId;
          });
        }
      });
    });
    return searchMenu;
  }

  private getSearchChildren(menu: Object, keyword: string, parentId: string): SearchMenu[] {
    const children: SearchMenu[] = [];
    Object.entries(menu).forEach(([key, value]) => {
      if (typeof value === 'object') {
        const childChildren = this.getSearchChildren(value, keyword, key);
        if (childChildren.length > 0) {
          const child = this.getSearchItem(key, childChildren[0].id, '', parentId);
          child.children = childChildren;
          children.push(child);
        }
      } else {
        const child = this.getSearchItem(key, value, keyword, parentId);
        if (child !== null) {
          children.push(child);
        }
      }
    });
    return children;
  }


  private getSearchItem(name: string, url : string, keyword: string, parentId: string): SearchMenu {
    const tags: string[] = url.toLowerCase().split('/');
    if (keyword == '' || tags.indexOf(keyword) > -1 || name.indexOf(keyword) > -1) {
      const itemTags: string[] = [];
      name.split(' ').forEach((key) => {
        if (parentId !== key && itemTags.indexOf(key) === -1) {
          itemTags.push(key);
        }
      });
      let saveUrl = '';
      if (url.startsWith('/docs/')) {
        url = url.substr(6);
      }
      if (url.startsWith('manual/') || url.startsWith('api/')) {
        saveUrl = '/docs/' + url;
      } else {
        saveUrl = '/' + url;
      }
      return {
        id: saveUrl,
        safeId: url.replace(/_/gi, '-'),
        name: name,
        tags: itemTags.join(' / '),
        selected: false,
      };
    } else {
      return null;
    }
  }

  searchMenu: {
    name: string;
    children: SearchMenu[];
  }[] = [];

  private list : { [key : string] :  {[key : string] : {[key : string] : string } } } = null ;
  

}
