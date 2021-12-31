import {
	AfterViewInit,
	Component, ElementRef, ViewChild
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-examples-iframe',
	templateUrl: './examples-iframe.component.html',
	styleUrls: ['./examples-iframe.component.scss'],
})
export class ExamplesIframeComponent implements AfterViewInit{

	private subscription: Subscription;

	constructor(
		private router: Router
	) {
		this.subscription = this.router.events.subscribe((event: any) => {
			if (event instanceof NavigationEnd) {
				this.changeRouter(event.urlAfterRedirects || event.url);
			}
		});
	}

	@ViewChild('iframe') iframe: ElementRef = null;

	ngOnDestroy(): void {
		if (this.subscription !== null) {
			this.subscription.unsubscribe();
			this.subscription = null;
		}
	}
	
	private iframeUrl : string = null;

	changeRouter(url: string) {
		if (url.startsWith('/examples/')) {
			this.iframeUrl = './#/fullviewer/' + url.substring(10);
		}
		this.changeIframeSrc(this.iframeUrl);
	}

	private lastIframeUrl : string = null;

	changeIframeSrc(url: string) {
		if (this.iframe !== null && this.iframe !== undefined && url != null) {
			if (this.lastIframeUrl !== url) {
				const iframe: HTMLIFrameElement = this.iframe.nativeElement;
				if (this.lastIframeUrl !== null) {
					iframe.className = 'iframe-unloaded';
				}
				this.lastIframeUrl = url;
				setTimeout(() => {
					iframe.src = 'about:blank';
					setTimeout(() => {
						iframe.src = url;
					}, 1000);
				}, 1000);
			}
		}
	}

	ngAfterViewInit(): void {
		if (this.iframe !== null && this.iframe !== undefined) {
			const iframe: HTMLIFrameElement = this.iframe.nativeElement;
			iframe.addEventListener('load', () => {
				if(iframe.src !== 'about:blank') {
					iframe.className = 'iframe-loaded';
				}
			});
			this.changeIframeSrc(this.iframeUrl);
		}
	}

}
