import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuComponent } from '../menu/menu.component';

export interface SearchMenu {
	id: string;
	safeId?: string;
	name: string;
	image?: string;
	selected: boolean;
	children?: SearchMenu[];
	tags: string;
}

export interface SearchMenuTop {
	name: string;
	children: SearchMenu[];
}

@Component({
	selector: 'app-docs',
	templateUrl: './docs.component.html',
	styleUrls: ['./docs.component.scss'],
})
export class DocsComponent implements OnInit {
	@ViewChild('search') search: ElementRef;
	@ViewChild('panel') panel: ElementRef;
	@ViewChild('gitHub') gitHub: ElementRef;
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
		console.log(
			[
				'    __     __',
				' __/ __\\  / __\\__   ____   _____   _____',
				'/ __/  /\\/ /  /___\\/ ____\\/ _____\\/ _____\\  with NGX3JS',
				'\\/_   __/ /   _   / /  __/ / __  / / __  /_   __   _____',
				'/ /  / / /  / /  / /  / / /  ___/ /  ___/\\ _\\/ __\\/ _____\\',
				'\\/__/  \\/__/\\/__/\\/__/  \\/_____/\\/_____/\\/__/ /  / /  ___/',
				'                                         / __/  /  \\__  \\',
				'                                         \\/____/\\/_____/',
			].join('\n')
		);
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
		if (this.menuId.indexOf('/ar/') > 0) {
			this.language = 'ar';
		} else if (this.menuId.indexOf('/ja/') > 0) {
			this.language = 'ja';
		} else if (this.menuId.indexOf('/zh/') > 0) {
			this.language = 'zh';
		} else if (this.menuId.indexOf('/ko/') > 0) {
			this.language = 'ko';
		} else {
			this.language = 'en';
		}
		if (this.menuId !== null && this.menuId !== undefined) {
			this.checkSearchMenuSelected(this.searchMenu);
			this.setFocus(this.menuId);
		}
	}

	setFocus(menuId: string) {
		if (this.list === null) {
			setTimeout(() => {
				this.setFocus(menuId);
			}, 500)
		} else {
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
				}, 2000);
			} else {
				setTimeout(() => {
					this.menu.closeMenu(false);
				}, 1000);
			}
		}
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

	language: string = 'ko';

	localeInfos: { value: string; text: string }[] = [
		{ value: 'en', text: 'English' },
		{ value: 'ar', text: 'ar' },
		{ value: 'ko', text: '한국어' },
		{ value: 'zh', text: '中文' },
		{ value: 'ja', text: '日本語' },
	];

	loadedPageInfo: { [key: string]: string } = {};

	changePage(url: string) {
		let pageName = '';
		let hashTag = '';
		if (url.indexOf('.') > 0) {
			[pageName, hashTag] = url.split('.');
			if (pageName === 'THREE') {
				pageName = hashTag;
			}
		} else {
			pageName = url;
		}
		switch (pageName) {
			case 'TODO':
				break;
			default:
				break;
		}
		if (this.loadedPageInfo[pageName] !== undefined) {
			let viewUrl = this.loadedPageInfo[pageName];
			this.router.navigateByUrl(viewUrl + (hashTag != '' ? '.' + hashTag : ''));
			this.checkSearch('');
		} else {
			switch (pageName) {
				case 'ApplyMatrix4':
				case 'CssStyle':
				case 'CurvesParameters':
				case 'GuiBaseControl':
				case 'GuiControlParam':
				case 'LoadedNameMap':
				case 'LoadedObject':
				case 'RendererEvent':
				case 'RendererInfo':
				case 'RendererTimer':
				case 'StorageExportOption':
				case 'StorageOption':
				case 'TagAttributes':
				case 'TextureOption':
				case 'ThreeGuiController':
				case 'ThreeColor':
				case 'ThreeTexture':
				case 'ThreeUniform':
				case 'ThreeUniforms':
					try {
						this.router.navigateByUrl('/docs/ngxapi/en/ThreeUtil.' + pageName);
					} catch(ex : any){ }
					break;
				default :
					if (pageName.startsWith('examples/')) {
						this.router.navigateByUrl(pageName);
					} else {
						console.log(this.loadedPageInfo, pageName);
					}
					break;
			}
		}
	}

	changeLocale(locale: Event) {
		const language = (locale.target as any).value;
		this.menuId = this.menuId.replace(
			'/' + this.language + '/',
			'/' + language + '/'
		);
		this.language = language;
		this.router.navigateByUrl(this.menuId);
		this.checkSearch('');
	}

	setList(response: any, ngxResponse: any) {
		this.list = response;
		Object.entries(ngxResponse).forEach(([locale, value]) => {
			const parentObj = this.list[locale];
			Object.entries(value).forEach(([key, ngxValue]) => {
				parentObj[key] = ngxValue;
			});
		});
		this.checkLoadedPageInfo(this.list['en'], [
			this.list['ar'],
			this.list['ko'],
			this.list['zh'],
			this.list['ja'],
		]);
	}

	docsAlias: { [key: string]: string[] } = {
		Manual: ['الكتيب', '手册', '매뉴얼', 'マニュアル'],
		'Getting Started': ['البدء', '起步', '시작하기', 'はじめてみましょう'],
		'Next Steps': ['الخطوات التالية', '进阶', '심화 과정', '次の段階'],
		'Build Tools': ['أدوات البناء', '构建工具', '빌드 도구', 'ビルドツール'],
		Reference: ['المرجع', '参考', '레퍼런스'],
		Animation: ['الحركات', '动画', '애니메이션'],
		'Animation / Tracks': [
			'الحركات / Tracks',
			'动画 / 轨道',
			'애니메이션 / 트랙',
		],
		Audio: ['音频', '오디오'],
		Cameras: ['摄像机', '카메라'],
		Constants: ['常量', '상수'],
		Core: ['核心'],
		'Core / BufferAttributes': ['核心 / BufferAttributes'],
		Extras: ['附件'],
		'Extras / Core': ['附件 / 核心'],
		'Extras / Curves': ['附件 / 曲线'],
		'Extras / Objects': ['附件 / 物体'],
		Geometries: ['几何体'],
		Helpers: ['辅助对象'],
		Lights: ['灯光'],
		'Lights / Shadows': ['灯光 / 阴影'],
		Loaders: ['加载器'],
		'Loaders / Managers': ['加载器 / 管理器'],
		Materials: ['材质'],
		Math: ['数学库'],
		'Math / Interpolants': ['数学库 / 插值'],
		Objects: ['物体'],
		Renderers: ['渲染器'],
		'Renderers / Shaders': ['渲染器 / 着色器'],
		'Renderers / WebXR': ['渲染器 / WebXR'],
		Scenes: ['场景'],
		Textures: ['纹理贴图'],
		Examples: ['示例'],
		Animations: ['动画'],
		Controls: ['控制', '컨트롤'],
		'Post-Processing': ['后期处理'],
		Exporters: ['导出器'],
		ConvexHull: ['QuickHull'],
		Utils: ['实用工具'],
		'Developer Reference': ['开发者参考'],
		Polyfills: ['差异化支持'],
		WebGLRenderer: ['WebGL渲染器'],
		'ngx - Manual': [
			'الكتيب - ngx',
			'ngx - 手册',
			'ngx - 매뉴얼',
			'ngx - マニュアル',
		],
		'ngx - Reference': ['المرجع - ngx', 'ngx - 参考', 'ngx - 레퍼런스'],
		'ngx - Examples': ['ngx - 示例'],
		'ngx - Developer Reference': ['ngx - 开发者参考'],
	};

	checkLoadedPageInfo(object: any, synkObj: any[]) {
		Object.entries(object).forEach(([key, value]) => {
			if (typeof value === 'string') {
				this.getSearchItem(key, value, [], '');
				const refKey = /[\-A-z0-9]+$/.exec(value).toString();
				refKey.endsWith;
				synkObj.forEach((obj) => {
					let refFound = false;
					Object.entries(obj as { [key: string]: string }).forEach(
						([_, refValue]) => {
							if (refValue.endsWith(refKey)) {
								refFound = true;
							}
						}
					);
					if (!refFound) {
						obj[key] = value;
					}
				});
			} else {
				const childSynkObj: any[] = [];
				let aliasKey: string[] = this.docsAlias[key] || [];
				synkObj.forEach((obj) => {
					let foundObj = null;
					aliasKey.forEach((altKey) => {
						if (obj[altKey] !== undefined) {
							foundObj = obj[altKey];
						}
					});
					if (foundObj === null) {
						obj[key] = value;
					} else {
						childSynkObj.push(foundObj);
					}
				});
				this.checkLoadedPageInfo(value, childSynkObj);
			}
		});
	}

	checkSearch(filter: string) {
		if (this.list === null) {
			this.http.get('assets/list.json').subscribe((response) => {
				this.http.get('assets/ngx-list.json').subscribe((ngxResponse) => {
					this.setList(response, ngxResponse);
					this.checkSearch(filter);
				});
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
		const listLocale = this.list[this.language] || this.list['en'];
		const filterList = filter.split(' ');
		Object.entries(listLocale).forEach(([key, value]) => {
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
				if (child.children !== null && child.children.length > 0) {
					child.children.forEach((gchild) => {
						gchild.selected = gchild.id === this.menuId;
						if (gchild.selected) {
							document.title = gchild.name + ' :: Three.js docs + ngx';
							if (
								gchild.id.startsWith('/docs/ngxapi/') ||
								gchild.id.startsWith('/docs/ngxmanual/')
							) {
								this.gitHub.nativeElement.href =
									'https://github.com/outmindkjg/ngx3js/tree/master/src/assets/' +
									gchild.id.substr(6) +
									'.html';
							} else {
								this.gitHub.nativeElement.href =
									'https://github.com/mrdoob/three.js/blob/dev' +
									gchild.id +
									'.html';
							}
							this.gitHub.nativeElement.title =
								'View source code for "' + gchild.name + '" on GitHub';
						}
					});
				}
			});
		});
		return searchMenu;
	}

	private getSearchChildren(
		menu: Object,
		keyword: string[],
		parentId: string
	): SearchMenu[] {
		const children: SearchMenu[] = [];
		Object.entries(menu).forEach(([key, value]) => {
			if (typeof value === 'object') {
				const childChildren = this.getSearchChildren(value, keyword, key);
				if (childChildren.length > 0) {
					const child = this.getSearchItem(
						key,
						childChildren[0].id,
						[],
						parentId + ' ' + key
					);
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

	private getSearchItem(
		name: string,
		url: string,
		keyword: string[],
		parentId: string
	): SearchMenu {
		const tags: string[] = [];
		url
			.toLowerCase()
			.split('/')
			.forEach((txt) => {
				tags.push(txt.toLowerCase());
			});
		tags.push(name.toLowerCase());
		tags.push(parentId.toLowerCase());
		const sampleTags = tags.join(' ').toLowerCase();
		let isFounded: boolean = true;
		if (keyword.length > 0) {
			keyword.forEach((txt) => {
				if (txt.length > 0) {
					if (sampleTags.indexOf(txt) === -1) {
						isFounded = false;
					}
				}
			});
		}
		if (isFounded) {
			let saveUrl = '';
			if (url.startsWith('/docs/')) {
				url = url.substr(6);
			}
			if (
				url.startsWith('samples/') ||
				url.startsWith('manual/') ||
				url.startsWith('api/') ||
				url.startsWith('ngxmanual/') ||
				url.startsWith('ngxapi/')
			) {
				saveUrl = '/docs/' + url;
			} else {
				saveUrl = '/' + url;
			}
			const urlInfos = url.split('/');
			this.loadedPageInfo[urlInfos[urlInfos.length - 1]] = saveUrl;
			const itemTags = [];
			name.split(' ').forEach((key) => {
				if (parentId !== key && tags.indexOf(key) === -1) {
					itemTags.push(key);
				}
			});
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

	private list: {
		[key: string]: { [key: string]: { [key: string]: string } };
	} = null;
}
