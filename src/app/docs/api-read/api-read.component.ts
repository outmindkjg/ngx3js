import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
export class ApiReadComponent implements OnInit {
	@ViewChild('apiDoc') private docEle: ElementRef;
	@ViewChild('apiTop') private apiTop: ElementRef;

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
	}

	ngOnInit(): void {}

	public menuId: string = '';
	public pageName: string = '';
	public tagName: string = '';

	changeRouter(url: string) {
		this.menuId = url.substr(6).split('.')[0];
		this.pageName = /[\-A-z0-9]+$/.exec(this.menuId).toString();
		this.tagName = url.indexOf('.') > 0 ? url.split('.')[1] : null;
		this.http
			.get('assets/' + this.menuId + '.html', {
				responseType: 'text',
			})
			.subscribe((response) => {
				this.setBody(response, this.menuId);
			});
	}

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
			case 'samples' :
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
		text = text.replace(/\[parameter:([\w\.]+)(\[\]|)\]/gi, '[parameter:$1$2 $1]'); // [parameter:name] to [parameter:name title]
		
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
			/\[(member|property|method|param|constructor):([\w\.]+)(\[\]|)\]/gi,
			'[$1:$2$3 $2]'
		); // [member:name] to [member:name title]
		text = text.replace(
			/\[(?:member|property|method):([\w\.]+)(\[\]|) ([\w\.\s]+)\]\s*(\(.*\)|\?)?/gi,
			'<a href="#' +
				name +
				'.$3" title="' +
				name +
				'.$3" class="permalink">#</a> .<a href="#' +
				name +
				'.$3" id="$3">$3</a> $4 : <a class="param" href="#$1">$1</a>$2'
		);
		text = text.replace(
			/\[(?:member|property|method):([\w\.]+)(\[\]|)\|([\w\.]+)(\[\]|) ([\w\.\s]+)\]\s*(\(.*\)|\?)?/gi,
			'<a href="#' +
				name +
				'.$5" title="' +
				name +
				'.$5" class="permalink">#</a> .<a href="#' +
				name +
				'.$5" id="$5">$5</a> $6 : <a class="param" href="#$1">$1</a>$2 | <a class="param" href="#$3">$3</a>$4'
		);
		text = text.replace(
			/\[(?:member|property|method):([\w\.]+)(\[\]|)\|([\w\.]+)(\[\]|)\|([\w\.]+)(\[\]|) ([\w\.\s]+)\]\s*(\(.*\)|\?)?/gi,
			'<a href="#' +
				name +
				'.$7" title="' +
				name +
				'.$7" class="permalink">#</a> .<a href="#' +
				name +
				'.$7" id="$7">$7</a> $8 : <a class="param" href="#$1">$1</a>$2 | <a class="param" href="#$3">$3</a>$4 | <a class="param" href="#$5">$5</a>$6'
		);
		text = text.replace(
			/\[(?:member|property|method):([\w\.]+)(\[\]|)\|([\w\.]+)(\[\]|)\|([\w\.]+)(\[\]|)\|([\w\.]+)(\[\]|) ([\w\.\s]+)\]\s*(\(.*\)|\?)?/gi,
			'<a href="#' +
				name +
				'.$9" title="' +
				name +
				'.$9" class="permalink">#</a> .<a href="#' +
				name +
				'.$9" id="$9">$9</a> $10 : <a class="param" href="#$1">$1</a>$2 | <a class="param" href="#$3">$3</a>$4 | <a class="param" href="#$5">$5</a>$6 | <a class="param" href="#$7">$7</a>$8'
		);
		text = text.replace(
			/\[(?:member|property|method):([^ ]+) ([\w\.\s]+)\]\s*(\(.*\)|\?)?/gi,
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
			/\[param:([\w\.]+)(\[\]|) ([\w\.\s]+)\]/gi,
			'$3 : <a class="param" href="#$1">$1</a>$2'
		); // [param:name title]
		text = text.replace(
			/\[param:([\w\.]+)(\[\]|)\|([\w\.]+)(\[\]|) ([\w\.\s]+)\]/gi,
			'$5 : <a class="param" href="#$1">$1</a>$2 | <a class="param" href="#$3">$3</a>$4'
		); // [param:name|name title]
		text = text.replace(
			/\[param:([\w\.]+)(\[\]|)\|([\w\.]+)(\[\]|)\|([\w\.]+)(\[\]|) ([\w\.\s]+)\]/gi,
			'$7 : <a class="param" href="#$1">$1</a>$2 | <a class="param" href="#$3">$3</a>$4 | <a class="param" href="#$5">$5</a>$6'
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

		text = text.replace(/\[example:([\w\_/]+)\]/gi, '[example:$1 $1]'); // [example:name] to [example:name title]
		text = text.replace(
			/\[example:([\w\_/]+) ([\w\:\/\.\-\_ \s]+)\]/gi,
			'<a href="#examples/$1">$2</a>'
		); // [example:name title]

		text = text.replace(
			/(\w|\')\|(\w|\')/gi,
			'$1 | $2'
		);
		text = text.replace(
			/emptyName : /gi,
			''
		);

		text = text.replace(/\<code>/gi, "<pre><code>").replace(/\<code /gi, "<pre><code ").replace(/\<\/code>/gi, "</code></pre>");
		this.docEle.nativeElement.innerHTML = text;
		const links = this.docEle.nativeElement.getElementsByTagName('a');
		for (let i = 0; i < links.length; i++) {
			const link = links[i];
			link.addEventListener('click', (e: Event) => {
				const href: string = (e.target as HTMLAnchorElement).getAttribute(
					'href'
				);
				const hrefId = href.substr(href.indexOf('#') + 1);
				if (
					href.startsWith('http://') ||
					href.startsWith('https://') ||
					href.startsWith('//')
				) {
					return true;
				} else if (hrefId === this.pageName) {
					this.setFocus(null);
				} else if (hrefId.startsWith(this.pageName + '.')) {
					this.setFocus(hrefId.substr(this.pageName.length + 1));
				} else if (this.setElementById(hrefId) !== null) {
					this.setFocus(hrefId);
				} else {
					this.docsComponent.changePage(hrefId);
				}
				e.stopPropagation()
				e.preventDefault()
				return false;
			});
		}
		const codes: HTMLElement[] = this.docEle.nativeElement.getElementsByTagName('code');
		for (let i = 0; i < codes.length; i++) {
			const code = codes[i];
			const language = code.dataset.type || 'javascript';
			const languageSubset : string[] = [ 'html', 'css', 'javascript' ];
			code.classList.add('prettyprint');
			code.classList.add('hljs');
			switch(language) {
				case 'text' :
					code.classList.add('language-plaintext');
					languageSubset.push('plaintext');
					break;
				case 'ts' :
				case 'typescript' :
				case 'javascript' :
					code.classList.add('language-javascript');
					languageSubset.push('javascript');
					break;
				case 'html' :
					code.classList.add('language-html');
					break;
			}
			let innerText: string = code.innerText.replace(/<br>/g,'').replace(/<br\/>/g,'').replace(/\n([\t ]{1,2})/g, '\n');
			let safeTxt:string[] = [];
			innerText.split("\n").forEach((txt : string) => {
				if (txt.trim() !== '') {
					safeTxt.push(txt);
				}
			});
			switch(language) {
				case 'text' :
					innerText = safeTxt.join("\n");
					break;
				default :
					innerText = safeTxt.join("\n");
					break;
			}
			if (innerText.startsWith('\t')) {
				innerText = innerText.substring(1);
				innerText = innerText.replace(/\n\t/g,'\n');
			}
			this.highlightJS
				.highlightAuto(innerText, languageSubset)
				.subscribe((hi: HighlightResult) => {
					code.innerHTML = hi.value;
				});
		}
		if (this.tagName !== null) {
			this.setFocus(this.tagName, 1000);
			this.tagName = null;
		} else {
			this.setFocus(null);
		}
	}

	private setElementById(menuId: string) {
		const links = [];
		const linksA: HTMLElement[] = this.docEle.nativeElement.getElementsByTagName('a');
		const linksH1: HTMLElement[] = this.docEle.nativeElement.getElementsByTagName('h1');
		const linksH2: HTMLElement[] = this.docEle.nativeElement.getElementsByTagName('h2');
		const linksH3: HTMLElement[] = this.docEle.nativeElement.getElementsByTagName('h3');
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
		let selected: HTMLElement = null;
		for (let i = 0; i < links.length; i++) {
			if (links[i].getAttribute('id') === menuId) {
				selected = links[i];
				break;
			}
		}
		return selected;
	}

	setFocus(menuId: string, timeOut : number = 200) {
		setTimeout(() => {
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
		}, timeOut);
	}
}
