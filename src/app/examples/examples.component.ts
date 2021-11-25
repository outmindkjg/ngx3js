import {
	AfterViewInit,
	Component,
	ElementRef,
	OnInit,
	ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RendererComponent, ThreeUtil } from 'ngx3js';
import { HttpClient } from '@angular/common/http';
import { MenuComponent } from '../menu/menu.component';

export interface SearchMenu {
	id: string;
	safeId?: string;
	name: string;
	image: string;
	selected: boolean;
	tags: string;
}

export interface SearchMenuTop {
	name: string;
	children: SearchMenu[];
}

@Component({
	selector: 'app-examples',
	templateUrl: './examples.component.html',
	styleUrls: ['./examples.component.scss'],
})
export class ExamplesComponent implements OnInit, AfterViewInit {
	@ViewChild('search') search: ElementRef;
	@ViewChild('github') gitHub: ElementRef;
	@ViewChild('ngxGithub') ngxGithub: ElementRef;
	@ViewChild('menu') menu: MenuComponent;

	private subscription: Subscription;

	constructor(
		private router: Router,
		private ele: ElementRef,
		private http: HttpClient
	) {
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
			this.menu.closeMenu(true);
			const links: HTMLAnchorElement[] =
				this.ele.nativeElement.getElementsByTagName('a');
			let selected: HTMLAnchorElement = null;
			for (let i = 0; i < links.length; i++) {
				if (links[i].getAttribute('href') === '#' + menuId) {
					selected = links[i];
					break;
				}
			}
			if (selected !== null) {
				selected.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
				setTimeout(() => {
					this.menu.closeMenu(false);
				}, 1500);
			} else {
				setTimeout(() => {
					this.menu.closeMenu(false);
				}, 1500);
			}
		}, 1000);
	}

	ngAfterViewInit() {}

	downloadThumbFile() {
		if (ThreeUtil.lastRenderer !== null) {
			const lastRenderer = ThreeUtil.lastRenderer as RendererComponent;
			lastRenderer.getCanvasJson((json) => {}, {
				width: 400,
				height: 250,
				name: 'auto',
				type: 'jpg',
			});
		}
		return false;
	}

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

	setList(response: any, ngxResponse: any) {
		this.files = response;
		Object.entries(ngxResponse).forEach(([key, value]) => {
			this.files[key] = value as any;
		});
		if (this.menuId !== null) {
			this.setFocus(this.menuId);
		}
	}

	checkSearch(filter: string) {
		if (this.files === null) {
			this.http.get('assets/files.json').subscribe((response) => {
				this.http.get('assets/ngx-files.json').subscribe((ngxResponse) => {
					this.setList(response, ngxResponse);
					this.checkSearch(filter);
				});
			});
			return;
		}

		if (this.tags === null) {
			this.http.get('assets/tags.json').subscribe((response) => {
				this.tags = response as any;
				this.checkSearch(filter);
			});
			return;
		}

		if (filter.split(' ').join('') === '') {
			this.searchFocused = false;
		} else {
			this.searchFocused = true;
			filter = filter.toLowerCase();
		}
		const searchMenu: SearchMenuTop[] = [];
		const filterList = filter.split(' ');
		Object.entries(this.files).forEach(([key, value]) => {
			const children = this.getSearchChildren(value, filterList, key);
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
				if (child.selected) {
					document.title = child.name + ' :: Three.js examples';
					if (child.safeId.startsWith('/examples/ngx-')) {
						this.gitHub.nativeElement.style.pointerEvents = 'none';
						this.gitHub.nativeElement.href =
						'https://github.com/outmindkjg/ngx3js/tree/master/src/app' +
						child.safeId +
						'';
						this.gitHub.nativeElement.title =
						'View source code for "' + child.name + '" on GitHub ngx3js';
					} else {
						this.gitHub.nativeElement.style.pointerEvents = 'all';
						this.gitHub.nativeElement.href =
							'https://github.com/mrdoob/three.js/blob/master' +
							child.id +
							'.html';
							this.gitHub.nativeElement.title =
							'View source code for "' + child.name + '" on GitHub';
					}
					this.ngxGithub.nativeElement.href =
						'https://github.com/outmindkjg/ngx3js/tree/master/src/app' +
						child.safeId +
						'';
					this.ngxGithub.nativeElement.title =
						'View source code for "' + child.name + '" on GitHub ngx3js';
					setTimeout(() => {
						console.log('INFO : ', child.id);
						console.log('INFO : ', child.safeId);
					}, 1000);
				}
			});
		});
		return searchMenu;
	}

	private getSearchChildren(
		menu: string[],
		keyword: string[],
		parentId: string
	): SearchMenu[] {
		const children: SearchMenu[] = [];
		menu.forEach((id) => {
			const child = this.getSearchItem(id, keyword, parentId);
			if (child !== null) {
				children.push(child);
			}
		});
		return children;
	}

	private getSearchItem(
		id: string,
		keyword: string[],
		parentId: string
	): SearchMenu {
		const tags: string[] = this.tags[id] !== undefined ? this.tags[id] : [];
		let isFounded: boolean = true;
		if (keyword.length > 0) {
			const allTags = [...tags];
			allTags.push(id);
			const sampleTags = allTags.join(' ').toLowerCase();
			keyword.forEach((txt) => {
				if (txt.length > 0) {
					if (sampleTags.indexOf(txt) === -1) {
						isFounded = false;
					}
				}
			});
		}
		if (isFounded) {
			const itemTags: string[] = [];
			id.split('_').forEach((key) => {
				if (parentId !== key && itemTags.indexOf(key) === -1) {
					itemTags.push(key);
				}
			});
			tags.forEach((key) => {
				if (parentId !== key && itemTags.indexOf(key) === -1) {
					itemTags.push(key);
				}
			});
			let image: string = '';
			let url: string = '';
			switch (parentId) {
				case 'webgl':
				case 'webgl / nodes':
				case 'webgl / postprocessing':
				case 'webgl / advanced':
				case 'webgl2':
				case 'webgpu':
				case 'webaudio':
				case 'webxr':
				case 'games':
				case 'physics':
				case 'misc':
				case 'css2d':
				case 'css3d':
				case 'svg':
				case 'tests':
					image = ThreeUtil.getStoreUrl('screenshots/' + id + '.jpg');
					url = '/examples/' + id;
					break;
				case 'ngx3js':
					image = ThreeUtil.getStoreUrl('screenshots/' + id + '.jpeg');
					url = '/examples/' + id;
					break;
				default:
					image = ThreeUtil.getStoreUrl('screenshots/css2d_label.jpg');
					url = '/examples/' + id;
					break;
			}
			return {
				id: url,
				safeId: url.replace(/_/gi, '-'),
				name: id.split('_').join(' '),
				image: image,
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

	private files: { [key: string]: string[] } = null;

	private tags: { [key: string]: string[] } = null;
}
