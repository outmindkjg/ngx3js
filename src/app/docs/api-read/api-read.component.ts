import { HttpClient } from '@angular/common/http';
import {
	AfterViewInit,
	Component,
	ElementRef,
	OnInit,
	ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { HighlightJS } from 'ngx-highlightjs';
import { Subscription } from 'rxjs';
import { DocsComponent } from '../docs.component';

@Component({
	selector: 'app-api-read',
	templateUrl: './api-read.component.html',
	styleUrls: ['./api-read.component.scss'],
})
export class ApiReadComponent implements OnInit, AfterViewInit {
	@ViewChild('apiDoc') private docEle: ElementRef = null;
	@ViewChild('apiTop') private apiTop: ElementRef = null;

	private subscription: Subscription;

	constructor(
		private router: Router,
		private ele: ElementRef,
		private http: HttpClient,
		protected sanitizer: DomSanitizer,
		protected docsComponent: DocsComponent,
		protected highlightJS: HighlightJS
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
		if (this._onScrollBind !== null && this._docEle !== null) {
			this._docEle.removeEventListener('scroll', this._onScrollBind);
		}
	}

	ngOnInit(): void {}

	public menuId: string = '';
	public pageName: string = '';
	public tagName: string = '';
	public errorPage: string = null;
	public altPage: string = null;

	@ViewChild('search') search: ElementRef;

	searchFocused: boolean = false;

	searchFocus() {
		this.searchFocused = true;
	}

	searchKeyUp() {
		const filter = this.search.nativeElement.value;
		if (filter !== '') {
			this.checkSearch(filter);
		}
	}

	searchBlur() {
		const filter = this.search.nativeElement.value;
		if (filter === '') {
			this.searchFocused = false;
		}
	}

	searchClear() {
		this.search.nativeElement.value = '';
		this.searchFocused = false;
		this.checkSearch('');
	}
	private lastKeyword: string = '';
	private lastIndex: number = 0;
	checkSearch(filter: string) {
		const searchKeyword = this.getKeyWord(filter);
		this.unsetHighlight(this.docEle.nativeElement);
		if (searchKeyword !== null && searchKeyword !== '') {
			const keywordRegex = RegExp(
				searchKeyword.split(' ').join('|').replace(/#/gi, ''),
				'gi'
			);
			const collect: Element[] = [];
			this.setHighlight(this.docEle.nativeElement, keywordRegex, collect);
			if (collect.length > 0) {
				let selectIndex: number = 0;
				if (this.lastKeyword === searchKeyword) {
					selectIndex = (this.lastIndex + 1) % collect.length;
				}
				this.lastIndex = selectIndex;
				collect[selectIndex].scrollIntoView({
					block: 'start',
					behavior: 'smooth',
				});
			}
			this.lastKeyword = searchKeyword;
		}
	}

	private getKeyWord(text: string): string {
		if (text != null) {
			const keyword: string[] = [];
			text.split('\n').forEach((line) => {
				const lineTxt = line
					.split('\t')
					.join(' ')
					.split('#')
					.join(' ')
					.split(',')
					.join(' ')
					.trim()
					.toLowerCase();
				if (lineTxt.length > 1) {
					const noSpace = '#' + lineTxt.split(' ').join('');
					if (noSpace != '#' && keyword.indexOf(noSpace) == -1) {
						keyword.push(noSpace);
						lineTxt.split(' ').forEach((sTxt) => {
							if (sTxt != '' && sTxt.length > 1) {
								const tTxt = '#' + sTxt.trim();
								if (tTxt != '#' && keyword.indexOf(tTxt) == -1) {
									keyword.push(tTxt);
								}
							}
						});
					}
				}
			});
			if (keyword.length > 0) {
				return keyword.join(' ');
			}
		}
		return '';
	}

	protected static enterKeyValid: boolean = true;

	static getEnterKeyValid(): boolean {
		if (!this.enterKeyValid) {
			return false;
		} else {
			this.enterKeyValid = false;
			setTimeout(() => {
				this.enterKeyValid = true;
			}, 500);
		}
		return true;
	}

	private unsetHighlight(ele: HTMLElement) {
		const marks = ele.getElementsByTagName('MARK');
		const markList: Element[] = [];
		for (let i = 0; i < marks.length; i++) {
			markList.push(marks[i]);
		}
		markList.forEach((mark) => {
			const end = document.createTextNode(mark.textContent);
			mark.parentNode.replaceChild(end, mark);
		});
	}

	private setHighlight(ele: any, keywordRegex: RegExp, collect: any[]) {
		if (ele.childNodes) {
			ele.childNodes.forEach((child) => {
				if (child.nodeType !== 3 && child.tagName !== 'MARK') {
					this.setHighlight(child, keywordRegex, collect);
				} else if (
					keywordRegex.test(child.textContent) &&
					child.tagName !== 'MARK'
				) {
					const frag = document.createDocumentFragment();
					let lastIdx = 0;
					child.textContent.replace(keywordRegex, (match, idx) => {
						const part = document.createTextNode(
							child.textContent.slice(lastIdx, idx)
						);
						const highlighted = document.createElement('mark');
						highlighted.textContent = match;
						frag.appendChild(part);
						frag.appendChild(highlighted);
						lastIdx = idx + match.length;
					});
					const end = document.createTextNode(child.textContent.slice(lastIdx));
					if (
						!collect.includes(child.parentNode) &&
						!collect.includes(child.parentNode?.parentNode)
					) {
						collect.push(child.parentNode);
					}
					frag.appendChild(end);
					child.parentNode.replaceChild(frag, child);
				}
			});
		}
	}

	changeRouter(url: string) {
		const menuId = url.substr(6).split('.')[0];
		if (this.menuId !== menuId) {
			this.searchFocused = false;
			if (this.docEle !== null) {
				this.docEle.nativeElement.innerHTML = '';
			}
			this.links = null;
			this.isLoaded = false;
			this.menuId = url.substring(6).split('.')[0];
			this.pageName = /[\-A-z0-9]+$/.exec(this.menuId).toString();
			this.tagName = url.indexOf('.') > 0 ? url.split('.')[1] : null;
			this.http
				.get('assets/' + this.menuId + '.html', {
					responseType: 'text',
				})
				.subscribe(
					(response) => {
						this.errorPage = null;
						this.altPage = null;
						this.setBody(response, this.menuId);
					},
					() => {
						this.isLoaded = true;
						this.errorPage = '/docs/' + this.menuId;
						this.altPage = this.errorPage.replace(/\/(ko|ar|zh|ja)\//, '/en/');
						if (this.altPage === this.errorPage) {
							this.altPage = null;
						}
						this.docEle.nativeElement.innerHTML = '';
					}
				);
		} else {
			this.tagName = url.indexOf('.') > 0 ? url.split('.')[1] : null;
			if (this.tagName !== null && this.tagName !== '') {
				this.setFocus(this.tagName);
			}
		}
	}

	private lastH2Menu: {
		id: string;
		name: string;
		selected: boolean;
		element: HTMLElement;
	}[] = [];

	setBody(body: string, pageId: string) {
		const start = body.indexOf('<body>') + 6;
		const end = body.lastIndexOf('</body>');
		const html = body.substring(start, end);
		let path, localizedPath;
		const pathname = '/' + pageId;
		const section = /\/(api|manual|examples|samples|ngxapi|ngxmanual)\//
			.exec(pathname)[1]
			.toString();
		let name = /[\-A-z0-9]+$/.exec(pathname).toString();
		switch (section) {
			case 'api':
				localizedPath = /\/api\/[A-z0-9\/]+/
					.exec(pathname)
					.toString()
					.substr(5);
				path = localizedPath.replace(/^[A-z0-9-]+\//, '');
				break;
			case 'manual':
				name = name.replace(/\-/g, ' ');
				path = pathname.replace(/\ /g, '-');
				path = localizedPath = /\/manual\/[-A-z0-9\/]+/
					.exec(path)
					.toString()
					.substr(8);
				break;
			case 'ngxapi':
				localizedPath = /\/ngxapi\/[A-z0-9\/]+/
					.exec(pathname)
					.toString()
					.substr(8);
				path = localizedPath.replace(/^[A-z0-9-]+\//, '');
				break;
			case 'ngxmanual':
				name = name.replace(/\-/g, ' ');
				path = pathname.replace(/\ /g, '-');
				path = localizedPath = /\/ngxmanual\/[-A-z0-9\/]+/
					.exec(path)
					.toString()
					.substr(11);
				break;
			case 'examples':
				path = localizedPath = /\/examples\/[A-z0-9\/]+/
					.exec(pathname)
					.toString()
					.substr(10);
				break;
			case 'samples':
				path = localizedPath = /\/samples\/[A-z0-9\/]+/
					.exec(pathname)
					.toString()
					.substr(9);
				break;
		}
		let text = html;
		text = text.replace(/\[name\]/gi, name);
		text = text.replace(/\[path\]/gi, path);
		text = text.replace(/\[page:([\w\.]+)(\[\]|)\]/gi, '[page:$1$2 $1]'); // [page:name] to [page:name title]
		text = text.replace(
			/\[parameter:([\w\.]+)(\[\]|)\]/gi,
			'[parameter:$1$2 $1]'
		); // [parameter:name] to [parameter:name title]

		text = text.replace(/src=\"scenes\/([^\"]+)\"/gi, 'src="assets/scenes/$1"'); // [page:name] to [page:name title]
		text = text.replace(/src=\"viewer\/([^\"]+)\"/gi, 'src="#/viewer/$1"'); // [page:name] to [page:name title]

		text = text.replace(
			/\[page:\.([\w\.]+)(\[\]|) ([\w\.\s]+)\]/gi,
			'[page:' + name + '.$1$2 $3]'
		); // [page:.member title] to [page:name.member title]

		text = text.replace(
			/\[page:([\w\.]+)(\[\]|) ([\w\.\s]+)\]/gi,
			'<a href="#$1" title="$1$2">$3</a>'
		); // [page:name title]

		text = text.replace(
			/\[parameter:\.([\w\.]+)(\[\]|) ([\w\.\s]+)\]/gi,
			'[parameter:' + name + '.$1$2 $3]'
		); // [parameter:.member title] to [page:name.member title]

		text = text.replace(
			/\[parameter:([\w\.]+)(\[\]|) ([\w\.\s]+)\]/gi,
			'<a href="#$1" title="$1$2">$3</a> : <a href="#$1" title="$1$2">$1$2</a>'
		); // [parameter:name title]
		text = text.replace(
			/\[parameter:([\w\.]+)(\[\]|)\|([\w\.]+)(\[\]|) ([\w\.\s]+)\]/gi,
			'<a href="#$1" title="$1$2">$5</a> : <a href="#$1" title="$1$2">$1$2</a> | <a href="#$3" title="$3$4">$3$4</a>'
		); // [parameter:name|name title]
		text = text.replace(
			/\[page:([\w\.]+)(\[\]|)\|([\w\.]+)(\[\]|)\|([\w\.]+)(\[\]|) ([\w\.\s]+)\]/gi,
			'<a href="#$1" title="$1$2">$7</a> : <a href="#$1" title="$1$2">$1$2</a> | <a href="#$3" title="$3$4">$3$4</a> | <a href="#$5" title="$5$6">$5$6</a>'
		); // [parameter:name|name|name title]

		text = text.replace(
			/\[(member|property|method|param|constructor):([\w\.\-]+)(\[\]|)\]/gi,
			'[$1:$2$3 $2]'
		); // [member:name] to [member:name title]
		text = text.replace(
			/\[(?:member|property|method):([\w\.]+)(\[\]|) ([\w\.\-\s]+)\]\s*(\(.*\)|\?)?/gi,
			'<a href="#' +
				name +
				'.$3" title="' +
				name +
				'.$3" class="permalink">#</a> .<a href="#' +
				name +
				'.$3" id="$3">$3</a> $4 : <a class="param" href="#$1">$1</a>$2'
		);
		text = text.replace(
			/\[(?:member|property|method):([\w\.]+)(\[\]|)\|([\w\.\-]+)(\[\]|) ([\w\.\-\s]+)\]\s*(\(.*\)|\?)?/gi,
			'<a href="#' +
				name +
				'.$5" title="' +
				name +
				'.$5" class="permalink">#</a> .<a href="#' +
				name +
				'.$5" id="$5">$5</a> $6 : <a class="param" href="#$1">$1</a>$2 | <a class="param" href="#$3">$3</a>$4'
		);
		text = text.replace(
			/\[(?:member|property|method):([\w\.]+)(\[\]|)\|([\w\.\-]+)(\[\]|)\|([\w\.\-]+)(\[\]|) ([\w\.\-\s]+)\]\s*(\(.*\)|\?)?/gi,
			'<a href="#' +
				name +
				'.$7" title="' +
				name +
				'.$7" class="permalink">#</a> .<a href="#' +
				name +
				'.$7" id="$7">$7</a> $8 : <a class="param" href="#$1">$1</a>$2 | <a class="param" href="#$3">$3</a>$4 | <a class="param" href="#$5">$5</a>$6'
		);
		text = text.replace(
			/\[(?:member|property|method):([\w\.]+)(\[\]|)\|([\w\.\-]+)(\[\]|)\|([\w\.\-]+)(\[\]|)\|([\w\.\-]+)(\[\]|) ([\w\.\s]+)\]\s*(\(.*\)|\?)?/gi,
			'<a href="#' +
				name +
				'.$9" title="' +
				name +
				'.$9" class="permalink">#</a> .<a href="#' +
				name +
				'.$9" id="$9">$9</a> $10 : <a class="param" href="#$1">$1</a>$2 | <a class="param" href="#$3">$3</a>$4 | <a class="param" href="#$5">$5</a>$6 | <a class="param" href="#$7">$7</a>$8'
		);
		text = text.replace(
			/\[(?:member|property|method):([^ ]+) ([\w\.\-\s]+)\]\s*(\(.*\)|\?)?/gi,
			'<a href="#' +
				name +
				'.$2" title="' +
				name +
				'.$2" class="permalink">#</a> .<a href="#' +
				name +
				'.$2" id="$2">$2</a> $3 : <span class="param">$1</span>'
		);
		text = text.replace(
			/\[(?:constructor):([\w\.]+)(\[\]|) ([\w\.\s]+)\]\s*(\(.*\)|\?)?/gi,
			'<a href="#' +
				name +
				'.$3" title="' +
				name +
				'.$3" class="permalink">#</a> <a href="#' +
				name +
				'.$3" id="$3">new $3</a> $4 : <a class="param" href="#$1">$1</a>$2'
		);
		text = text.replace(
			/\[param:([\w\.]+)(\[\]|) ([\w\.\s]+)\](\?|)/gi,
			'$3$4 : <a class="param" href="#$1">$1</a>$2'
		); // [param:name title]
		text = text.replace(
			/\[param:([\w\.]+)(\[\]|)\|([\w\.]+)(\[\]|) ([\w\.\s]+)\](\?|)/gi,
			'$5$6 : <a class="param" href="#$1">$1</a>$2 | <a class="param" href="#$3">$3</a>$4'
		); // [param:name|name title]
		text = text.replace(
			/\[param:([\w\.]+)(\[\]|)\|([\w\.]+)(\[\]|)\|([\w\.]+)(\[\]|) ([\w\.\s]+)\](\?|)/gi,
			'$7$8 : <a class="param" href="#$1">$1</a>$2 | <a class="param" href="#$3">$3</a>$4 | <a class="param" href="#$5">$5</a>$6'
		); // [param:name|name| title]
		text = text.replace(/\[link:([\w|\:|\/|\.|\-|\_]+)\]/gi, '[link:$1 $1]'); // [link:url] to [link:url title]
		text = text.replace(
			/\[link:([\w|\:|\/|\.|\-|\_|\(|\)|\?|\#|\=|\!]+) ([\w|\:|\/|\.|\-|\_|\s]+)\]/gi,
			'<a href="$1" target="_blank">$2</a>'
		); // [link:url title]
		text = text.replace(
			/\*([\w|\d|\"|\-|\(][\w|\d|\ |\-|\/|\+|\-|\(|\)|\=|\,|\.\"]*[\w|\d|\"|\)]|\w)\*/gi,
			'<strong>$1</strong>'
		); // *
		text = text.replace(
			/<iframe [ a-z="']*src=["']([^"]+)["']><\/iframe>/gi,
			'<div class="dummy-iframe" data-src="$1"></div>'
		);
		text = text.replace(/\[example:([\w\_/]+)\]/gi, '[example:$1 $1]'); // [example:name] to [example:name title]
		text = text.replace(
			/\[example:([\w\_/]+) ([\w\:\/\.\-\_ \s]+)\]/gi,
			'<a href="#examples/$1">$2</a>'
		); // [example:name title]
		const MD5 = function (d) {
			var r = M(V(Y(X(d), 8 * d.length)));
			return r.toLowerCase();
		};
		function M(d) {
			for (var _, m = '0123456789ABCDEF', f = '', r = 0; r < d.length; r++)
				(_ = d.charCodeAt(r)),
					(f += m.charAt((_ >>> 4) & 15) + m.charAt(15 & _));
			return f;
		}
		function X(d) {
			for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++) _[m] = 0;
			for (m = 0; m < 8 * d.length; m += 8)
				_[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32;
			return _;
		}
		function V(d) {
			for (var _ = '', m = 0; m < 32 * d.length; m += 8)
				_ += String.fromCharCode((d[m >> 5] >>> m % 32) & 255);
			return _;
		}
		function Y(d, _) {
			(d[_ >> 5] |= 128 << _ % 32), (d[14 + (((_ + 64) >>> 9) << 4)] = _);
			for (
				var m = 1732584193,
					f = -271733879,
					r = -1732584194,
					i = 271733878,
					n = 0;
				n < d.length;
				n += 16
			) {
				var h = m,
					t = f,
					g = r,
					e = i;
				(f = md5_ii(
					(f = md5_ii(
						(f = md5_ii(
							(f = md5_ii(
								(f = md5_hh(
									(f = md5_hh(
										(f = md5_hh(
											(f = md5_hh(
												(f = md5_gg(
													(f = md5_gg(
														(f = md5_gg(
															(f = md5_gg(
																(f = md5_ff(
																	(f = md5_ff(
																		(f = md5_ff(
																			(f = md5_ff(
																				f,
																				(r = md5_ff(
																					r,
																					(i = md5_ff(
																						i,
																						(m = md5_ff(
																							m,
																							f,
																							r,
																							i,
																							d[n + 0],
																							7,
																							-680876936
																						)),
																						f,
																						r,
																						d[n + 1],
																						12,
																						-389564586
																					)),
																					m,
																					f,
																					d[n + 2],
																					17,
																					606105819
																				)),
																				i,
																				m,
																				d[n + 3],
																				22,
																				-1044525330
																			)),
																			(r = md5_ff(
																				r,
																				(i = md5_ff(
																					i,
																					(m = md5_ff(
																						m,
																						f,
																						r,
																						i,
																						d[n + 4],
																						7,
																						-176418897
																					)),
																					f,
																					r,
																					d[n + 5],
																					12,
																					1200080426
																				)),
																				m,
																				f,
																				d[n + 6],
																				17,
																				-1473231341
																			)),
																			i,
																			m,
																			d[n + 7],
																			22,
																			-45705983
																		)),
																		(r = md5_ff(
																			r,
																			(i = md5_ff(
																				i,
																				(m = md5_ff(
																					m,
																					f,
																					r,
																					i,
																					d[n + 8],
																					7,
																					1770035416
																				)),
																				f,
																				r,
																				d[n + 9],
																				12,
																				-1958414417
																			)),
																			m,
																			f,
																			d[n + 10],
																			17,
																			-42063
																		)),
																		i,
																		m,
																		d[n + 11],
																		22,
																		-1990404162
																	)),
																	(r = md5_ff(
																		r,
																		(i = md5_ff(
																			i,
																			(m = md5_ff(
																				m,
																				f,
																				r,
																				i,
																				d[n + 12],
																				7,
																				1804603682
																			)),
																			f,
																			r,
																			d[n + 13],
																			12,
																			-40341101
																		)),
																		m,
																		f,
																		d[n + 14],
																		17,
																		-1502002290
																	)),
																	i,
																	m,
																	d[n + 15],
																	22,
																	1236535329
																)),
																(r = md5_gg(
																	r,
																	(i = md5_gg(
																		i,
																		(m = md5_gg(
																			m,
																			f,
																			r,
																			i,
																			d[n + 1],
																			5,
																			-165796510
																		)),
																		f,
																		r,
																		d[n + 6],
																		9,
																		-1069501632
																	)),
																	m,
																	f,
																	d[n + 11],
																	14,
																	643717713
																)),
																i,
																m,
																d[n + 0],
																20,
																-373897302
															)),
															(r = md5_gg(
																r,
																(i = md5_gg(
																	i,
																	(m = md5_gg(
																		m,
																		f,
																		r,
																		i,
																		d[n + 5],
																		5,
																		-701558691
																	)),
																	f,
																	r,
																	d[n + 10],
																	9,
																	38016083
																)),
																m,
																f,
																d[n + 15],
																14,
																-660478335
															)),
															i,
															m,
															d[n + 4],
															20,
															-405537848
														)),
														(r = md5_gg(
															r,
															(i = md5_gg(
																i,
																(m = md5_gg(
																	m,
																	f,
																	r,
																	i,
																	d[n + 9],
																	5,
																	568446438
																)),
																f,
																r,
																d[n + 14],
																9,
																-1019803690
															)),
															m,
															f,
															d[n + 3],
															14,
															-187363961
														)),
														i,
														m,
														d[n + 8],
														20,
														1163531501
													)),
													(r = md5_gg(
														r,
														(i = md5_gg(
															i,
															(m = md5_gg(
																m,
																f,
																r,
																i,
																d[n + 13],
																5,
																-1444681467
															)),
															f,
															r,
															d[n + 2],
															9,
															-51403784
														)),
														m,
														f,
														d[n + 7],
														14,
														1735328473
													)),
													i,
													m,
													d[n + 12],
													20,
													-1926607734
												)),
												(r = md5_hh(
													r,
													(i = md5_hh(
														i,
														(m = md5_hh(m, f, r, i, d[n + 5], 4, -378558)),
														f,
														r,
														d[n + 8],
														11,
														-2022574463
													)),
													m,
													f,
													d[n + 11],
													16,
													1839030562
												)),
												i,
												m,
												d[n + 14],
												23,
												-35309556
											)),
											(r = md5_hh(
												r,
												(i = md5_hh(
													i,
													(m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060)),
													f,
													r,
													d[n + 4],
													11,
													1272893353
												)),
												m,
												f,
												d[n + 7],
												16,
												-155497632
											)),
											i,
											m,
											d[n + 10],
											23,
											-1094730640
										)),
										(r = md5_hh(
											r,
											(i = md5_hh(
												i,
												(m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174)),
												f,
												r,
												d[n + 0],
												11,
												-358537222
											)),
											m,
											f,
											d[n + 3],
											16,
											-722521979
										)),
										i,
										m,
										d[n + 6],
										23,
										76029189
									)),
									(r = md5_hh(
										r,
										(i = md5_hh(
											i,
											(m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487)),
											f,
											r,
											d[n + 12],
											11,
											-421815835
										)),
										m,
										f,
										d[n + 15],
										16,
										530742520
									)),
									i,
									m,
									d[n + 2],
									23,
									-995338651
								)),
								(r = md5_ii(
									r,
									(i = md5_ii(
										i,
										(m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844)),
										f,
										r,
										d[n + 7],
										10,
										1126891415
									)),
									m,
									f,
									d[n + 14],
									15,
									-1416354905
								)),
								i,
								m,
								d[n + 5],
								21,
								-57434055
							)),
							(r = md5_ii(
								r,
								(i = md5_ii(
									i,
									(m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571)),
									f,
									r,
									d[n + 3],
									10,
									-1894986606
								)),
								m,
								f,
								d[n + 10],
								15,
								-1051523
							)),
							i,
							m,
							d[n + 1],
							21,
							-2054922799
						)),
						(r = md5_ii(
							r,
							(i = md5_ii(
								i,
								(m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359)),
								f,
								r,
								d[n + 15],
								10,
								-30611744
							)),
							m,
							f,
							d[n + 6],
							15,
							-1560198380
						)),
						i,
						m,
						d[n + 13],
						21,
						1309151649
					)),
					(r = md5_ii(
						r,
						(i = md5_ii(
							i,
							(m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070)),
							f,
							r,
							d[n + 11],
							10,
							-1120210379
						)),
						m,
						f,
						d[n + 2],
						15,
						718787259
					)),
					i,
					m,
					d[n + 9],
					21,
					-343485551
				)),
					(m = safe_add(m, h)),
					(f = safe_add(f, t)),
					(r = safe_add(r, g)),
					(i = safe_add(i, e));
			}
			return Array(m, f, r, i);
		}
		function md5_cmn(d, _, m, f, r, i) {
			return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m);
		}
		function md5_ff(d, _, m, f, r, i, n) {
			return md5_cmn((_ & m) | (~_ & f), d, _, r, i, n);
		}
		function md5_gg(d, _, m, f, r, i, n) {
			return md5_cmn((_ & f) | (m & ~f), d, _, r, i, n);
		}
		function md5_hh(d, _, m, f, r, i, n) {
			return md5_cmn(_ ^ m ^ f, d, _, r, i, n);
		}
		function md5_ii(d, _, m, f, r, i, n) {
			return md5_cmn(m ^ (_ | ~f), d, _, r, i, n);
		}
		function safe_add(d, _) {
			var m = (65535 & d) + (65535 & _);
			return (((d >> 16) + (_ >> 16) + (m >> 16)) << 16) | (65535 & m);
		}
		function bit_rol(d, _) {
			return (d << _) | (d >>> (32 - _));
		}
		text = text.replace(/<h2>([^<]+)<\/h2>/gi, function (_, p1) {
			let id: string = p1.trim().replace(/ /g, '_');
			if (!/^[a-zA-Z0-9_]+$/.test(id)) {
				id = MD5(p1);
			}
			return '<h2 id="' + id + '">' + p1 + '</h2>';
		});
		text = text.replace(/(\w|\')\|(\w|\')/gi, '$1 | $2');
		text = text.replace(/emptyName : /gi, '');
		text = text
			.replace(/\<code>/gi, '<pre><code>')
			.replace(/\<code /gi, '<pre><code ')
			.replace(/\<\/code>/gi, '</code></pre>');
		this.docEle.nativeElement.innerHTML = text;
		const linksH2: HTMLElement[] =
			this.docEle.nativeElement.getElementsByTagName('h2');
		this.lastH2Menu = [];
		for (let i = 0; i < linksH2.length; i++) {
			const link = linksH2[i];
			if (link.hasAttribute('id')) {
				this.lastH2Menu.push({
					id: '/docs/' + this.menuId + '.' + link.getAttribute('id'),
					name: link.textContent,
					selected: false,
					element: link,
				});
			}
		}
		this.docsComponent.changeSubPage(this.lastH2Menu);
		const links = this.docEle.nativeElement.getElementsByTagName('a');
		for (let i = 0; i < links.length; i++) {
			const link = links[i];
			link.addEventListener('click', (e: Event) => {
				let htmlAnchorElement = link;
				const href: string = htmlAnchorElement.getAttribute('href');
				let hrefId = href.substring(href.indexOf('#') + 1);
				if (
					href.startsWith('http://') ||
					href.startsWith('https://') ||
					href.startsWith('//')
				) {
					return true;
				} else if (hrefId === this.pageName) {
					this.setFocus(null);
				} else {
					if (
						!hrefId.startsWith('THREE.') &&
						hrefId.startsWith(this.pageName + '.')
					) {
						hrefId = hrefId.substring(this.pageName.length + 1);
					}
					const selected = this.setElementById(
						hrefId,
						htmlAnchorElement.parentElement
					);
					if (
						selected !== null &&
						!selected.classList.contains('dummy-class')
					) {
						this.router.navigateByUrl('/docs/' + this.menuId + '.' + hrefId);
					} else {
						this.docsComponent.changePage(hrefId, this.menuId);
					}
				}
				e.stopPropagation();
				e.preventDefault();
				return false;
			});
		}
		const codes: HTMLElement[] =
			this.docEle.nativeElement.getElementsByTagName('code');
		for (let i = 0; i < codes.length; i++) {
			const code = codes[i];
			let language = code.dataset.type || 'none';
			const languageSubset: string[] = ['html', 'css', 'javascript'];
			code.classList.add('prettyprint');
			code.classList.add('hljs');
			let innerText: string = code.innerText
				.replace(/<br>/g, '')
				.replace(/<br\/>/g, '')
				.replace(/\n([\t ]{1,2})/g, '\n');

			if (language === '' || language === 'none') {
				if (innerText.indexOf('</') > -1 || innerText.startsWith('<')) {
					language = 'html';
				} else if (innerText.indexOf('npm ') > -1) {
					language = 'shell';
				} else {
					language = 'javascript';
				}
			}
			switch (language) {
				case 'text':
					code.classList.add('language-plaintext');
					languageSubset.push('plaintext');
					break;
				case 'ts':
				case 'typescript':
				case 'javascript':
					code.classList.add('language-javascript');
					languageSubset.push('javascript');
					break;
				case 'html':
					code.classList.add('language-html');
					break;
			}
			if (language !== null && language !== '' && language !== 'none') {
				const tag = document.createElement('span');
				tag.className = 'language-type';
				tag.innerText = '#' + language;
				code.parentNode.appendChild(tag);
			}
			let safeTxt: string[] = [];
			innerText.split('\n').forEach((txt: string) => {
				if (txt.trim() !== '') {
					safeTxt.push(txt);
				}
			});
			switch (language) {
				case 'text':
					innerText = safeTxt.join('\n');
					break;
				default:
					innerText = safeTxt.join('\n');
					break;
			}
			if (innerText.startsWith('\t')) {
				innerText = innerText.substring(1);
				innerText = innerText.replace(/\n\t/g, '\n');
			}
			this.highlightJS
				.highlightAuto(innerText, languageSubset)
				.subscribe((hi: HighlightResult) => {
					code.innerHTML = hi.value;
				});
		}
		this.isLoaded = true;
		setTimeout(() => {
			if (this.tagName !== null) {
				this.setFocus(this.tagName);
				this.tagName = null;
			} else {
				this.setFocus(null);
			}
			const docEle: HTMLDivElement =
				this.docEle.nativeElement.parentElement.parentElement.parentElement;
			this.checkScrollIframe(docEle);
		}, 2000);
	}

	/**
	 * Determines whether element in viewport is
	 *
	 * @param el
	 * @param scrollObj
	 * @returns true if element in viewport
	 */
	private isElementInViewport(
		el: Element,
		scrollSize: {
			clientHeight: number;
			clientWidth: number;
		},
		ignoreTop: boolean = false
	): boolean {
		const rect = el.getBoundingClientRect();
		return (
			(rect.top >= 0 || ignoreTop) &&
			rect.top + (rect.bottom - rect.top) * 0.7 <=
				(scrollSize.clientHeight || document.documentElement.clientHeight)
		);
	}

	_onScrollBind: () => any;

	_docEle: HTMLDivElement = null;

	public ngAfterViewInit(): void {
		this._docEle =
			this.docEle.nativeElement.parentElement.parentElement.parentElement;
		this._onScrollBind = () => {
			this.checkScrollIframe(this._docEle);
		};
		this._docEle.addEventListener('scroll', this._onScrollBind);
	}

	public isLoaded: boolean = false;
	public isScrolled: boolean = false;

	private checkScrollIframe(docEle: HTMLDivElement) {
		if (docEle) {
			const dummyIframes = docEle.getElementsByClassName('dummy-iframe');
			const scrollSize: {
				clientHeight: number;
				clientWidth: number;
			} = {
				clientHeight: docEle.clientHeight,
				clientWidth: docEle.clientWidth,
			};
			if (dummyIframes.length > 0) {
				for (let i = 0; i < dummyIframes.length; i++) {
					const dummyIframe = dummyIframes[i] as HTMLDivElement;
					const isVisible = this.isElementInViewport(dummyIframe, scrollSize);
					if (isVisible) {
						const src = dummyIframe.dataset.src;
						const iframe = document.createElement('iframe');
						iframe.src = src;
						dummyIframe.parentElement.insertBefore(iframe, dummyIframe);
						dummyIframe.parentElement.removeChild(dummyIframe);
					}
				}
			}
			this.isScrolled = docEle.scrollTop > 50 ? true : false;
			let lastVisibleMenu: number = -1;
			let lastVisibleMenuInView: boolean = false;

			for (let i = 0; i < this.lastH2Menu.length; i++) {
				const menu = this.lastH2Menu[i];
				const isVisible = this.isElementInViewport(
					menu.element,
					scrollSize,
					true
				);
				if (isVisible) {
					if (!lastVisibleMenuInView) {
						lastVisibleMenu = i;
						lastVisibleMenuInView = this.isElementInViewport(
							menu.element,
							scrollSize,
							false
						);
					}
				}
				menu.selected = false;
			}
			if (lastVisibleMenu > -1) {
				this.lastH2Menu[lastVisibleMenu].selected = true;
			}
		}
	}
	private links: HTMLElement[] = null;

	private setElementById(menuId: string, exceptParent: HTMLElement = null) {
		if (this.links === null) {
			const links = [];
			const linksA: HTMLElement[] =
				this.docEle.nativeElement.getElementsByTagName('a');
			const linksH1: HTMLElement[] =
				this.docEle.nativeElement.getElementsByTagName('h1');
			const linksH2: HTMLElement[] =
				this.docEle.nativeElement.getElementsByTagName('h2');
			const linksH3: HTMLElement[] =
				this.docEle.nativeElement.getElementsByTagName('h3');
			for (let i = 0; i < linksA.length; i++) {
				links.push(linksA[i]);
			}
			for (let i = 0; i < linksH1.length; i++) {
				links.push(linksH1[i]);
			}
			for (let i = 0; i < linksH2.length; i++) {
				links.push(linksH2[i]);
			}
			for (let i = 0; i < linksH3.length; i++) {
				links.push(linksH3[i]);
			}
			this.links = [];
			for (let i = 0; i < links.length; i++) {
				const link: HTMLElement = links[i];
				if (link.hasAttribute('id')) {
					this.links.push(link);
				}
			}
		}
		let selected: HTMLElement = null;
		for (let i = 0; i < this.links.length; i++) {
			const link: HTMLElement = this.links[i];
			if (
				link.getAttribute('id') === menuId &&
				link.parentElement !== exceptParent
			) {
				selected = this.links[i];
				break;
			}
		}
		return selected;
	}

	setFocus(menuId: string) {
		if (!this.isLoaded) {
			setTimeout(() => {
				this.setFocus(menuId);
			}, 500);
		} else {
			if (menuId !== null) {
				let selected: HTMLElement = this.setElementById(menuId);
				if (selected !== null) {
					selected.scrollIntoView({ block: 'start', behavior: 'smooth' });
				}
			} else {
				this.apiTop.nativeElement.scrollIntoView({
					block: 'start',
					behavior: 'smooth',
				});
			}
		}
	}
}
