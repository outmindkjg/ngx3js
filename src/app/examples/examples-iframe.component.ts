import {
	AfterViewInit,
	Component, ElementRef, ViewChild
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgxThreeUtil } from 'ngx3js';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';

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
				if (environment.production) {
					if (this.lastIframeUrl !== null) {
						iframe.className = 'iframe-unloaded';
					}
					this.lastIframeUrl = url;
					NgxThreeUtil.getTimeout(1000).then(() => {
						iframe.src = 'about:blank';
						NgxThreeUtil.getTimeout(1000).then(() => {
							iframe.src = url;
						});
					});
				} else {
					this.lastIframeUrl = url;
					iframe.src = url;
				}
			}
		}
	}

	ngAfterViewInit(): void {
		if (this.iframe !== null && this.iframe !== undefined) {
			const iframe: HTMLIFrameElement = this.iframe.nativeElement;
			if (environment.production) {
				iframe.addEventListener('load', () => {
					if(iframe.src !== 'about:blank') {
						iframe.className = 'iframe-loaded';
					}
				});
			} else {
				iframe.className = 'iframe-loaded';
			}
			this.changeIframeSrc(this.iframeUrl);
		}
	}

}
